import Home from '../views/Home'
import createForm from '../views/notes/Create'
import ListOfNote from '../views/notes/List'
import ShowNote from '../views/notes/Show'
import EditForm from '../views/notes/Edit'

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
    {
      path: '/notes/:noteSlug/edit',
      name: 'notes.edit',
      component: EditForm
    },
  ]
};