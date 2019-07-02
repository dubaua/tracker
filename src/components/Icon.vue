<template>
  <svg :width="width" :height="height" focusable="false" class="icon">
    <use :xlink:href="xhref"></use>
  </svg>
</template>

<script>
export default {
  name: "Icon",
  props: {
    glyph: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      required: false
    },
    height: {
      type: Number,
      required: false
    }
  },
  computed: {
    xhref() {
      return `#${this.glyph}`;
    }
  }
};
</script>

<style lang="scss">
.icon {
  pointer-events: none;
  width: 100%;
  height: 100%;
  display: block;
  fill: currentColor;
}
</style>
