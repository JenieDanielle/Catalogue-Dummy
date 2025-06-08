<template>
    <div v-if="product" class="grid grid-cols-1 lg:grid-cols-2 lg:px-8">
        <div>
            <div class="lg:mt-10">
                <a href="#" class="ml-80 sm:ml-5 w-auto sm:text-[18px] hover:text-indigo-400 lg:text-[25px]"><i
                        class="bi bi-heart-fill"></i></a>
                <img :src="product.thumbnail" :alt="product.title"
                    class="mx-auto object-center h-60 sm:h-80 lg:mt-20 object-contain" />
            </div>
        </div>
        <div class="grid grid-cols-1 px-5 py-5 lg:px-20">

            <h1 class="font-bold mb-3 lg:text-[35px]">{{ product.title }}</h1>
            <p class="mb-4 lg:text-[20px]">
                {{ product.description }}
            </p>
            <p class="font-bold text-[25px]">
                R$ {{ product.price }}
            </p>
            <p class="mb-2">
                (stock : {{ product.stock }})
            </p>
            <button class="bg-indigo-300 py-2 rounded-full mt-5 mb-5 hover:bg-indigo-200"
                @click.prevent="newCart(product)">Adicionar ao carrinho</button>
            <h1
                class="text-[23px] lg:text-[18px] font-bold bg-gray-200 py-2 text-center rounded-md mt-6 border border-gray-200 lg:bg-gray-100 lg:border-none lg:hidden">
                Product Details
            </h1>
            <h1
                class="text-[23px] lg:text-[18px] font-bold py-2 text-center mt-6 border-b border-gray-700 hidden lg:inline">
                Product Details
            </h1>

            <table class="mt-5">
                <thead>
                    <tr class="text-[12px] lg:text-[13px]">
                        <th>Brand</th>
                        <th>Width</th>
                        <th>Height</th>
                        <th>Depth</th>
                        <th>Weight</th>
                        <th>Warranty Information</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="text-[12px] lg:text-[13px] text-center ">
                        <td>{{ product.brand }}</td>
                        <td>{{ product.dimensions.width }}</td>
                        <td>{{ product.dimensions.height }}</td>
                        <td>{{ product.dimensions.depth }}</td>
                        <td>{{ product.weight }}</td>
                        <td>{{ product.warrantyInformation }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div v-else class="text-center py-10">
        Carregando...
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const product = ref(null)
const route = useRoute()

const fetchProduct = async () => {
    const id = route.params.id
    const response = await axios.get(`https://dummyjson.com/products/${id}`)
    product.value = response.data
}

onMounted(fetchProduct)

function newCart(product) {
    const cart = JSON.parse(localStorage.getItem('productCart')) || [];
    const productExists = cart.find(item => item.id === product.id);

    if (productExists) {
        productExists.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('productCart', JSON.stringify(cart));
    alert(`${product.title} foi adicionado ao carrinho!`);
}
</script>