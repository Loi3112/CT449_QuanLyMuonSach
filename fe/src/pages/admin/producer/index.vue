<script>
import { onMounted, ref } from "vue"
import Title from '~/components/Title.vue'
import { nhaXuatBanAPI } from "~/services/nhaXuatBanAPI"
import { useToast } from "vue-toastification";

export default {
    setup() {
        const title = ref(null)
        const TENNXB = ref('')
        const DIACHI = ref('')
        const MANXB = ref('')
        const data = ref([])
        const isEdit = ref(false)
        const toast = useToast();

        const getData = async () => {
            try {
                data.value = (await nhaXuatBanAPI.getAll()).data
            } catch (err) {
                console.log(err)
            }
        }

        onMounted(async () => {
            document.title = 'Danh sách nhà xuất bản'
            await getData()
        })

        const handleClick = async (action, data = null) => {
            if (action === 'add') {
                title.value = 'Thêm nhà xuất bản'
                isEdit.value = false
                TENNXB.value = ''
                DIACHI.value = ''
            } else {
                isEdit.value = true
                title.value = 'Chỉnh sửa thông tin nhà xuất bản'
                TENNXB.value = data.TENNXB
                MANXB.value = data.MANXB
                DIACHI.value = data.DIACHI
            }
        }

        const handleSubmit = async () => {
            try {
                let message

                if (isEdit.value) {
                    const res = await nhaXuatBanAPI.update(MANXB.value, {
                        TENNXB: TENNXB.value,
                        DIACHI: DIACHI.value
                    })
                    message = res.message
                } else {
                    const res = await nhaXuatBanAPI.create({
                        TENNXB: TENNXB.value,
                        DIACHI: DIACHI.value
                    })
                    message = res.message
                }
                toast.success(message, {
                    timeout: 2000
                }); 
                await getData()
            } catch (err) {
                console.log(err)
            }
        }

        return {
            handleClick,
            title,
            TENNXB,
            DIACHI,
            MANXB,
            data,
            handleSubmit
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
            <div class="producer">
                <div class="producer-text">
                    <Title title="Danh sách nhà xuất bản" root="Admin" />
                </div>

            </div>
            <div class="mt-3 mb-4">
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#form"
                    @click="handleClick('add')">
                    <i class="fa-solid fa-plus"></i> <span>Thêm nhà xuất bản</span>
                </button>
            </div>
            <div class="shadow-lg rounded" style="padding: 20px;">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col"><b>STT </b></th>
                            <th scope="col"><b>Tên nhà xuất bản</b></th>
                            <th scope="col"><b>Địa chỉ</b></th>
                            <th scope="col"><b>Số quyển</b></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>

                    <tbody v-if="data">
                        <tr v-for="(el, i) in data" :key="el._id">
                            <td>{{ i + 1 }}</td>
                            <td>{{ el.TENNXB }}</td>
                            <td>{{ el.DIACHI }}</td>
                            <td>{{ el.count }}</td>
                            <td>
                                <button data-bs-toggle="modal" data-bs-target="#form" class="btn btn-success"
                                    @click="handleClick('edit', el)">
                                    <i class="fa-solid fa-pen"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="modal fade" id="form" tabindex="-1" aria-labelledby="formLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="formLabel">
                                <b>{{ title }} </b>
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="admin-form" @submit.prevent="handleSubmit">
                                <div class="mb-2">
                                    <label class="mb-1" for="name"><b>Tên nhà xuất bản</b></label>
                                    <input class="form-control" type="text" id="name" v-model="TENNXB">
                                </div>
                                <div class="mb-1">
                                    <label class="mb-1" for="address"><b>Địa chỉ</b></label>
                                    <input class="form-control" type="text" id="address" v-model="DIACHI">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary text-light" data-bs-dismiss="modal"
                                @click="handleSubmit">OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
