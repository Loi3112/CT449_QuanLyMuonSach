import axiosClient from "../utils/axiosClient";

const getURL = (url = '') => `/nhanVien/${url}`;

export const nhanVienAPI = {
  login: async (data) => await axiosClient.post(getURL('login'), data),
  register: async (data) => await axiosClient.post(getURL('register'), data),
  getAll: async () => await axiosClient.get(getURL('all')),
  getCount: async () => await axiosClient.get(getURL('count')),
  getOne: async (MSNV) => await axiosClient.get(getURL(`detail?MSNV=${MSNV}`)),
};
