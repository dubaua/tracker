<template>
  <tr>
    <td>
      <Finger :value="combatant.initiative" :index="index" property="initiative" :min="0" :max="20"></Finger>
    </td>
    <td>{{combatant.name}}</td>
    <td>
      <Finger :value="combatant.hp" :index="index" property="hp" :min="0" :max="200"></Finger>
    </td>
    <td>
      <Finger :value="combatant.ac" :index="index" property="ac" :min="10" :max="30"></Finger>
    </td>
    <td>
      <Finger :value="combatant.str" :index="index" property="str" :min="-5" :max="5"></Finger>
    </td>
    <td>
      <Finger :value="combatant.dex" :index="index" property="dex" :min="-5" :max="5"></Finger>
    </td>
    <td>
      <Finger :value="combatant.con" :index="index" property="con" :min="-5" :max="5"></Finger>
    </td>
    <td>
      <Finger :value="combatant.int" :index="index" property="int" :min="-5" :max="5"></Finger>
    </td>
    <td>
      <Finger :value="combatant.wis" :index="index" property="wis" :min="-5" :max="5"></Finger>
    </td>
    <td>
      <Finger :value="combatant.cha" :index="index" property="cha" :min="-5" :max="5"></Finger>
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
    },
    index: {
      type: Number,
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
