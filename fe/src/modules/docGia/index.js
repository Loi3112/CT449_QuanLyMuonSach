// initial state
const state = () => ({
    docGia: null,
    isLoggin: true
});

// getters
const getters = {};

// actions
const actions = {
};

// mutations
const mutations = {
    setDocGia(state, payload) {
        state.docGia = payload
        state.isLoggin = true
    },
    setIsLoggOut(state) {
        state.isLoggIn = false
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
