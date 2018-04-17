import * as THREE from 'three';
import FBXLoader from 'three-fbx-loader';
import routes from './routes';
import Fish from './Fish';

export default class ThreeController {
  constructor(container) {
    this.container = container;
    this.init();
    this.config();
    this.attach();
  }
  init() {
    this.mouse = new THREE.Vector2();
    this.mouse3D = new THREE.Vector3();
    this.camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.01, 10);
    this.scene = new THREE.Scene();
    this.ambient = new THREE.AmbientLight(0xD5A3C4);
    this.topLight = new THREE.DirectionalLight(0xD1F1FD, 2);
    this.frontLight = new THREE.DirectionalLight(0x328FFC, 1.5);
    this.fish = new Fish(this.scene, new THREE.Vector3());
    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    setTimeout(() => {
      this.animate();
    }, 4000);
  }
  config() {
    this.camera.position.z = 5;
    this.topLight.position.y = 100;
    this.frontLight.position.z = 100;
    this.renderer.setClearColor(0x1AA1BF);
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.domElement.className = 'three_canvas';
    document.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false );
    window.addEventListener('resize', this.onWindowResize.bind(this), false );
    this.windowHalfX = window.innerWidth / 2;
		this.windowHalfY = window.innerHeight / 2;
  }
  attach() {
    this.scene.add(this.ambient);
    this.scene.add( this.topLight );
    this.scene.add( this.frontLight );
    this.container.appendChild( this.renderer.domElement );
    window.three = this.renderer.domElement;
  }
  animate() {
    requestAnimationFrame( this.animate.bind(this) );
    this.renderer.render( this.scene, this.camera );
    this.fish.animate();
  }
  onDocumentMouseMove(event) {
    this.mouse.x = event.clientX - this.windowHalfX;
		this.mouse.y = event.clientY - this.windowHalfY;
    // console.log('THREE. Mouse position: ', this.mouse.x, this.mouse.y);
    this.mouse3D.set(this.mouse.x, -this.mouse.y, -0.4);
    this.mouse3D.unproject(this.camera);
    this.fish.setTarget(this.mouse3D, this.camera.aspect, -6.5);
	}
  onWindowResize() {
    console.log('THREE. Resize to: ', window.innerWidth, window.innerHeight);
		this.windowHalfX = window.innerWidth / 2;
		this.windowHalfY = window.innerHeight / 2;
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}
}
