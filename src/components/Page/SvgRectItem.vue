<template>
  <rect :x="item.svg.x" :y="item.svg.y" :width="item.svg.width" :height="item.svg.height" :style="style">
  </rect>
</template>

<script>
export default {
  name: 'svg-rect-item',
  props: ['item'],
  computed: {
    style() {
      let style = {
      };
      if (this.item.svg.stroke) {
        style.stroke = this.item.svg.stroke;
      }
      if (this.item.svg.strokeWidth) {
        style.strokeWidth = this.item.svg.strokeWidth;
      }
      if (this.item.svg.fill) {
        style.fill = this.item.svg.fill;
      }
      return style;
    }
  }
}
</script>

<style>
rect {
  fill: none;
}
</style>
