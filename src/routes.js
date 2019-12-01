import Plots from './components/Plots'
import Login from './components/Login'
// import Logout from './components/auth/Logout'
import Register from './components/Register'
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