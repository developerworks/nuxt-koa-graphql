import Vuex from 'vuex';
import account from './account';


const actions = {
    nuxtServerInit ({ commit }, { req }) {

        // Send user info to state.user
        if (req.session && req.session.user)
            commit('account/setUser', req.session.user)
    },
};

const store = () => {
    return new Vuex.Store({
        modules: {
            account,
        },
        actions,
    });
};

export default store;