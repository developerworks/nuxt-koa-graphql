const state = {
    user: null
};

const mutations = {
    setUser: (state, user) => state.user = user,
};

const actions = {

    async login({ commit }, user) {
        console.log(user);
        commit('setUser', user);
        this.app.router.replace({ name: 'index' });
    },

    async logout({ commit }) {
        commit('setUser', null);
        this.app.router.replace({ name: 'index' });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}