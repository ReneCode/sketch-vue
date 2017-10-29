<template>
  <v-card class="card">
    <v-card-title primary-title>
      <h4>{{project.name}}</h4>
    </v-card-title>
    <v-card-text>{{project.description}}</v-card-text>
    </v-card-actions>
    <v-btn class="hover-show" @click="editProject(project.id)">
      <v-icon left>arrow_forward</v-icon>
      Edit Project
    </v-btn>
    <v-btn class="hover-show" @click="showPages(project.id)">
      <v-icon left>view_module</v-icon>
      Show Pages
    </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['project'],
  methods: {
    editProject(id) {
      this.$router.push('/projects/' + id);
    },

    showPages(id) {
      this.$router.push('/projects/' + id + '/pages');
    }

  }
}
</script>

<style scoped>
.card {
  height: 70px;
}
</style>
