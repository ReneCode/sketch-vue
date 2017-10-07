<template>
  <circle :cx="item.svg.x" :cy="item.svg.y" :r="item.svg.radius" :style="style">
  </circle>
</template>

<script>
export default {
  name: 'svg-circle-item',
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
circle {
  stroke: #630;
  stroke-width: 2px;
  fill: #eec;
}
</style>
