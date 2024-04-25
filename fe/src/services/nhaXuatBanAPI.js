import axiosClient from "../utils/axiosClient";

const getURL = (url = '') => `/nhaXuatBan/${url}`;

export const nhaXuatBanAPI = {
    create: async (data) => await axiosClient.post(getURL(), data),
    getAll: async () => await axiosClient.get(getURL('all')),
    update: async (MANXB, data) => await axiosClient.put(getURL(MANXB), data),
    getOne: async (MANXB) => await axiosClient.get(getURL(`info?MANXB=${MANXB}`)),
};