<template>
  <v-container>
    <v-layout row class="mb-3">
      <v-flex xs12 class="text-xs-left">
        <v-btn @click="addGraphic">Add Graphic</v-btn>
        <v-btn @click="sketchRect">Sketch Rect</v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6>
        <ul>
          <li v-for="(item,index) in items" :key="index">{{item.id}}</li>
        </ul>
      </v-flex>
      <v-flex xs6>
        <svg ref="svg" width="400" height="400">
          <rect v-for="(item,index) in items" :key="index" class="rect" :iid="item.id" :x="item.svg.x" :y="item.svg.y" :width="item.svg.width" :height="item.svg.height"></rect>
          <rect v-for="(item,index) in tmpItems" :key="index" class="selected" :iid="item.id" :x="item.svg.x" :y="item.svg.y" :width="item.svg.width" :height="item.svg.height"></rect>
        </svg>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Svg from '@/svg'

export default {
  props: ['projectId', 'pageId'],

  data() {
    return {
      tmpItems: []
    }
  },

  computed: {
    items() {
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
    this.svg.init(this.$refs.svg, this.tmpItems);

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
    sketchRect() {
      this.svg.start('sketchRect')
        .then(rect => {
          const svg = {
            ...rect,
            type: "rect"
          };
          const payload = {
            projectId: this.projectId,
            pageId: this.pageId,
            svg: svg
          }
          if (svg.width !== 0 && svg.height !== 0) {
            this.$store.dispatch('createGraphic', payload);
            // restart
            this.sketchRect();
          }
        })
        .catch(() => {
          // stop sketching
        });
    },

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
  fill: #eec;
  stroke: #630;
  cursor: pointer;
  opacity: 0.8;
}

.selected {
  fill: #ddd;
  stroke: #222;
  cursor: pointer;
  opacity: 1;
}
</style>
