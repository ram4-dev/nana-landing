"""Animate both original lip textures in all three poses."""
from pathlib import Path
import math
import xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[1];path=ROOT/'nani/scene.rml'
tree=ET.parse(path);root=tree.getroot();vm=root.find('ViewModel');instance=vm.find('ViewModelInstance')
for parent in root.iter():
 for child in list(parent):
  if child.attrib.get('name','').startswith('Textured Mouth') or child.attrib.get('id','') in [f'0:{i}' for i in range(1810,1816)] or child.attrib.get('viewModelPropertyId','') in [f'0:{i}' for i in range(1810,1816)] or child.tag=='ImageAsset' and child.attrib.get('id')=='0:63':parent.remove(child)
for name in ['Front','Left','Right']:
 pose=root.find(f'.//Node[@name="Pose {name}"]')
 for child in list(pose):
  if child.attrib.get('name')==f'Speech Mouth {name}':pose.remove(child)
def bind(node,ident,key):ET.SubElement(node,'DataBindContext',sourcePathIds=f'0:40-0:{ident}',propertyKey=str(key))
for ident,name,value in [(1810,'mouthSmall',1),(1811,'mouthWide',0),(1812,'mouthRound',0),(1813,'jawDrop',0),(1814,'lipDrop',0),(1815,'upperLipLift',0)]:
 ET.SubElement(vm,'ViewModelPropertyNumber',name=name,id=f'0:{ident}');ET.SubElement(instance,'ViewModelInstanceNumber',viewModelPropertyId=f'0:{ident}',propertyValue=str(value))
def vertex(path,x,y,ir=0,di=0,orr=0,do=0):
 return ET.SubElement(path,'CubicDetachedVertex',x=str(x),y=str(y),inRotation=str(ir),inDistance=str(di),outRotation=str(orr),outDistance=str(do))
