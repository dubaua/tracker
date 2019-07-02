<template>
  <div id="app">
    <Tracker />
    <form @submit.prevent="add">
      <input v-model="nextName" placeholder="Name" />
      <button @click="add">New creature</button>
    </form>
  </div>
</template>

<script>
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
      this.addCombatant(this.nextName);
      this.nextName = "";
    }
  }
};
</script>
