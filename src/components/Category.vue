<template>
    <div class="p-6">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-white">
            Produtos de <span class="capitalize">{{ category }}</span>
        </h2>

        <div v-if="products.length === 0">
            <p>Nenhum produto encontrado para essa categoria...</p>
        </div>

        <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div v-for="product in products" :key="product.id" class="border rounded-xl shadow-sm p-4 bg-white dark:bg-gray-800">
                <img :src="product.thumbnail" :alt="product.title" class="mx-auto object-center h-40 object-contain" />
                <div class="p-4 text-gray-800 dark:text-white">
                    <h2 class="text-md font-semibold mb-1 truncate">{{ product.title }}</h2>
                    <p class="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">{{ product.description }}</p>
                    <p class="font-bold text-indigo-600 dark:text-indigo-300">R$ {{ product.price }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted, watch} from 'vue'
import { useRoute } from 'vue-router';
import { productsByCategories } from '../api';

const route = useRoute()
const category = ref(route.params.name)
const products = ref([])

const loadProducts = async () => {
    products.value = await productsByCategories(category.value)
}

watch(() => route.params.name, (newCategory) => {
    category.value =newCategory
    loadProducts()
})

</script>