<script>
import { ref, onMounted } from "vue";
import router from "~/router";
import { docGiaAPI } from "~/services/docGiaAPI";
import { useToast } from "vue-toastification";

export default {
    setup() {
        const DIENTHOAI = ref('');
        const TEN = ref('');
        const DIACHI = ref('');
        const MATKHAU = ref('');
        const passwordSub = ref('');
        const HOLOT = ref('')
        const toast = useToast();

        onMounted(() => {
            document.title = 'Đăng Ký'
        })

        const handleRegister = async () => {
            const regexPass = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
            const regexSDT = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
            const pass = MATKHAU.value.trim()

            if (!regexSDT.test(DIENTHOAI.value)) {
                return toast.error('Vui lòng nhập số điện thoại!', {
                    timeout: 1000
                });                
            }

            if (!regexPass.test(pass)) {
                return toast.error('Vui lòng nhập mật khẩu chứa số, chữ thường, chữ in và ít nhất 8 kí tự!', {
                    timeout: 1000
                });     
            }

            if (passwordSub.value.trim() !== pass) {
                return toast.error('Mật khẩu không khớp nhau!', {
                    timeout: 1000
                }); 
            }

            try {
                const { message } = await docGiaAPI.register({
                    HOLOT: HOLOT.value,
                    TEN: TEN.value,
                    DIACHI: DIACHI.value,
                    MATKHAU: pass,
                    DIENTHOAI: DIENTHOAI.value
                })
                toast.success(message, {
                    timeout: 2000
                })               
                 router.push('/login')
            } catch (err) {
                console.log(err)
            }
        }

        return {
            DIENTHOAI,
            MATKHAU,
            TEN,
            DIACHI,
            passwordSub,
            handleRegister,
            HOLOT
        }
    }
}
</script>

<template>
    <div class="container-fluid ">
        <div class="d-flex justify-content-center align-items-center " style="height: 100vh;">
            <div class="col-6 bg-white shadow-lg ">
                <div class="border rounded p-4">
                    <div class="row">
                        <div class="col-8">
                            <h2 class="pt-3 pb-3">Đăng Ký</h2>
                            <form @submit.prevent="handleRegister" class="  ">
                                <div class="mt-2">
                                    <label class="fw-bold">SĐT</label>
                                    <input type="text" class="form-control mt-2" required v-model="DIENTHOAI" />
                                </div>
                                <div class="row">
                                    <div class="mt-2 col-6">
                                        <label class="fw-bold">Họ</label>
                                        <input type="text" class="form-control mt-2" required v-model="HOLOT" />
                                    </div>
                                    <div class="mt-2  col-6">
                                        <label class="fw-bold">Tên</label>
                                        <input type="text" class="form-control mt-2" required v-model="TEN" />
                                    </div>
                                </div>
                                <div class="mt-2">
                                    <label class="fw-bold">Địa Chỉ</label>
                                    <input type="text" class="form-control mt-2" required v-model="DIACHI" />
                                </div>
                                <div class="mt-2">
                                    <label class="fw-bold pt-1">Password</label>
                                    <input type="password" class="form-control mt-2" required v-model="MATKHAU" />
                                </div>
                                <div class="mt-2">
                                    <label class="fw-bold">Nhập Lại Password</label>
                                    <input type="password" class="form-control" required v-model="passwordSub" />
                                </div>
                                <div class="pt-3 pb-2 d-flex justify-content-center align-items-center">
                                    <button type="submit" class="btn btn-primary" style="width: 50%;">
                                        Đăng Ký
                                    </button>
                                </div>
                            </form>
                            <div class="mt-3">
                                <router-link to="/login" class="">Đăng Nhập Tại Đây </router-link>

                            </div>
                        </div>
                        <div class="col-4 d-flex align-items-center justify-content-center">
                            <img src="../../assets/images/login/icon.jpg" alt="Icon"
                                style="max-width: 100%; max-height: 200px;">
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

