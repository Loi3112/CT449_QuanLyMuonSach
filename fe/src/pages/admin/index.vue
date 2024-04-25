<script>
import { onMounted, ref } from "vue"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import { docGiaAPI } from "~/services/docGiaAPI"
import { nhanVienAPI } from "~/services/nhanVienAPI"
import { sachAPI } from "~/services/sachAPI"
import { theoDoiMuonSachAPI } from "~/services/theoDoiMuonSachAPI"

ChartJS.register(ArcElement, Tooltip, Legend)
export default {
    setup() {
        const countUser = ref(0)
        const countAdmin = ref(0)
        const countBook = ref(0)
        const countLoan = ref(0)
        onMounted(async () => {
            document.title = 'Trang quản trị'
            try {
                countUser.value = (await docGiaAPI.getCount()).data
                countAdmin.value = (await nhanVienAPI.getCount()).data
                countBook.value = (await sachAPI.getCount()).data
                countLoan.value = (await theoDoiMuonSachAPI.getCount()).data
            } catch (err) {
                console.log(err)
            }

        })
        return {
            countAdmin,
            countBook,
            countLoan,
            countUser
        }
    },
    components: {
        Pie
    }
}
</script>

<template>
    <section class="admin" style="padding: 20px;">

        <h2 class="admin-title">
            Thống kê website BookTL
        </h2>
        <div class="row mt-3">

            <div class="col-12">
                <div class="row">
                    <div class="col-6">
                        <div class="admin-card">
                            <span class="admin-card__icon">
                                <i class="fa-solid fa-user text-primary"></i> </span>
                            <span class="admin-card__number">
                                {{ countUser }}
                            </span>
                            <span class="admin-card__text">
                                Đọc giả
                            </span>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="admin-card">
                            <span class="admin-card__icon">
                                <i class="fa-solid fa-user-secret text-success"></i> </span>
                            <span class="admin-card__number">
                                {{ countAdmin }}
                            </span>
                            <span class="admin-card__text">
                                Nhân viên
                            </span>
                        </div>
                    </div>
                    <div class="col-6 mt-4">
                        <div class="admin-card">
                            <span class="admin-card__icon">
                                <i class="fa-solid fa-clipboard text-danger"></i>
                            </span>
                            <span class="admin-card__number">
                                {{ countLoan }}
                            </span>
                            <span class="admin-card__text">
                                Phiếu mượn
                            </span>
                        </div>
                    </div>
                    <div class="col-6 mt-4">
                        <div class="admin-card">
                            <span class="admin-card__icon">
                                <i class="fa-solid fa-book text-warning"></i>
                            </span>
                            <span class="admin-card__number">
                                {{ countBook }}
                            </span>
                            <span class="admin-card__text">
                                Sách
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import url('./index.scss');
</style>
