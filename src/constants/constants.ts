import * as PIXI from "pixi.js";

export interface Position {
    x: number;
    y: number;
};

export interface Size {
    width: number;
    height: number;
}

export interface ChestModel {
    position: Position;
    size: Size;
    index: number;
    activated: boolean;
};

export enum BUTTON_STATE {
    ENABLE,
    DISABLE,
    HOVER
}

const BUTTON_PLAY_STYLE_ENABLE = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontWeight: 'bold',
    fill: [ '#00ff99', '#ffbbff' ],
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
});

const BUTTON_PLAY_STYLE_DISABLE = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontWeight: 'bold',
    fill: [ '#ffffff', '#555555' ],
    stroke: '#000000',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
});

const BUTTON_PLAY_STYLE_HOVER = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontWeight: 'bold',
    fill: [ '#00feff', '#ff00d7' ],
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
});

const CONSTANTS = {
    NUM_CHESTS: 6,
    CHEST_HEIGHT: 150,

    LOCALS: {
        en: {
            PLAY: 'Play!',
            CHEST: 'Chest',
            WIN_AMOUNT: 'Win Amount',
            WIN_BONUS: 'You Win bonus animation',
            BONUS_WIN: 'Bonus Win',
            BONUS_TITLE: 'Bonus Screen'
        }
    },

    DEFAULT_LANGAUGE: 'en',

    BUTTON_PLAY_STYLE_ENABLE: BUTTON_PLAY_STYLE_ENABLE,
    BUTTON_PLAY_STYLE_DISABLE: BUTTON_PLAY_STYLE_DISABLE,
    BUTTON_PLAY_STYLE_HOVER: BUTTON_PLAY_STYLE_HOVER
};

export default CONSTANTS;
