import * as PIXI from "pixi.js";

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
    fill: [ '#ffbbff', '#00ff99' ],
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
    REEL_WIDTH: 160,
    SYMBOL_SIZE: 150,

    LOCALS: {
        en: {
            PLAY: 'Play!',
            CHEST: 'Chest',
            WIN_AMOUNT: 'Win Amount',
            WIN_BONUS: 'You Win bonus animation'
        }
    },

    DEFAULT_LANGAUGE: 'en',

    BUTTON_PLAY_STYLE_ENABLE: BUTTON_PLAY_STYLE_ENABLE,
    BUTTON_PLAY_STYLE_DISABLE: BUTTON_PLAY_STYLE_DISABLE,
    BUTTON_PLAY_STYLE_HOVER: BUTTON_PLAY_STYLE_HOVER
};

export default CONSTANTS;
