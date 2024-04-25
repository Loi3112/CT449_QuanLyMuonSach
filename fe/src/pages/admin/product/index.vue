<script>
import { onMounted, ref, watch, computed } from "vue"
import Title from '~/components/Title.vue'
import { useRoute } from "vue-router"
import { sachAPI } from "~/services/sachAPI"
import { nhaXuatBanAPI } from "~/services/nhaXuatBanAPI"
import { useStore } from "vuex"
import { useToast } from "vue-toastification";
import router from "~/router";

export default {
    setup() {
        const store = useStore()
        const route = useRoute()
        const MASACH = ref(null)
        const page = ref(parseInt(route.query.page) || 1)
        const count = ref(0)
        const data = ref([])
        const nxb = ref([])
        const TENSACH = ref()
        const DONGIA = ref()
        const SOQUYEN = ref(0)
        const NAMXUATBAN = ref()
        const MANXB = ref('')
        const TACGIA = ref()
        const TENNXB = ref()
        const TENHA = ref('')
        const searchQuery = ref('')
        const toast = useToast();

        const getData = async () => {
            try {
                await store.dispatch('sach/getAll', { page: page.value })
                const res = computed(() => store.state.sach.tatCaSach)
                data.value = await res.value

                nxb.value = (await nhaXuatBanAPI.getAll()).data
            } catch (err) {
                console.log(err)
            }
        }

        const getInfo = async (id) => {
            try {
                await store.dispatch('sach/getInformation', { MASACH: id })
                const res = computed(() => store.state.sach.chiTiet)
                return await res.value

            } catch (err) {
                console.log(err)
            }
        }

        const getCountPage = async () => {
            try {
                const { data } = await sachAPI.getCount()
                if (data) {
                    count.value = Math.ceil(data / 6)
                }
            } catch (e) {
                console.log(e)
            }
        }

        onMounted(async () => {
            document.title = 'Danh sách sản phẩm'
            await getCountPage()
            await getData()
        })

        watch(() => route.query.page, async () => {
            page.value = parseInt(route.query.page)
            await getData()
        })

        const handleClick = async (id) => {
            const info = await getInfo(id)
            if (info) {
                MASACH.value = info.MASACH
                TENSACH.value = info.TENSACH
                DONGIA.value = info.DONGIA.toLocaleString('vi-VN')
                NAMXUATBAN.value = info.NAMXUATBAN
                SOQUYEN.value = info.SOQUYEN
                if (info.MANXB) {
                    MANXB.value = info.MANXB.MANXB
                    TENNXB.value = info.MANXB.TENNXB
                }
                TACGIA.value = info.TACGIA
                if (info.hinhAnh) {
                    TENHA.value = info?.hinhAnh[0]?.TENHA
                }
            }
        }

        const handleEditBook = async () => {
            const donGia = +(DONGIA.value.replace('.', ''))
            if (isNaN(donGia)) {
                return toast.error('Vui lòng nhập đúng định dạng', {
                    timeout: 1000
                });
            }

            if (isNaN(+NAMXUATBAN.value)) {
                return toast.error('Vui lòng nhập năm xuất bản là số!', {
                    timeout: 1000
                });
            }

            try {
                const { message } = await sachAPI.update(MASACH.value, {
                    TENSACH: TENSACH.value,
                    DONGIA: donGia,
                    SOQUYEN: +SOQUYEN.value,
                    NAMXUATBAN: +NAMXUATBAN.value,
                    TACGIA: TACGIA.value,
                    MANXB: MANXB.value
                })
                toast.success(message, {
                    timeout: 2000
                });
                router.push('/admin/products')
                await getData();

            } catch (err) {
                console.log(err)
            }
        }

        const handleDeleteBook = async (id) => {
            try {
                const { message } = await sachAPI.deleteSach(id);
                toast.success(message, {
                    timeout: 2000
                });
                router.push('/admin/products')
                await getData();
            } catch (err) {
                console.log(err);
            }
        };

        const searchData = computed(() => {
            return data.value.filter(book => {
                return book.TENSACH.toLowerCase().includes(searchQuery.value.toLowerCase());
            });
        });

        const handleSearch = () => {
            getData(); // Refresh data from the server (optional)
        };

        return {
            handleClick,
            handleEditBook,
            handleDeleteBook,
            MASACH,
            page,
            count,
            data: searchData,
            nxb,
            TACGIA,
            MANXB,
            SOQUYEN,
            DONGIA,
            TENSACH,
            NAMXUATBAN,
            TENNXB,
            TENHA,
            searchQuery,
            handleSearch
        }
    },
    components: {
        Title
    }
}
</script>

