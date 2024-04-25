<script>
import { ref, onMounted } from "vue";
import router from "~/router";
import { docGiaAPI } from "~/services/docGiaAPI";
import { nhanVienAPI } from "~/services/nhanVienAPI";
import { useToast } from "vue-toastification";

export default {
    setup() {
        const SoDienThoai = ref('');
        const Password = ref('');
        const isUser = ref(window.location.href.indexOf('admin') === -1)
        const toast = useToast();
        onMounted(() => {
            document.title = 'Đăng Nhập'
        })
        const isUserPage = () => {
            const currentPath = window.location.pathname;
            return currentPath.includes('/login/admin');
        }
        const loginUser = async (pass, phone) => {
            try {
                const { message, data } = await docGiaAPI.login({
                    MATKHAU: pass,
                    DIENTHOAI: phone
                })
                toast.success(message, {
                    timeout: 2000
                });
                localStorage.setItem('MADG', JSON.stringify(data.MADOCGIA));

                router.push('/')
            } catch (err) {
                toast.error(err.response.data.message, {
                    timeout: 2000
                });
            }
        }
        const loginAdmin = async (pass, phone) => {
            try {
                const { message, data } = await nhanVienAPI.login({
                    Password: pass,
                    SoDienThoai: phone
                })
                toast.success(message, {
                    timeout: 2000
                })
                localStorage.setItem('MANV', JSON.stringify(data.MSNV));
                router.push('/admin')
            } catch (err) {
                toast.error(err.response.data.message, {
                    timeout: 2000
                });
            }
        }

        const handleLogin = async () => {
            const regexPass = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
            const regexSDT = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
            const pass = Password.value.trim()

            if (!regexSDT.test(SoDienThoai.value)) {
                return toast.error('Vui lòng nhập số điện thoại!', {
                    timeout: 1000
                });
            }

            if (!regexPass.test(pass)) {
                return toast.error('Vui lòng nhập mật khẩu chứa số, chữ thường, chữ in và ít nhất 8 kí tự!', {
                    timeout: 1000
                });

            }

            if (isUser.value) {
                await loginUser(pass, SoDienThoai.value)
            } else {
                await loginAdmin(pass, SoDienThoai.value)
            }
        }

        return {
            SoDienThoai,
            Password,
            handleLogin, isUserPage
        }
    },
    data() {
        return {
            isShow: false,
            eyeIcon: '<i class="fa-solid fa-eye"></i>',
            eyeSlashIcon: '<i class="fa-solid fa-eye-slash"></i>'
        };
    },
    methods: {
        handleToggleShow() {
            this.isShow = !this.isShow;
        }
    },
}
</script>
<template>
    <div class="container-fluid ">
        <div class="d-flex justify-content-center align-items-center " style="height: 100vh;">
            <div class="col-6 bg-white shadow-lg ">
                <div class="border rounded p-4">
                    <h2 class="pt-3 pb-3" v-if="!isUserPage()">Đăng Nhập Đọc Giả</h2>
                    <h2 class="pt-3 pb-3" v-else>Đăng Nhập Nhân Viên</h2>
                    <form @submit.prevent="handleLogin">
                        <div class="row">
                            <div class="col-8">
                                <div class="pb-3">
                                    <label for="SoDienThoai"><b>Số Điện Thoại</b></label>
                                    <input type="text" required v-model="SoDienThoai" name="SoDienThoai"
                                        id="SoDienThoai" class="form-control">
                                </div>
                                <label for="Password"><b>Password</b></label>
                                <div class="input-group ">
                                    <input :type="isShow ? 'text' : 'password'" id="Password" required
                                        v-model="Password" name="Password" class="form-control">
                                    <span class="input-group-text form-password__btn" @click="handleToggleShow">
                                        <i class="fa-solid" :class="isShow ? 'fa-eye' : 'fa-eye-slash'"></i>
                                    </span>
                                </div>
                                <div class="pt-3 pb-2 d-flex justify-content-center align-items-center">
                                    <button type="submit" class="btn btn-primary" style="width: 50%;">Đăng Nhập</button>
                                </div>
                            </div>
                            <div class="col-4 d-flex align-items-center justify-content-center">
                                <img src="../../assets/images/login/icon.jpg" alt="Icon"
                                    style="max-width: 100%; max-height: 160px;">
                            </div>
                        </div>
                    </form>

                    <div class="pt-3" v-if="!isUserPage()">
                        <router-link to="/register" class="form-link">Đăng Ký Tài Khoản Tại Đây</router-link>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
