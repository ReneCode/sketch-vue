<template>
  <v-dialog v-model="show" persistent>
    <v-card>
      <v-card-title>Upload Picture</v-card-title>
      <v-card-text>
        <div>
          <v-btn raised class="primary" @click.stop="onPickFile">Upload Image</v-btn>
          <input ref="fileInput" type="file" style="display:none" accept="image/*" @change="onFilePicked">
        </div>
        <div>
          <img :src="imageUrl" height="150">
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" flat @click.stop="onUpload">Upload</v-btn>
        <v-btn color="primary" flat @click.stop="onClose">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["show"],

  data() {
    return {
      imageUrl: null
    };
  },

  computed: {},

  methods: {
    onUpload() {
      this.$emit('upload')
    },
    onClose() {
      this.$emit("close");
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(file);
      // this.$emit("close", fileName);
    }
  }
};
</script>
