<template>
  <div class="card flex gap-40 ml-10">
    <div class=" w-1/2 p-10 ">
      <h1 class="text-2xl font-bold text-indigo-900 border-b border-gray-200 dark:border-gray-700 pb-2">Carrinho></h1>

      <div v-for="product in products">

        <div class="flex border border-gray-100 shadow-sm bg-gray-50 dark:bg-gray-950 dark:border-gray-900 rounded-lg h-30 mt-10 gap-5 p-5">
          <img :src=product.thumbnail :alt=product.title class="h-20 rounded-md">
          <div>
            <h1 class="text-[18px] font-bold text-gray-700 dark:text-gray-300">{{ product.title }}</h1>
            <button class="text-[15px] font-bold text-indigo-600 hover:text-indigo-400">Excluir</button>
          </div>
          <p class="text-gray-700 text-[20px] ml-20 dark:text-gray-300">R${{ product.price }}</p>
          <div class="flex ml-20">
            <input type="button" value="-"
              class=" border  border-gray-500 w-7 h-7 rounded-l-md text-[20px] text-gray-500">
            <input type="number" value="1" class="border border-gray-500 w-7 h-7 pl-2 text-[15px] text-gray-900 dark:bg-transparent dark:text-gray-300">
            <input type="button" value="+"
              class="border border-gray-500 w-7 h-7 rounded-r-md text-[20px] text-gray-500">
          </div>

        </div>


      </div>

      <div class="mt-10">
        <span class="text-[16px] font-bold text-gray-700 bg-gray-300 rounded-l-md py-2.5 px-3 shadow-sm dark:bg-gray-800 dark:text-gray-300">CEP</span>
        <input type="text" placeholder="Digite seu cep..."
          class="border border-gray-300 shadow-sm rounded-r-md py-1.5 pl-3 focus:outline-none focus:border-indigo-600 dark:bg-gray-950 dark:border-gray-800">
        <button
          class="bg-indigo-600 text-white rounded-lg py-1.5 px-3 hover:bg-indigo-500 ml-10 shadow-sm">Calcular</button>
      </div>
    </div>

    <div class="w-1/3 h-full p-10 bg-gray-50 text-gray-600 text-[16px] mt-11 shadow-sm dark:bg-gray-950 rounded-lg dark:text-gray-300">
      <h1 class="font-bold text-[22px] text-gray-700 border-b border-gray-200 pb-3 dark:text-indigo-400">Resumo total da compra</h1>
      <p class="mt-5 text-[19px]">Produtos:</p>
      <div class="flex justify-between" v-for="product in products">
        <p class="mt-2">{{ product.title }}</p>
        <p class="mt-2">R$ {{ product.price}}</p>
      </div>
      <div class="flex justify-between">
        <p class="mt-2">Frete</p>
        <p class="mt-2">R$ 0,00</p>
      </div>

      <div class="flex justify-between border-t border-gray-200 mt-10">
        <p class="mt-2 font-bold text-[19px] dark:text-indigo-400">Total:</p>
        <p class="mt-2">R$ {{ totalProductsInCart }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>

import { onMounted, ref } from 'vue';
const products = ref(JSON.parse(localStorage.getItem('productCart')));
const totalProductsInCart = ref(0);

onMounted(() => {
  
  calculateTotalProducts();
});

function calculateTotalProducts() {
  products.value.forEach((product) => {
    totalProductsInCart.value += product.price;
  });

  totalProductsInCart.value = totalProductsInCart.value.toFixed(2);

}
</script>
