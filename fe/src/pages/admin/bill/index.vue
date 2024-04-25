<script>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import Title from '~/components/Title.vue';
import { theoDoiMuonSachAPI } from "../../../services/theoDoiMuonSachAPI";
import loadingState from "../../../utils/loading";
import { useToast } from "vue-toastification";

export default {
    setup() {
        const route = useRoute();
        const title = ref('Danh sách phiếu mượn');
        const data = ref([]);
        const searchPhoneNumber = ref('');
        const toast = useToast();

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
                    data.value = res.data;
                    data.value.forEach(item => {
                        item.priority = priorityOrder[item.TRANGTHAI.toString()];
                    });
                    data.value.sort((a, b) => a.priority - b.priority);
                } else {
                    console.log('Không có dữ liệu trả về từ API.');
                }
            } catch (e) {
                console.log('Lỗi khi tải dữ liệu từ API:', e);
            }
            loadingState.loading = false;
        };

        const updateTitle = () => {
            document.title = title.value;
        };

        onMounted(async () => {
            updateTitle();
            await getData();
        });

        watch(() => route.query.action, async () => {
            updateTitle();
            await getData();
        });

        const convertDate = (time) => {
            const date = new Date(time);
            return date.toISOString().split('T')[0];
        };

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

        const handleCheck = async (_id, TRANGTHAI, item) => {
            loadingState.loading = true;
            try {
                const res = await theoDoiMuonSachAPI.update(_id, TRANGTHAI);
                toast.success('Cập nhật thành công', {
                    timeout: 2000
                });
                await getData();
            } catch (error) {
                console.error("Lỗi khi xử lý yêu cầu PUT:", error);
            }
            loadingState.loading = false;
        };

        const searchByPhoneNumber = () => {
            const searchTerm = searchPhoneNumber.value.toLowerCase();
            if (!searchTerm.trim()) {
                return data.value;
            } else {
                return data.value.filter(item => {
                    const phoneNumber = item?.MADOCGIA?.DIENTHOAI.toLowerCase();
                    return phoneNumber.includes(searchTerm);
                });
            }
        };

        return {
            title,
            data,
            convertDate,
            convertState,
            handleCheck,
            updateTitle,
            getCustomClass,
            searchPhoneNumber,
            searchByPhoneNumber
        };
    },
    components: {
        Title
    }
};
</script>

<template>
    <section class="admin">
        <Title :title="title" root="Admin" />
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Nhập vào số điện thoại đọc giả..."
                v-model="searchPhoneNumber">
        </div>
        <div class="shadow-lg rounded mt-4" style="padding: 20px;">
            <table class="table table-striped" style="white-space: nowrap;">
                <thead>
                    <tr>
                        <th scope="col" class="fw-bold">#</th>
                        <th scope="col" class="fw-bold">Tên độc giả</th>
                        <th scope="col" class="fw-bold">Tên sách</th>
                        <th scope="col" class="fw-bold">Địa chỉ</th>
                        <th scope="col" class="fw-bold">Số điện thoại</th>
                        <th scope="col" class="fw-bold">Ngày mượn</th>
                        <td></td>
                    </tr>
                </thead>
                <tbody v-if="data && data.length > 0">
                    <tr v-for="(item, index) in searchByPhoneNumber()" :key="item._id"
                        @click="handleRowClick(item.TRANGTHAI)">
                        <td>{{ index + 1 }}</td>
                        <td>{{ item?.MADOCGIA?.HOLOT }} {{ item?.MADOCGIA?.TEN }}</td>
                        <td>{{ item?.MASACH?.TENSACH }}</td>
                        <td>{{ item?.MADOCGIA?.DIACHI }}</td>
                        <td>{{ item?.MADOCGIA?.DIENTHOAI }}</td>
                        <td>
                            {{ convertDate(item.NGAYMUON) }}<br>
                            <hr class="pt-0 mt-0 mb-1">
                            {{ convertDate(item.NGAYTRA) }}<br>
                            <hr class="pt-0 mt-0 mb-1">

                            <span :class="getCustomClass(item.TRANGTHAI)">{{ convertState(item.TRANGTHAI) }}</span>
                            
                        </td>

                        <td>
                            <button class="btn btn-warning" @click="handleCheck(item?._id, 1, item)"
                                v-if="item.TRANGTHAI === 0" style="width: 100%;">Duyệt</button>
                            <button class="btn btn-success" @click="handleCheck(item?._id, 2, item)"
                                v-if="item.TRANGTHAI === 1" style="width: 100%;">Xác nhận trả</button>
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>
    </section>
</template>
