<script>
import { ref, onMounted, watch } from "vue"
import { useRoute } from "vue-router"
import Title from '~/components/Title.vue'
import { docGiaAPI } from "~/services/docGiaAPI"
import { nhanVienAPI } from "~/services/nhanVienAPI"
import { useToast } from "vue-toastification";
import router from "~/router";

export default {
    setup() {
        const route = useRoute()
        const title = ref('Danh sách nhân viên')
        const isUser = ref(false)
        const data = ref([])
        const searchQuery = ref('')
        const toast = useToast();

        const updateTitle = async () => {
            try {
                if (route.query.name === 'user') {
                    title.value = 'Danh sách độc giả'
                    isUser.value = true
                    data.value = (await docGiaAPI.getAll()).data
                } else {
                    title.value = 'Danh sách nhân viên'
                    isUser.value = false
                    data.value = (await nhanVienAPI.getAll()).data
                }
                document.title = title.value
            } catch (err) {
                console.log(err)
            }
        }

        const deleteDocGia = async (id) => {
            try {
                const { message } = await docGiaAPI.delete(id);
                toast.success(message, {
                    timeout: 2000
                });
                router.push('/admin/account?name=user');
                window.location.reload()
            } catch (err) {
                console.log(err);
            }
        };


        const handleSearch = async () => {
            try {
                let searchData = [];
                if (isUser.value) {
                    searchData = (await docGiaAPI.getAll()).data;
                } else {
                    searchData = (await nhanVienAPI.getAll()).data;
                }
                data.value = searchData.filter(item =>
                    item.DIENTHOAI.includes(searchQuery.value)

                );
                console.log("Filtered data:", data.value);
            } catch (err) {
                console.log(err);
            }
        }



        onMounted(async () => {
            await updateTitle()
        })

        watch(() => route.query.name, async () => {
            await updateTitle()
        })

        return {
            title,
            isUser,
            data,
            deleteDocGia,
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
            <div class="group">
                <div class="group-left">
                    <Title :title="title" root="Admin" />
                </div>
            </div>
            <div class="pt-3 pb-4">
                <router-link to="/admin/createAdmin" class="admin-bottom__link bor text-decoration-none"
                    style="color: gray;" v-if="!isUser">
                    <button class="btn btn-primary"><i class="fa-solid fa-plus"></i> Thêm mới</button>
                </router-link>
                <div class="input-group pt-5" style="max-width: 300px;" v-if="isUser">
                    <input type="text" class="form-control" v-model="searchQuery" @input="handleSearch"
                        placeholder="Nhập vào SĐT...">
                    <button class="btn btn-primary" @click="handleSearch"><i class="fa-solid fa-search"></i></button>
                </div>
            </div>
            <div class="shadow-lg rounded" style="padding: 20px;">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col" class="fw-bold">STT</th>
                            <th scope="col" class="fw-bold">Tên tài khoản</th>
                            <th scope="col" class="fw-bold">SĐT</th>
                            <th scope="col" class="fw-bold">Địa chỉ</th>
                            <th scope="col" class="fw-bold" v-if="!isUser">Chức vụ</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody v-if="data">
                        <tr v-for="(h, i) in data" :key="h.MADOCGIA">
                            <td>{{ i + 1 }}</td>
                            <td>{{ isUser ? h.HOLOT + h.TEN : h.HoTenNV }}</td>
                            <td>{{ isUser ? h.DIENTHOAI : h.SoDienThoai }}</td>
                            <td>{{ isUser ? h.DIACHI : h.DiaChi }}</td>
                            <td v-if="!isUser">{{ h.ChucVu }}</td>
                            <td v-if="isUser">
                                <button class="btn btn-outline-danger" @click="deleteDocGia(h.MADOCGIA)">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</template>
