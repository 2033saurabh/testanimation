import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
// const { AmbientLight } = require("three");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0.5,0.5,0.5)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 40;


const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// use light AmbientLight
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

// use point light
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
// pointLight.position.set(9, 0, 1);
scene.add(pointLight);

// const geometry = new THREE.CapsuleGeometry( 1, 1, 9, 2 ); 
// const geometry = new THREE.CircleGeometry( 1, 62 ); 
// const geometry = new THREE.IcosahedronGeometry(1, 2, 8, 5)
// const geometry = new THREE.TorusGeometry( 10, 3, 16, 100, 3.24617228626928 );
const geometry = new THREE.BoxGeometry(12, 12, 12);
// const material = new THREE.MeshBasicMaterial({ color: 'red' });
// mesh standard material use to see the light
const material = new THREE.MeshStandardMaterial({ color: 'red' });
const cube = new THREE.Mesh(geometry, material);
// const cube = new THREE.Line( geometry, material)
scene.add(cube);

// create circle to detect light

const lightGeometry = new THREE.TorusGeometry( 5.847, 1.7027, 9, 86  );
const lightMaterial = new THREE.MeshBasicMaterial({ color: 'yellow' });
const lightSphere = new THREE.Mesh(lightGeometry, lightMaterial);
// lightSphere.position.set(9, 0, 1);
scene.add(lightSphere);



// cube.position.x = 3;
// cube.position.y = 2;

// cube.rotation.x = 90
// convert on degree use formula
// cube.rotation.x = Math.PL*(45/100.0)
// let flag = true;

// animate()
// function animate() {
//     if(cube.position.x > 5)
//     flag=false;
//     else if (cube.position.x<-5)
//     flag=true;
//     if(flag)
//     cube.position.x += 0.1;
//     else cube.position.x -=0.1;

//     cube.rotati on.x+=0.1;
//     cube.rotation.y+=0.1;
//     cube.rotation.z+=0.1;
//     renderer.render(scene, camera);
//     // this function is safe to run not lode in system 
//     requestAnimationFrame(animate);

// }

// setInterval(animate, 10)
// it is use for animated speed but this setInterval is consume memory or graphic card

const controls = new OrbitControls(camera, renderer.domElement);

let q = 0;
animate();
function animate() {
 controls.update();
    q += 0.01;
    let qSin = Math.sin(q);
    let qCos = Math.cos(q);

    // change the position on x
    cube.position.x = 30 * qSin;
    let scaledCos = 30 * qCos;
    let scaledSin = 30 * qSin;

    // formula
    pointLight.position.set(scaledCos, 0, scaledSin);
    lightSphere.position.set(scaledCos, 0, scaledSin);

    // cube.position.x=3*Math.sin(q+=0.01);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}