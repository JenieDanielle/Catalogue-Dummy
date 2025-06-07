<template>
  <div class="w-full h-3 bg-gradient-to-r from-gray-900 to-blue-900 shadow-sm"></div>
  <nav class="sticky top-0 z-50 flex items-center w-full justify-between py-4 px-8 dark:bg-gray-900 border-b-2 border-gray-200 dark:border-gray-700 shadow-sm backdrop-blur bd-opacity-95">
    
    <!-- sanduiche -->
    <div class="flex items-center gap-4">
      <button @click="toggleMenu" class="md:hidden text-white text-2xl mr-4">
          <i class="bi bi-list text-indigo-600"></i>
      </button>
      <router-link to="/">
      <h1 class="text-lg font-bold text-indigo-900 dark:text-white">Catálogo</h1>
      </router-link>
    </div>

    <!-- buscar -->
    <div class="flex flex-grow justify-center md:justify-start">
      <div class="w-full max-w-xs m-4">
          <div class="flex items-center border dark:border-gray-600 rounded-full px-3 bg-white dark:bg-gray-800 shadow-md">
            <input type="text" placeholder="Buscar..." v-model="searchTerm" @input="$emit('search', searchTerm)" class="flex-grow px-2 py-1 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none bg-transparent">
            <button class="text-gray-700 dark:text-white"><i class="bi bi-search"></i></button>
          </div>
      </div>
    </div>

    <!-- menu desktop -->
    <div class="hidden md:flex justify-end items-center gap-6 px-6 py-2">
        <ul class="flex gap-6 mx-auto">
            <li><router-link to="/" class="hover:underline text-indigo-800 dark:text-indigo-100">Início</router-link></li>
            <li><router-link to="/card" class="hover:underline text-indigo-800 dark:text-indigo-100"><i class="bi bi-cart2"></i></router-link></li>
        </ul>

        <!-- categorias desktop -->
        <div class="relative">
          <button @click="showDropdown = !showDropdown" class="w-full text-left text-indigo-800 dark:text-white font-semibold">
            Categorias <i class="bi bi-chevron-down"></i>
          </button>

          <div v-show="showDropdown" class="absolute mt-2 w-48 max-h-64 overflow-y-auto bg-white dark:bg-gray-800 shadow-md rounded-lg py-2 z-50 custom-scroll">
            <ul>
              <li v-for="category in categories" :key="category.slug"><router-link :to="`/category/${category.slug}`" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-indigo-800 dark:text-white">{{ category.name }}</router-link>
              </li>
            </ul>
          </div>

          <!-- <div class="max-h-64 overflow-y-auto pr-2">
            <ul v-show="showDropdown" class="absolute mt-2 w-48 bg-white dark:bg-gray-800 shadow-md rounded-lg py-2 z-50">
              <li v-for="category in categories" :key="category.slug"><router-link :to="`/category/${category.slug}`" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">{{ category.name }}</router-link></li>
            </ul>
          </div> -->

        </div>
    </div>

    <!-- menu mobile -->
    <div v-show="isMenuOpen" class="md:hidden fixed top-20 left-2 bg-white dark:bg-gray-800 border-t dark:border-gray-700 shadow-md rounded-xl w-60 z-50 p-4">
      <ul class="flex flex-col gap-3">
        <li><router-link @click="isMenuOpen = false" to="/" class="text-indigo-800 dark:text-white hover:underline">Início</router-link></li>
        <li><router-link @click="isMenuOpen = false" to="/card" class="text-indigo-800 dark:text-white hover:underline">Carrinho</router-link></li>
      </ul>

      <!-- categorias mobile -->
      <div class="mt-6">
        <h2 class="text-gray-600 dark:text-indigo-300 text-sm mb-2 font-semibold">Categorias</h2>
        <div class="max-h-60 overflow-y-auto pr-1 custom-scroll">
          <ul  class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <li v-for="category in categories" :key="category.slug">
              <router-link @click="isMenuOpen = false" :to="`/category/${category.slug}`" class="text-indigo-800 dark:text-white hover:underline">{{ category.name }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="flex gap-4 items-center">
        <button @click="toggleDark" class="flex items-center gap-2 px-4 py-2 bg-indigo-500 dark:bg-indigo-400 text-white dark:text-white rounded-full hover:scale-105 transition">
            <span v-if="isDark"><i class="bi bi-sun-fill"></i></span>
            <span v-else><i class="bi bi-moon-stars"></i></span>
        </button>
    </div>
  </nav>
</template>


<script>
import axios from 'axios';
import { ref } from 'vue'

// const emit = defineEmits(['search'])
// const searchTerm = ref('')

// function triggerSearch() {
//   emit('search', searchTerm.value)
// }

export default {
  emits: ['search'],
  data() {
      return {
          isDark: false,
          isMenuOpen: false,
          showDropdown: false,
          categories: [],
          searchTerm: ''
      };
  },
  mounted() {
      this.isDark = document.documentElement.classList.contains('dark');
      this.searchCategories();
  },
  methods: {
    toggleDark() {
        document.documentElement.classList.toggle('dark')
        this.isDark = !this.isDark
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    async searchCategories(){
      try{
        const response = await axios.get('https://dummyjson.com/products/categories')
        this.categories = response.data
      } catch (error) {
        console.error("Erro ao buscar categorias: ", error)
      }
    }
  }
}
</script>

<style scoped>
.custom-scroll::-webkit-scrollbar {
  width: 3px;
}

.custom-scroll::-webkit-scrollbar-thumb{
  background-color: #6366f1;
  border-radius: 4px;
}

.dark .custom-scroll::-webkit-scrollbar-thumb {
  background-color: #818cf8;
}

.dark .custom-scroll::-webkit-scrollbar-track {
  background-color: #374151;
}

</style>