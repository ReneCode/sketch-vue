<template>
  <div>
    <p>
      create project
    </p>
    P:{{projects}}
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },

  computed: {
    projects() {
      return this.$store.getters.projects;
    }
  }
}
</script>