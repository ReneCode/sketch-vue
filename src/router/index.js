import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Projects from '@/components/Project/Projects'
import Project from '@/components/Project/Project'
import CreateProject from '@/components/Project/CreateProject'

import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'

import Pages from '@/components/Page/Pages'
import Page from '@/components/Page/Page'
import CreatePage from '@/components/Page/CreatePage'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Home },

    { path: '/projects', component: Projects },
    { path: '/projects/new', component: CreateProject },
    { path: '/projects/:projectId', props: true, component: Project },

    { path: '/projects/:projectId/pages', props: true, component: Pages },
    { path: '/projects/:projectId/pages/new', props: true, component: CreatePage },
    { path: '/projects/:projectId/pages/:pageId', props: true, component: Page },

    { path: '/signup', component: Signup },
    { path: '/signin', component: Signin }
  ],
  mode: "history"
})
