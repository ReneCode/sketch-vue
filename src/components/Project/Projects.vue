<template>
  <v-container>
    <v-layout row class="mb-3">
      <v-flex xs12 class="text-xs-left">
        <v-btn large @click="newProject">Create new Project</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex sm4 xs6 v-for="project in projects" :key="project.name" class="mb-3">
        <app-project-card :project="project">
        </app-project-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ProjectCard from "./ProjectCard";
export default {
  components: {
    "app-project-card": ProjectCard
  },
  computed: {
    projects() {
      return this.$store.getters.lastProjects;
    }
  },

  methods: {
    newProject() {
      this.$router.push("/projects/new");
    }
  }
};
</script>

<style>

</style>
