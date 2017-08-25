<template>
  <v-container>
    <v-layout row class="mb-3">
      <v-flex xs12 class="text-xs-left">
        <v-btn large @click="newProject">Create new Project</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex sm4 xs6 v-for="project in projects" :key="project.name">
        <v-card class="card">
          <v-card-title primary-title>
            <h4>{{project.name}}</h4>
          </v-card-title>
          <v-card-text>{{project.description}}</v-card-text>
          </v-card-actions>
          <v-btn class="hover-show" @click="openProject(project.id)">
            <v-icon left>arrow_forward</v-icon>
            Show Project
          </v-btn>
          </v-card-actions>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    projects() {
      return this.$store.getters.lastProjects;
    }
  },

  methods: {
    newProject() {
      this.$router.push('/projects/new');
    },

    openProject(id) {
      this.$router.push('/projects/' + id);
    }
  }
}
</script>

<style>
.card {
  height: 70px;
}
</style>
