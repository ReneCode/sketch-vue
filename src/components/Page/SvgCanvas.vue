<template>
  <svg ref="svg" width="100%" height="100%">
    <g :transform="svgTransform">
      <!-- <image xlink:href="http://lorempixel.com/400/200/technics" x="100" y="80"/> -->
      <svg-item v-for="(item,index) in allItems" :key="index" :item="item" :iid="item.id" :class="item.selected? 'item-selected': 'item-normal'"></svg-item>
      <svg-item v-for="(item,index) in tmpItems" :key="index" :item="item" class="tmp" :iid="item.id"></svg-item>
    </g>
  </svg>
</template>

<script>
import Svg from "../../svg";
import SvgItem from "./SvgItem";

export default {
  name: "svg-canvas",
  props: ["allItems", "tmpItems"],
  components: {
    SvgItem
  },
  data() {
    return {
      svg: {}
    };
  },

  computed: {
    svgTransform() {
      if (this.svg) {
        return this.svg.getSvgTransformString();
      } else {
        return "";
      }
    }
  },

  created() {
    this.svg = new Svg();
  },

  mounted() {
    this.svg.init(this.$refs.svg);
  },

  beforeDestroy() {
    this.svg.exit();
  },

  methods: {}
};
</script>

<style>
svg {
  background-color: #f0f0f0;
}

.item-normal {
  stroke: #630;
  stroke-width: 2px;
  opacity: 0.9;
}

.item-selected {
  stroke: #222;
  stroke-width: 2px;
  stroke-dasharray: 5;
  /* cursor: pointer; */
  opacity: 0.8;
  animation: dash-rotate 0.5s linear infinite;
}

@keyframes dash-rotate {
  from {
    stroke-dashoffset: 10;
  }
  to {
    stroke-dashoffset: 0;
  }
}

.tmp {
  /* fill: #bbf; */
  stroke: #33c;
  cursor: pointer;
  opacity: 0.3;
}
</style>
