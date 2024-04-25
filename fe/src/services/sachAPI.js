import axiosClient from "../utils/axiosClient";

const getURL = (url = '') => `/sach/${url}`;

export const sachAPI = {
    create: async (data) => await axiosClient.post(getURL(), data),
    getAll: async (page = null, limit = null) => {
        let url = getURL('all')

        if (page) {
            url += `?page=${page}`
        }

        if (limit) {
            url += `&limit=${limit}`
        }

        return await axiosClient.get(url)
    },
    update: async (MASACH, data) => await axiosClient.put(getURL(MASACH), data),
    getOne: async (MASACH) => await axiosClient.get(getURL(`detail?MASACH=${MASACH}`)),
    getCount: async () => await axiosClient.get(getURL('count')),
    search: async (type, key, page = null) => {
        let url = getURL(`search?type=${type}&key=${key}`)

        if (page) {
            url += `&apge=${page}`
        }

        return await axiosClient.get(url)
    },
    getAllByMANXB: async (MANXB, page = null, limit = null) => {
        let url = getURL(`allBy?MANXB=${MANXB}`)

        if (page) {
            url += `&page=${page}`
        }

        if (limit) {
            url += `&limit=${limit}`
        }

        return await axiosClient.get(url)
    },
    getRandom: async () => await axiosClient.get(getURL('random')),
    deleteSach: async (MASACH) => await axiosClient.delete(getURL(MASACH))
};