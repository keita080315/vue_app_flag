import Vue from 'vue'
import Router from 'vue-router'
import FlagGame from '../components/FlagGame'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FlagGame',
      component: FlagGame
    }
  ]
})
