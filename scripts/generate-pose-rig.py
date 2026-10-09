"""Build pose masks from unchanged source pixels and align actual head/neck images.

Only RML/vector geometry is written. Original PNGs are read for contour analysis.
"""
from pathlib import Path
import copy
import os
import numpy as np
from PIL import Image
import xml.etree.ElementTree as ET

ROOT=Path(__file__).resolve().parents[1]
path=ROOT/'nani/scene.rml'
tree=ET.parse(path);root=tree.getroot()
art=root.find('Artboard');breath=art.find('.//Node[@id="0:20"]')
head=art.find('.//RootBone[@id="0:80"]')
vm=root.find('ViewModel');instance=vm.find('ViewModelInstance')
# Drop the rejected yaw geometry and its data bindings.
for parent in (vm,instance):
    for child in list(parent):
        if child.attrib.get('name','').startswith(('turn','pose')) or int(child.attrib.get('viewModelPropertyId',child.attrib.get('id','0:0')).split(':')[-1])>=1000:parent.remove(child)
for parent in root.iter():
    for child in list(parent):
        if child.tag=='DataBindContext' and int(child.attrib.get('sourcePathIds','0:40-0:0').split('-')[-1].split(':')[-1])>=1000:parent.remove(child)
for child in list(breath):
    if child.tag=='Image' or child.attrib.get('name','').startswith('Pose'):breath.remove(child)
for child in list(head):
    if child.attrib.get('name','').startswith('Pose'):head.remove(child)
for child in list(root):
    if child.tag=='ImageAsset' and child.attrib['id'] in ('0:61','0:62'):root.remove(child)
# Eye template from the accepted frontal rig; perspective is now in source images.
artwork=head.find('Node[@id="0:21"]')
artwork.set('y','-528')
idle=breath.find('Node[@id="0:70"]');idle.set('y','528')
for kp in root.findall('.//KeyedObject[@objectId="0:70"]/KeyedProperty[@property="y"]'):
    for key in kp.findall('KeyFrameDouble'):
        value=float(key.attrib['value']);key.set('value',str(value+116 if value<500 else value))
left=artwork.find('Node[@id="0:100"]');right=artwork.find('Node[@id="0:200"]')
left.set('x','-156');left.set('scaleX','1');right.set('x','149');right.set('scaleX','1')
# Side-view sclera should follow the visible eye instead of filling the lens.
side_templates=[copy.deepcopy(left),copy.deepcopy(right)]
for template in side_templates:
    for aperture in template.iter('Ellipse'):
        if aperture.attrib.get('name')=='Eye aperture':
            aperture.set('width','126');aperture.set('height','104')
    for gradient in template.iter('LinearGradient'):
        if gradient.attrib.get('name')=='Shading':
            colors=['FFF2EFEB','FFFCFBF9','FFFFFFFF','FFF0EEEA']
            for stop,color in zip(gradient.findall('GradientStop'),colors):stop.set('colorValue',color)
# Idempotent regeneration restores the original eye names and opacity binds.
for parent in artwork.iter():
    if parent.attrib.get('name','').startswith('Front '):parent.set('name',parent.attrib['name'][6:])

counter=3000
def uid():
    global counter
    counter+=1;return f'0:{counter}'
def prop(name,ident,value):
    ET.SubElement(vm,'ViewModelPropertyNumber',name=name,id=f'0:{ident}')
    ET.SubElement(instance,'ViewModelInstanceNumber',viewModelPropertyId=f'0:{ident}',propertyValue=str(value))
def bind(node,ident,key):ET.SubElement(node,'DataBindContext',sourcePathIds=f'0:40-0:{ident}',propertyKey=str(key))
for name,ident,value in [('poseFront',1700,1),('poseLeft',1701,0),('poseRight',1702,0),('sidePupilX',1703,0)]:prop(name,ident,value)
bind(artwork,1700,18)

