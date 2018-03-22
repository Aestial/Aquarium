import * as PIXI from 'pixi.js';

export default class PixiController {
  constructor(element) {
    // The application will create a renderer using WebGL, if possible,
    // with a fallback to a canvas render. It will also setup the ticker
    // and the root stage PIXI.Container
    this.app = new PIXI.Application();
    // The application will create a canvas element for you that you
    // can then insert into the DOM
    document.body.appendChild(this.app.view);
    // Get texture
    this.texture = new PIXI.Texture.fromCanvas(element);
    // Get sprite
    this.sprite = new PIXI.Sprite(this.texture);
    // Filter
    this.filter = new PIXI.filters.BlurFilter(0.7, 1, 5, 5);
    this.sprite.filters = [this.filter];
    // Add sprite to scene
    this.app.stage.addChild(this.sprite);
    this.animate();
  }
  animate() {
    this.app.ticker.add(() => {
      this.texture.update();
    });
  }
}
