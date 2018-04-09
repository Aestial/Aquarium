import ThreeController from './ThreeController';
import PixiController from './PixiController';
require('../css/style.css');

const three = new ThreeController(document.body);
const pixi = new PixiController(document.body, window.three);
