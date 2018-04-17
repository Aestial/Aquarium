import * as THREE from 'three';
import FBXLoader from 'three-fbx-loader';
import routes from './routes';

export default class Fish {
  constructor(container, position) {
    this.container = container;
    this.position = position;
    this.init();
    this.load();
  }
  init() {
    this.object = new THREE.Object3D();
    this.loader = new FBXLoader();
    this.clock = new THREE.Clock();
    this.velocity = new THREE.Vector3();
    this.desiredVelocity = new THREE.Vector3();
    this.steering = new THREE.Vector3();
    this.target = new THREE.Vector3();
  }
  load() {
    this.loader.load(routes.clown, this.config.bind(this));
  }
  config(mesh) {
    this.mass = 1.2;
    this.maxForce = 0.3;
    this.maxSpeed = 0.1;
    this.maxVelocity = 0.11;
    this.slowingRadius = 0.25;
    this.mesh = mesh;
    console.log(this.mesh);
    for (let i = 0; i < this.mesh.children.length - 1; i += 1) {
      this.mesh.children[i].material.side = THREE.DoubleSide;
    }
    this.mesh.scale.set(0.4,0.4,0.4);
    this.mesh.rotation.y = Math.PI;
    this.mesh.position.z = -1;
    this.mesh.mixer = new THREE.AnimationMixer(this.mesh);
    // console.log(this.mesh.animations);
    this.mesh.action = this.mesh.mixer.clipAction(this.mesh.animations[0]);
    this.mesh.action.play();
    // console.log(this.mesh.action);
    this.object.add(this.mesh);
    this.object.rotation.y = Math.PI/2;
    this.object.position.set(this.position.x, this.position.y, this.position.z);
    this.container.add(this.object);
  }
  animate() {
    this.mesh.mixer.update(this.clock.getDelta());
    this.move(this.clock.getDelta());
  }
  move(delta) {
    // console.log(delta);
    this.desiredVelocity.x = this.target.x - this.object.position.x;
    this.desiredVelocity.y = this.target.y - this.object.position.y;
    this.desiredVelocity.z = this.target.z - this.object.position.z;
    let distance = this.desiredVelocity.length();
    let ratio = distance / this.slowingRadius;
    this.desiredVelocity = this.desiredVelocity.normalize();
    if (ratio < 1) {
      this.desiredVelocity.multiplyScalar(this.maxVelocity);
      this.desiredVelocity.multiplyScalar(ratio);
    } else {
      this.desiredVelocity.multiplyScalar(this.maxVelocity);
    }
    // Flee
    // this.desiredVelocity.multiplyScalar(-1);
    this.steering = this.desiredVelocity.sub(this.velocity);
    this.steering = truncate(this.steering, this.maxForce);
    this.steering.divideScalar(this.mass);
    this.velocity.add(this.steering);
    this.velocity = truncate(this.velocity, this.maxSpeed);
    // this.object.position.addScaledVector(this.velocity, delta * 1000);
    this.object.position.add(this.velocity);
    this.object.lookAt(this.target);
  }
  setTarget(position, aspect, distance) {
    let ratio = 1 / aspect;
    this.target.set(position.x * ratio, position.y, position.z + distance);
  }
}

function truncate(vector, max) {
  let i = max / vector.length();
  i = i < 1 ? i : 1.0;
  return vector.multiplyScalar(i);
}
