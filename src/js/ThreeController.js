import * as THREE from 'three';
import FBXLoader from 'three-fbx-loader';

export default class ThreeController {
  constructor(container) {
    this.container = container;
    this.init();
    this.load();
    this.config();
    this.attach();
  }
  init() {
    this.loader = new FBXLoader();
    this.clock = new THREE.Clock();
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    this.scene = new THREE.Scene();
    this.ambient = new THREE.AmbientLight(0xD5A3C4);
    this.topLight = new THREE.DirectionalLight(0xD1F1FD, 2);
    this.frontLight = new THREE.DirectionalLight(0x328FFC, 1.5);
    this.geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    this.material = new THREE.MeshNormalMaterial();
    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
  }
  load() {
    this.loader.load('../src/meshes/clown/clown.fbx', this.loadCallback.bind(this));
  }
  loadCallback(object) {
    this.fish = object;
    this.fish.scale.set(0.4,0.4,0.4);
    // this.fish.scale.set(0.1,0.1,0.1);
    this.fish.rotation.y = -2*Math.PI/3;
    this.fish.mixer = new THREE.AnimationMixer(this.fish);
    console.log(this.fish.mixer);
    console.log(this.fish.animations);
    this.fish.action = this.fish.mixer.clipAction(this.fish.animations[0]);
    console.log(this.fish.action);
    this.fish.action.play();
    this.scene.add(this.fish);
    this.animate();
  }
  config() {
    this.mesh.position.y = 2;
    this.camera.position.z = 5;
    this.topLight.position.y = 100;
    this.frontLight.position.z = 100;
    this.renderer.setClearColor(0x1AA1BF);
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.domElement.className = 'three_container';
  }
  attach() {
    // this.scene.add( this.mesh );
    this.scene.add(this.ambient);
    this.scene.add( this.topLight );
    this.scene.add( this.frontLight );
    this.container.appendChild( this.renderer.domElement );
    window.three = this.renderer.domElement;
  }
  animate() {
    requestAnimationFrame( this.animate.bind(this) );
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;
    this.fish.mixer.update(this.clock.getDelta());
    this.renderer.render( this.scene, this.camera );
  }
}
