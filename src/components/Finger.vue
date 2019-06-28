<template>
  <DragAdjust :value="value" :min="min" :max="max" @input="set($event)">
    <input class="finger__input" :value="value" @change="set($event)">
  </DragAdjust>
</template>

<script>
import { EventBus } from "../utils/index.js";
import DragAdjust from "./DragAdjust.vue";

export default {
  name: "Finger",
  props: {
    index: {
      type: Number,
      required: true
    },
    property: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      required: false
    },
    max: {
      type: Number,
      required: false
    }
  },
  components: { DragAdjust },
  methods: {
    set(event) {
      const value =
        typeof event === "number" ? event : Number(event.target.value);
      EventBus.$emit("updateCombatant", {
        index: this.index,
        key: this.property,
        value
      });
    }
  }
};
</script>

<style lang="scss">
.finger {
  &__input {
    max-width: 100%;
    box-sizing: border-box;
  }
}
</style>
