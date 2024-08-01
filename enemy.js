

import { makeSpell } from "./attacks.js";

export function enemy(p) {
    return {
        sprite: null,
        enemies: null,
        animations: {},
        health: 1,
        speed: 3,
        isDead: false,


        setup() {
            this.enemies = new p.Group();
            this.enemies.collider = 'none';
            this.enemies.scale = 2;
            this.enemies.debug = false;
            console.log(p.minute());
        },

        preload() {
            this.loadAnimations();
        },

        loadAnimations() {
            this.animations.idle = p.loadAnimation('assets/golemIdle.png',
                { frameSize: [16, 16], frames: 4 });
            this.animations.idle.frameDelay = 17;

            this.animations.run = p.loadAnimation('assets/golemIdle.png',
                { frameSize: [16, 16], frames: 4 });
            this.animations.run.frameDelay = 5;
        },

        spawn(x, y) {

            this.sprite = new this.enemies.Sprite(x, y, 12, 16);
            //this.sprite.mode = 'UNAWARE';
            // console.log(this.sprite.mode);
            this.sprite.addAni(this.animations.idle);
        },

        behavior(wizard) {
            for (let i = 0; i < this.enemies.length; i++) {
                if (p.millis() % 2 == 0) {
                    this.enemies[i].moveTo(wizard.posx, wizard.posy, 2);
                }
                //console.log('enemies length: ' + this.enemies.length);

                if (this.enemies[i].overlaps(wizard.sprite) && !wizard.GDLMode) {
                    wizard.die();
                }

                for (let j = 0; j < wizard.spells.length; j++) {
                    if (this.enemies[i].overlaps(wizard.spells[j].spellSprite)) {
                        this.enemies[i].life = 0;
                    }
                }
            }
        },

    };
}
