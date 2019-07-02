<template>
  <div
    class="drag-adjust"
    @mousedown="supposeAdjastment"
    @touchstart="supposeAdjastment"
    @mouseup="clear"
  >
    <div
      class="drag-adjust__overlay"
      v-if="isAdjusting"
      @mousemove="adjust"
      @mouseup="submit"
      @mouseleave="submit"
    >
      <div class="drag-adjust__number">{{ temporaryValue }}</div>
      <div class="drag-adjust__circle drag-adjust__center" :style="circleStyle(3)"></div>
      <div class="drag-adjust__circle drag-adjust__fader" :style="circleStyle(faderRadius)"></div>
      <div class="drag-adjust__circle drag-adjust__limiter" :style="circleStyle(limiterRadius)"></div>
    </div>
    <slot>Please, paste input here</slot>
  </div>
</template>

<script>
/* eslint-disable no-mixed-operators, no-console */

const ADJUST_DELAY = 150;
const LIMITER_MARGIN = 32;

export default {
  name: "drag-adjust",
  props: {
    value: {
      default: 0,
      type: Number,
      required: true
    },
    min: {
      default: 0,
      type: Number
    },
    max: {
      default: 50,
      type: Number
    },
    disabled: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      temporaryValue: this.min,
      isAdjusting: false,
      timeoutId: null,
      inputEl: null,
      center: {
        x: 0,
        y: 0
      },
      fader: {
        x: 0,
        y: 0
      }
    };
  },
  computed: {
    limiterRadius() {
      const ww = window.innerWidth;
      const wh = window.innerHeight;
      return (
        Math.max(
          ww - this.center.x,
          this.center.x,
          wh - this.center.y,
          this.center.y
        ) - LIMITER_MARGIN
      );
    },
    faderRadius() {
      return Math.min(
        this.getRadiusByCoords(this.fader.x, this.fader.y),
        this.limiterRadius
      );
    }
  },
  methods: {
    // eslint-disable-next-line consistent-return
    supposeAdjastment(e) {
      if (this.disabled) return false;
      const { x, y } = this.getEventCoords(e);
      this.setCenter(x, y);
      this.setFader(x, y);

      this.inputEl = e.target;

      this.setTimer(this.activate, ADJUST_DELAY);
      e.preventDefault();
    },
    activate() {
      this.addTouchListeners();
      this.isAdjusting = true;
      this.resetTimer();
    },
    adjust(e) {
      requestAnimationFrame(() => {
        const { x, y } = this.getEventCoords(e);
        this.fader.x = x;
        this.fader.y = y;
        this.temporaryValue = Math.min(
          this.max,
          Math.floor(
            this.min +
              (this.getRadiusByCoords(x, y) / this.limiterRadius) *
                (this.max - this.min)
          )
        );
      });
    },
    submit(e) {
      this.$emit("input", this.temporaryValue);
      this.clear(e);
      e.stopPropagation();
    },
    clear(e) {
      this.removeTouchListeners();

      this.isAdjusting = false;

      if (this.timeoutId) {
        this.inputEl.focus();
      } else {
        this.inputEl.blur();
      }

      this.inputEl = null;

      this.resetTimer();

      this.setCenter(0, 0);
      this.setFader(0, 0);

      if (e) e.stopPropagation();
    },
    setTimer(callback, delay) {
      this.timeoutId = setTimeout(callback, delay);
    },
    resetTimer() {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    },
    setCenter(x, y) {
      this.center = { x, y };
    },
    setFader(x, y) {
      this.fader = { x, y };
    },
    addTouchListeners() {
      document.addEventListener("touchmove", this.adjust, false);
      document.addEventListener("touchend", this.submit, false);
      document.addEventListener("touchcancel", this.submit, false);
    },
    removeTouchListeners() {
      document.removeEventListener("touchmove", this.adjust, false);
      document.removeEventListener("touchend", this.submit, false);
      document.removeEventListener("touchcancel", this.submit, false);
    },
    getEventCoords(e) {
      const x = e.targetTouches ? e.targetTouches[0].clientX : e.clientX;
      const y = e.targetTouches ? e.targetTouches[0].clientY : e.clientY;
      return { x, y };
    },
    getRadiusByCoords(x, y) {
      return Math.sqrt((x - this.center.x) ** 2 + (y - this.center.y) ** 2);
    },
    circleStyle(radius) {
      return `
        left: ${this.center.x}px;
        top: ${this.center.y}px;
        width: ${radius * 2}px;
        height: ${radius * 2}px;`;
    }
  }
};
</script>

<style lang="scss">
$primary-blue: #409eff;

.drag-adjust {
  &__overlay {
    background: rgba(0, 0, 0, 0.8);
    z-index: 1000;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;
    overflow: hidden;
  }
  &__number {
    font-size: 80px;
    color: $primary-blue;
    user-select: none;
  }
  &__input {
    cursor: pointer;
  }
  &__circle {
    position: absolute;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    z-index: 1001;
  }
  &__center {
    background: $primary-blue;
  }
  &__fader {
    background: rgba($primary-blue, 0.33);
  }
  &__limiter {
    border: 3px solid $primary-blue;
  }
}
</style>