def rdp(points,tolerance=1.25):
    if len(points)<3:return points
    a=np.array(points[0]);b=np.array(points[-1]);arr=np.array(points)
    delta=b-a;den=float(delta@delta)
    if den:
        ts=np.clip(((arr-a)@delta)/den,0,1);dist=np.linalg.norm(arr-(a+ts[:,None]*delta),axis=1)
    else:dist=np.linalg.norm(arr-a,axis=1)
    k=int(np.argmax(dist))
    if dist[k]<=tolerance:return [points[0],points[-1]]
    return rdp(points[:k+1],tolerance)[:-1]+rdp(points[k:],tolerance)

def contour(file, torso=False, neck_start=1160):
    a=np.array(Image.open(file));rgb=a[:,:,:3].astype(int);h,w=rgb.shape[:2]
    mask=(a[:,:,3]>100) if a.shape[2]==4 else np.max(rgb,axis=2)>16
    skin=(rgb[:,:,0]>rgb[:,:,1]+12)&(rgb[:,:,1]>rgb[:,:,2]+3)
    if torso:
        # Retain a matching neck backing beneath the moving head layer.
        # Overlap avoids a transparent seam at the collar during idle motion.
        mask[:neck_start,:]=False
    else:
        mask[1000:,:]&=skin[1000:,:]
    # Pixel-cell borders yield an exact vector silhouette, simplified for Rive.
    padded=np.pad(mask,1)
    top=mask&~padded[:-2,1:-1];bottom=mask&~padded[2:,1:-1]
    lft=mask&~padded[1:-1,:-2];rgt=mask&~padded[1:-1,2:]
    edges={}
    for selection,kind in [(top,0),(rgt,1),(bottom,2),(lft,3)]:
        for y,x in zip(*np.nonzero(selection)):
            x=int(x);y=int(y)
            a,b=[((x,y),(x+1,y)),((x+1,y),(x+1,y+1)),((x+1,y+1),(x,y+1)),((x,y+1),(x,y))][kind]
            edges.setdefault(a,[]).append(b)
    loops=[]
    directions={(1,0):0,(0,1):1,(-1,0):2,(0,-1):3}
    while edges:
        start=next(iter(edges));point=start;loop=[];incoming=None
        while point in edges:
            loop.append(point)
            options=edges[point]
            def priority(candidate):
                if incoming is None:return 0
                direction=directions[(candidate[0]-point[0],candidate[1]-point[1])]
                return {1:0,0:1,3:2,2:3}[(direction-incoming)%4]
            following=min(options,key=priority)
            options.remove(following)
            if not options:del edges[point]
            incoming=directions[(following[0]-point[0],following[1]-point[1])]
            point=following
            if point==start:break
        if point!=start:raise RuntimeError('Unclosed pixel contour')
        if len(loop)>20:loops.append(loop)
    outline=max(loops,key=len)
    k=len(outline)//2
    tolerance=1.25
    return rdp(outline[:k+1],tolerance)+rdp(outline[k:]+[outline[0]],tolerance)[1:-1],w,h

def shape(parent,points,name):
    ident=uid();s=ET.SubElement(parent,'Shape',name=name,id=ident)
    p=ET.SubElement(s,'PointsPath',name='Silhouette',isClosed='true',isClockwise='true')
    for x,y in points:ET.SubElement(p,'StraightVertex',x=str(round(x,3)),y=str(round(y,3)))
    return s,ident

