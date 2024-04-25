<script>
import Title from '~/components/Title.vue'
import { ref } from "vue"
import { nhanVienAPI } from '~/services/nhanVienAPI'
import router from "~/router";
import { useToast } from "vue-toastification";

export default {
    setup() {
        const HoTenNV = ref()
        const Password = ref()
        const ChucVu = ref()
        const DiaChi = ref()
        const SoDienThoai = ref()
        const toast = useToast();

        const handleRegister = async () => {
            const regexPass = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
            const regexSDT = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
            const pass = Password.value.trim()

            if (!regexSDT.test(SoDienThoai.value)) {
                return toast.error('Vui lòng nhập số điện thoại!', {
                    timeout: 1000
                });
            }

            if (HoTenNV.value.length < 4) {

                return toast.error('Vui lòng nhập tên tối thiểu 4 kí tự!', {
                    timeout: 1000
                });
            }

            if (!regexPass.test(pass)) {
                return toast.error('Vui lòng nhập mật khẩu chứa số, chữ thường, chữ in và ít nhất 8 kí tự!', {
                    timeout: 1000
                });
            }

            try {
                const { message } = await nhanVienAPI.register({
                    HoTenNV: HoTenNV.value,
                    Password: Password.value,
                    DiaChi: DiaChi.value,
                    SoDienThoai: SoDienThoai.value,
                    ChucVu: ChucVu.value
                })

                toast.success(message, {
                    timeout: 2000
                }); 
                router.push('/admin/account?name=admin')
            } catch (e) {
                return toast.error('Tạo tài khoản thất bại!', {
                    timeout: 1000
                });
            }
        }

        return {
            HoTenNV,
            DiaChi,
            ChucVu,
            SoDienThoai,
            Password,
            handleRegister
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
    components: {
        Title
    }
}
</script>

<template>
    <div class="admin pt-3" style="padding: 20px;">
        <Title title="Thêm tài khoản nhân viên" root="Admin" sup="Danh sách nhân viên" />
        <div class="shadow-lg rounded" style="padding: 20px; width: 60%;">
            <form class="admin-form mt-3" @submit.prevent="handleRegister">
                <div class="mt-3">
                    <label for="name" class="fw-bold">Họ tên nhân viên</label>
                    <input type="text" class="form-control mt-2" id="name" required v-model="HoTenNV">
                </div>
                <div class="mt-3">
                    <label for="chucvu" class="fw-bold">Chức vụ</label>
                    <input type="text" class="form-control mt-2" id="chucvu" required v-model="ChucVu">
                </div>
                <div class="row">
                    <div class="mt-3 col-6">
                        <label for="password" class="fw-bold">Mật khẩu</label>
                        <div class="input-group ">
                            <input :type="isShow ? 'text' : 'password'" id="password" class="form-control mt-2" required
                                v-model="Password">
                            <span class="btn pt-3" @click="handleToggleShow" v-html="isShow ? eyeIcon : eyeSlashIcon">
                            </span>
                        </div>
                    </div>
                    <div class="mt-3  col-6">
                        <label for="phone" class="fw-bold">Số điện thoại</label>
                        <input type="text" class="form-control mt-2" id="phone" required v-model="SoDienThoai">
                    </div>
                </div>
                <div class="mt-3">
                    <label for="adress" class="fw-bold">Địa chỉ</label>
                    <input type="text" class="form-control mt-2" id="adress" required v-model="DiaChi">
                </div>
                <div class="mt-4 d-flex justify-content-center">
                    <button class="btn btn-primary" style="width: 30%;" type="submit">Thêm</button>
                </div>
            </form>
        </div>
    </div>
</template>
