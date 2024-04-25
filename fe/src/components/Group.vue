<script>
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import Card from './Card.vue'

export default {
    components: {
        Carousel,
        Navigation,
        Slide,
        Card
    },
    data: () => ({
        settings: {
            itemsToShow: 4,
            snapAlign: 'start',
            itemsToScroll: 1,
        }
    }),
    props: {
        title: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            required: true,
        },
        data: {
            type: Array,
            required: true
        }
    }
}
</script>
<template>
    <div class="group">
        <h2 class="group-title">
            {{ title }}
        </h2>
        <router-link :to="path" class="group-more">
            <span style="font-size: 18px;">Xem thêm</span>
            <i class="fa-solid fa-arrow-right pt-1"></i>
        </router-link>
    </div>
    <Carousel v-bind="settings" class="w-100">
        <Slide v-if="data" v-for="slide in data" :key="slide">
            <div class="carousel__item" style="margin: 0 10px;">
                <Card :data="slide" />
            </div>
        </Slide>

        <template #addons>
            <Navigation />
        </template>
    </Carousel>
</template>
<style lang="scss" scoped>
@import url('~/assets/scss/group.scss');
</style>