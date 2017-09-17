<template>
  <circle :cx="item.svg.x" :cy="item.svg.y" :r="item.svg.radius">
  </circle>
</template>

<script>
export default {
  name: 'svg-circle-item',
  props: ['item']
}
</script>

<style>
circle {
    fill: #eec;
}
</style>
