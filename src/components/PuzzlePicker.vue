<template>
    <div id="puzzle-picker">
        <p>Select a puzzle from the list or fill in your own</p>
        <select v-model="selectedOption">
            <option v-for="(option, index) in options" :key="index" v-bind:value="index">
                {{ option }}
            </option>
        </select>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

@Component
export default class PuzzlePicker extends Vue {

    @Getter
    private options!: string[];

    get selectedOption() {
        return this.$store.state.selectedOption;
    }

    set selectedOption(val: number) {
        this.$store.commit('setSelectedOption', val);
    }
}
</script>
