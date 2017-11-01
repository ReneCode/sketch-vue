<template>
  <v-container>
    <v-layout row class="mb-3">
      <v-flex xs12 class="text-xs-left">
        <v-btn large @click="newPage">Create new Page</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="!loading">
      <v-flex v-for="page in pages" :key="page.name">
        <app-page-card :projectId="projectId" :page="page"></app-page-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import PageCard from './PageCard'

export default {
  props: ['projectId'],

  components: {
    'app-page-card': PageCard
  },

  computed: {
    pages() {
      return this.$store.getters.loadedPages;
    },

    loading() {
      return this.$store.getters.loading;
    }
  },

  mounted() {
    this.$store.dispatch('loadPages', this.projectId);
  },

  methods: {
    newPage() {
      this.$router.push('/projects/' + this.projectId + '/pages/new');
    }
  }
}
</script>

<style>
</style>
