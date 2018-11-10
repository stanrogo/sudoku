<template>
    <table id="Grid">
        <tr v-for="(row, i) in solution" :key="i">
            <td v-for="(col, j) in row" :key="j"
                :class="{original: isOriginal(i, j), solved: isSolved(i, j)}">
                {{ col }}
            </td>
        </tr>
    </table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter } from 'vuex-class';

@Component
export default class Grid extends Vue {
    @State
    private solution!: number[][];

    @Getter
    private puzzle!: number[][];

    @Getter
    private puzzleSolution!: number[][];

    public isOriginal(i: number, j: number): boolean {
        return this.puzzle[i][j] === this.solution[i][j] && this.solution[i][j] !== 0;
    }

    public isSolved(i: number, j: number): boolean {
        return this.puzzleSolution[i][j] === this.solution[i][j] && this.solution[i][j] !== 0;
    }
}
</script>

<style lang="scss">
    #Grid {
        margin: 1rem 0;
        border-collapse: collapse;

        td {
            width: 30px;
            height: 30px;
            border: 1px solid black;
            margin: 0;
            text-align: center;

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

