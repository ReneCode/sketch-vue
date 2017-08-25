<template>
  <v-alert error dismissible @input="onClose" :value="true">
    {{text}}
  </v-alert>
</template>

  <script>
export default {
  props: ['text'],
  methods: {
    // https://vuejs.org/v2/guide/components.html#Form-Input-Components-using-Custom-Events
    onClose() {
      this.$emit('dismissed');
    }
  }
}
</script>
