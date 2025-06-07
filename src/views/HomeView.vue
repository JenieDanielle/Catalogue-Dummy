<script setup>
import { watch, ref, toRef } from 'vue'
import { useProducts } from '../composables/useProducts'

const props = defineProps({
  searchTerm: String
})

const selectedCategory = ref('all')
const searchTermRef = toRef(props, 'searchTerm')

const {products, nextPage, previousPage, sortOption, offset, limit, allProducts} = useProducts(searchTermRef, selectedCategory)

// watch(toRef(props, 'searchTerm'), (newVal) => {
//   internalSearchTerm.value = newVal
// })

watch(searchTermRef, (newTerm) => {
  console.log('Buscando por:', newTerm)
})

</script>

<template>
  <div class="flex items-center justify-between ml-6 mr-6 mt-5">
    <h1 class="text-3xl text-indigo-900 dark:text-indigo-200 font-bold mb-4">Produtos ></h1>
    
    <select v-model="sortOption" class="bg-transparent font-semibold text-sm text-indigo-900 dark:text-indigo-200 dark:bg-gray-900 focus:outline-none">
      <option value="none">Sem ordenação</option>
      <option value="priceAsc">Preço Crescente</option>
      <option value="priceDesc">Preço Decrescente</option>
      <option value="nameAsc">Nome A-Z</option>
      <option value="nameDesc">Nome Z-A</option>
    </select>
  </div>

  <div v-if="products.length === 0" class="flex justify-center items-center h-[300px]">
    <p class="text-gray-600 dark:text-gray-300 text-lg">Nenhum produto encontrado...</p>
  </div>

  <div v-else>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      <router-link v-for="product in products" :key="product.id" :to="`/product/${product.id}`" class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg">
        <img :src="product.thumbnail" :alt="product.title" class="mx-auto object-center h-40 object-contain" />
        <div class="p-4 text-gray-800 dark:text-white">
          <h2 class="text-md font-semibold mb-1 truncate">{{ product.title }}</h2>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">{{ product.description }}</p>
          <p class="font-bold text indigo-600 dark:text-indigo-300">R$ {{ product.price }}</p>
        </div>
      </router-link>
    </div>
    
    <div class="flex justify-center gap-4 mt-6">
        <button @click="previousPage" class="px-4 py-2 rounded-full bg-indigo-500 hover:bg-indigo-700 text-white disabled:opacity-50" :disabled="offset === 0">Anterior</button>
        <button @click="nextPage" class="px-4 py-2 rounded-full bg-indigo-500 hover:bg-indigo-700 text-white disabled:opacity-50" :disabled="(offset + limit) >= allProducts">Próximo</button>
    </div>
  </div>

</template>
