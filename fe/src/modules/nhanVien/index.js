// initial state
const state = () => ({
    nhanVien: null,
    isLoggin: true
});

// getters
const getters = {};

// actions
const actions = {};

// mutations
const mutations = {
    setNhanVien(state, payload) {
        state.nhanVien = payload
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
