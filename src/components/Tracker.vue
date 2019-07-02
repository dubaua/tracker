<template>
  <table class="tracker">
    <thead>
      <tr>
        <th>name</th>
        <th v-for="(property, key) in getDefaults" :key="'head'+key">{{key}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="combatant in getOrderedByInitiative" :key="combatant.id">
        <td>{{combatant.name}}</td>
        <td v-for="(property, key) in getDefaults" :key="'cell'+key">
          <Finger
            :value="combatant[key]"
            :id="combatant.id"
            :property="key"
            :min="property.min"
            :max="property.max"
          ></Finger>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Finger from "./Finger.vue";
import { mapGetters } from "vuex";

export default {
  name: "Tracker",
  components: {
    Finger
  },
  computed: {
    ...mapGetters(["getOrderedByInitiative", "getDefaults"])
  }
};
</script>

<style lang="scss">
.tracker {
  input {
    font-family: inherit;
    max-width: 100%;
    box-sizing: border-box;
  }
}
</style>
