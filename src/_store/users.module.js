import { userService } from '../_services';

const state = {
    all: {}
};

const actions = {
    
};

const mutations = {
    getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccess(state, users) {
        state.all = { items: users };
    },
    getAllFailure(state, error) {
        state.all = { error };
    }
};

export const users = {
    namespaced: true,
    state,
    actions,
    mutations
};
