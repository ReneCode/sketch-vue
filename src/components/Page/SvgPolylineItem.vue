<template>
  <polyline :points="points" :fill="fill">
  </polyline>
</template>

<script>
export default {
  name: 'svg-polyline-item',
  props: ['item'],
  computed: {
    fill() {
      if (this.item.svg.fill) {
        return this.item.svg.fill;
      }
      return "none";
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