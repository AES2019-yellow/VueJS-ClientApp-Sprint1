import { userService } from '../_services';
import { router } from '../_helpers';
import 'es6-promise/auto'

const user = JSON.parse(localStorage.getItem('user'));
const state = user
    ? { status: { loggedIn: true }, user }  : { status: {}, user: null };

const actions = {
    login({ dispatch, commit }, { email, password }) {
        commit('loginRequest', { email });
         
        userService.login({ dispatch, commit }, { "user": { email, password } })
        // userService.login(username, password)
            .then(
                user => {
                    commit('loginSuccess', user);
                    router.push('/');
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    logout({ commit }) {
        userService.logout();
        commit('logout');
    },
    register({ dispatch, commit }, user) {
        commit('registerRequest', user);
    
        userService.register({ dispatch, commit },  { user })
            .then(
                user => {
                    commit('registerSuccess', user);
                    router.push('/login');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful. Please activate your account.', { root: true });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
};

const mutations = {
    loggedIn(state) {
      return state.token != null && state.token != "Bearer null";
    },
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
    },
    registerRequest(state, user) {
        state.status = { registering: true };
    },
    registerSuccess(state, user) {
        state.status = {};
    },
    registerFailure(state, error) {
        state.status = {};
    },
    auth_request(state){
        state.status = 'loading'
      },
      auth_success(state, token, user){
        state.status = 'success'
        state.token = token
        state.user = user
      },
      auth_error(state){
        state.status = 'error'
      },
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};