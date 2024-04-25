import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from '~/layouts/DefaultLayout.vue';
import FormLayout from '~/layouts/FormLayout.vue';
import AdminLayout from '~/layouts/AdminLayout.vue';
import Home from '~/pages/home/index.vue'
import User from '~/pages/user/index.vue'
import Products from '~/pages/products/index.vue'
import Producers from '~/pages/producers/index.vue'
import Search from '~/pages/search/index.vue'
import Detail from '~/pages/detail/index.vue'
import Admin from '~/pages/admin/index.vue'
import Product from '~/pages/admin/product/index.vue'
import Producer from '~/pages/admin/producer/index.vue'
import Images from '~/pages/admin/images/index.vue'
import Account from '~/pages/admin/account/index.vue'
import CreateBook from '~/pages/admin/createBook/index.vue'
import CreateAdmin from '~/pages/admin/createAdmin/index.vue'
import Bill from '~/pages/admin/bill/index.vue'
import Login from '~/pages/form/login.vue'
import Register from "~/pages/form/register.vue";

const requireAdmin = (to, from, next) => {
  const data = localStorage.getItem('MANV');
  if (data) {
    next()
  } else {
    next({ name: "loginAdmin", params: {} })
  }
};

const requireUser = (to, from, next) => {
  const data = localStorage.getItem('MADG');
  if (data) {
    next()
  } else {
    next({ name: "login", params: {} })
  }
};

const routes = [
  {
    path: '',
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "home",
        component: Home,
      },
      {
        path: "detail",
        name: "detail",
        component: Detail,
      },
      {
        path: "search",
        name: "search",
        component: Search,
      },
      {
        path: "books",
        name: "books",
        component: Products
      },
      {
        path: "authors",
        name: "authors",
        component: Producers
      }
    ]
  },
  {
    path: '',
    component: DefaultLayout,
    beforeEnter: requireUser,
    children: [

      {
        path: 'user',
        name: "user",
        component: User
      }
    ]
  },
  {
    path: '',
    component: FormLayout,
    children: [
      {
        path: "login",
        children: [
          {
            path: 'admin',
            name: 'loginAdmin',
            component: Login,
          },
          {
            path: '',
            name: 'login',
            component: Login,
          },
        ]
      },
      {
        path: "register",
        name: "register",
        component: Register,
      }
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    beforeEnter: requireAdmin,
    children: [
      {
        path: "",
        name: "admin",
        component: Admin,
      },
      {
        path: "account",
        name: "account",
        component: Account,
      },
      {
        path: "products",
        name: "products",
        component: Product,
      },
      {
        path: "createBook",
        name: "createBook",
        component: CreateBook,
      },
      {
        path: "images",
        name: "images",
        component: Images,
      },
      {
        path: "bills",
        name: "bills",
        component: Bill,
      },
      {
        path: "producer",
        name: "producer",
        component: Producer
      },
      {
        path: "createAdmin",
        name: "createAdmin",
        component: CreateAdmin
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  next()
})

export default router;
