<template>
  <v-app light>

    <v-navigation-drawer temporary v-model="sideNav">
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{item.title}}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar>
      <v-toolbar-side-icon class="hidden-sm-and-up" @click.stop="toggleSideNav">
      </v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="title">Sketch</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view>
      </router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sideNav: false
    }
  },

  computed: {
    menuItems() {
      let items = [
        { icon: 'apps', title: 'Projects', link: '/projects' },
        { icon: 'person', title: 'Profile', link: '/profile' },
        { icon: 'exit_to_app', title: 'Logout', link: '/' }
      ];

      if (!this.$store.getters.user) {
        items = [
          { icon: 'apps', title: 'Projects', link: '/projects' },
          { icon: 'face', title: 'Sign in', link: '/signin' },
          { icon: 'lock_open', title: 'Sign up', link: '/signup' }
        ];
      }
      return items;
    }
  },

  methods: {
    toggleSideNav() {
      this.sideNav = !this.sideNav
    }
  }
}
</script>

<style lang="stylus">
  @import './stylus/main'

  .title {
    cursor: pointer;
  }

</style>
