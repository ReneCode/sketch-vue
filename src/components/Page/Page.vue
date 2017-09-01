<template>
  <v-container>
    <v-layout row class="mb-3">
      <v-flex xs12 class="text-xs-left">
        <v-btn @click="onSketchRect">Sketch Rect</v-btn>
        <!-- <v-btn @click="onSelect">Select</v-btn> -->
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <svg ref="svg" width="600" height="320">
          <rect v-for="(item,index) in allItems" :key="index" :class="item.selected? 'selected': 'rect'" :iid="item.id" :x="item.svg.x" :y="item.svg.y" :width="item.svg.width" :height="item.svg.height"></rect>
          <rect v-for="(item,index) in tmpItems" :key="index" class="tmp" :iid="item.id" :x="item.svg.x" :y="item.svg.y" :width="item.svg.width" :height="item.svg.height"></rect>
        </svg>
      </v-flex>
    </v-layout>
    <code>
      Interactions: {{iaList}}
    </code>
  </v-container>
</template>

<script>
import Svg from '@/svg'
import selectionList from '@/store/selectionList';
import interaction from '@/interaction';

export default {
  props: ['projectId', 'pageId'],

  data() {
    return {
      tmpItems: [],
      selectedItems: selectionList.getItems()
    }
  },

  computed: {
    iaList() {
      return interaction.getIaList();
    },

    items() {
      return this.$store.getters.loadedGraphics;
    },

    loadedGraphics() {
      return this.$store.getters.loadedGraphics;
    },

    allItems: function() {
      return this.loadedGraphics.map(item => {
        // do not show items, that are in temporaryData
        let selectedItem = this.selectedItems.find(selItem => selItem.id === item.id);
        if (!selectedItem) {
          return item;
        } else {
          // item is in selectedItems
          return selectedItem;
        }
      })
    },

    loading() {
      return this.$store.getters.loading;
    }

    // selectedItems() {
    //   return selectionList.getItems();
    // }
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
    onSketchRect() {
      interaction.start('iaRect')
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
            this.onSketchRect();
          }
        })
        .catch(() => {
          // stop sketching
        });
    }
  }
}
</script>

<style scoped>
svg {
  background-color: #f0f0f0;
}

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
  opacity: 0.8;
}

.tmp {
  fill: #bbd;
  stroke: #33c;
  cursor: pointer;
  opacity: 0.3;
}

code {
  font-size: 11px;
  line-height: 1;
  color: #444;
}
</style>
