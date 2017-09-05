const state = {
    user: null
};

const mutations = {
    setUser: (state, user) => state.user = user,
};

const actions = {

    async login({ commit }, { email, password }) {
        const router = this.app.router;

        try {
            const res = await this.$axios.$post('/login', { email, password });
            commit('setUser', res);
            router.replace({ name: 'index' });
        }
        catch (err) {
            throw err;
        }
    },

    async logout({ commit }) {

        const router = this.app.router;

        await this.$axios.$post('/logout');

        commit('setUser', null);

        router.replace({ name: 'index' });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}