<template>
  <v-container fluid>
    <div class="toolbox">
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
      <v-btn fab :color="iaMode === 'image'?'primary':'accent'" @click="onSetInteractionMode('image')">
        <v-icon dark>add_a_photo</v-icon>
      </v-btn>
<!-- 
      <v-btn fab color="primary" @click="onShowDialogUploadPicture()">
        <v-icon dark>add_a_photo</v-icon>
      </v-btn> -->

      <v-btn fab color="primary" :disabled="!undoRedoList.canUndo" @click="onUndo" class="ml-4">
        <v-icon dark>replay</v-icon>
      </v-btn>
      <v-btn fab color="primary" :disabled="!undoRedoList.canRedo" @click="onRedo">
        <v-icon class="flipy" dark>replay</v-icon>
      </v-btn>
    </div>
    <div class="graphic">
      <svg-canvas :tmpItems="tmpItems" :allItems="allItems"></svg-canvas>
    </div>

    <app-upload-picture :show="showDialogUploadPicture" @upload="onUploadPicture"  @close="onCloseUploadPicture"></app-upload-picture>

  <!-- That fileInput is used for selecting an local image on "iaImage" -->
    <input ref="fileInput" type="file" style="display:none" accept="image/*">

  </v-container>
</template>

<script>
import undoRedoList from "../../store/modules/undo-redo-list";
import selectionList from "../../store/selection-list";
import temporaryItemList from "../../store/temporary-item-list";
import interaction from "../../interaction";
import SvgCanvas from "./SvgCanvas";

export default {
  props: ["projectId", "pageId"],
  components: {
    "svg-canvas": SvgCanvas
  },
  data() {
    return {
      tmpItems: temporaryItemList.getItems(),
      selectedItems: selectionList.getItems(),
      showDialogUploadPicture: false,
      iaList: interaction.getIaList(),
      undoRedoList: undoRedoList
    };
  },

  computed: {
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

    loadedGraphics() {
      return this.$store.getters.loadedGraphics;
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

    loading() {
      return this.$store.getters.loading;
    }
  },

  mounted() {
    // projectId and pageId are mounted via routing
    this.$store.dispatch("setCurrentProjectId", this.projectId);
    this.$store.dispatch("setCurrentPageId", this.pageId);

    this.$store.dispatch("loadGraphics");
    this.onSetInteractionMode("select");
  },

  methods: {
    onSetInteractionMode(mode) {
      const payload = {
        mode: mode,
        fileInput: this.$refs.fileInput
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
    },
    onShowDialogUploadPicture() {
      this.showDialogUploadPicture = true;
    },
    onUploadPicture(file) {
      console.log("F:", file);
      this.showDialogUploadPicture = false;
    },
    onCloseUploadPicture() {
      this.showDialogUploadPicture = false;
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

.toolbox {
  top: 0px;
  right: 0px;
  position: absolute;
}

code {
  font-size: 11px;
  line-height: 1;
  color: #444;
}
</style>
