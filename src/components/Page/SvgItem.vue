<template>
  <svg-rect-item v-if="item.svg.type=='rect'" :item="item"> </svg-rect-item>
  <svg-circle-item v-else-if="item.svg.type=='circle'" :item="item"> </svg-circle-item>
</template>

<script>
import SvgRectItem from './SvgRectItem'
import SvgCircleItem from './SvgCircleItem'

export default {
  name: 'svg-item',
  props: ['item'],
  components: {
    SvgRectItem,
    SvgCircleItem
  }
}
</script>