<template>
    <div style="padding: 20px;">
        <section class="admin">
            <div>
                <Title title="Danh sách sản phẩm" root="Admin" />
                <div class="pt-3 pb-4">
                    <router-link to="/admin/createBook" class="admin-bottom__link bor text-decoration-none"
                        style="color: gray;">
                        <button class="btn btn-primary"><i class="fa-solid fa-plus"></i> Thêm mới</button>
                    </router-link>
                    <div class="input-group mt-5" style="max-width: 300px;">
                        <input type="text" class="form-control" v-model="searchQuery" @input="handleSearch"
                            placeholder="Nhập vào tên quyển sách...">
                        <button class="btn btn-primary"><i class="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                </div>

                <div class="shadow-lg rounded" style="padding: 20px;">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col"><b>STT</b></th>
                                <th scope="col"><b>Tên sản phẩm</b></th>
                                <th scope="col"><b>Số quyển</b></th>
                                <th scope="col"><b>Đơn giá</b></th>
                                <th scope="col"><b>Tác giả</b></th>
                                <th scope="col" class="text-center"><b>Thêm hình ảnh</b></th>
                                <th scope="col" style="width: 20%;"></th>
                            </tr>
                        </thead>
                        <tbody v-if="data">
                            <tr v-for="(el, i) in data" :key="el._id">
                                <td>{{ i + 1 }}</td>
                                <td>{{ el.TENSACH }}</td>
                                <td>{{ el.SOQUYEN }}</td>
                                <td>{{ el.DONGIA.toLocaleString('vi-VN') }}đ</td>
                                <td>{{ el.TACGIA }}</td>
                                <td class="text-center">
                                    <router-link :to="'/admin/images?MSB=' + el.MASACH" class=""
                                        style="font-size: 25px;">
                                        <i class="fa-regular fa-images"></i>
                                    </router-link>
                                </td>
                                <td>
                                    <a class="text-info" data-bs-toggle="modal" data-bs-target="#view"
                                        style="font-size: 25px; cursor: pointer;" @click="handleClick(el.MASACH)">
                                        <i class="fa-solid fa-eye"></i>
                                    </a>
                                    &nbsp;

                                    <a data-bs-toggle="modal" class=" text-danger"
                                        style="font-size: 25px; cursor: pointer;" @click="handleDeleteBook(el.MASACH)">
                                        <i class="fa-solid fa-trash"></i>
                                    </a>
                                    &nbsp;
                                    <a data-bs-toggle="modal" data-bs-target="#edit" class="text-success"
                                        style="font-size: 25px; cursor: pointer;" @click="handleClick(el.MASACH)">
                                        <i class="fa-solid fa-pen"></i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="d-flex mt-2" v-if="count">
                <ul class="pagination">
                    <li v-for="i in count" :key="i" :class="{ 'page-item': true, 'active': page === i }">
                        <router-link :to="`/admin/products?page=${i}`" class="page-link">
                            {{ i }}
                        </router-link>
                    </li>
                </ul>
            </div>

            <div class="modal fade" id="view" tabindex="-1" aria-labelledby="viewLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="viewLabel">
                                {{ TENSACH }}
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="admin-modal">
                                <div class="admin-modal__top d-flex align-items-center">
                                    <img :src="TENHA" :alt="TENHA" class="me-3" style="max-width: 120px;">
                                    <div>
                                        <span><b>Đơn giá: &nbsp;</b> <small> {{ DONGIA }}₫</small></span><br>
                                        <span><b>Tác giả: &nbsp;</b> <small> {{ TACGIA }}</small></span><br>
                                        <span><b>Số lượng: &nbsp;</b> <small> {{ SOQUYEN }}</small></span><br>
                                        <span><b>Năm xuất bản: &nbsp;</b> <small> {{ NAMXUATBAN }}</small></span><br>
                                        <span><b>Nhà xuất bản: &nbsp;</b> <small> {{ TENNXB }}</small></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="edit" tabindex="-1" aria-labelledby="editLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="editLabel">
                                Chỉnh sửa thông tin sản phẩm
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="admin-form" @submit.prevent="handleEditBook">
                                <div class="mt-3">
                                    <label for="name" class="fw-bold">Tên sản phẩm</label>
                                    <input type="text" class="form-control" id="name" v-model="TENSACH">
                                </div>
                                <div class="row">
                                    <div class="mt-3 col-6">
                                        <label for="price" class="fw-bold">Đơn giá</label>
                                        <input type="text" class="form-control" id="price" placeholder="10.000"
                                            v-model="DONGIA">
                                    </div>
                                    <div class="mt-3 col-6">
                                        <label for="count" class="fw-bold">Số quyển</label>
                                        <input type="number" class="form-control" id="count" v-model="SOQUYEN">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="mt-3 col-6">
                                        <label for="nxb" class="fw-bold">Nhà xuất bản</label>
                                        <select class="form-control" id="nxb" v-if="nxb" v-model="MANXB">
                                            <option :value="el.MANXB" v-for="el in nxb"
                                                :selected="el.MANXB === MANXB.value">
                                                {{ el.TENNXB }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="mt-3 col-6">
                                        <label for="year" class="fw-bold">Năm xuất bản</label>
                                        <input class="form-control" type="text" id="year" required v-model="NAMXUATBAN">
                                    </div>
                                </div>
                                <div class="mt-3">
                                    <label for="author" class="fw-bold">Tác giả</label>
                                    <input class="form-control" type="text" id="author" v-model="TACGIA">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-warning text-light" data-bs-dismiss="modal"
                                @click="handleEditBook">OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
