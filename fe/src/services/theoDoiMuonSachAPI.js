import axiosClient from "../utils/axiosClient";

const getURL = (url = '') => `/theoDoiMuonSach/${url}`;


export const theoDoiMuonSachAPI = {
    create: async (data) => await axiosClient.post(getURL(), data),
    update: async (_id, TRANGTHAI) => {
        const url = getURL(`edit?_id=${_id}`);
        return await axiosClient.put(url, { TRANGTHAI });
    },
    getAll: async (status = null, page = null, MADOCGIA = null) => {
        let url = 'all?MADOCGIA=${userId}';

        if (status !== null) {
            url += `?status=${status}`;
        }

        if (page !== null) {
            url += page ? `&page=${page}` : '';
        }

        if (MADOCGIA !== null) {
            url += MADOCGIA ? `&MADOCGIA=${MADOCGIA}` : '';
        }

        return await axiosClient.get(getURL(url));
    },
    getCount: async () => await axiosClient.get(getURL('count')),
    getOne: async (MADOCGIA, MASACH, NGAYMUON) => await axiosClient.get(getURL(`detail?MADOCGIA=${MADOCGIA}&MASACH=${MASACH}&NGAYMUON=${NGAYMUON}`)),
};