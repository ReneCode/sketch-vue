<template>
  <v-container fluid>
    <!-- <v-layout>
      <div>
        {{iaList.map(i => i.name)}}
      </div>
    </v-layout> -->

    <div class="toolbox">
      <!-- <v-btn fab :color="iaMode === 'select'?'primary':'accent'" @click="onSetInteractionMode('select')">
        <div class="icon" style="background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAtMC4xIDI0IDI0Ij48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNGRkYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBzdHJva2Utd2lkdGg9IjIiIGQ9Ik04IDIwLjlsLTcgMiAyLTcgMTQtMTRjMS0xIDMgMCA0IDFzMiAzIDEgNGwtMTQgMTR6Ii8+PHBhdGggZD0iTTYgMTcuOWwxNS0xNU0zIDE1LjlsNSA1Ii8+PC9nPjwvc3ZnPg==');"></div>
      </v-btn> -->

      <v-btn fab small class="green" @click="onColor('green')"></v-btn>
      <v-btn fab small class="red " @click="onColor('red')"></v-btn>
      <v-btn fab small class="black mr-3" @click="onColor('black')"></v-btn>

      <v-btn fab :color="iaMode === 'select'?'primary':'accent'" @click="onSetInteractionMode('select')">
        <v-icon class="flipy" dark>call_made</v-icon>
      </v-btn>
      <v-btn fab :color="iaMode === 'panning'?'primary':'accent'" @click="onSetInteractionMode('panning')">
        <v-icon dark>pan_tool</v-icon>
      </v-btn>
      <v-btn fab :color="iaMode === 'rectangle'?'primary':'accent'" @click="onSetInteractionMode('rectangle')">
        <v-icon dark>check_box_outline_blank</v-icon>
      </v-btn>
      <v-btn fab :color="iaMode === 'circle'?'primary':'accent'" @click="onSetInteractionMode('circle')">
        <v-icon dark>radio_button_unchecked</v-icon>
      </v-btn>
      <v-btn fab :color="iaMode === 'polygon'?'primary':'accent'" @click="onSetInteractionMode('polygon')">
        <v-icon dark>details</v-icon>
      </v-btn>
      <v-btn fab :color="iaMode === 'freehand'?'primary':'accent'" @click="onSetInteractionMode('freehand')">
        <v-icon dark>edit</v-icon>
      </v-btn>
      <v-btn fab :color="iaMode === 'delete'?'primary':'accent'" @click="onSetInteractionMode('delete')">
        <v-icon dark>delete</v-icon>
      </v-btn>

      <v-btn fab color="primary" :disabled="!undoRedoList.canUndo" @click="onUndo" class="ml-4">
        <v-icon dark>replay</v-icon>
      </v-btn>
      <v-btn fab color="primary" :disabled="!undoRedoList.canRedo" @click="onRedo">
        <v-icon class="flipy" dark>replay</v-icon>
      </v-btn>
    </div>
    <div class="graphic">
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
import Svg from "@/svg";
import undoRedoList from "@/store/modules/undo-redo-list";
import selectionList from "@/store/selection-list";
import temporaryItemList from "@/store/temporary-item-list";
import interaction from "@/interaction";
import SvgItem from "./SvgItem";

export default {
  props: ["projectId", "pageId"],
  components: {
    SvgItem
  },
  data() {
    return {
      tmpItems: temporaryItemList.getItems(),
      selectedItems: selectionList.getItems(),
      iaList: interaction.getIaList(),
      undoRedoList: undoRedoList,
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
    },

    urList() {
      return this.undoRedoList.getList().map(ur => {
        if (!ur.ref) {
          return ur;
        } else {
          return {
            old: ur.oldData,
            new: ur.newData
          };
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
      return this.loadedGraphics
        .map(item => {
          // do not show items, that are in temporaryData
          let selectedItem = this.selectedItems.find(
            selItem => selItem.id === item.id
          );
          if (selectedItem) {
            // item is selected
            return selectedItem;
          } else {
            let tempItem = this.tmpItems.find(
              tmpItem => tmpItem.id === item.id
            );
            if (tempItem) {
              // item is temporary - will be removed (.filter())
              return null;
            }
            // quite normal item
            return item;
          }
        })
        .filter(item => item !== null);
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
    };
    this.$store.dispatch("loadGraphics", options);
    this.onSetInteractionMode("select");
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
      };
      this.$store.commit("setInteractionMode", payload);
    },
    onUndo() {
      selectionList.clear();
      undoRedoList.undo();
    },
    onRedo() {
      selectionList.clear();
      undoRedoList.redo();
    },
    onColor(color) {
      this.$store.commit("setColor", color);
    }
  }
};
</script>

<style>

.flipy {
  -moz-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  filter: FlipH;
  -ms-filter: "FlipH";
}

.graphic {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  position: absolute;
}

svg {
  background-color: #f0f0f0;
}

.toolbox {
  top: 0px;
  right: 0px;
  position: absolute;
}
.item-normal {
  stroke: #630;
  stroke-width: 2px;
  opacity: 0.8;
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

code {
  font-size: 11px;
  line-height: 1;
  color: #444;
}
</style>
