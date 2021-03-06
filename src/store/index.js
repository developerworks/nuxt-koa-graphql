import Vuex from 'vuex';
import account from './account';


const actions = {
    nuxtServerInit ({ commit }, context) {

        console.log("nuxtServerInit:", context);

        const { req } = context;

        // Send user info to state.user
        if (req.session && req.session.user)
            commit('account/setUser', req.session.user);
        else
            commit('account/setUser', null);
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