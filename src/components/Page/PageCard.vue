<template>
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
</template>

<script>
export default {
  props: ["page"]
};
</script>

<style>
.card {
  width: 300px;
  height: 100%;
  padding-bottom: 40px;
}
</style>
