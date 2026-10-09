import {THREE,createNani} from './model.mjs';
const error=document.querySelector('#error');
try {
 const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false});
 renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setClearColor('#f4f0ea');renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;document.body.prepend(renderer.domElement);
 const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(34,1,.1,100);camera.position.set(0,.10,7.4);camera.lookAt(0,.10,0);
 scene.add(new THREE.HemisphereLight('#fff6ed','#728ba4',2.0));
 const key=new THREE.DirectionalLight('#fff1df',3.0);key.position.set(-3,5,5);scene.add(key);
 const fill=new THREE.DirectionalLight('#d9eaff',1.6);fill.position.set(3,2,-3);scene.add(fill);
 const nani=createNani();scene.add(nani.root);
 let target={x:0,y:0},lastInput=performance.now()/1000,mode='follow',nextBlink=3,blinkStart=-10,last=performance.now()/1000;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 function resize(){const w=innerWidth,h=innerHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.position.z=camera.aspect<.65?9:7.4;camera.updateProjectionMatrix();}resize();addEventListener('resize',resize);
 addEventListener('pointermove',event=>{target.x=THREE.MathUtils.clamp(event.clientX/innerWidth*2-1,-1,1);target.y=THREE.MathUtils.clamp(1-event.clientY/innerHeight*2,-1,1);lastInput=performance.now()/1000;});
 document.documentElement.addEventListener('pointerleave',()=>{target={x:0,y:0};lastInput=performance.now()/1000;});
 function select(next){mode=next;document.querySelector('#follow').setAttribute('aria-pressed',String(next==='follow'));document.querySelector('#turn').setAttribute('aria-pressed',String(next==='turn'));}
 document.querySelector('#follow').onclick=()=>select('follow');document.querySelector('#turn').onclick=()=>select('turn');
 document.querySelector('#compare').onclick=event=>{const active=document.body.dataset.mode!=='reference';document.body.dataset.mode=active?'reference':'';event.currentTarget.setAttribute('aria-pressed',String(active));};
 renderer.setAnimationLoop(ms=>{const time=ms/1000,dt=Math.min(time-last,.1);last=time;
  if(time>nextBlink&&document.visibilityState==='visible'&&!reduced.matches){blinkStart=time;nextBlink=time+2.8+Math.random()*3;}
  const age=time-blinkStart;const blink=age>=0&&age<.24?Math.sin(Math.PI*age/.24):0;
  let x=target.x,y=target.y;
  if(time-lastInput>7&&!reduced.matches){x=Math.sin(time*.42)*.48;y=Math.sin(time*.67)*.12;}
  nani.root.rotation.y=mode==='turn'&&!reduced.matches?Math.sin(time*.45)*1.4:0;
  nani.update({x,y,time,dt,blink,reducedMotion:reduced.matches});renderer.render(scene,camera);
 });
 renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();error.hidden=false;error.textContent='Se perdió la conexión gráfica. Recargá la página.';});
 window.nani3d={nani,scene,camera,renderer};
} catch(cause){error.hidden=false;error.textContent='No se pudo iniciar WebGL 2. Probá un navegador con aceleración gráfica habilitada.';console.error(cause);}
