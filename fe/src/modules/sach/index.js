import { sachAPI } from "~/services/sachAPI";
import { hinhAnhAPI } from "~/services/hinhAnhAPI";

// initial state
const state = () => ({
    tatCaSach: [],
    timKiem: [],
    chiTiet: null,
    random: [],
    sachByNXB: []
});

const getHinhAnh = async (data) => {
    try {
        const results = []

        if (data) {
            for (const sach of data) {
                const res = await hinhAnhAPI.getByBook(sach.MASACH)
                const el = {
                    ...sach,
                    hinhAnh: res.data
                }

                results.push(el)
            }
        }

        return results
    }
    catch (err) {
        console.log(err.message)
    }
}

// getters
const getters = {

};

// actions
const actions = {
    async getAll({ commit }, { page = 1, limit = 6 }) {
        try {
            const { data } = await sachAPI.getAll(page, limit)
            commit("setTatCaSach", getHinhAnh(data));
        }
        catch (err) {
            console.log(err.message)
        }
    },
    async search({ commit }, { type, key, page = 1 }) {
        try {
            const { data } = await sachAPI.search(type, key, page)

            commit("setTimKiem", getHinhAnh(data));
        }
        catch (err) {
            console.log(err.message)
        }
    },
    async getInformation({ commit }, { MASACH }) {
        try {
            const { data } = await sachAPI.getOne(MASACH)
            if (data) {
                const res = await hinhAnhAPI.getByBook(data.MASACH)
                commit("setChiTiet", {
                    ...data,
                    hinhAnh: res.data
                });
            }

        }
        catch (err) {
            console.log(err.message)
        }
    },
    async getRandom({ commit }) {
        try {
            const { data } = await sachAPI.getRandom()
            commit("setRandom", getHinhAnh(data));
        }
        catch (err) {
            console.log(err.message)
        }
    },
    async getAllByNXB({ commit }, { MANXB, page = 1, limit = 6 }) {
        try {
            const { data } = await sachAPI.getAllByMANXB(MANXB, page, limit)
            commit("setSachByNXB", getHinhAnh(data));
        }
        catch (err) {
            console.log(err.message)
        }
    },
};

// mutations
const mutations = {
    setTatCaSach(state, payload) {
        state.tatCaSach = payload;
    },
    setTimKiem(state, payload) {
        state.timKiem = payload;
    },
    setChiTiet(state, payload) {
        state.chiTiet = payload;
    },
    setSachByNXB(state, payload) {
        state.sachByNXB = payload;
    },
    setRandom(state, payload) {
        state.random = payload
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
