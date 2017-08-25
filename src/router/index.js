import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Projects from '@/components/Project/Projects'
import Project from '@/components/Project/Project'
import CreateProject from '@/components/Project/CreateProject'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    { path: '/projects', component: Projects },
    { path: '/projects/new', component: CreateProject },
    { path: '/projects/:id', props: true, component: Project },
    { path: '/signup', component: Signup },
    { path: '/signin', component: Signin },
    { path: '/signin', component: Signin }
  ],
  mode: "history"
})
