<script setup>
import {ref} from 'vue'
import Navbar from './components/NavbarComponent.vue'
import Footer from './components/FooterComponent.vue'
import { useProducts } from './composables/useProducts'

const searchTerm = ref('')
const {products, nextPage, previousPage} = useProducts(searchTerm)

function handleSearch(term) {
  searchTerm.value = term
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <!-- <Navbar @search="searchTerm = $event" /> -->
    <Navbar @search="handleSearch" />

    <div class="container mx-auto px-4 py-6">
      <router-view :searchTerm="searchTerm" />
    </div>

    <Footer></Footer>
  </div>
</template>
