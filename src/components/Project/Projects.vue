<template>
  <v-container>
    <v-layout row class="mb-3">
      <v-flex xs12 class="text-xs-left">
        <v-btn large @click="newProject">Create new Project</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex sm4 xs6 v-for="project in projects" :key="project.name" class="mb-3">
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

    editProject(id) {
      this.$router.push('/projects/' + id);
    },

    showPages(id) {
      this.$router.push('/projects/' + id + '/pages');
    }

  }
}
</script>

<style>
.card {
  height: 70px;
}
</style>