configs=[
    dict(name='Front',file=ROOT/'nani/gaze/gaze-center.png',asset='0:60',s=1,dx=0,dy=0,prop=1700),
    dict(name='Left',file=ROOT/'nani/gaze/pose-left-transparent-v41.png',asset='0:61',s=1.10,dx=-65,dy=34.5,prop=1701,eyes=[(208,690,.60,.90,201),(410,690,1.07,1.0,389)]),
    dict(name='Right',file=ROOT/'Imagen de Codex 8 oct 2026, 10_30_55.png',asset='0:62',s=1.05,dx=-70,dy=64,prop=1702,eyes=[(600,710,1.07,1,628),(816,704,.60,.90,828)]),
]
frontoutline=None
for conf in configs:
    name=conf['name'];outline,w,h=contour(conf['file']);scale=conf['s'];dx=conf['dx'];dy=conf['dy']
    group=ET.SubElement(head,'Node',name=f'Pose {name}',x=str(dx-499),y=str(dy-1316),scaleX=str(scale),scaleY=str(scale),id=uid())
    bind(group,conf['prop'],18)
    if name!='Front':
        ET.SubElement(root,'ImageAsset',file=os.path.relpath(conf['file'],ROOT/'nani'),name=f'pose-{name.lower()}',id=conf['asset'])
        for i,(template,(ex,ey,sx,sy,irisx)) in enumerate(zip(side_templates,conf['eyes'])):
            eye=copy.deepcopy(template)
            replacements={}
            for element in eye.iter():
                if 'id' in element.attrib:replacements[element.attrib['id']]=uid();element.set('id',replacements[element.attrib['id']])
                if 'name' in element.attrib:element.set('name',f'{name} '+element.attrib['name'])
            for element in eye.iter():
                for attr in ['sourceId','parentId']:
                    if element.attrib.get(attr) in replacements:element.set(attr,replacements[element.attrib[attr]])
            eye_offset_y=-4
            eye.set('x',str(ex));eye.set('y',str(ey+eye_offset_y));eye.set('scaleX',str(sx));eye.set('scaleY',str(sy))
            gaze=next(e for e in eye if e.tag=='Node' and 'Gaze' in e.attrib.get('name',''))
            gaze.set('x','0')
            iris_boundary=next(e for e in gaze if e.tag=='Shape' and 'Iris boundary' in e.attrib.get('name',''))
            iris_silhouette=iris_boundary.find('Ellipse')
            iris_silhouette.set('x','-4')
            iris_silhouette.set('width','50');iris_silhouette.set('height','80')
            for e in list(gaze):
                if e.tag=='DataBindContext' and e.attrib['propertyKey']=='13':gaze.remove(e)
            bind(gaze,1703,13)
            iris=gaze.find('Image');iris.set('assetId',conf['asset'])
            iris.set('x',str((w/2-irisx)/sx));iris.set('y',str((h/2-ey)/sy));iris.set('scaleX',str(1/sx));iris.set('scaleY',str(1/sy))
            skin_node=next(e for e in eye if e.tag=='Node' and 'Skin under eyelid' in e.attrib.get('name',''))
            # Match the frontal rig: conceal the painted eye continuously.
            # Only the aperture/lid curves close; the backing never fades in.
            skin_node.set('opacity','1')
            sclera=next(e for e in eye if e.tag=='Shape' and e.attrib.get('name','').endswith('Sclera'))
            aperture=sclera.find('Ellipse')
            aperture_width=120
            aperture.set('width',str(aperture_width))
            # Retain the frontal apertureHeight/apertureY bindings unchanged.
            # Independent pupils remain active throughout each side pose; skin
            # correction removes the original iris beneath the moving texture.
            guard=ET.SubElement(eye,'Shape',name=f'{name} eye guard',y='-8',id=uid())
            ET.SubElement(guard,'Ellipse',width='148',height='180')
            guardid=guard.attrib['id']
            pixels=np.array(Image.open(conf['file']))[:,:,:3].astype(float)
            yy,xx=np.mgrid[max(0,int(ey-95)):int(ey+96),max(0,int(ex-90*sx)):int(ex+90*sx+1)]
            colors=pixels[yy,xx]
            valid=(colors[:,:,0]>150)&(colors[:,:,1]>95)&(colors[:,:,0]-colors[:,:,1]>25)&(colors[:,:,1]-colors[:,:,2]>10)
            valid&=((xx-ex)/(65*sx))**2+((yy-ey)/(58*sy))**2>1.03
            coords=np.column_stack([np.ones(valid.sum()),(xx[valid]-ex)/sx,(yy[valid]-ey)/sy])
            samples=colors[valid]
            keep=np.ones(len(samples),dtype=bool)
            for _ in range(3):
                fit=np.linalg.lstsq(coords[keep],samples[keep],rcond=None)[0]
                residual=np.linalg.norm(np.sum(coords[:,:,None]*fit[None,:,:],axis=1)-samples,axis=1)
                keep=residual<np.percentile(residual,80)
            direction=fit[1:].mean(axis=1)
            direction=direction/max(np.linalg.norm(direction),1e-6)
            endpoints=[-80*direction,80*direction]
            skincolors=[np.clip(np.rint(np.array([1,*point])@fit),0,255).astype(int) for point in endpoints]
            for element in eye.iter():
                if element.tag=='Shape' and 'Skin blend' in element.attrib.get('name',''):
                    ellipse=element.find('Ellipse');ellipse.set('height',str(float(ellipse.attrib['height'])+18))
                    grad=element.find('Fill/LinearGradient')
                    grad.set('startX',str(endpoints[0][0]));grad.set('startY',str(endpoints[0][1]))
                    grad.set('endX',str(endpoints[1][0]));grad.set('endY',str(endpoints[1][1]))
                    for stop,color in zip(grad.findall('GradientStop'),skincolors):stop.set('colorValue','FF'+''.join(f'{channel:02X}'for channel in color))
            for e in list(eye.iter()):
                if e.tag=='Image' or (e.tag=='Shape' and (e.find('Fill') is not None or e.find('Stroke') is not None)):
                    ET.SubElement(e,'ClippingShape',sourceId=guardid,name='Inside the original lens')
            group.append(eye)
    im=ET.SubElement(group,'Image',assetId=conf['asset'],originX='0',originY='0',name=f'{name} original head and neck',id=uid())
    mask,maskid=shape(group,[(x,y+5 if y>1050 else y) for x,y in outline],f'{name} head and neck mask')
    ET.SubElement(im,'ClippingShape',sourceId=maskid,name='Original silhouette')
    # Rive draws earlier siblings above later ones. Keep replacement eyes
    # before the source image so the original static eyes cannot cover them.
    if name=='Front':frontoutline=outline
