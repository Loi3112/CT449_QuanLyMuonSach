<script setup>
const { title, root, sup } = defineProps({
    title: {
        required: true,
        type: String
    },
    root: {
        required: false,
        type: String,
        default: 'Trang chủ'
    },
    sup: {
        required: false,
        type: String,
    }
})
</script>

<template>
    <h2 class="title">{{ title }}</h2>
    <p class="sub">
        <span>{{ root }}</span>
        <span v-if="sup"> / </span>
        <span v-if="sup"> {{ sup }} </span>
        <span> / </span>
        <span> {{ title }} </span>
    </p>
</template>

<style lang="scss" scoped>
.sub {
    span {
        font-size: 15px;

        &:last-child {
            color: dimgray;
        }
    }
}
</style>