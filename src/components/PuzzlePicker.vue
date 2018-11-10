<template>
  <div id="PuzzlePicker">
    <h1>Select a puzzle!</h1>
    <select v-model="selectedOption">
      <option v-for="(option, index) in options" :key="index" v-bind:value="index">{{ option.name }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import Option from '@/interfaces/option';

@Component
export default class PuzzlePicker extends Vue {
  @State
  private options!: Option[];

  get selectedOption() {
    return this.$store.state.selectedOption;
  }

  set selectedOption(val: number) {
    this.$store.commit('setSelectedOption', val);
  }
}
</script>
