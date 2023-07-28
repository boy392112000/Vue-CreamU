<template>
  <div class="container">
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
</template>

<script setup>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Navbar from "./components/Navbar.vue";
import "@vuepic/vue-datepicker/dist/main.css";
</script>

<script>
</script>

<style scoped>
</style>
