import { Ui } from './UI/ui';
import { Board } from './Board/board';
import { Application, Container, Graphics } from 'pixi.js';

const app = new Application<HTMLCanvasElement>({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x1099bb,
    antialias: true
});

const container = new Container();
document.body.appendChild(app.view);
const board = new Board();
board.init(app);
/// UI
const ui = new Ui();
ui.init(app);
const uiButton = app.stage.getChildByName("GenerateButton", true);
if (uiButton) {
    uiButton.addEventListener('mousedown', function (e) {
        board.refreshSymbolsColor()}
    );
}

// Autoresize for canvas
const ratio = window.innerWidth / window.innerHeight;

const resize = () => {
    
    let w = window.innerWidth;
    let h = window.innerHeight;
    if (window.innerWidth / window.innerHeight >= ratio) {
        w = window.innerHeight * ratio;
    } else {
        h = window.innerWidth / ratio;
    }
    app.view.style.width = w + 'px';
    app.view.style.height = h + 'px';
}
window.onresize = resize;

