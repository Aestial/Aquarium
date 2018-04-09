import * as PIXI from 'pixi.js';

export default class PixiController {
  constructor(container, canvas, width, height) {
    this.width = width;
    this.height = height;
    this.container = container;
    this.canvas = canvas;
    // The application will create a renderer using WebGL, if possible,
    // with a fallback to a canvas render. It will also setup the ticker
    // and the root stage PIXI.Container
    this.app = new PIXI.Application({
      width: this.width,
      height: this.height,
    });
    // Get texture
    this.texture = new PIXI.Texture.fromCanvas(this.canvas);
    // Get sprite
    this.sprite = new PIXI.Sprite(this.texture);
    // Filter
    this.filter = new PIXI.filters.BlurFilter(0.75, 1, 5, 5);
    this.attach();
    this.config();
    this.animate();
  }
  attach() {
    // Add sprite to scene
    this.app.stage.addChild(this.sprite);
    // The application will create a canvas element for you that you
    // can then insert into the DOM
    // document.body.appendChild(this.app.view);
    this.container.appendChild(this.app.view);
  }
  config() {
    this.sprite.filters = [this.filter];
  }
  animate() {
    this.app.ticker.add(() => {
      this.texture.update();
    });
  }
}