# Side geometry is authored in mouth coordinates; original image sampling uses
# inverse scales so its skin/lip pixels retain the source pose's perspective.
for name,x,y,sx,sy,left_y,right_y,mid_x,asset,base in [
 ('Front',490,990,1,1,0,-2,0,'0:60',6000),
 ('Left',302,856,.735,.9,-4,1,-12,'0:61',7000),
 ('Right',721,874,.735,.9,5,-2,12,'0:62',8000),
]:
 pose=root.find(f'.//Node[@name="Pose {name}"]')
 container=ET.Element('Node',name=f'Textured Mouth {name}',x=str(x),y=str(y));bind(container,1800,18);pose.insert(0,container)
 geometry=ET.SubElement(container,'Node',name=f'Textured Mouth {name} perspective',scaleX=str(sx),scaleY=str(sy))
 # Earlier siblings render above later ones. Lift original upper-lip pixels
 # with a feathered join into the stationary nose/cheek, not a painted overlay.
 upper=ET.SubElement(geometry,'Node',name=f'Textured Mouth {name} Upper Lip');bind(upper,1815,14)
 for i,(top,alpha) in enumerate([(-12,1),(-18,.65),(-24,.4),(-30,.22),(-36,.11),(-42,.05)]):
  layer=ET.SubElement(upper,'Node',name='Textured Mouth original upper lip blend',opacity=str(alpha))
  mask=ET.SubElement(layer,'Shape',name='Textured Mouth original upper lip mask',id=f'0:{base+300+i}')
  p=ET.SubElement(mask,'PointsPath',isClosed='true')
  vertex(p,-98,top)
  vertex(p,98,top)
  vertex(p,98,right_y,math.pi/2,6,math.pi/2,6)
  vertex(p,mid_x,24,0,56,math.pi,56)
  vertex(p,-98,left_y,math.pi/2,6,math.pi/2,6)
  image=ET.SubElement(layer,'Image',name='Textured Mouth original upper lip',assetId=asset,originX='0',originY='0',x=str(-x/sx),y=str(-y/sy),scaleX=str(1/sx),scaleY=str(1/sy))
  ET.SubElement(image,'ClippingShape',sourceId=f'0:{base+300+i}')
  edge=ET.SubElement(layer,'Shape',name='Textured Mouth upper lip soft edge',id=f'0:{base+400+i}',x=str(mid_x),y=str(8-i*2))
  ET.SubElement(edge,'Ellipse',width=str(178+i*6),height=str(40+i*7))
  ET.SubElement(image,'ClippingShape',sourceId=f'0:{base+400+i}')
 teeth=ET.SubElement(geometry,'Shape',name='Textured Mouth simple teeth')
 bind(teeth,1815,14)
 p=ET.SubElement(teeth,'PointsPath',isClosed='true')
 vertex(p,-63,15,0,0,.32,22)
 vertex(p,0,25,math.pi,34,0,34)
 vertex(p,63,14,math.pi,22,math.pi/2,3)
 vertex(p,0,31,0,34,math.pi,34)
 ET.SubElement(ET.SubElement(teeth,'Fill'),'SolidColor',colorValue='FFECD8C3');ET.SubElement(teeth,'ClippingShape',sourceId=f'0:{base}')
 cavity=ET.SubElement(geometry,'Shape',name='Textured Mouth cavity',id=f'0:{base}')
 p=ET.SubElement(cavity,'PointsPath',isClosed='true')
 vertex(p,-98,left_y,math.pi/2,6,math.pi/2,6)
 v=vertex(p,mid_x,24,math.pi,56,0,56);bind(v,1801,25)
 vertex(p,98,right_y,math.pi/2,6,math.pi/2,6)
 v=vertex(p,mid_x,24,0,56,math.pi,56);bind(v,1802,25)
 g=ET.SubElement(ET.SubElement(cavity,'Fill'),'LinearGradient',startX='0',startY='24',endX='0',endY='70')
 ET.SubElement(g,'GradientStop',position='0',colorValue='FF32110D');ET.SubElement(g,'GradientStop',position='1',colorValue='FF693025')
 # Sample 6px below the smile line: keep the pink lower lip, exclude the old dark closed-mouth seam.
 # Move down with the cavity; progressively fade the join into the unchanged chin.
 lower=ET.SubElement(geometry,'Node',name='Textured Mouth Jaw' if name=='Front' else f'Textured Mouth {name} Jaw');bind(lower,1813,14)
 for i,(bottom,alpha) in enumerate([(48,1),(54,.65),(60,.4),(66,.22),(72,.11),(78,.05)]):
  layer=ET.SubElement(lower,'Node',name='Textured Mouth original lower lip blend',opacity=str(alpha))
  mask=ET.SubElement(layer,'Shape',name='Textured Mouth original lower lip mask',id=f'0:{base+100+i}')
  p=ET.SubElement(mask,'PointsPath',isClosed='true')
  vertex(p,-98,left_y+4,math.pi/2,6,math.pi/2,6)
  vertex(p,mid_x,24,math.pi,56,0,56)
  vertex(p,98,right_y+4,math.pi/2,6,math.pi/2,6)
  vertex(p,98,bottom)
  vertex(p,-98,bottom)
  image=ET.SubElement(layer,'Image',name='Textured Mouth original lower lip',assetId=asset,originX='0',originY='0',x=str(-x/sx),y=str(-(y+6)/sy),scaleX=str(1/sx),scaleY=str(1/sy))
  ET.SubElement(image,'ClippingShape',sourceId=f'0:{base+100+i}')
  edge=ET.SubElement(layer,'Shape',name='Textured Mouth lower lip soft edge',id=f'0:{base+200+i}',x=str(mid_x),y=str(39+i*2))
  ET.SubElement(edge,'Ellipse',width=str(158+i*8),height=str(32+i*7))
  ET.SubElement(image,'ClippingShape',sourceId=f'0:{base+200+i}')
ET.indent(root,space='    ');tree.write(path,encoding='unicode')
print('Built original-smile mouths with moving upper and lower lips for front/left/right poses.')
