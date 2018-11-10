import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import Option from '@/interfaces/option';

Vue.use(Vuex);

interface RootState {
    options: Option[];
    selectedOption: number;
    solution: number[][];
}

const store: StoreOptions<RootState> = {
    state: {
        options: [
            {
                name: 'Medium',
                puzzle: [
                    [5, 3, 0, 0, 7, 0, 0, 0, 0],
                    [6, 0, 0, 1, 9, 5, 0, 0, 0],
                    [0, 9, 8, 0, 0, 0, 0, 6, 0],
                    [8, 0, 0, 0, 6, 0, 0, 0, 3],
                    [4, 0, 0, 8, 0, 3, 0, 0, 1],
                    [7, 0, 0, 0, 2, 0, 0, 0, 6],
                    [0, 6, 0, 0, 0, 0, 2, 8, 0],
                    [0, 0, 0, 4, 1, 9, 0, 0, 5],
                    [0, 0, 0, 0, 8, 0, 0, 7, 9],
                ],
                solution: [
                    [5, 3, 4, 6, 7, 8, 9, 1, 2],
                    [6, 7, 2, 1, 9, 5, 3, 4, 8],
                    [1, 9, 8, 3, 4, 2, 5, 6, 7],
                    [8, 5, 9, 7, 6, 1, 4, 2, 3],
                    [4, 2, 6, 8, 5, 3, 7, 9, 1],
                    [7, 1, 3, 9, 2, 4, 8, 5, 6],
                    [9, 6, 1, 5, 3, 7, 2, 8, 4],
                    [2, 8, 7, 4, 1, 9, 6, 3, 5],
                    [3, 4, 5, 2, 8, 6, 1, 7, 9],
                ],
            },
            {
                name: 'Simple',
                puzzle: [
                    [6, 0, 5, 7, 2, 0, 0, 3, 9],
                    [4, 0, 0, 0, 0, 5, 1, 0, 0],
                    [0, 2, 0, 1, 0, 0, 0, 0, 4],
                    [0, 9, 0, 0, 3, 0, 7, 0, 6],
                    [1, 0, 0, 8, 0, 9, 0, 0, 5],
                    [2, 0, 4, 0, 5, 0, 0, 8, 0],
                    [8, 0, 0, 0, 0, 3, 0, 2, 0],
                    [0, 0, 2, 9, 0, 0, 0, 0, 1],
                    [3, 5, 0, 0, 6, 7, 4, 0, 8],
                ],
                solution: [
                    [6, 1, 5, 7, 2, 4, 8, 3, 9],
                    [4, 8, 7, 3, 9, 5, 1, 6, 2],
                    [9, 2, 3, 1, 8, 6, 5, 7, 4],
                    [5, 9, 8, 4, 3, 2, 7, 1, 6],
                    [1, 3, 6, 8, 7, 9, 2, 4, 5],
                    [2, 7, 4, 6, 5, 1, 9, 8, 3],
                    [8, 4, 9, 5, 1, 3, 6, 2, 7],
                    [7, 6, 2, 9, 4, 8, 3, 5, 1],
                    [3, 5, 1, 2, 6, 7, 4, 9, 8],
                ],
            },
        ],
        selectedOption: -1,
        solution: [],
    },
    getters: {
        puzzle(state) {
            const option = state.options[state.selectedOption];
            return option ? option.puzzle : [];
        },
        puzzleSolution(state) {
            const option = state.options[state.selectedOption];
            return option ? option.solution : [];
        },
    },
    mutations: {
        setSelectedOption(state, val: number) {
            state.selectedOption = val;
        },
        updateSolution(state, solution: number[][]) {
            state.solution = solution;
        },
    },
};

export default new Vuex.Store<RootState>(store);
