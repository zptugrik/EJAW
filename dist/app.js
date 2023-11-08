"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const board_1 = require("./Board/board");
const pixi_js_1 = require("pixi.js");
const TRANSITION_STEP = 0.03;
const app = new pixi_js_1.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x1099bb,
    //resolution: window.devicePixelRatio || 1,
    antialias: true
});
const container = new pixi_js_1.Container();
//app.stage.interactive = true;
document.body.appendChild(app.view);
const board = new board_1.Board();
board.init(app);
// const setup = (): void => {console.log('======');
//     let obj = new Graphics();
//     obj.beginFill(0xff0000);
//     obj.drawRect(250, 200, 200, 100);
//     // Add it to the stage to render
//     app.stage.addChild(obj);
//     app.ticker.add(delta => {
//     });
// }
// window.onload = setup;
// Autoresize for canvas
const ratio = window.innerWidth / window.innerHeight;
const resize = () => {
    let w = window.innerWidth;
    let h = window.innerHeight;
    if (window.innerWidth / window.innerHeight >= ratio) {
        w = window.innerHeight * ratio;
    }
    else {
        h = window.innerWidth / ratio;
    }
    app.view.style.width = w + 'px';
    app.view.style.height = h + 'px';
};
window.onresize = resize;
//# sourceMappingURL=app.js.map