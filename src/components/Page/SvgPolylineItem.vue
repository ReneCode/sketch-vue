<template>
  <polyline :points="points" :style="style">
  </polyline>
</template>

<script>
export default {
  name: 'svg-polyline-item',
  props: ['item'],
  computed: {
    style() {
      let style = {};
      if (this.item.svg.fill) {
        style.fill = this.item.svg.fill;
      }
      if (this.item.svg.stroke) {
        style.stroke = this.item.svg.stroke;
      }
      if (this.item.svg.strokeWidth) {
        style.strokeWidth = this.item.svg.strokeWidth;
      }
      return style;
    },
    points() {
      let str;
      for (let pt of this.item.svg.points) {
        if (!str) {
          str = `${pt.x},${pt.y}`;
        } else {
          str += `,${pt.x},${pt.y}`;
        }
      }
      return str;
    }
  }
}
</script>

<style>
polyline {
  fill: none;
}
</style>