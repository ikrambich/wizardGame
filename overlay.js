
import { coinCount } from "./player.js";

export function overlay(p) {
    return {
        setup() {
            console.log('WASD to move\n' +
                'Click to attack (mouse to aim)\n' +
                'Space to shoot fireball sideways\n' +
                'Press 1 to change attack\n' +
                'Press b to spawn golem enemy\n' +
                'Hold o to activate golem behavior (must be holding for attacks to effect them)\n' +
                'Press y to die\n' +
                'Press r to respawn\n' +
                'Press e to teleport\n' +
                'Press q for shield');
        },

        loadAnimations() {
            this.overlayCoinAnim = p.loadAnimation(
                'assets/coin/gold_coin_hexagon_1.png',
                'assets/coin/gold_coin_hexagon_2.png',
                'assets/coin/gold_coin_hexagon_3.png',
                'assets/coin/gold_coin_hexagon_4.png',
                'assets/coin/gold_coin_hexagon_5.png',
                'assets/coin/gold_coin_hexagon_6.png',
            );
        },

        draw() {
            p.textAlign(p.RIGHT);
            p.fill(255);
            p.stroke(0); p.strokeWeight(5);
            p.textSize(25); p.textFont();
            p.text(coinCount, p.width - 25, p.height - 25);
         }
    };
}