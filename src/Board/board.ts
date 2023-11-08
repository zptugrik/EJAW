import { Config } from "../Config/config";
import { Creator } from "../Factory/abstract-crator";
import { SymbolCreator } from "../Factory/Symbol/symbol-creator";
import { Application, Container, Graphics, LINE_CAP, LINE_JOIN, Ticker } from 'pixi.js';

export class Board {
    private winCombination: Array<any> =[[1, 12, 3]];
    private symbolsArrayColor: Array<string> = [];
    private board: Container = new Container();
    private bgLine: Graphics = new Graphics();
    private line: Graphics = new Graphics();
    private mask: Graphics = new Graphics();
    private bgMask: Graphics = new Graphics();
    private lineTicker: Ticker = new Ticker();
    private fadeTticker: Ticker = new Ticker();
    
    public init(app: Application): void{
        this.refreshSymbolsColor();
        this.boardReposition();
        app.stage.addChild(this.board);
        
    }

    private calculatePoints(winCombination: Array<number>): void {
        let points: Array<object> = [];

        for(let i = 0; i < winCombination.length; i++){
            points.push({x: Config.SYMBOL_WIDTH / 2 + Config.SYMBOL_WIDTH * (winCombination[i] % Config.REELS_COUNT),
                            y: Config.SYMBOL_HEIGHT / 2 + Config.SYMBOL_HEIGHT * ( Math.floor(winCombination[i] / Config.REELS_COUNT))});
        }
        this.drawWinLine(this.winCombination[0].color, points);
    }

    private drawWinLine(color: string, points: Array<any>): void {  
        this.bgLine = new Graphics();
        this.bgLine.lineStyle(11, 0x000000);
        this.bgLine.line.cap = LINE_CAP.ROUND,
        this.bgLine.line.join = LINE_JOIN.ROUND;

        this.bgLine.moveTo(points[0].x, points[0].y);
        for(let i = 1; i < points.length; i++){
            this.bgLine.lineTo(points[i].x, points[i].y);
        }
        if(points[points.length-1].x < Config.SYMBOL_WIDTH * Config.REELS_COUNT - Config.SYMBOL_WIDTH / 2) {
            this.bgLine.lineTo(Config.SYMBOL_WIDTH * Config.REELS_COUNT - Config.SYMBOL_WIDTH / 2, 
            points[points.length-1].y);
        }
        this.board.addChild(this.bgLine);
        this.line = new Graphics(); 
        this.line.lineStyle(5, color);
        this.line.line.cap = LINE_CAP.ROUND,
        this.line.line.join = LINE_JOIN.ROUND;
        this.line.moveTo(points[0].x, points[0].y);
        for(let i = 1; i < points.length; i++){
            this.line.lineTo(points[i].x, points[i].y);
        }
        if(points[points.length-1].x < Config.SYMBOL_WIDTH * Config.REELS_COUNT - Config.SYMBOL_WIDTH / 2) {
            this.line.lineTo(Config.SYMBOL_WIDTH * Config.REELS_COUNT - Config.SYMBOL_WIDTH / 2, points[points.length-1].y);
        }
        this.board.addChild(this.line);
        // Create a graphics object to define our mask
        this.board.addChild(this.mask);
        this.mask.beginFill(0x000000, 0.001);
        this.mask.drawRect(0,0,1,300);
        this.mask.endFill();
        this.board.addChild(this.bgMask);
        this.bgMask.beginFill(0x000000, 0.001);
        this.bgMask.drawRect(0,0,5,300);
        this.bgMask.endFill();
        this.line.mask = this.mask;
        this.bgLine.mask = this.bgMask;
        this.lineAnimation();
    }

    private lineAnimation() {
        this.lineTicker = new Ticker();
        this.lineTicker.add(() => {
            this.mask.width += 10;
            this.bgMask.width += 10;
            if(this.mask.width > Config.SYMBOL_WIDTH * Config.REELS_COUNT){
                this.fadeAnimation();
                this.lineTicker.destroy();
            }
        });
        this.lineTicker.start();
    }

