<script>
import { ref, onMounted, watch } from "vue"
import { Carousel, Slide } from 'vue3-carousel'
import Title from "~/components/Title.vue"
import { useRoute } from "vue-router"
import { theoDoiMuonSachAPI } from "~/services/theoDoiMuonSachAPI"
import router from "~/router";
import { useBookStore } from "../../store/bookStote"
import loadingState from "../../utils/loading"
import { useToast } from "vue-toastification";

export default {
    setup() {
        const toast = useToast();


        const bookStore = useBookStore()
        const route = useRoute()
        const title = ref(null)
        const filteredSlides = ref([])
        const currentSlide = ref(0);
        const MSB = ref(route.query.MSB)
        const data = ref(null)
        const currentDate = ref('');
        const endDate = ref('');
        const errorMessage = ref(null);



        const getData = async () => {
            loadingState.loading = true
            try {
                await bookStore.getInformation(MSB.value)
                data.value = bookStore.book
                if (data.value) {
                    title.value = data.value.TENSACH
                }
            } catch (e) {
                console.error("Lỗi khi tải dữ liệu:", e);
            }
            loadingState.loading = false
        }

        const handleSubmit = async () => {
            const start = new Date(currentDate.value)
            const end = new Date(endDate.value)
            const msg = localStorage.getItem('MADG').slice(1, -1);
            if (start.getTime() > end.getTime()) {
                toast.error('Ngày mượn phải là hiện tại hoặc tương lai', {
                    timeout: 2000
                });
            } else {
                try {
                    const res = await theoDoiMuonSachAPI.create({
                        MADOCGIA: msg,
                        MASACH: MSB.value,
                        NGAYMUON: start,
                        NGAYTRA: end
                    })
                    loadingState.loading = false
                    toast.success(res.message, {
                        timeout: 2000
                    });
                } catch (error) {
                    toast.error(error.response.data.message, {
                        timeout: 2000
                    });
                }
                loadingState.loading = false
            }

        }


        const slideTo = (index) => {
            currentSlide.value = index;
        };

        watch(data, (newValue, oldValue) => {
            if (newValue && newValue !== oldValue) {
                filteredSlides.value = newValue.hinhAnh;
            }
        });

        onMounted(async () => {
            await getData()
            document.title = title.value
            currentDate.value = getDate()
        })

        watch(() => route.query.MSB, async () => {
            MSB.value = route.query.MSB
            await getData()
        })

        const getDate = () => {
            const today = new Date();
            const year = today.getFullYear();
            let month = today.getMonth() + 1;
            let day = today.getDate();

            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;

            return `${year}-${month}-${day}`;
        }

        return {
            title,
            data,
            currentDate,
            handleSubmit,
            endDate,
            filteredSlides,
            slideTo,
            currentSlide,
            errorMessage
        }
    },
    components: {
        Carousel,
        Slide,
        Title
    }
}
</script>
<template>
    <div class="mt-3 pt-3">
        <section class="detail pt-3 pb-2" v-if="data">
            <Title :title="title" :sup="data.MANXB?.TENNXB" v-if="title" />
            <div class="shadow-lg rounded mb-5" style="padding: 20px;">
                <div class="detail-content mt-4">
                    <div class="row">
                        <div class="col-5" v-if="data.hinhAnh">
                            <div class="shadow-sm mt-1">
                                <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
                                    <Slide v-for="slide in data.hinhAnh" :key="slide">
                                        <div class="carousel__item">
                                            <img :src="slide?.TENHA" :alt="slide?.MAHA" class=""
                                                style="max-height: 350px; max-width: 400px;" />
                                        </div>
                                    </Slide>
                                </Carousel>
                            </div>


                            <div class="mt-1">
                                <Carousel id="thumbnails" :items-to-show="4" snap-align="start" v-model="currentSlide"
                                    ref="carousel">
                                    <Slide v-for="slide in data.hinhAnh" :key="slide">
                                        <div class="carousel__item" @click="slideTo(slide - 1)" style="margin: 0 5px;">
                                            <img :src="slide?.TENHA" :alt="slide?.MAHA" style="max-height: 100px;"
                                                class="detail-content__img d-block w-100">
                                        </div>
                                    </Slide>
                                </Carousel>
                            </div>
                        </div>
                        <div class="col-7 shadow-sm" style="padding: 20px;">
                            <h3 class="detail-content__title">
                                {{ title }}
                            </h3>
                            <div class="row">
                                <div class="col-6">
                                    <p >
                                        <b>Nhà xuất bản:</b> <span>{{ data.MANXB?.TENNXB }}</span>
                                    </p>
                                </div>
                                <div class="col-6">
                                    <p >
                                        <b>Tác giả:</b> <span>{{ data.TACGIA }}</span>
                                    </p>
                                </div>
                            </div>
                            <p style="font-size: 30px; color: red;">
                                {{ data.DONGIA.toLocaleString('vi-VN') }}₫
                            </p>
                            <p >
                                <b>Số lượng:</b> <span>{{ data.SOQUYEN }}</span>
                            </p>
                            <p>
                                <b>Năm xuất bản:</b> <span>{{ data.NAMXUATBAN }}</span>
                            </p>
                            <p><b>Chính sách đổi trả</b> <a class="" data-bs-toggle="offcanvas" href="#offcanvasExample"
                                    role="button" aria-controls="offcanvasExample">
                                    xem thêm
                                </a></p>
                            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample"
                                aria-labelledby="offcanvasExampleLabel">
                                <div class="offcanvas-header">
                                    <h5 class="offcanvas-title" id="offcanvasExampleLabel">Chính sách đổi trả</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas"
                                        aria-label="Close"></button>
                                </div>
                                <div class="offcanvas-body">
                                    <div>
                                        <p>Chúng tôi luôn trân trọng sự tin tưởng và ủng hộ của quý khách hàng khi trải
                                            nghiệm
                                            mua
                                            hàng. Do đó chúng tôi luôn cố gắng hoàn thiện dịch vụ tốt nhất để phục vụ
                                            mọi nhu cầu mua sắm của quý khách.</p>

                                        <p> Chúng tôi luôn luôn cam kết tất cả các sản phẩm bán 100% là
                                            những sản phẩm chất lượng và xuất xứ nguồn gốc rõ ràng, hợp pháp cũng như an
                                            toàn
                                            cho
                                            người tiêu dùng. Để việc mua sắm của quý khách là trải nghiệm dịch vụ
                                            thân thiện, chúng tôi hy vọng quý khách sẽ kiểm tra kỹ các nội dung sau
                                            trước
                                            khi
                                            nhận
                                            hàng:
                                        </p>
                                        <p> Thông tin sản phẩm: tên sản phẩm và chất lượng sản phẩm. Số lượng sản phẩm.
                                            Thông
                                            tin sản phẩm, người nhận (Đối chiếu với thông tin trên phiếu giao hàng được
                                            bỏ
                                            trong hộp) trong lúc nhận hàng trước khi ký nhận và thanh toán tiền cho nhân
                                            viên
                                            giao
                                            nhận.
                                        </p>

                                        <p> Trong trường hợp hiếm hoi sản phẩm quý khách nhận được có khiếm khuyết, hư
                                            hỏng
                                            hoặc
                                            không như mô tả, chúng tôi cam kết bảo vệ khách hàng bằng chính sách đổi
                                            trả/
                                            hoàn
                                            tiền
                                            trên tinh thần bảo vệ quyền lợi người tiêu dùng nhằm cam kết với quý khách
                                            về
                                            chất
                                            lượng
                                            sản phẩm và dịch vụ của chúng tôi.</p>

                                        <p>Khi quý khách hàng có hàng hóa mua tại web cần đổi/ trả/bảo hành/hoàn tiền,
                                            xin
                                            quý khách hàng liên hệ với chúng tôi qua hotline 0354544707 hoặc gửi vào hộp
                                            thư
                                            điện tử
                                            loib2014582@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal">
                                    Thuê sách
                                </button>

                                <div class="modal fade" id="exampleModal" tabindex="-1"
                                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Tạo Phiếu Mượn</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <form @submit.prevent="handleSubmit">
                                                    <div class="row pt-3">
                                                        <div class="col-3">
                                                            <label for="ngaymuon">Ngày mượn: </label>
                                                        </div>
                                                        <div class="col-9">
                                                            <input class="form-control" type="date" name="ngaymuon"
                                                                id="ngaymuon" v-model="currentDate" disabled>
                                                        </div>
                                                    </div>
                                                    <div class="row pt-3">
                                                        <div class="col-3">
                                                            <label for="ngaytra">Ngày trả: </label>
                                                        </div>
                                                        <div class="col-9">
                                                            <input class="form-control" type="date" name="ngaytra"
                                                                id="ngaytra" v-model="endDate" required>
                                                        </div>
                                                    </div>
                                                    <div class="row pt-3">
                                                        <div class="col-3">
                                                            <label for="soluong">Số lượng: </label>
                                                        </div>
                                                        <div class="col-9">
                                                            <input type="number" class="form-control" name="soluong"
                                                                id="soluong" value="1" disabled>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex justify-content-center pt-3">
                                                        <button type="submit" class="btn btn-primary"
                                                            data-bs-dismiss="modal">Submit</button>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary"
                                                    data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
