<script>
import Card from './Card.vue'
import Title from './Title.vue'

export default {
    components: {
        Card,
        Title
    },
    props: {
        title: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: false
        },
        data: {
            type: Array,
            required: true
        }
    },
}
</script>

<template>
    <section class="products">
        <div class="row pt-5">
            <div class="col-6">
                <Title :title="title" />
            </div>

        </div>
        <p class="products-address" v-if="address">
            <span>Địa chỉ: </span> {{ address }}
        </p>
        <div class="row text-center" v-if="data">
            <div class="col-3 my-3" v-for="item in data" :key="item._id">
                <Card :data="item" />
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import url('~/assets/scss/products.scss');
</style>