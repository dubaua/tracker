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
      <combatant v-for="(creature, index) in creatures" :key="index" :combatant="creature" :index="index"></combatant>
    </tbody>
  </table>
</template>

<script>
import Combatant from "./Combatant.vue";

export default {
  name: "Tracker",
  props: {
    creatures: {
      type: Array,
      required: true
    }
  },
  components: {
    Combatant
  },
};
</script>

<style>
</style>
