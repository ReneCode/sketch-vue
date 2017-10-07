<template>
  <v-container fluid>
    <v-layout>
      <div>
        {{iaList.map(i => i.name)}}
      </div>
    </v-layout>
    <v-layout>
      <!-- <div>
        {{tmpItems}}
      </div> -->
      <!-- <v-flex xs4>
                            <code>
                              Interactions: {{iaName()}} {{iaList}}
                              UndoRedoList: {{undoRedoList.currentIdx}} {{urList}}
                            </code>
                          </v-flex> -->
      <v-flex xs12>
        <v-layout row class="mb-2">
          <v-flex xs12 class="text-xs-left">
            <v-btn :dark="iaMode === 'select'" @click="onSetInteractionMode('select')">Select</v-btn>
            <v-btn :dark="iaMode === 'panning'" @click="onSetInteractionMode('panning')">Panning</v-btn>
            <v-btn :dark="iaMode === 'rectangle'" @click="onSetInteractionMode('rectangle')">Rectangle</v-btn>
            <v-btn :dark="iaMode === 'circle'" @click="onSetInteractionMode('circle')">Circle</v-btn>
            <v-btn :dark="iaMode === 'polygon'" @click="onSetInteractionMode('polygon')">Polygon</v-btn>
            <v-btn :dark="iaMode === 'freehand'" @click="onSetInteractionMode('freehand')">Freehand</v-btn>
            <v-btn :dark="iaMode === 'delete'" @click="onSetInteractionMode('delete')">Delete</v-btn>
            <v-btn :disabled="!undoRedoList.canUndo" @click="onUndo" class="ml-5">Undo</v-btn>
            <v-btn :disabled="!undoRedoList.canRedo" @click="onRedo">Redo</v-btn>

          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <div style='height:500px;'>
      <svg ref="svg" width="100%" height="100%">
        <g :transform="svgTransform">
          <svg-item v-for="(item,index) in allItems" :key="index" :item="item" :iid="item.id" :class="item.selected? 'item-selected': 'item-normal'"></svg-item>
          <svg-item v-for="(item,index) in tmpItems" :key="index" :item="item" class="tmp" :iid="item.id"></svg-item>
        </g>
      </svg>
    </div>
  </v-container>
</template>

<script>
import Svg from '@/svg'
import undoRedoList from '@/store/modules/undo-redo-list';
import selectionList from '@/store/selectionList';
import temporaryItemList from '@/store/temporary-item-list';
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
      tmpItems: temporaryItemList.getItems(),
      selectedItems: selectionList.getItems(),
      iaList: interaction.getIaList(),
      undoRedoList: undoRedoList,
      svg: {}
    }
  },

  computed: {
    svgTransform() {
      if (this.svg) {
        return this.svg.getSvgTransformString();
      } else {
        return "";
      }
    },

    urList() {
      return this.undoRedoList.getList().map(ur => {
        if (!ur.ref) {
          return ur;
        } else {
          return {
            old: ur.oldData,
            new: ur.newData
          }
        }
      });
    },

    iaMode() {
      return this.$store.getters.interactionMode;
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
    this.svg.init(this.$refs.svg);

    const options = {
      projectId: this.projectId,
      pageId: this.pageId
    }
    this.$store.dispatch('loadGraphics', options);
    this.onSetInteractionMode('select');
  },

  beforeDestroy() {
    this.svg.exit();
  },

  methods: {
    onSetInteractionMode(mode) {
      const payload = {
        mode: mode,
        projectId: this.projectId,
        pageId: this.pageId
      }
      this.$store.commit('setInteractionMode', payload);
    },
    onUndo() {
      selectionList.clear();
      undoRedoList.undo();
    },
    onRedo() {
      selectionList.clear();
      undoRedoList.redo();
    }
  }
}
</script>

<style>
svg {
  background-color: #f0f0f0;
}

.item-normal {
  stroke: #630;
  stroke-width: 2px;
  cursor: pointer;
  opacity: 0.8;
}

.item-selected {
  stroke: #222;
  stroke-width: 2px;
  stroke-dasharray: 5;
  cursor: pointer;
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

code {
  font-size: 11px;
  line-height: 1;
  color: #444;
}
</style>
