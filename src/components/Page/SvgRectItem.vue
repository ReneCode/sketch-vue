<template>
  <rect :x="item.svg.x" :y="item.svg.y" :width="item.svg.width" :height="item.svg.height">
  </rect>
</template>

<script>
export default {
  name: 'svg-rect-item',
  props: ['item']
}
</script>

<style>
rect {
    fill: none;
}
</style>
