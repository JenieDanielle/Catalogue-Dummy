<script setup>
import {ref} from 'vue'
import Navbar from './components/NavbarComponent.vue'
import Footer from './components/FooterComponent.vue'
import { useProducts } from './composables/useProducts'

const searchTerm = ref('')
const selectedCategory = ref('all')
const {products, nextPage, previousPage, sortOption, offset, limit, allProducts} = useProducts(searchTerm,  selectedCategory)

function handleSearch(term) {
  searchTerm.value = term
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
    <!-- <Navbar @search="searchTerm = $event" /> -->
    <Navbar @search="handleSearch" />

    <main class="container mx-auto px-4 py-6 flex-grow">
      <router-view :searchTerm="searchTerm" />
    </main>

    <Footer></Footer>
  </div>
</template>
