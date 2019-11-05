import { Result } from '@/interfaces/option';

type Callback = (result: Result) => void;

export default class Solver {
    private col: number;
    private row: number;
    private invalid: number[][][];
    private puzzle: number[][];
    private solution: number[][];
    private callbacks: Callback[];

    constructor(puzzle: number[][]) {
        this.puzzle = puzzle;
        this.solution = puzzle.map((x: number[]) => x.slice(0));
        this.invalid = puzzle.map((x: number[]) => x.slice(0).map((_) => []));
        this.col = 0;
        this.row = 0;
        this.callbacks = [];
    }

    public onTick(callback: Callback): void {
        this.callbacks.push(callback);
    }

    public solve(): Promise<number[][]> {
        return new Promise((res) => {
            let interval: number;

            interval = window.setInterval(() => {
                if (this.row * 9 + this.col >= 9 * 9) {
                    window.clearInterval(interval);
                    res(this.solution);
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

    private updateSolution(newNum: number): void {
        this.solution[this.row][this.col] = newNum;
        this.callbacks.forEach((callback) => {
            callback({
                row: this.row,
                col: this.col,
                num: newNum,
            });
        });
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
        const section: number[] = this.getGridSection();
        const valid: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((x) => !invalidNums.includes(x));
        return valid.find((x) => !row.includes(x) && !column.includes(x) && !section.includes(x)) || -1;
    }

    private getGridSection(): number[] {
        const rowSectionStart: number = this.row - this.row % 3;
        const colSectionStart: number = this.col - this.col % 3;

        return this.solution.reduce((acc: number[], rowN: number[], i: number) => {
            if (i < rowSectionStart || i >= rowSectionStart + 3) {
                return acc;
            }
            const rowSection = rowN.slice(colSectionStart, colSectionStart + 3);
            return acc.concat(rowSection);
        }, []);
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
