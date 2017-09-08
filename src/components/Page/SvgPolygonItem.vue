<template>
  <polygon :points="points">
  </polygon>
</template>

<script>
export default {
  name: 'svg-polygon-item',
  props: ['item'],
  computed: {
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

