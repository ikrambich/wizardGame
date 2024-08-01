import { makePlayer } from "./player.js";

//export var coinCount = 0;

export function coin(p) {
    return {
        coins: null,
        sprite: null,

        setup() {
            this.coins = new p.Group();
            this.coins.collider = 'kinematic';
            //coins.overlaps(Wizard.sprite);
            this.loadAnimations();
            this.coins.scale = 0.25;
            //this.coins.addAni(this.coinAnim);
            //this.coins.debug = true;
        },

        loadAnimations() {
            this.coinAnim = p.loadAnimation(
                'assets/coin/gold_coin_hexagon_1.png',
                'assets/coin/gold_coin_hexagon_2.png',
                'assets/coin/gold_coin_hexagon_3.png',
                'assets/coin/gold_coin_hexagon_4.png',
                'assets/coin/gold_coin_hexagon_5.png',
                'assets/coin/gold_coin_hexagon_6.png',
            );
            //this.coinAnim.frameDelay = 5;
        },

        createCoin(x, y) {
            this.sprite = new this.coins.Sprite(x, y, 50, 50);
            this.sprite.addAni(this.coinAnim);
        },

        randomInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
    };
}
