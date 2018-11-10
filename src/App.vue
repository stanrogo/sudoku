<template>
  <div id="app">
    <PuzzlePicker/>
    <Grid/>
    <SolveButton/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PuzzlePicker from './components/PuzzlePicker.vue';
import Grid from './components/Grid.vue';
import SolveButton from './components/SolveBtn.vue';

@Component({
  components: {
    PuzzlePicker,
    Grid,
    SolveButton,
  },
})
export default class App extends Vue {}
</script>
