<template>
  <svg-rect-item v-if="item.svg.type=='rect'" :item="item"> </svg-rect-item>
  <svg-circle-item v-else-if="item.svg.type=='circle'" :item="item"> </svg-circle-item>
  <svg-polygon-item v-else-if="item.svg.type=='polygon'" :item="item"> </svg-polygon-item>
</template>

<script>
import SvgRectItem from './SvgRectItem'
import SvgCircleItem from './SvgCircleItem'
import SvgPolygonItem from './SvgPolygonItem'

export default {
  name: 'svg-item',
  props: ['item'],
  components: {
    SvgRectItem,
    SvgCircleItem,
    SvgPolygonItem
  }
}
</script>

