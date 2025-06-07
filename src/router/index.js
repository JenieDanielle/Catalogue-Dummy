import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CardView from '../views/CardView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import Category from '@/components/Category.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/card',
      name: 'card',
      component: CardView,
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: ProductDetailView,
      props: true
    },
        {
      path: '/category/:name',
      name: 'category',
      component: Category
      // component: () => import('../pages/Category.vue'),
    },
  ],
})

export default router
