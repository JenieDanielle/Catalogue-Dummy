<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
// import { getProducts } from '../api'

const products = ref([])
const offset = ref(0)
const allProducts = ref(0)
const limit = 12

const fetchProducts = async () =>{
  const response = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${offset.value}`)
  products.value = response.data.products
  allProducts.value = response.data.total
}

const nextPage = () => {
  if (offset.value + limit < allProducts.value) {
    offset.value += limit
    fetchProducts()
  }
}

const previousPage = () => {
    if (offset.value >= limit) {
        offset.value -= limit
        fetchProducts()
    }
}


onMounted(fetchProducts)
// onMounted(async () => {
//   products.value = await getProducts()
// })
</script>

<template>
  <h1 class="text-3xl text-indigo-900 dark:text-indigo-200 font-bold mb-4">Produtos ></h1>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
    <div v-for="product in products" :key="product.id" class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg">
      <img :src="product.thumbnail" :alt="product.title" class="mx-auto object-center h-40 object-contain" />
      <div class="p-4 text-gray-800 dark:text-white">
        <h2 class="text-md font-semibold mb-1 truncate">{{ product.title }}</h2>
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">{{ product.description }}</p>
        <p class="font-bold text indigo-600 dark:text-indigo-300">R$ {{ product.price }}</p>
      </div>
    </div>
  </div>

  <div class="flex justify-center gap-4 mt-6">
      <button @click="previousPage" class="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50" :disabled="offset === 0">Anterior</button>
      <button @click="nextPage" class="px-4 py-2 bg-indigo-600 text-white rounded">Próximo</button>
  </div>
</template>
