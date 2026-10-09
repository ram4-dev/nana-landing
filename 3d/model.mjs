import * as THREE from './vendor/three.module.js';
export { THREE };
const mat = (color, roughness=.7) => new THREE.MeshStandardMaterial({color, roughness});
const skin=mat('#f2bc98'), hair=mat('#69412c'), darkHair=mat('#4b3025'), blue=mat('#3676b2'), white=mat('#f7f5f0'), dark=mat('#202836'), iris=mat('#774724'), black=mat('#15151b'), blush=mat('#e99687');
function ellipsoid(parent,name,material,p,s){const mesh=new THREE.Mesh(new THREE.SphereGeometry(1,40,28),material);mesh.name=name;mesh.position.set(...p);mesh.scale.set(...s);parent.add(mesh);return mesh;}
function tube(parent,name,material,points,radius){const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)));const mesh=new THREE.Mesh(new THREE.TubeGeometry(curve,40,radius,10,false),material);mesh.name=name;parent.add(mesh);return mesh;}
function lidGeometry(open, lower=false){const positions=[], indices=[], rows=12, cols=32;const boundary=Math.asin(Math.max(.01,open)*.90);for(let i=0;i<=rows;i++){const latitude=boundary+(Math.PI/2-boundary)*i/rows;for(let j=0;j<=cols;j++){const angle=-Math.PI+2*Math.PI*j/cols;positions.push(.308*Math.cos(latitude)*Math.cos(angle),.308*Math.sin(latitude)*(lower?-1:1),.308*Math.cos(latitude)*Math.sin(angle));}}for(let i=0;i<rows;i++)for(let j=0;j<cols;j++){const a=i*(cols+1)+j,b=a+cols+1;indices.push(a,b,a+1,b,b+1,a+1);}const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setIndex(indices);geometry.computeVertexNormals();return geometry;}
export function createNani(){
 const root=new THREE.Group();root.name='Nani';
 const torso=new THREE.Group();torso.name='Torso';root.add(torso);
 ellipsoid(torso,'Blazer',blue,[0,-1.28,0],[1.08,.83,.47]);
 ellipsoid(torso,'Shirt',white,[0,-1.05,.405],[.39,.62,.09]);
 ellipsoid(torso,'Tie',dark,[0,-1.3,.50],[.105,.43,.045]);
 for(const sign of [-1,1]){const lapel=ellipsoid(torso,'Lapel',blue,[sign*.39,-1.15,.43],[.22,.56,.08]);lapel.rotation.z=sign*-.25;}
 const neck=new THREE.Group();neck.name='Neck';neck.position.y=-.85;root.add(neck);
 ellipsoid(neck,'NeckSkin',skin,[0,.26,0],[.30,.48,.29]);
 const head=new THREE.Group();head.name='Head';head.position.y=.93;neck.add(head);
 ellipsoid(head,'HairBack',darkHair,[0,.32,-.19],[.95,1.07,.73]);
 ellipsoid(head,'Face',skin,[0,0,0],[.81,1,.64]);
 for(const sign of [-1,1]){ellipsoid(head,'Ear',skin,[sign*.80,-.07,-.03],[.16,.24,.12]);ellipsoid(head,'Cheek',blush,[sign*.53,-.34,.49],[.18,.105,.035]);}
 ellipsoid(head,'Nose',skin,[0,-.13,.66],[.13,.19,.16]);
 tube(head,'Smile',mat('#914e44'),[[-.25,-.48,.565],[-.12,-.54,.60],[0,-.56,.61],[.12,-.54,.60],[.25,-.48,.565]],.018);
 ellipsoid(head,'HairCrown',hair,[0,.88,-.09],[.91,.43,.68]);
 const sweep=ellipsoid(head,'SweptFringe',hair,[-.30,.63,.40],[.63,.34,.31]);sweep.rotation.z=.35;
 ellipsoid(head,'SideFringe',hair,[.65,.50,.20],[.25,.56,.32]);
 ellipsoid(head,'Bun',hair,[.10,1.36,-.25],[.47,.43,.42]);
 for(let i=0;i<5;i++)tube(head,'HairStrand',darkHair,[[-.80+i*.12,.73,.36],[-.36+i*.12,1.09,.41],[.22+i*.09,1.03,.30]],.012);
 const eyes=[];
 for(const sign of [-1,1]){
  const socket=new THREE.Group();socket.name=sign<0?'EyeLeft':'EyeRight';socket.position.set(sign*.36,.05,.59);head.add(socket);
  ellipsoid(socket,'Eyeball',white,[0,0,0],[.30,.30,.30]);
  const gaze=new THREE.Group();gaze.name='Gaze';socket.add(gaze);
  ellipsoid(gaze,'Iris',iris,[0,0,.287],[.145,.145,.035]);
  ellipsoid(gaze,'Pupil',black,[0,0,.320],[.075,.085,.012]);
  ellipsoid(gaze,'EyeHighlight',white,[-.043,.050,.334],[.032,.032,.008]);
  const lidMat=skin.clone();lidMat.side=THREE.DoubleSide;
  const lids=[false,true].map(lower=>{const mesh=new THREE.Mesh(lidGeometry(1,lower),lidMat);mesh.name=lower?'LowerLid':'UpperLid';socket.add(mesh);return mesh;});
  const rim=new THREE.Mesh(new THREE.TorusGeometry(.35,.035,12,64),dark);rim.name='Glasses';rim.position.set(sign*.36,.05,.935);head.add(rim);
  tube(head,'Brow',hair,[[sign*.36-.24,.43,.62],[sign*.36,.48,.69],[sign*.36+.22,.44,.63]],.035);
  tube(head,'GlassesArm',dark,[[sign*.68,.05,.90],[sign*.84,.08,.40],[sign*.79,.02,-.04]],.022);
  eyes.push({socket,gaze,lids});
 }
 tube(head,'GlassesBridge',dark,[[-.05,.10,.94],[0,.14,.97],[.05,.10,.94]],.025);
 let previousOpen=1;
 function update({x=0,y=0,time=0,blink=0,dt=1/60,reducedMotion=false}={}){
  const damping=1-Math.exp(-Math.min(dt,.1)*7);
  neck.rotation.y+=(x*.25-neck.rotation.y)*damping;
  head.rotation.y+=(x*.42-head.rotation.y)*damping;
  head.rotation.x+=(-y*.22-head.rotation.x)*damping;
  head.rotation.z=reducedMotion?0:Math.sin(time*.6)*.018;
  torso.scale.y=reducedMotion?1:1+Math.sin(time*1.4)*.006;
  root.updateMatrixWorld(true);
  // Aim at a shared world-space target, compensating for parent head rotation.
  const target=new THREE.Vector3(x*4,y*2.6+.05,6);
  for(const eye of eyes){const local=eye.socket.worldToLocal(target.clone());const yaw=THREE.MathUtils.clamp(Math.atan2(local.x,local.z),-.48,.48);const pitch=THREE.MathUtils.clamp(-Math.atan2(local.y,Math.hypot(local.x,local.z)),-.35,.35);eye.gaze.rotation.set(pitch,yaw,0);}
  const open=Math.max(.01,1-blink);
  if(Math.abs(open-previousOpen)>.002){for(const eye of eyes)eye.lids.forEach((lid,i)=>{lid.geometry.dispose();lid.geometry=lidGeometry(open,i===1);});previousOpen=open;}
 }
 return {root,head,neck,eyes,update};
}
