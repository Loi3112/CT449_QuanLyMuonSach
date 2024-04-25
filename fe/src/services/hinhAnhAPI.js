import axiosClient from "../utils/axiosClient";

const getURL = (url = '') => `/hinhAnh/${url}`;

export const hinhAnhAPI = {
    create: async (data) => await axiosClient.post(getURL(), data),
    delete: async (MAHA) => await axiosClient.delete(getURL(MAHA)),
    getByBook: async (MASACH) => await axiosClient.get(getURL(MASACH)),
    update: async (MAHA, data) => await axiosClient.put(getURL(MAHA), data),
};