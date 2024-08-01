

export function GameState(p) {
    return {
        states: { 0: 'menu', 1: 'level1' },
        currentState: 0, // currentState- 0 is menu, 1 is level1, etc.


        getState() {
            return this.states[this.currentState];
        },

        changeState(state) {
            this.currentState = this.states[this.currentState];
        },

    };
}

