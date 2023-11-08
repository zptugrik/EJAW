"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const symbol_creator_1 = require("./symbol-creator");
const pixi_js_1 = require("pixi.js");
class Board {
    init(app) {
        const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'magenta'];
        const elementColorCount = colors.length - 1;
        const elementsCount = 15;
        const board = new pixi_js_1.Container();
        let elementsArray = [];
        for (let i = 0; i < elementsCount; i++) {
            let a = this.randomIntFromInterval(0, elementColorCount);
            console.log(a);
            elementsArray.push(colors[a]);
        }
        console.log(elementsArray);
        function clientCode(creator) {
            // ...
            console.log('Client: I\'m not aware of the creator\'s class, but it still works.');
            let symbol = creator.addElement();
            board.addChild(symbol);
            console.log(board);
            app.stage.addChild(board);
            // ...
        }
        clientCode(new symbol_creator_1.SymbolCreator('green'));
    }
    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
exports.Board = Board;
//# sourceMappingURL=board.js.map