import Home from '../views/Home'
import createForm from '../views/notes/CreateForm'

export default {
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path:'/notes/create',
      name: 'notes.create',
      component: createForm
    }
  ]
};