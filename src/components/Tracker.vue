<template>
  <table>
    <thead>
      <tr>
        <th>initiative</th>
        <th>name</th>
        <th>hp</th>
        <th>ac</th>
        <th>STR</th>
        <th>DEX</th>
        <th>CON</th>
        <th>INT</th>
        <th>WIS</th>
        <th>CHA</th>
      </tr>
    </thead>
    <tbody>
      <combatant v-for="combatant in getOrderedByInitiative" :key="combatant.id" :combatant="combatant"></combatant>
    </tbody>
  </table>
</template>

<script>
import Combatant from "./Combatant.vue";
import { mapGetters } from "vuex";

export default {
  name: "Tracker",
  components: {
    Combatant
  },
  computed: {
    ...mapGetters(['getOrderedByInitiative']),
  },
};
</script>

<style>
</style>
