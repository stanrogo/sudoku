import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

@Component
export default class Solver extends Vue {
    private col: number = 0;
    private row: number = 0;
    private invalid: number[][][] = [];

    @Getter
    private puzzle!: number[][];

    @Watch('puzzle', { immediate: true, deep: true })
    public onPuzzleChanged(val: number[][], oldVal: number[][]) {
        this.solution = val.map((x: number[]) => x.slice(0));
        this.invalid = val.map((x: number[]) => x.slice(0).map((_) => []));
        this.col = 0;
        this.row = 0;
    }

    private get solution() {
        return this.$store.state.solution;
    }

    private set solution(newVal) {
        this.$store.commit('updateSolution', newVal);
    }

    public solve(): Promise<void> {
        let interval: number;

        return new Promise((res) => {
            interval = window.setInterval(() => {
                if (this.row * 9 + this.col >= 9 * 9) {
                    window.clearInterval(interval);
                    res();
                    return;
                }

                const item = this.puzzle[this.row][this.col];
                if (item) {
                    this.next();
                    return;
                }

                const newNum = this.searchNum();
                if (newNum === -1) {
                    this.prev();
                    return;
                }

                this.updateSolution(newNum);
                this.next();
            }, 1);
        });
    }

    private updateSolution(newNum: number) {
        const rowEntry: number[] = this.solution[this.row];
        rowEntry[this.col] = newNum;
        Vue.set(this.solution, this.row, rowEntry);
    }

    private markRestValid(): void {
        const startValidity = this.row * 9 + this.col;
        this.invalid.forEach((row, i) => {
            row.forEach((_, j) => {
                if (i * 9 + j <= startValidity) {
                    return;
                }
                this.invalid[i][j] = [];
            });
        });
    }

    private searchNum(): number {
        const invalidNums: number[] = this.invalid[this.row][this.col];
        const row: number[] = this.solution[this.row];
        const column: number[] = this.solution.map((x: number[]) => x[this.col]);
        const rowSectionStart: number = this.row - this.row % 3;
        const colSectionStart: number = this.col - this.col % 3;
        const section: number[] = this.solution.reduce((acc: number[], rowN: number[], i: number) => {
            if (i < rowSectionStart || i >= rowSectionStart + 3) {
                return acc;
            }
            const rowSection = rowN.slice(colSectionStart, colSectionStart + 3);
            return acc.concat(rowSection);
        }, []);
        const valid: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((x) => !invalidNums.includes(x));
        return valid.find((x) => !row.includes(x) && !column.includes(x) && !section.includes(x)) || -1;
    }

    private markAsInvalid(): void {
        const num: number = this.solution[this.row][this.col];
        const invalidArr: number[] = this.invalid[this.row][this.col];
        this.invalid[this.row][this.col] = invalidArr.concat([num]);
        this.updateSolution(0);
    }

    private next(): void {
        this.col = (this.col + 1) % 9;
        this.row += this.col === 0 ? 1 : 0;
    }

    private prev(): void {
        do {
            this.col = (this.col + 8) % 9;
            this.row -= this.col === 8 ? 1 : 0;
        } while (this.puzzle[this.row][this.col]);

        this.markAsInvalid();
        this.markRestValid();
    }
}