# Each source torso matches its own neck/collar exactly. Torso layers breathe
# together; only the masked head/neck layers follow the head's idle pivot.
for conf in configs:
    torsooutline,_,_=contour(conf['file'],torso=True,neck_start=1160 if conf['name']=='Front' else 1040 if conf['name']=='Left' else 1060)
    group=ET.SubElement(breath,'Node',name=f"Pose {conf['name']} Torso",x=str(conf['dx']-499),y=str(conf['dy']-788),scaleX=str(conf['s']),scaleY=str(conf['s']),id=uid())
    bind(group,conf['prop'],18)
    body=ET.SubElement(group,'Image',assetId=conf['asset'],originX='0',originY='0',name=f"{conf['name']} matching torso",id=uid())
    mask,maskid=shape(group,torsooutline,f"{conf['name']} torso mask")
    ET.SubElement(body,'ClippingShape',sourceId=maskid,name='Matching original collar and torso')
ET.indent(root,space='    ');tree.write(path,encoding='unicode')
html=ROOT/'index.html';s=html.read_text()
start='    // BEGIN GENERATED YAW MESH\n';end='    // END GENERATED YAW MESH\n'
if start in s:
    a=s.index(start);b=s.index(end,a)+len(end);s=s[:a]+s[b:]
html.write_text(s)
print('Built frontal/left/right original image head and neck masks, aligned in eye height with matching original collars. No face meshes.')

# Keep the speech mouth layers and bindings after regenerating pose properties.
import runpy
runpy.run_path(str(ROOT/"scripts/generate-mouth-rig.py"))

# Preserve the focused-email pose when rebuilding the main rig.
runpy.run_path(str(ROOT/"scripts/generate-thumbs-rig.py"))
