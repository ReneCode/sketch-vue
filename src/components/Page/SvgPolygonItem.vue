<template>
  <polygon :points="points" :style="style">
  </polygon>
</template>

<script>
export default {
  name: 'svg-polygon-item',
  props: ['item'],
  computed: {
    style() {
      let style = {
      };
      if (this.item.svg.stroke) {
        style.stroke = this.item.svg.stroke;
      }
      if (this.item.svg.fill) {
        style.fill = this.item.svg.fill;
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
polygon {
  fill: none;
}
</style>

