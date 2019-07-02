<template>
  <div id="app">
    <Tracker/>
    <input v-model="nextName" placeholder="Name">
    <button @click="add">New creature</button>
  </div>
</template>

<script>
// TODO ADD VUEX
import Tracker from "./components/Tracker.vue";
import { mapMutations } from "vuex";

export default {
  name: "app",
  components: {
    Tracker
  },
  data() {
    return {
      nextName: ""
    };
  },
  methods: {
    ...mapMutations(["addCombatant"]),
    add() {
      if (!this.nextName) return;
      this.addCombatant({
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
  }
};
</script>
