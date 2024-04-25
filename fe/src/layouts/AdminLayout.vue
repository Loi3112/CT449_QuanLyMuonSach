<script>
import { ref, onMounted } from "vue";
import Logo from '../components/Logo.vue';
import router from '~/router';
import { nhanVienAPI } from '~/services/nhanVienAPI'

export default {
    setup() {
        const TenNV = ref('')

        const handleLogout = async () => {
            localStorage.removeItem('MANV');
            router.push('/login/admin');
        }

        const getData = async () => {
            const MANV = localStorage.getItem('MANV');
            if (MANV) {
                try {
                    const res = await nhanVienAPI.getOne(JSON.parse(MANV))

                    if (res.data) {
                        TenNV.value = res.data.HoTenNV
                    }
                } catch (err) {
                    console.log(err)
                }
            }
        }

        onMounted(async () => {
            await getData()
        })

        return {
            handleLogout,
            TenNV
        }
    },
    components: {
        Logo
    }
}
</script>

<template>
    <header class="fixed-top" style="height: 15%;">
        <div class="container py-1">
            <div class="row">
                <div class="col-6 pt-4">
                    <Logo />
                </div>
                <div class="col-6 pt-4 d-flex justify-content-end">
                    <div class="admin-top">
                        <span class="" style="font-size: 40px;">
                            <i class="fa-solid fa-circle-user"></i>
                        </span>
                        <div class="admin-top__info">
                            <div class="dropdown ">
                                <span class="dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown"
                                    style="cursor: pointer; font-size: 15px;" aria-expanded="false">
                                    {{ TenNV }}
                                </span>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton"
                                    style="height: 35px; padding-top: 0;">
                                    <li><a class="dropdown-item" href="#" @click="handleLogout">Đăng xuất</a></li>
                                </ul>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </header>
    <main class="container pt-5 mt-5" style="margin-top: 53px;">
        <div class="row pt-3">
            <div class="col-2 shadow" style="height: 422px;">
                <nav class="admin-bottom py-3" >

                    <router-link to="/admin" class="admin-bottom__link">
                        <i class="fa-solid fa-house"></i>Trang chủ
                    </router-link>
                    <hr>
                    <router-link to="/admin/account?name=admin" class="admin-bottom__link">
                        <i class="fa-solid fa-user-group"></i>Nhân viên
                    </router-link>
                    <hr>
                    <router-link to="/admin/account?name=user" class="admin-bottom__link">
                        <i class="fa-solid fa-users-viewfinder"></i> Đọc giả
                    </router-link>
                    <hr>
                    <router-link to="/admin/products" class="admin-bottom__link">
                        <i class="fa-solid fa-book"></i> Sách
                    </router-link>

                    <hr>
                    <router-link to="/admin/producer" class="admin-bottom__link">
                        <i class="fa-solid fa-address-book"></i> Nhà xuất bản
                    </router-link>
                    <hr>
                    <router-link to="/admin/bills" class="admin-bottom__link">
                        <i class="fa-solid fa-list-check"></i> Phiếu mượn
                    </router-link>
                    <!-- <hr>
                    <router-link to="/admin/bills?action=out" class="admin-bottom__link">
                        <i class="fa-solid fa-clock"></i> Quá hạn
                    </router-link> -->
                    <!-- <hr>
                    <router-link to="/admin/bills?action=histories" class="admin-bottom__link">
                        <i class="fa-solid fa-clock-rotate-left"></i> Lịch sử
                    </router-link> -->
                </nav>
            </div>
            <div class="col-10">
                <router-view />
            </div>
        </div>

    </main>
</template>

<style lang="scss" scoped>
@import url('~/assets/scss/admin.scss');
</style>
