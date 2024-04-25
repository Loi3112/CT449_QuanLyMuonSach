<script>
export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    }
}
</script>

<template>
    <div class="card shadow-lg rounded mt-3" style="width: 300px; margin-left: 10px;  margin-right: 10px; padding: 0;"
        v-if="data && data.SOQUYEN > 0">
        <div class="card-body">
            <h5 class="card-title">
                <router-link :to="`/detail?MSB=${data.MASACH}`" class="card-link">
                    <img :src="data?.hinhAnh[0]?.TENHA" class="card-img-top" :alt="data.TENSACH"
                        style="object-fit: contain; height: 300px; width: 100%;">
                    <h5 class="pt-1">
                        {{ data.TENSACH }}
                    </h5>
                </router-link>
            </h5>
            <p class="card-text">
                <span>Số lượng còn lại: </span>{{ data.SOQUYEN }}
            </p>
        </div>
    </div>

</template>

<style lang="scss" scoped>
@import url('~/assets/scss/card.scss');
</style>
