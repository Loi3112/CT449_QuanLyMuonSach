import { defineStore } from 'pinia'
import { hinhAnhAPI } from '~/services/hinhAnhAPI'
import { sachAPI } from '~/services/sachAPI'

const getHinhAnh = async (data) => {
    const results = []

    try {
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
    }
    catch (err) {
        console.log(err.message)
    }

    return results
}

export const useBookStore = defineStore('book', {
    state: () => ({
        book: null,
        bookAll: [],
        searchValue: [],
        random: [],
        bookBy: []
    }),
    actions: {
        async getAll(page = null, limit = null) {
            try {
                const { data } = await sachAPI.getAll(page, limit)

                if (data) {
                    this.bookAll = await getHinhAnh(data)
                } else {
                    console.error('Get all book failed')
                }
            } catch (error) {
                console.error('Get all book failed: ', error)
            }
        },
        async search(type, key, page = 1) {
            try {
                const { data } = await sachAPI.search(type, key, page)

                if (data) {
                    this.searchValue = await getHinhAnh(data)
                } else {
                    console.error('Search book failed')
                }
            }
            catch (err) {
                console.log('Search book failed: ', err.message)
            }
        },
        async getInformation(MASACH) {
            try {
                const { data } = await sachAPI.getOne(MASACH)
                if (data) {
                    const res = await hinhAnhAPI.getByBook(data.MASACH)
                    this.book = {
                        ...data,
                        hinhAnh: res.data
                    }
                } else {
                    console.error('Get info book failed')
                }
            }
            catch (err) {
                console.log('Get info book failed: ', err.message)
            }
        },
        async getRandom() {
            try {
                const { data } = await sachAPI.getRandom()
                if (data) {
                    this.random = await getHinhAnh(data)
                } else {
                    console.error('Get random book failed')
                }
            }
            catch (err) {
                console.log('Get random book failed: ', err.message)
            }
        },
        async getAllByNXB(MANXB, page = 1, limit = 6) {
            try {
                const { data } = await sachAPI.getAllByMANXB(MANXB, page, limit)
                if (data) {
                    this.bookBy = await getHinhAnh(data)
                } else {
                    console.error('Get book by NXB failed')
                }
            }
            catch (err) {
                console.log('Get book by NXB failed: ', err.message)
            }
        },
    },
})