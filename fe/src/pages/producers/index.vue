<script>
import { ref, onMounted, watch } from "vue"
import Products from '~/components/Products.vue'
import { useRoute } from "vue-router"
import router from "~/router"
import { useStore } from "vuex"
import { computed } from "@vue/reactivity";
import { nhaXuatBanAPI } from '~/services/nhaXuatBanAPI'

export default {
    setup() {
        const route = useRoute()
        const store = useStore()
        const title = ref('')
        const MNXB = ref(route.query.nxb)
        const data = ref([])
        const address = ref(null)

        const getInfo = async () => {
            try {
                const info = (await nhaXuatBanAPI.getOne(MNXB.value)).data
                if (info) {
                    title.value = info?.TENNXB
                    address.value = info?.DIACHI
                }
            } catch (e) {
                console.log(e)
            }
        }

        const getData = async () => {
            try {
                if (!MNXB.value) {
                    router.push('/')
                }
                await getInfo()
                await store.dispatch('sach/getAllByNXB', { MANXB: MNXB.value, limit: 8 })
                const res = computed(() => store.state.sach.sachByNXB)
                data.value = await res.value
                document.title = title.value
            } catch (e) {
                console.log(e)
            }
        }

        onMounted(async () => {
            await getData()
        })

        watch(() => route.query.nxb, async () => {
            MNXB.value = route.query.nxb
            await getData()
        })

        return {
            title,
            data,
            address
        }
    },
    components: {
        Products
    }
}
</script>

<template>
    <Products :title="title" :data="data" v-if="data" :address="address" />
</template>
