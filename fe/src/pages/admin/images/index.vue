<script>
import { onMounted, ref } from "vue"
import Title from '~/components/Title.vue'
import { useRoute } from "vue-router"
import { hinhAnhAPI } from "~/services/hinhAnhAPI"
import { useToast } from "vue-toastification";
export default {
  setup() {
    const route = useRoute()
    const titleModal = ref('Chỉnh sửa')
    const MSB = ref(route.query.MSB)
    const TENHA = ref()
    const data = ref([])
    const MAHA = ref()
    const toast = useToast();

    const getData = async () => {
      try {
        if (MSB) {
          data.value = (await hinhAnhAPI.getByBook(MSB.value)).data
        }
      } catch (err) {
        console.log(err)
      }
    }

    onMounted(async () => {
      document.title = 'Danh sách hình ảnh'
      await getData()
    })

    const updateHinhAnh = async () => {
      try {
        const { message } = await hinhAnhAPI.update(MAHA.value, {
          TENHA: TENHA.value.trim(),
          MASACH: MSB.value
        })
        toast.success(message, {
          timeout: 2000
        });
      } catch (err) {
        console.log(err)
      }
    }

    const createHinhAnh = async () => {
      try {
        const { message } = await hinhAnhAPI.create({
          TENHA: TENHA.value.trim(),
          MASACH: MSB.value
        })
        toast.success(message, {
          timeout: 2000
        });
      } catch (err) {
        console.log(err)
      }
    }

    const handleClick = async (data = null) => {
      if (data) {
        titleModal.value = 'Chỉnh sửa'
        MAHA.value = data.MAHA
        TENHA.value = data.TENHA
        MSB.value = data.MASACH
      } else {
        titleModal.value = 'Thêm'
        TENHA.value = ''
      }
    }

    const handleSubmit = async () => {
      if (titleModal.value == 'Chỉnh sửa') {
        await updateHinhAnh()
      } else {
        await createHinhAnh()
      }

      TENHA.value = ''
      await getData()
    }

    const handleDelete = async (id) => {
      const check = confirm("Bạn có muốn xóa hình ảnh này")
      if (check) {
        try {
          const { message } = await hinhAnhAPI.delete(id)
          toast.success(message, {
            timeout: 2000
          });
           await getData()
        }
        catch (err) {
          console.log(err)
        }
      }
    }

    return {
      handleClick,
      MSB,
      titleModal,
      TENHA,
      data,
      MAHA,
      handleSubmit,
      handleDelete
    }
  },
  components: {
    Title
  }
}
</script>
<template>
  <section class="pt-3">
    <div class="admin-top">
      <div>
        <Title title="Danh sách hình ảnh" root="Admin" sup="Danh sách sản phẩm" />
      </div>

    </div>
    <div class="mt-2 mb-3">
      <button data-bs-toggle="modal" data-bs-target="#action" class="btn btn-primary" @click="handleClick()">
        <i class="fa-solid fa-plus"></i> Thêm hình ảnh
      </button>
    </div>
    <div class="shadow-lg rounded" style="padding: 20px;">
      <table class="table">
        <thead>
          <tr>
            <th scope="col" class="fw-bold">STT</th>
            <th scope="col" class="fw-bold ">URL hình ảnh</th>
            <th scope="col" class="text-center fw-bold col-2">Hình ảnh </th>
            <th scope="col" class="fw-bold"></th>
          </tr>
        </thead>
        <tbody v-if="data">
          <tr v-for="(el, i) in data" :key="el._id">
            <td>{{ i + 1 }}</td>
            <td class="text-truncate" style="max-width: 650px;">{{ el.TENHA }}</td>
            <td class="text-center">
              <div class="d-inline-block">
                <img :src="el.TENHA" :alt="el.TENHA" class="img-fluid" style="max-width: 100px;">
              </div>
            </td>

            <td>
              <button data-bs-toggle="modal" data-bs-target="#action" class="btn btn-outline-primary me-2"
                @click="handleClick(el)">
                <i class="fa-solid fa-pen"></i>
              </button>
              <button class="btn btn-outline-danger" @click="handleDelete(el.MAHA)">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
    <div class="modal fade" id="action" tabindex="-1" aria-labelledby="actionLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="actionLabel">
              {{ titleModal }} hình ảnh
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <label for="url">URL hình ảnh</label>
              <input type="text" class="form-control" id="url" required v-model="TENHA">
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-warning text-light" data-bs-dismiss="modal"
              @click="handleSubmit">OK</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
