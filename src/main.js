import Vue from "vue";
import VueRouter from 'vue-router'
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import store from './store'
import routes from './routes'


Vue.use(BootstrapVue);
Vue.use(VueRouter);

Vue.config.productionTip = false;

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: 'conditions',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  router: router,
  store: store,
  render: h => h(App)
}).$mount("#app");
