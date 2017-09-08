<template>
  <v-container>
    <v-layout>
      <v-flex xs4>
        <code>
          Interactions: {{iaName()}} {{iaList}}
        </code>
      </v-flex>

      <v-flex xs8>
        <v-layout row class="mb-2">
          <v-flex xs12 class="text-xs-left">
            <v-btn :dark="iaName() === 'iaSelect'" @click="onSelect">Select</v-btn>
            <v-btn :dark="iaName() === 'iaRect'" @click="onRectangle">Rectangle</v-btn>
            <v-btn :dark="iaName() === 'iaCircle'" @click="onCircle">Circle</v-btn>
            <v-btn :dark="iaName() === 'iaPolygon'" @click="onPolygon">Polygon</v-btn>

          </v-flex>
        </v-layout>
        <svg ref="svg" width="600" height="320">
          <svg-item v-for="(item,index) in allItems" :key="index" :item="item" :iid="item.id" :class="item.selected? 'item-selected': 'item-normal'" ></svg-item>
          <svg-item v-for="(item,index) in tmpItems" :key="index" :item="item" class="tmp" :iid="item.id"></svg-item>
        </svg>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Svg from '@/svg'
import selectionList from '@/store/selectionList';
import interaction from '@/interaction';
import SvgItem from './SvgItem'

export default {
  props: ['projectId', 'pageId'],
  components: {
    SvgItem
  },
  data() {
    return {
      buttonMode: "",
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
    iaName() {
      let iaList = interaction.getIaList()
      if (iaList && iaList.length > 0) {
        return iaList[0].name;
      }
    },

    onCircle() {
      const options = {
        projectId: this.projectId,
        pageId: this.pageId
      };
      interaction.startOnly('iaCircle', options);
    },
    onPolygon() {
      const options = {
        projectId: this.projectId,
        pageId: this.pageId
      };
      interaction.startOnly('iaPolygon', options);
    },
    onRectangle() {
      const options = {
        projectId: this.projectId,
        pageId: this.pageId
      };
      interaction.startOnly('iaRect', options);
    },
    onSelect() {
      interaction.startDefault();
    }
  }
}
</script>

<style>
svg {
  background-color: #f0f0f0;
}

.item-normal {
  fill: #eec;
  stroke: #630;
  cursor: pointer;
  opacity: 0.8;
}

.item-selected {
  fill: #ddd;
  stroke: #222;
  cursor: pointer;
  opacity: 0.8;
}

.tmp {
  fill: #bbf;
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
