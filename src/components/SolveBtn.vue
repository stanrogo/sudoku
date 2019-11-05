<template>
    <button id="SolveBtn" @click="solve()">Solve</button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';
import { Option, Result } from '@/interfaces/option';
import Solver from '@/classes/solver';

@Component
export default class PuzzlePicker extends Vue {

    @Getter
    private selectedPuzzle!: Option;

    private get solution() {
        return this.$store.state.displaySolution;
    }

    private set solution(newVal: number[][]) {
        this.$store.commit('updateSolution', newVal);
    }

    public solve(): void {
        const solver: Solver = new Solver(this.selectedPuzzle.puzzle);
        solver.onTick(((result: Result) => {
            const newRow: number[] = this.solution[result.row];
            newRow[result.col] = result.num;
            Vue.set(this.solution, result.row, newRow);
        }).bind(this));
        solver.solve();
    }
}
</script>
