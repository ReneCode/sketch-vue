<template>
  <svg-rect-item v-if="item.svg.type=='rect'" :item="item"> </svg-rect-item>
  <svg-circle-item v-else-if="item.svg.type=='circle'" :item="item"> </svg-circle-item>
  <svg-polygon-item v-else-if="item.svg.type=='polygon'" :item="item"> </svg-polygon-item>
  <svg-polyline-item v-else-if="item.svg.type=='polyline'" :item="item"> </svg-polyline-item>
  <svg-image-item v-else-if="item.svg.type=='image'" :item="item"> </svg-image-item>
</template>

<script>
import SvgRectItem from "./SvgRectItem";
import SvgCircleItem from "./SvgCircleItem";
import SvgPolygonItem from "./SvgPolygonItem";
import SvgPolylineItem from "./SvgPolylineItem";
import SvgImageItem from "./SvgImageItem";

export default {
  name: "svg-item",
  props: ["item"],
  components: {
    SvgRectItem,
    SvgCircleItem,
    SvgPolygonItem,
    SvgPolylineItem,
    SvgImageItem
  }
};
</script>

