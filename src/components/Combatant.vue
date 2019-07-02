<template>
  <tr>
    <td>
      <Finger :value="combatant.initiative" :id="combatant.id" property="initiative" :min="0" :max="20"></Finger>
    </td>
    <td>{{combatant.name}}</td>
    <td>
      <Finger :value="combatant.hp" :id="combatant.id" property="hp" :min="0" :max="200"></Finger>
    </td>
    <td>
      <Finger :value="combatant.ac" :id="combatant.id" property="ac" :min="10" :max="30"></Finger>
    </td>
    <td>
      <Finger :value="combatant.str" :id="combatant.id" property="str" :min="-5" :max="5"></Finger>
    </td>
    <td>
      <Finger :value="combatant.dex" :id="combatant.id" property="dex" :min="-5" :max="5"></Finger>
    </td>
    <td>
      <Finger :value="combatant.con" :id="combatant.id" property="con" :min="-5" :max="5"></Finger>
    </td>
    <td>
      <Finger :value="combatant.int" :id="combatant.id" property="int" :min="-5" :max="5"></Finger>
    </td>
    <td>
      <Finger :value="combatant.wis" :id="combatant.id" property="wis" :min="-5" :max="5"></Finger>
    </td>
    <td>
      <Finger :value="combatant.cha" :id="combatant.id" property="cha" :min="-5" :max="5"></Finger>
    </td>
  </tr>
</template>

<script>
import Finger from "./Finger.vue";

export default {
  name: "Combatant",
  props: {
    combatant: {
      type: Object,
      required: true
    }
  },
  components: { Finger }
};
</script>

<style lang="scss">
.combatant {
  &__input {
    max-width: 100%;
    box-sizing: border-box;
  }
}
</style>
