import * as PIXI from 'pixi.js';

export default class PixiController {
  constructor(container, canvas) {
    this.container = container;
    this.canvas = canvas;
    // The application will create a renderer using WebGL, if possible,
    // with a fallback to a canvas render. It will also setup the ticker
    // and the root stage PIXI.Container
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    // Get texture
    this.texture = new PIXI.Texture.fromCanvas(this.canvas);
    // Get sprite
    this.sprite = new PIXI.Sprite(this.texture);
    // Filter
    this.filter = new PIXI.filters.BlurFilter(0.75, 1, 1, 5);
    this.attach();
    this.config();
    this.animate();
  }
  attach() {
    // Add sprite to scene
    this.app.stage.addChild(this.sprite);
    // The application will create a canvas element for you that you
    // can then insert into the DOM
    this.container.appendChild(this.app.view);
  }
  config() {
    this.sprite.filters = [this.filter];
    this.app.view.className = 'pixi_canvas';
    window.addEventListener('resize', this.onWindowResize.bind(this), false );
  }
  animate() {
    this.app.ticker.add(() => {
      this.texture.update();
    });
  }
  onWindowResize() {
    console.log('PIXI. Resize to: ', window.innerWidth, window.innerHeight);
		this.app.renderer.resize(window.innerWidth, window.innerHeight);
	}
}
