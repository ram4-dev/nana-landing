"""Use the accepted frontal eye rig on the thumbs-up pose, without editing PNGs."""
from pathlib import Path
import copy
import xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[1]
path=ROOT/'nani/scene.rml'
tree=ET.parse(path);root=tree.getroot()
art=root.find('Artboard');breath=art.find('.//Node[@id="0:20"]')
vm=root.find('ViewModel');instance=vm.find('ViewModelInstance')
for parent in root.iter():
    for child in list(parent):
        if child.attrib.get('name')=='Pose Thumbs Up' or child.tag=='ImageAsset' and child.attrib.get('id')=='0:64' or child.attrib.get('id')=='0:1710' or child.attrib.get('viewModelPropertyId')=='0:1710':parent.remove(child)
ET.SubElement(vm,'ViewModelPropertyNumber',name='poseThumb',id='0:1710')
ET.SubElement(instance,'ViewModelInstanceNumber',viewModelPropertyId='0:1710',propertyValue='0')
ET.SubElement(root,'ImageAsset',file='gaze/nani-thumbs-up.png',name='pose-thumbs-up',id='0:64')
pose=ET.Element('Node',name='Pose Thumbs Up',id='0:9000')
ET.SubElement(pose,'DataBindContext',sourcePathIds='0:40-0:1710',propertyKey='18')
artwork=art.find('.//Node[@id="0:21"]')
ident=9000
for original in [artwork.find('Node[@id="0:100"]'),artwork.find('Node[@id="0:200"]')]:
    eye=copy.deepcopy(original);remap={}
    for element in eye.iter():
        if 'id' in element.attrib:
            ident+=1;remap[element.attrib['id']]=f'0:{ident}';element.set('id',f'0:{ident}')
        if 'name' in element.attrib:element.set('name','Thumb '+element.attrib['name'])
        if element.tag=='Image':
            element.set('assetId','0:64')
            # The new PNG is one pixel shorter. Keep its original sampling center.
            element.set('y',str(float(element.attrib.get('y','0'))-0.5))
    for element in eye.iter():
        for key in ['sourceId','parentId']:
            if element.attrib.get(key) in remap:element.set(key,remap[element.attrib[key]])
    pose.append(eye)
# Front eye placement is relative to the center (499,788), as is Breath.
ET.SubElement(pose,'Image',assetId='0:64',originX='0',originY='0',x='-499',y='-788',name='Thumb original artwork')
breath.insert(0,pose)
ET.indent(root,space='    ');tree.write(path,encoding='unicode')
print('Built thumbs-up pose with the exact frontal pupils, skin backing, sclera and blink bindings.')
