<script>
import Logo from '../components/Logo.vue'
import { ref, onMounted, computed } from "vue";
import router from '~/router';
import Loading from '~/components/Loading.vue';
import { docGiaAPI } from '~/services/docGiaAPI';
import { nhaXuatBanAPI } from '~/services/nhaXuatBanAPI';

export default {
  setup() {
    const isLoading = ref(false);
    const search = ref('');
    const MADG = ref(null);
    const nxb = ref([]);
    const tenDocGia = ref('');
    const handleSearch = async () => {
      if (router) {
        router.push(`/search?key=${search.value}&type=name`);
      }
    }

    const getDataNXB = async () => {
      try {
        const response = await nhaXuatBanAPI.getAll();
        nxb.value = response.data;
      } catch (err) {
        console.log(err);
      }
    }

    const getDataDG = async () => {
      const MADG = localStorage.getItem('MADG');
      if (MADG) {
        try {
          const res = await docGiaAPI.getInfo(JSON.parse(MADG));
          tenDocGia.value = res.HOLOT + ' ' + res.TEN;

        } catch (err) {
          console.log(err)
        }
      }
    }


    onMounted(async () => {
      await getDataDG()
    })

    onMounted(async () => {
      const data = localStorage.getItem('MADG');
      await getDataNXB();
      if (data) {
        MADG.value = JSON.parse(data);
      }
    });

    const validMADG = computed(() => MADG.value !== null && MADG.value !== undefined && MADG.value.length > 0);
    const idx = computed(() => MADG.value || 'defaultValue');

    const handleScrollTop = async () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
    const handleLoggout = async () => {
      localStorage.removeItem('MADG')
      router.push('/login')
    }
    return {
      search,
      handleSearch,
      handleScrollTop,
      isLoading,
      MADG,
      validMADG,
      idx,
      nxb,
      tenDocGia,
      handleLoggout
    }
  },
  components: {
    Logo,
    Loading
  }
}
</script>

<template>

  <Loading v-if="isLoading" />
  <header style="height: 90px;">
    <div class="container py-2">
      <nav class="header">
        <div class=" pt-1">
          <Logo />
        </div>
        <div class="pt-3">
          <a class="ms-3 text-white text-decoration-none" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLeft"
            aria-controls="offcanvasLeft" style="cursor: pointer;">
            <i class="fa-solid fa-address-book" style="font-size: 20px;"></i>
            &nbsp;
            <b>Nhà Xuất Bản</b>
          </a>
        </div>
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasLeft" aria-labelledby="offcanvasLeftLabel">
          <div class="offcanvas-header">
            <h5 id="offcanvasLeftLabel" style="font-weight: 600;">Nhà Xuất Bản</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <nav class="list">
              <router-link v-if="nxb" v-for="(el, i) in nxb" :key="el._id" :to="`/authors?nxb=${el.MANXB}`"
                class="list__item">
                <hr>
                {{ el.TENNXB }}
                <hr>
              </router-link>
            </nav>
          </div>
        </div>

        <div class="pt-3">
          <form class="d-flex" method="get" @submit.prevent="handleSearch">
            <div class="input-group" >
              <input type="search" name="search" v-model="search" class="form-control" required
                placeholder="Tìm kiếm sản phẩm...">
              <button type="submit" class="btn btn-secondary">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </form>

        </div>

        <div class="d-flex align-items-center justify-content-end">
          <span class="text-white me-3" style="font-size: 40px;">
            <i class="fa-solid fa-circle-user"></i>
          </span>
          <div class="dropdown">
            <a class="text-decoration-none dropdown-toggle text-black text-white" type="button"
              data-bs-toggle="dropdown" aria-expanded="false" style="font-size: 18px;">
              {{ tenDocGia ? tenDocGia : 'Tài Khoản' }}
            </a>
            <ul class="dropdown-menu bg-secondary" style="height: 36px;">
              <router-link :to="validMADG ? `/user?MADG=${idx}` : 'login'" class="text-decoration-none ">
                <p class="text-center text-white"> Thông tin tài khoản</p>
              </router-link>
            </ul>
            &nbsp; &nbsp;

            <a v-if="tenDocGia" class="text-white" style="font-size: 18px; cursor: pointer;" @click="handleLoggout">
              <i class="fa-solid fa-right-from-bracket"></i>
            </a>

          </div>
        </div>

      </nav>
    </div>
  </header>
  <main class="container" style="margin-top: 60px;">
    <router-view />
  </main>
</template>

<style lang="scss" scoped>
@import url('~/assets/scss/default.scss');
</style>
