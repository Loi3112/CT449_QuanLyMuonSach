<script>
import CarouselHome from './CarouselHome.vue'
import Group from '~/components/Group.vue'
import { onMounted, ref } from 'vue';
import { useStore } from "vuex"
import { computed } from "@vue/reactivity";
export default {
    components: {
        
        CarouselHome,
        Group
    },
    setup() {
        const store = useStore()
        const newBooks = ref([])
        const randomBooks = ref([])

        onMounted(async () => {
            document.title = 'Trang chủ'
            await getNewBooks()
            await getRandomBooks()
        })

        const getNewBooks = async () => {
            try {
                await store.dispatch('sach/getAll', { page: 1 })
                const res = computed(() => store.state.sach.tatCaSach)
                newBooks.value = await res.value
            } catch (err) {
                console.log(err)
            }
        }

        const getRandomBooks = async () => {
            try {
                await store.dispatch('sach/getRandom')
                const res = computed(() => store.state.sach.random)
                randomBooks.value = await res.value
            } catch (err) {
                console.log(err)
            }
        }

        return {
            newBooks,
            randomBooks
        }
    }
}

</script>

<template>
    <section class="home py-4">
        <CarouselHome />
     
        <div class="my-2" v-if="newBooks">
            <Group title="Sản phẩm mới" path="/books?name=new&page=1" :data="newBooks" />
        </div>
        <div class="my-2">
            <Group title="Sản phẩm đề xuất" path="/books?name=random" :data="randomBooks" />
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import url('./index.scss');
</style>
