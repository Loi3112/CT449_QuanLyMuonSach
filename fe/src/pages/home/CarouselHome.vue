<script>
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
export default {
    components: {
        Carousel,
        Navigation,
        Pagination,
        Slide
    }

}
</script>
<template>
    <div class="shadow-sm">
        <div id="carouselExample" class="carousel slide">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="../../assets/images/slide/slide1.jpg" height="300px" width="100%" class="d-block w-100" alt="1">
            </div>
            <div class="carousel-item">
                <img src="../../assets/images/slide/slide2.jpg" height="300px" width="100%" class="d-block w-100" alt="2">
            </div>
            <div class="carousel-item">
                <img src="../../assets/images/slide/slide3.jpg" height="300px" width="100%" class="d-block w-100" alt="3">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    </div>
</template>

<style lang="scss" scoped>
.carousel__item {
    height: 50vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
}

.carousel__slide {
    padding: 10px;
}

.carousel__prev,
.carousel__next {
    box-sizing: content-box;
}
</style>