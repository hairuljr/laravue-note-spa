import Home from '../views/Home'
import createForm from '../views/notes/CreateForm'
import ListOfNote from '../views/notes/List'
import ShowNote from '../views/notes/Show'

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
      path: '/notes/table',
      name: 'notes.table',
      component: ListOfNote
    },
    {
      path:'/notes/create',
      name: 'notes.create',
      component: createForm
    },
    {
      path: '/notes/:noteSlug',
      name: 'notes.show',
      component: ShowNote
    },
  ]
};