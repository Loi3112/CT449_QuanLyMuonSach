<script>
import { ref, onMounted, watch } from "vue"
import Card from '~/components/Card.vue'
import { useRoute } from "vue-router"
import { useStore } from "vuex"
import { computed } from "@vue/reactivity";
import router from "~/router";

export default {
    setup() {
        const route = useRoute()
        const store = useStore()
        const title = ref(route.query.key)
        const type = ref(route.query.type)
        const address = ref('')
        const option = ref('name')
        const data = ref([])
        const search = ref()

        const getData = async () => {
            try {
                if (type.value === 'name' || type.value === 'author') {
                    await store.dispatch('sach/search', { type: type.value, key: title.value })
                    const res = computed(() => store.state.sach.timKiem)
                    data.value = await res.value
                }
                document.title = `Từ khóa: ${title.value}`
            } catch (e) {
                console.log(e)
            }
        }

        onMounted(async () => {
            await getData()
        })

        watch(() => route.query.key, async () => {
            title.value = route.query.key
            await getData()
        })

        watch(() => route.query.type, async () => {
            type.value = route.query.type
            await getData()
        })

        const handleSearch = async () => {
            if (router) {
                router.push(`/search?key=${search.value}&type=${option.value}`);
            }
        }

        return {
            title,
            address,
            option,
            data,
            search,
            handleSearch
        }
    },
    components: {
        Card
    }
}

</script>

<template>
    <section class="row pt-5">
        <div class="col-12">
            <div class="home">
                <div class="row home-top">
                    <div class="col-7">
                        <form class="home-form" method="get" @submit.prevent="handleSearch">
                            <div class="input-group">
                                <input type="search" class="form-control" name="search"
                                    placeholder="Nhập từ khóa tìm kiếm..." v-model="search" />
                                <button class="btn btn-primary" type="submit">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </div>
                            <div class="home-form__group">
                                <div class="home-check">
                                    <input type="radio" name="search_type" id="name_book" checked value="name"
                                        v-model="option">
                                    <label for="name_book">Tên sách</label>
                                </div>
                                <div class="home-check">
                                    <input type="radio" name="search_type" id="author_book" value="author"
                                        v-model="option">
                                    <label for="author_book">Tác giả</label>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="col-12">
                        <div class="row pt-3" v-if="data">
                            <div class="col-3 text-center" v-for="item in data" :key="item._id">
                                <Card :data="item" />
                            </div>
                        </div>
                        <div class="row" v-if="!data">
                            <div class="col-12">
                                <p class="pt-4 text-center">
                                    Không tìm thấy.
                                </p>
                            </div>
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
