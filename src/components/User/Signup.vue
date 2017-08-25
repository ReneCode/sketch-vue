<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignup">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="email" label="Mail" id="email" v-model="email" type="email" required>
                    </v-text-field>
                    <v-text-field name="password" label="Password" id="password" v-model="password" type="password" required>
                    </v-text-field>
                    <v-text-field name="confirmPassword" label="Confirm Password" id="confirmPassword" v-model="confirmPassword" type="password" :rules="[comparePasswords]">
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex x12>
                    <v-btn :disabled="!equalPasswords" type="submit">Sign up</v-btn>
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
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },

  computed: {
    equalPasswords() {
      return this.password === this.confirmPassword;
    },

    comparePasswords() {
      if (!this.equalPasswords) {
        return 'Passwords do not match';
      } else {
        return true;
      }
    },

    user() {
      return this.$store.getters.user;
    }
  },

  watch: {
    user(value) {
      if (value) {
        // a new user was created
        this.$router.push('/');
      }
    }
  },

  methods: {
    onSignup() {
      const user = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch('signUpUser', user)
    }
  }
}
</script>

