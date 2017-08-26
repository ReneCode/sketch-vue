<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onCreatePage">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="name" label="Name" id="name" v-model="name" type="text" required>
                    </v-text-field>
                    <v-text-field name="description" label="Description" id="description" v-model="description" type="text">
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex x12>
                    <v-btn type="submit" :disabled="!validName">Create page</v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['projectId'],

  data() {
    return {
      name: '',
      description: ''
    }
  },

  computed: {
    validName() {
      return this.name.length > 0;
    }
  },

  methods: {
    onCreatePage() {
      const page = {
        projectId: this.projectId,
        name: this.name,
        description: this.description
      }
      this.$store.dispatch('createPage', page)
        .then(pageId => {
          this.$router.push('/projects/' + this.projectId + '/pages/' + pageId)
        })
    }

  }
}
</script>
