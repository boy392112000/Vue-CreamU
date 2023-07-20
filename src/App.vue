<template>
  <div class="container">
  <Navbar></Navbar>
  <router-view></router-view>
</div>
</template>

<script setup>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Navbar from './components/Navbar.vue';

</script>

<style scoped>

</style>
