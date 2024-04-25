<script>
import { onMounted, ref } from "vue"
import Title from '~/components/Title.vue'
import { nhaXuatBanAPI } from "~/services/nhaXuatBanAPI"
import { sachAPI } from "~/services/sachAPI"
import { useToast } from "vue-toastification";
import router from "~/router";

export default {
    setup() {
        const nxb = ref([])
        const TENSACH = ref()
        const DONGIA = ref()
        const SOQUYEN = ref(0)
        const NAMXUATBAN = ref()
        const MANXB = ref()
        const TACGIA = ref()
        const toast = useToast();

        const getData = async () => {
            try {
                nxb.value = (await nhaXuatBanAPI.getAll()).data
                if (nxb.value) MANXB.value = nxb.value[0].MANXB
            } catch (err) {
                console.log(err)
            }
        }

        const clearInput = () => {
            TENSACH.value = ''
            DONGIA.value = ''
            NAMXUATBAN.value = ''
            SOQUYEN.value = 0
            MANXB.value = ''
            TACGIA.value = ''
        }

        const handleCreateBook = async () => {
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
                const { message } = await sachAPI.create({
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

                clearInput()
                await getData()
            } catch (err) {
                console.log(err)
            }
        }

        onMounted(async () => {
            document.title = 'Thêm sản phẩm mới'
            await getData()
        })

        return {
            nxb,
            TACGIA,
            MANXB,
            SOQUYEN,
            DONGIA,
            TENSACH,
            NAMXUATBAN,
            handleCreateBook
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
            <Title title="Thêm sản phẩm mới" root="Admin" />
            <div class="shadow-lg rounded" style="padding: 20px; width: 60%;">
                <div class="row">
                    <form class="admin-form mt-0" @submit.prevent="handleCreateBook">
                        <div class="mb-2">
                            <label for="name"><b>Tên sản phẩm</b></label>
                            <input type="text" class="form-control" id="name" required v-model="TENSACH">
                        </div>
                        <div class="mt-2">
                            <label for="price"><b>Đơn giá</b></label>
                            <input type="text" class="form-control" id="price" placeholder="10.000" required
                                v-model="DONGIA">
                        </div>
                        <div class="mt-2">
                            <label for="count"><b>Số quyển</b></label>
                            <input type="number" class="form-control" id="count" min="1" required v-model="SOQUYEN">
                        </div>
                        <div class="mt-2">
                            <label for="year"><b>Năm xuất bản</b></label>
                            <input type="text" class="form-control" id="year" required v-model="NAMXUATBAN">
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="my-4">
                                    <label for="author"><b>Tác giả</b></label>
                                    <input class="form-control" type="text" id="author" required v-model="TACGIA">
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="my-4">
                                    <label for="nxb"><b>Nhà xuất bản</b></label>
                                    <select id="nxb" v-if="nxb" v-model="MANXB" class="form-control">
                                        <option :value="el.MANXB" v-for="el in nxb">
                                            {{ el.TENNXB }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-primary " style="width: 30%;" type="submit">Thêm sản phẩm</button>

                        </div>
                    </form>
                </div>
            </div>
        </section>
    </div>
</template>
<!-- <style lang="scss" scoped>
@import url('./index.scss');
</style> -->