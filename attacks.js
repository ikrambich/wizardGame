var fireballAnim;
const spells = [];
const spellSpeed = 7;

var currentAttack = 0;
const angleSpeed = 7;

import { cameraOffset } from "./sketch.js";


export function makeSpell(p, type) {
    return {
        spellSpeed: 5,
        spellSprite: null,
        spellAnims: {},
        lifeSpan: 100,
        angles: [],
        camOffset: cameraOffset,
        alreadyCollided: false,

        setup() {
            this.loadAnimations();
        },

        cast(x, y, type) {
            if (type == 0) {
                let projectile = this.fireball(x, y);
                spells.push(projectile);
            } else if (type == 1) {
                let projectile = this.electric(x, y);
                spells.push(projectile);
            }

        },

        electric(x, y) {

            // create electric sprite at x, y position, with length 80 height 20
            this.spellSprite = new p.Sprite(x, y, 80, 20);

            // scale down the sprite
            this.spellSprite.scale = 0.7;

            // add offset so electric does not spawn directly on top of player when casted.
            this.spellSprite.offset.x = 40;

            // collider = none so it doesnt move player when casted
            this.spellSprite.collider = "none";

            this.spellSprite.addAni(this.spellAnims.electric);

            // set anglemode to radians, to rotate it away from the player when casted
            p.angleMode(p.RADIANS);
            this.spellSprite.rotation = Math.atan2(p.mouseY - p.height / 2, p.mouseX - p.width / 2);

            // Add velocity toward mouse, away from player
            this.spellSprite.vel.y = p.mouseY - p.height / 2;
            this.spellSprite.vel.x = p.mouseX - p.width / 2;

            // normalize speed toward mouse
            this.spellSprite.vel.normalize().mult(this.spellSpeed);
            this.spellSprite.life = this.lifeSpan;

        },

        fireball(x, y) {

            // create fireball sprite at x, y position, with radius of 35
            this.spellSprite = new p.Sprite(x, y, 35);

            // add offset so fireball does not spawn directly on top of player when casted.
            this.spellSprite.offset.x = 15;

            // collider = none so it doesnt move player when casted
            this.spellSprite.collider = "none";

            this.spellSprite.addAni(this.spellAnims.fireball);

            // set anglemode to radians, to rotate it away from the player when casted
            p.angleMode(p.RADIANS);
            this.spellSprite.rotation = Math.atan2(p.mouseY - p.height / 2, p.mouseX - p.width / 2);

            // Add velocity toward mouse, away from player
            this.spellSprite.vel.y = p.mouseY - p.height / 2;
            this.spellSprite.vel.x = p.mouseX - p.width / 2;

            // normalize speed toward the mouse.
            this.spellSprite.vel.normalize().mult(this.spellSpeed);
            this.spellSprite.life = this.lifeSpan;
        },



        loadAnimations() {
            // Load all spell animations
            this.spellAnims.fireball = p.loadAnimation(
                'assets/fireball/FB001.png',
                'assets/fireball/FB002.png',
                'assets/fireball/FB003.png',
                'assets/fireball/FB004.png'
            );
            this.spellAnims.fireball.frameDelay = 15;

            this.spellAnims.electric = p.loadAnimation(
                "assets/electric/tile1.png",
                "assets/electric/tile2.png",
                "assets/electric/tile3.png",
                "assets/electric/tile4.png"
            );
            this.spellAnims.electric.frameDelay = 20;
        },

    };
}
