import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // user
  {
    path: '/',
    name: 'user',
    component: () => import('../views/UserBoard.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('../views/UserHome.vue')
      },
      {
        path: 'products/:category?',
        name: 'user-products',
        component: () => import('../views/UserProducts.vue')
      },
      {
        path: 'product-detail/:id',
        name: 'productDetail',
        component: () => import('../views/UserProductDetail.vue')
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('../views/UserAbout.vue')
      },
      {
        path: 'Q&A',
        name: 'Q&A',
        component: () => import('../views/UserQA.vue')
      },
      {
        path: 'reference-source',
        name: 'ReferenceSource',
        component: () => import('../views/UserReferenceSource.vue')
      }
    ]
  },
  // cart
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/UserCartBoard.vue'),
    children: [
      {
        path: '/cart',
        name: 'setp1',
        component: () => import('../views/UserCart.vue')
      },
      {
        path: 'check',
        name: 'step2',
        component: () => import('../views/UserCartCheck.vue')
      },
      {
        path: 'checkout/:buyerID',
        name: 'step3',
        component: () => import('../views/UserCartCheckout.vue')
      }
    ]
  },
  // login
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  // manager
  {
    path: '/dashboard',
    name: 'manager',
    component: () => import('../views/DashBoard.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'products',
        component: () => import('../views/ProductsView.vue')
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('../views/OrdersView.vue')
      },
      {
        path: 'coupons',
        name: 'coupons',
        component: () => import('../views/CouponsView.vue')
      }
    ]
  },
  // 404頁面
  {
    path: '/:pathMatch(.*)*',
    // 404頁面
    // component: () => import('../views/NotFount.vue')
    // 重新導向
    redirect: {
      name: 'home'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
