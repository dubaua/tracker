<template>
  <table class="tracker">
    <thead>
      <tr>
        <th class="tracker__cell tracker__cell--head">Name</th>
        <th
          class="tracker__cell tracker__cell--head"
          v-for="(property, key) in getDefaults"
          :key="'head' + key"
        >
          {{ property.label }}
          <div class="tracker__finger-icon">
            <Icon glyph="fingerprint"></Icon>
          </div>
        </th>
        <th class="tracker__cell tracker__cell--head">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="combatant in getOrderedByInitiative" :key="combatant.id">
        <td class="tracker__cell">{{ combatant.name }}</td>
        <td
          class="tracker__cell tracker__cell--compact"
          v-for="(property, key) in getDefaults"
          :key="'cell' + key"
        >
          <DragAdjust
            class="tracker__finger"
            :value="combatant[key]"
            :min="property.min"
            :max="property.max"
            @input="set($event, combatant.id, key)"
          >
            <input
              class="tracker__input"
              :class="{ 'tracker__input--negative': combatant[key] < 0 }"
              :value="combatant[key]"
              @change="set($event, combatant.id, key)"
            />
          </DragAdjust>
        </td>
        <td class="tracker__cell">
          <DragAdjust
            class="tracker__finger tracker__finger--inline"
            :value="damageAmount"
            @input="damage($event, combatant.id)"
          >
            Damage
            <!-- <input
              class="tracker__input"
              :class="{ 'tracker__input--negative': combatant[key] < 0 }"
              :value="combatant[key]"
              @change="set($event, combatant.id, key)"
            />-->
          </DragAdjust>
          <DragAdjust
            class="tracker__finger tracker__finger--inline"
            :value="healAmount"
            @input="heal($event, combatant.id)"
          >
            Heal
            <!-- <input
              class="tracker__input"
              :class="{ 'tracker__input--negative': combatant[key] < 0 }"
              :value="combatant[key]"
              @change="set($event, combatant.id, key)"
            />-->
          </DragAdjust>
          <button @click="removeCombatant(combatant.id)">&times;</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import DragAdjust from "./DragAdjust.vue";
import Icon from "./Icon.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Tracker",
  components: {
    DragAdjust,
    Icon
  },
  data() {
    return {
      damageAmount: 0,
      healAmount: 0
    };
  },
  computed: {
    ...mapGetters(["getOrderedByInitiative", "getDefaults"])
  },
  methods: {
    ...mapMutations(["setCombatant", "removeCombatant", "damageCombatant"]),
    set(event, id, key) {
      this.setCombatant({
        id,
        key,
        value: typeof event === "number" ? event : Number(event.target.value)
      });
    },
    damage(event, id) {
      this.damageCombatant({
        id,
        amount: typeof event === "number" ? event : Number(event.target.value)
      });
    },
    heal(event, id) {
      this.damageCombatant({
        id,
        amount: typeof event === "number" ? -event : -Number(event.target.value)
      });
    }
  }
};
</script>

<style lang="scss">
.tracker {
  $color-primary: #a11010;
  $padding-x: 0.38em;
  $padding-y: 0.23em;
  $minus-width: 0.55em;

  border-spacing: 0;
  border-collapse: collapse;

  &__cell {
    padding-top: $padding-y;
    padding-bottom: $padding-y;
    padding-left: $padding-x + $minus-width;
    padding-right: $padding-x;
    &--head {
      font: 600 18px/18px "Anonymous Pro", serif;
      letter-spacing: -0.03em;
      text-align: left;
      color: $color-primary;
    }
    &--compact {
      padding: 0;
    }
  }
  &__finger {
    max-width: 4em;
    &--inline {
      display: inline-block;
    }
  }
  &__input {
    font: 600 18px/18px "Anonymous Pro", serif;
    max-width: 100%;
    box-sizing: border-box;
    padding-top: $padding-y;
    padding-bottom: $padding-y;
    padding-left: $padding-x + $minus-width;
    padding-right: $padding-x;
    border: 0;
    &--negative {
      padding-left: $padding-x;
    }
    &:focus {
      outline: none;
      box-shadow: inset 0 0 0 1px $color-primary;
    }
  }
  &__finger-icon {
    $icon-size: 20px;
    display: inline-block;
    width: $icon-size;
    height: $icon-size;
    vertical-align: top;
    color: #ccc;
    margin-top: -2px;
  }
}
</style>
