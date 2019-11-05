<template>
    <div id="grid">
        <div v-for="(row, i) in displaySolution" :key="i">
            <input v-for="(col, j) in row" :key="j"
                type="number" min="1" max="10" step="1" v-model="displaySolution[i][j]"
                class="sudoku-input"
                :disabled="selectedPuzzle.type === 1"
                :class="{original: isOriginal(i, j), solved: isSolved(i, j)}"/>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter } from 'vuex-class';
import { PuzzleType, Option } from '@/interfaces/option';
import Solver from '@/classes/solver';

@Component
export default class Grid extends Vue {
    @Getter
    private selectedPuzzle!: Option;

    @State
    private selectedOption!: number;

    get displaySolution() {
        return this.$store.state.displaySolution;
    }

    set displaySolution(val: number[][]) {
        this.$store.commit('updateSolution', val);

        const solver: Solver = new Solver(this.selectedPuzzle.puzzle);
        solver.solve().then((solution: number[][]) => {
            this.$store.commit('updatePuzzleSolution', {
                id: this.selectedOption,
                solution: val,
            });
        });
    }

    public isOriginal(i: number, j: number): boolean {
        return this.selectedPuzzle.puzzle[i][j] === this.displaySolution[i][j] && this.displaySolution[i][j] !== 0;
    }

    public isSolved(i: number, j: number): boolean {
        return this.selectedPuzzle.solution[i][j] === this.displaySolution[i][j] && this.displaySolution[i][j] !== 0;
    }
}
</script>

<style lang="scss">
    #grid {
        margin: 1rem 0;

        .sudoku-input {
            width: 30px;
            height: 30px;
            border: 1px solid black;
            margin: 0;
            text-align: center;

            &::-webkit-inner-spin-button, 
            &::-webkit-outer-spin-button { 
                -webkit-appearance: none; 
                margin: 0; 
            }

            &.solved {
                color: white;
                background: green;
            }

            &.original {
                color: white;
                background: blue;
            }
        }
    }
</style>

