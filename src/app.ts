import { Application } from "pixi.js";


class App {
    private app: Application;

    constructor(opts = {}) {
        this.app = new Application(opts);
        document.body.appendChild(this.app.view);
    }
}

new App({
    width: window.innerWidth,
    height: window.innerHeight
});