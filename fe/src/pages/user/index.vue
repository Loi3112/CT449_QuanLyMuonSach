<script>
import { ref, onMounted } from "vue"
import Title from "~/components/Title.vue"
import Table from "./Table.vue"
import { useRoute } from "vue-router"
import { docGiaAPI } from "~/services/docGiaAPI"
import router from "~/router";

export default {
    setup() {
        const route = useRoute()
        const tenKH = ref('')
        const hoKH = ref('')
        const diaChi = ref('')
        const phone = ref('')
        const changeTab = ref(0)
        const isAction = ref(true)
        const ngaySinh = ref('')
        const gioiTinh = ref(1)
        const isDisabled = ref(true)
        const MADG = ref(route.query.MADG)

        const convertDate = (date) => {
            const dateObject = new Date(date);
            const year = dateObject.getFullYear();
            const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
            const day = dateObject.getDate().toString().padStart(2, '0');

            ngaySinh.value = `${year}-${month}-${day}`;
        }

        const getData = async () => {
            try {
                if (!MADG) {
                    router.push('/')
                }
                const data = await docGiaAPI.getInfo(route.query.MADG)
                if (data) {
                    tenKH.value = data.TEN
                    hoKH.value = data.HOLOT
                    convertDate(data.NGAYSINH)
                    gioiTinh.value = data.PHAI
                    diaChi.value = data.DIACHI
                    phone.value = data.DIENTHOAI
                } else {
                    // router.push('/')
                }
            } catch (err) {
                console.log(err)
            }
        }


        const updateData = async () => {
            try {
                console.log(MSDG.value)
                const { data, message } = await docGiaAPI.update(MSDG.value, {
                    HOLOT: hoKH.value,
                    TEN: tenKH.value,
                    DIACHI: diaChi.value,
                    NGAYSINH: ngaySinh.value,
                    PHAI: +gioiTinh.value
                })
                alert(message)

                if (data) {
                    await getData()
                } else {
                    route.push('/')
                }
            } catch (err) {
                console.log(err)
            }
        }

        onMounted(async () => {
            await getData()
            document.title = 'Trang cá nhân'
        })

        const handleChangeTab = async (id) => {
            changeTab.value = id
            if (id === 0) isAction.value = true
            else isAction.value = false
        }

        const checkActive = async (id) => changeTab.value === id

        const toggleEdit = async () => {
            isDisabled.value = !isDisabled.value
        }

        const handleLoggout = async () => {
            localStorage.removeItem('MADG')
            router.push('/login')
        }

        return {
            tenKH,
            diaChi,
            phone,
            changeTab,
            handleChangeTab,
            isAction,
            checkActive,
            hoKH,
            ngaySinh,
            gioiTinh,
            isDisabled,
            toggleEdit,
            updateData,
            handleLoggout
        }
    },
    components: {
        Title,
        Table
    }
}
</script>

<template>
    <div class="shadow" style="padding: 30px;">
        <div class="pt-5">
        <section class="user py-3">
            <Title title="Trang cá nhân" />
            <div class="row shadow-lg rounded" style="padding: 30px;">
                <div class="col-4 pt-4">
                    <div class="user-avatar">
                        <span class="user-avatar__icon">
                            <i class="fa-regular fa-user"></i>
                        </span>
                    </div>
                </div>
                <div class="col-8">
                    <form class="user-info" @submit.prevent="async () => await updateData()">
                        <fieldset :disabled="isDisabled" class="py-3">
                            <div class="row">
                                <div class="col-6">
                                    <label for="hoLot">Họ </label>
                                    <input type="text" id="hoLot" class="form-control" v-model="hoKH">
                                </div>
                                <div class="col-6">
                                    <label for="ten">Tên</label>
                                    <input type="text" id="ten" class="form-control" v-model="tenKH">
                                </div>
                            </div>
                            <label for="soDT">Số điện thoại</label>
                            <input type="text" id="soDT" class="form-control" v-model="phone" readonly>
                            <label for="diaChi">Dịa chỉ</label>
                            <input type="text" id="diaChi" class="form-control" v-model="diaChi">
                        </fieldset>

                    </form>
                </div>
            </div>
            <div class="user-tab">
                <div class="user-tab__content">
                    <Table :isAction="isAction" />
                </div>
            </div>
        </section>
    </div>
    </div>
</template>

<style lang="scss" scoped>
@import url('./index.scss');
</style>