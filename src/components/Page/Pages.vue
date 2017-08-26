<template>
  <v-container>
    <v-layout row class="mb-3">
      <v-flex xs12 class="text-xs-left">
        <v-btn large @click="newPage">Create new Page</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="!loading">
      <v-flex sm4 xs6 v-for="page in pages" :key="page.name">
        <v-card class="card">
          <v-card-title primary-title>
            <h4>{{page.name}}</h4>
          </v-card-title>
          <v-card-text>{{page.description}}</v-card-text>
          </v-card-actions>
          <v-btn class="hover-show" @click="openPage(page.id)">
            <v-icon left>arrow_forward</v-icon>
            Show Page
          </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['projectId'],

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
    },

    openPage(id) {
      this.$router.push('/projects/' + this.projectId + '/pages/' + id);
    }
  }
}
</script>

<style>
.card {
  height: 70px;
}
</style>
