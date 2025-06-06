<script setup>
import Navbar from './components/NavbarComponent.vue'
import Footer from './components/FooterComponent.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <Navbar/>
    <div class="container mx-auto px-4 py-6">
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>
