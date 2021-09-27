import Home from '../views/Home'

export default {
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name:"home",
      component: Home
    },
  ]
};