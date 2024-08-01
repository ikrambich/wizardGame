var golems;    // variable for golem group


/*
// more complicated than using groups
// base class for enemies
class enemy {
    // enemy class methods
    constructor(x, y, w, h) {
        this.sprite = new Sprite();
    }

    // abstract methods - for implementation in extended classes
    moveRight() {}
    moveLeft()  {}
    moveDown()  {}
    moveUp()    {}
    behavior()  {}
    attack()    {}

    // class attributes
    sprite;
    speed;
}
*/



// function to create golem enemy group - run in preload
function createGolemGroup() {
    golems = new Group();
    golems.scale = 3;
    golems.collider = 'kinematic';
    golems.debug = true;
    // golems.overlaps(wizard.sprite);
}

var golemSpeed = 2;

// outside of golem class so it applies to all golem objects
function golemBehavior() {
    // hold 'o' key to activate golem behavior
    if (kb.pressing('o')) {
        for (let i = 0; i < golems.length; i++) {
            // moves golem to wizard
            golems[i].moveTo(wizard.posx, wizard.posy, golemSpeed)

            // "kills" wizard if golem hits him - do we need an attack animation?
            if (golems[i].overlaps(wizard.sprite)) {
                // replace with death function once its done
                wizard.sprite.position.x = 25;
                wizard.sprite.position.y = 25;
            }

            // kills golem if it is hit
            for (let j = 0; j < spells.length; j++) {
                if (golems[i].overlaps(spells[j].sprite)) {
                    golems[i].life = 0;
                }
            }
        }
    }
}

// sublcass for golem enemy
class golem {
    constructor(x, y) {
        // last two numbers change sprite physical size - uncomment debug to see
        this.sprite = new golems.Sprite(x, y, 12, 16)
        this.sprite.addAni(golemIdle);
    }

    sprite;
}