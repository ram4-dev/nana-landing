"""Add native Rive speech mouth paths over the unchanged three pose images."""
from pathlib import Path
import xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[1]
path=ROOT/'nani/scene.rml';tree=ET.parse(path);root=tree.getroot()
vm=root.find('ViewModel');instance=vm.find('ViewModelInstance')
for parent in root.iter():
    for child in list(parent):
        if child.attrib.get('name','').startswith('Speech Mouth') or child.attrib.get('id','') in [f'0:{i}' for i in range(1800,1806)] or child.attrib.get('viewModelPropertyId','') in [f'0:{i}' for i in range(1800,1806)]:parent.remove(child)
def bind(node,ident,key):ET.SubElement(node,'DataBindContext',sourcePathIds=f'0:40-0:{ident}',propertyKey=str(key))
for ident,name,value in [(1800,'mouthVisible',0),(1801,'mouthTop',24),(1802,'mouthBottom',24),(1803,'mouthWidth',1),(1804,'tongueY',38)]:
    ET.SubElement(vm,'ViewModelPropertyNumber',name=name,id=f'0:{ident}')
    ET.SubElement(instance,'ViewModelInstanceNumber',viewModelPropertyId=f'0:{ident}',propertyValue=str(value))
for name,x,y,sx,sy,rotation in [('Front',490,990,1,1,0),('Left',296,858,.73,.9,-.015),('Right',720,875,.73,.9,-.04)]:
    pose=root.find(f'.//Node[@name="Pose {name}"]')
    mouth=ET.Element('Node',name=f'Speech Mouth {name}',x=str(x),y=str(y),rotation=str(rotation),scaleX=str(sx),scaleY=str(sy));pose.insert(0,mouth)
    bind(mouth,1800,18)
    width=ET.SubElement(mouth,'Node',name='Speech Mouth width');bind(width,1803,16)
    # Rive draws earlier siblings above later siblings. Everything clips to the cavity.
    for label,color,w,h,ypos in [('Tongue','FFC47573',96,23,38),('Teeth','FFFFEEDD',148,21,15)]:
        s=ET.SubElement(width,'Shape',name=f'Speech Mouth {label}',y=str(ypos))
        if label=='Tongue':bind(s,1804,14)
        ET.SubElement(s,'Ellipse',width=str(w),height=str(h));ET.SubElement(ET.SubElement(s,'Fill'),'SolidColor',colorValue=color)
        ET.SubElement(s,'ClippingShape',sourceId=f'0:{4100+["Front","Left","Right"].index(name)}')
    cavity=ET.SubElement(width,'Shape',name='Speech Mouth cavity',id=f'0:{4100+["Front","Left","Right"].index(name)}')
    p=ET.SubElement(cavity,'PointsPath',isClosed='true')
    vertices=[(-98,0,1.5707963268,8,1.5707963268,8),(0,24,3.1415926536,55,0,55),(98,-2,1.5707963268,8,1.5707963268,8),(0,24,0,55,3.1415926536,55)]
    for i,(vx,vy,ir,di,orr,do) in enumerate(vertices):
        v=ET.SubElement(p,'CubicDetachedVertex',x=str(vx),y=str(vy),inRotation=str(ir),inDistance=str(di),outRotation=str(orr),outDistance=str(do))
        if i in (1,3):bind(v,1801 if i==1 else 1802,25)
    fill=ET.SubElement(cavity,'Fill');g=ET.SubElement(fill,'LinearGradient',startX='0',startY='12',endX='0',endY='70')
    ET.SubElement(g,'GradientStop',position='0',colorValue='FF4A1916');ET.SubElement(g,'GradientStop',position='1',colorValue='FF803832')
    ET.SubElement(ET.SubElement(cavity,'Stroke',thickness='3',cap='round'),'SolidColor',colorValue='FFAF5844')
ET.indent(root,space='    ');tree.write(path,encoding='unicode')
print('Built native speaking mouths for front/left/right poses; source PNGs unchanged.')

# Original-lip refinement supersedes vector mouths in all three poses.
if (ROOT/"scripts/generate-textured-mouth-rig.py").exists():
    import runpy
    runpy.run_path(str(ROOT/"scripts/generate-textured-mouth-rig.py"))
