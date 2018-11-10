<template>
    <button id="SolveBtn" @click="solve()">Solve</button>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import Solver from '@/mixins/solver';

@Component
export default class PuzzlePicker extends Mixins(Solver) {
}
</script>
