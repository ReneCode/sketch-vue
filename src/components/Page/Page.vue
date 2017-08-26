<template>
  <v-container>
    <v-layout row class="mb-3">
      <v-flex xs12 class="text-xs-left">
        <h5>ProjectId: {{projectId}}</h5>
        <h5>PageId:{{pageId}}</h5>
        <v-btn @click="addGraphic">Add Graphic</v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6 >
        <ul>
          <li v-for="(graphic,index) in graphics" :key="index">{{graphic}}</li>
        </ul>
      </v-flex>
      <v-flex xs6>
        <svg ref="svg" width="400" height="400">
          <rect v-for="(graphic,index) in graphics" :key="index"
            class="rect"
            :gid="graphic.id"
            :x="graphic.svg.x" 
            :y="graphic.svg.y"
            :width="graphic.svg.width"
            :height="graphic.svg.height"></rect>
        </svg>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Svg from '@/svg'

export default {
  props: ['projectId', 'pageId'],

  computed: {
    graphics() {
      return this.$store.getters.loadedGraphics;
    },

    loading() {
      return this.$store.getters.loading;
    }
  },

  created() {
    this.svg = new Svg();
  },

  mounted() {
    this.svg.init(this.$refs.svg);

    const options = {
      projectId: this.projectId,
      pageId: this.pageId
    }
    this.$store.dispatch('loadGraphics', options);
  },

  beforeDestroy() {
    this.svg.exit();
  },

  methods: {
    addGraphic() {
      const svg = {
        type: "rect",
        x: Math.floor(10 + Math.random() * 50),
        y: Math.floor(10 + Math.random() * 100),
        width: Math.floor(10 + Math.random() * 200),
        height: Math.floor(10 + Math.random() * 150)
      };
      const payload = {
        projectId: this.projectId,
        pageId: this.pageId,
        svg: svg
      }
      this.$store.dispatch('createGraphic', payload);
    }
  }
}
</script>

<style>
.rect {
  fill:#eec;
  stroke: #630;
  cursor: pointer;
  opacity: 0.5;
}
</style>