    private fadeAnimation(){
        this.fadeTticker = new Ticker();
        this.fadeTticker.add(() => {
            this.line.alpha -= 0.02;
            this.bgLine.alpha -= 0.02;
            for(let i = 0; i < this.winCombination[0].numbers.length ; i++){
                this.board.children[this.winCombination[0].numbers[i]].alpha -= 0.02;
            }
            if(this.board.children[this.winCombination[0].numbers[0]].alpha <= 0) {
                this.line.destroy();
                this.bgLine.destroy();
                this.mask.width = 1;
                this.bgMask.width = 5;
                this.winCombination.shift();
                if(this.winCombination.length > 0){
                    this.calculatePoints(this.winCombination[0].numbers);
                }
                this.fadeTticker.destroy();
            }
        });
        this.fadeTticker.start();
        
    }
    private refreshSymbols(): void {
        this.board.removeChildren();
        for(let i = 0; i < Config.SYMBOLS_TOTAL_COUNT; i++){
            this.createSymbol(new SymbolCreator(this.symbolsArrayColor[i]), i);
        }
        this.checkWinLine();
    }

    private checkWinLine(): void {
        this.winCombination = [];
        let tmpWinCombination: (number | "")[] = [];
        let color: string | null;
        let addOrnot: boolean = true;
        for (let row: number = 0; row < Config.ROWS_COUNT; row++){
            color = null;
            tmpWinCombination = [];
            color = this.symbolsArrayColor[row*Config.REELS_COUNT];
            tmpWinCombination.push(row * Config.REELS_COUNT);
            for (let reel: number = 1; reel < Config.REELS_COUNT; reel++){
                if( this.symbolsArrayColor[reel] != color
                    && this.symbolsArrayColor[reel + Config.REELS_COUNT] != color
                    && this.symbolsArrayColor[reel + 2 * Config.REELS_COUNT] != color) {
                        //break;
                }else{
                    for (let i = 0; i < Config.ROWS_COUNT; i++){
                        if(this.symbolsArrayColor[reel + i * Config.REELS_COUNT] == color){
                            tmpWinCombination.push(reel + i * Config.REELS_COUNT);
                           // break;
                        }
                    }
                }
            }
            if( tmpWinCombination.length > 2){
                addOrnot = true;
                for(let index = 0; index < this.winCombination.length; index++){
                    if (this.winCombination[index].color == color){
                        addOrnot = false;
                        break;
                    }
                }
                if(addOrnot){
                    this.winCombination.push({'color': color, 'numbers': tmpWinCombination});
                }
                
            }
        }
        // for(let j = 0; j < Config.COLORS.length; j++){
        //     tmpWinCombination = this.symbolsArrayColor
        //         .map((color, i: number) => {return color === Config.COLORS[j] ? i : '';})
        //        .filter(String);
        //     if( tmpWinCombination.length > 2){
        //         this.winCombination.push({'color': Config.COLORS[j], 'numbers': tmpWinCombination});
        //     }
            
           
        // }
        // console.log(this.winCombination)
        
        if(this.winCombination.length > 0){
           this.calculatePoints(this.winCombination[0].numbers);
        }
    }

    private createSymbol(creator: Creator, index: number): void {
        let symbol = creator.addElement();
        symbol.x = index % Config.REELS_COUNT * Config.SYMBOL_WIDTH;
        symbol.y = Math.floor(index / Config.REELS_COUNT) * Config.SYMBOL_HEIGHT;
        this.board.addChild(symbol);
    }

    public refreshSymbolsColor(): void {
        this.lineTicker.stop();
        this.fadeTticker.stop();
        
        this.mask.width = 1;
        this.bgMask.width = 5;
        const symbolColorCount: number = Config.COLORS.length - 1;
        this.symbolsArrayColor = [];
        for (let i = 0; i < Config.SYMBOLS_TOTAL_COUNT; i++){
            let a = this.randomIntFromInterval(0,symbolColorCount);
            this.symbolsArrayColor.push(Config.COLORS[a])
        }
        this.refreshSymbols();
    }

    private boardReposition(): void {
        this.board.x = (window.innerWidth - this.board.width) / 2;
        this.board.y = (window.innerHeight - this.board.height) / 2;
    }

    private randomIntFromInterval(min: number, max: number): number { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}