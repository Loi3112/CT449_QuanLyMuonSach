<script>
import { ref, onMounted, watch } from "vue"
import Products from '~/components/Products.vue'
import { useRoute } from "vue-router"
import router from "~/router"
import { useStore } from "vuex"
import { sachAPI } from "~/services/sachAPI"
import { computed } from "@vue/reactivity";

export default {
    setup() {
        const route = useRoute()
        const store = useStore()
        const title = ref('')
        const page = ref(parseInt(route.query.page) || 1)
        const name = ref(route.query.name)
        const data = ref([])
        const count = ref(0)

        const getData = async () => {
            try {
                let res
                switch (name.value) {
                    case 'new':
                        title.value = 'Sản phẩm mới'
                        await store.dispatch('sach/getAll', { page: page.value, limit: 8 })
                        res = computed(() => store.state.sach.tatCaSach)
                        count.value = (await sachAPI.getCount()).data
                        count.value = Math.ceil(count.value / 8)
                        break
                    case 'random':
                        title.value = 'Sản phẩm đề xuất'
                        await store.dispatch('sach/getRandom')
                        res = computed(() => store.state.sach.random)
                        break
                    default:
                        router.push('/')
                }
                data.value = await res.value
                document.title = title.value
            } catch (e) {
                console.log(e)
            }
        }

        onMounted(async () => {
            await getData()
        })

        watch(() => route.query.page, () => {
            page.value = parseInt(route.query.page)
        })

        watch(() => route.query.name, async () => {
            name.value = route.query.name
            await getData()
        })

        return {
            title,
            page,
            name,
            count,
            data
        }
    },
    components: {
        Products
    }
}
</script>

<template>
   <div >
    <Products :title="title" :name="name" :data="data" v-if="data" />
    <div class="center mb-2" v-if="count">
        <ul class="products-list">
            <li v-for="i in count" :class="{ 'active': page === i }">
                <router-link :to="`/books?name=${name}&page=${i}`">
                    {{ i }}
                </router-link>
            </li>
        </ul>
    </div>
   </div>
</template>
<!-- 
<style lang="scss" scoped>
@import url('./index.scss');
</style> -->