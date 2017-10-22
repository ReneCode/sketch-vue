<template>
  <image :x="item.svg.x" 
         :y="item.svg.y" 
         :xlink:href="item.svg.imageUrl">
  </image>
</template>

<script>
export default {
  name: "svg-image-item",
  props: ["item"]
};
</script>

<style>

</style>
