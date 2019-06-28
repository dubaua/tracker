<template>
  <div id="app">
    <Tracker :creatures="orderedCreatures"></Tracker>
    <input v-model="nextName" placeholder="Name">
    <button @click="add">New creature</button>
  </div>
</template>

<script>
// TODO ADD VUEX
import saveState from "vue-save-state";
import { EventBus } from "@/utils";
import Tracker from "./components/Tracker.vue";

export default {
  name: "app",
  mixins: [saveState],
  components: {
    Tracker
  },
  data() {
    return {
      creatures: [
        {
          initiative: 1,
          name: "Kendrix",
          hp: 24,
          ac: 16,
          str: 0,
          dex: 1,
          con: 3,
          int: 1,
          wis: 4,
          cha: 0
        }
      ],
      nextName: ""
    };
  },
  computed: {
    orderedCreatures() {
      return this.creatures.sort((a, b) => b.initiative - a.initiative);
    }
  },
  methods: {
    getSaveStateConfig() {
      return {
        cacheKey: "Tracker"
      };
    },
    add() {
      if (!this.nextName) return;
      this.creatures.push({
        initiative: 0,
        name: this.nextName,
        hp: 10,
        ac: 15,
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        cha: 0
      });
      this.nextName = "";
    }
  },
  mounted() {
    EventBus.$on("updateCombatant", ({ index, key, value }) => {
      this.creatures[index][key] = value;
    });
  }
};
</script>
