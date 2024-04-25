<script>
import { onMounted, ref } from "vue"
import Title from '~/components/Title.vue'
import { theoDoiMuonSachAPI } from "../../services/theoDoiMuonSachAPI"
import loadingState from "../../utils/loading"
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
    setup() {
        const title = ref('Danh sách phiếu mượn')
        const data = ref([])
        const priorityOrder = {
            '0': 0, 
            '1': 1, 
            '2': 2, 
            '3': 3  
        };
        const getData = async () => {
            loadingState.loading = true;
            try {
                const res = await theoDoiMuonSachAPI.getAll();
                if (res.data) {
                    let MADG = localStorage.getItem('MADG');
                    MADG = MADG.replace(/"/g, '');
                    res.data.forEach(item => {
                        if (item.MADOCGIA._id === MADG) {
                            data.value.push(item);
                        }
                    });
                    data.value.sort((a, b) => priorityOrder[a.TRANGTHAI.toString()] - priorityOrder[b.TRANGTHAI.toString()]);

                } else {
                    console.log('Không có dữ liệu trả về từ API.');
                }
            } catch (error) {
                console.log('Lỗi khi tải dữ liệu từ API:', error);
            } finally {
                loadingState.loading = false;
            }
        };

        const updateTitle = () => {
            document.title = title.value;
        }

        // Update title initially
        onMounted(async () => {
            updateTitle()
            await getData()
        })

        const convertDate = (time) => {
            const date = new Date(time);
            return date.toISOString().split('T')[0];
        }

        const convertState = (state) => {
            switch (state.toString()) {
                case '0':
                    return 'Chờ duyệt';
                case '1':
                    return 'Đang mượn';
                case '2':
                    return 'Đã trả';
                case '3':
                    return 'Đã hủy';
                default:
                    return 'Quá Hạn';
            }
        };

        const getCustomClass = (state) => {
            switch (state.toString()) {
                case '0':
                    return 'text-warning fw-bold';
                case '1':
                    return 'text-success fw-bold';
                case '2':
                    return 'text-primary fw-bold';
                case '3':
                    return 'text-danger fw-bold';
                default:
                    return '';
            }
        };
        const cancelRequest = async (_id) => {
            loadingState.loading = true;
            try {
                const res = await theoDoiMuonSachAPI.update(_id, 3);
                alert('Cập nhật thành công')
                location.reload()
                await getData();
            } catch (error) {
                toast.error('Cập nhật thất bại', {
                    timeout: 2000
                });
            } finally {
                loadingState.loading = false;
            }
        }

        return {
            title,
            data,
            convertDate,
            convertState,
            getCustomClass,
            cancelRequest
        }
    },
    components: {
        Title
    }
}
</script>

<template>
    <section class="admin mt-5">
        <Title :title="title" root="Admin" />
        <div class="shadow-lg mt-5 rounded" style="padding: 30px;">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên sách</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Ngày mượn</th>
                        <th scope="col">Ngày trả</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Thao tác</th>
                    </tr>
                </thead>
                <tbody v-if="data && data.length > 0">
                    <tr v-for="(item, index) in data" :key="item._id" @click="handleRowClick(item.TRANGTHAI)">
                        <td>{{ index + 1 }}</td>
                        <td>{{ item?.MASACH?.TENSACH }} </td>
                        <td>{{ item?.MADOCGIA?.DIACHI }}</td>
                        <td>{{ convertDate(item.NGAYMUON) }}</td>
                        <td>{{ convertDate(item.NGAYTRA) }}</td>
                        <td :class="getCustomClass(item.TRANGTHAI)">{{ convertState(item.TRANGTHAI) }}</td>
                        <td>
                            <button class="btn btn-danger" style="width: 100%;" @click="cancelRequest(item._id)"
                                v-if="item.TRANGTHAI === 0">Hủy</button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="8">Bạn chưa có phiếu mượn !!!.</td>
                    </tr>
                </tbody>
            </table>

        </div>
    </section>

</template>

<style lang="scss" scoped>
@import url('./index.scss');
</style>
