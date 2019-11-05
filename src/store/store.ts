import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { Option, PuzzleType } from '@/interfaces/option';

Vue.use(Vuex);

interface RootState {
    options: Option[];
    selectedOption: number;
    displaySolution: number[][];
}

function createPuzzle(name: string, puzzle: number[][], type: PuzzleType): Option {
    return  {
        name,
        puzzle,
        type,
        solution: puzzle.map((x) => x.slice(0)),
    };
}

const store: StoreOptions<RootState> = {
    state: {
        options: [
            createPuzzle('Select Your Own', [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
            ], PuzzleType.custom),
            createPuzzle('Simple', [
                [6, 0, 5, 7, 2, 0, 0, 3, 9],
                [4, 0, 0, 0, 0, 5, 1, 0, 0],
                [0, 2, 0, 1, 0, 0, 0, 0, 4],
                [0, 9, 0, 0, 3, 0, 7, 0, 6],
                [1, 0, 0, 8, 0, 9, 0, 0, 5],
                [2, 0, 4, 0, 5, 0, 0, 8, 0],
                [8, 0, 0, 0, 0, 3, 0, 2, 0],
                [0, 0, 2, 9, 0, 0, 0, 0, 1],
                [3, 5, 0, 0, 6, 7, 4, 0, 8],
            ], PuzzleType.preset),
            createPuzzle('Medium', [
                [5, 3, 0, 0, 7, 0, 0, 0, 0],
                [6, 0, 0, 1, 9, 5, 0, 0, 0],
                [0, 9, 8, 0, 0, 0, 0, 6, 0],
                [8, 0, 0, 0, 6, 0, 0, 0, 3],
                [4, 0, 0, 8, 0, 3, 0, 0, 1],
                [7, 0, 0, 0, 2, 0, 0, 0, 6],
                [0, 6, 0, 0, 0, 0, 2, 8, 0],
                [0, 0, 0, 4, 1, 9, 0, 0, 5],
                [0, 0, 0, 0, 8, 0, 0, 7, 9],
            ], PuzzleType.preset),
        ],
        selectedOption: 0,
        displaySolution: [],
    },
    getters: {
        options(state) {
            return state.options.map((option) => option.name);
        },
        selectedPuzzle(state) {
            return state.options[state.selectedOption];
        },
    },
    mutations: {
        setSelectedOption(state, val: number) {
            state.displaySolution = state.options[val].puzzle.map((x) => x.slice(0));
            state.selectedOption = val;
        },
        updateSolution(state, solution: number[][]) {
            state.displaySolution = solution;
        },
        updatePuzzleSolution(state, data: { id: number, solution: number[][] }) {
            state.options[data.id].solution = data.solution;
        },
    },
};

export default new Vuex.Store<RootState>(store);
