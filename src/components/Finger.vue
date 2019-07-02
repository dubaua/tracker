<template>
  <DragAdjust class="finger" :value="value" :min="min" :max="max" @input="set($event)">
    <input class="finger__input" :value="value" @change="set($event)">
  </DragAdjust>
</template>

<script>
import DragAdjust from "./DragAdjust.vue";
import { mapMutations } from "vuex";

export default {
  name: "Finger",
  components: { DragAdjust },
  props: {
    id: {
      type: String,
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
  methods: {
    ...mapMutations(["setCombatant"]),
    set(event) {
      const value =
        typeof event === "number" ? event : Number(event.target.value);
      this.setCombatant({
        id: this.id,
        key: this.property,
        value
      });
    }
  }
};
</script>

<style lang="scss">
.finger {
  position: relative;
  &__input {
    max-width: 100%;
    box-sizing: border-box;
    position: relative;
    z-index: 0;
  }
}
</style>
