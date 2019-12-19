import Plots from './components/conditions/Plots'
import Login from './components/authentication/Login'
import Logout from './components/authentication/Logout'
import Register from './components/authentication/Register'
import Home from './components/Menu'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresVisitor: true,
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiresVisitor: true,
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  {
    path: '/conditions',
    name: 'conditions',
    component: Plots,
    meta: {
      requiresAuth: true,
    }
  }
//   {
//     path: '/register',
//     name: 'register',
//     component: Register,
//     meta: {
//       requiresVisitor: true,
//     }
//   },
//   {
//     path: '/logout',
//     name: 'logout',
//     component: Logout
//   }
]

export default routes