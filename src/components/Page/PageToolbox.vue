<template>
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
</template>

<script>
import undoRedoList from "../../store/modules/undo-redo-list";
import selectionList from "../../store/selection-list";
import temporaryItemList from "../../store/temporary-item-list";
import interaction from "../../interaction";

export default {
  data() {
    return {
      undoRedoList: undoRedoList
    };
  },

  computed: {

    iaMode() {
      return this.$store.getters.interactionMode;
    },

    loading() {
      return this.$store.getters.loading;
    }
  },

  mounted() {
    this.onSetInteractionMode("select");
  },

  methods: {
    onSetInteractionMode(mode) {
      const payload = {
        mode: mode,
        projectId: this.projectId,
        pageId: this.pageId,
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
