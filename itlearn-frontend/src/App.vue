<script setup>
import { RouterView } from 'vue-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Header from './components/Header.vue'
</script>

<template>
  <Header />
  <main>
    <RouterView />
  </main>
</template>

<style>
/* Apply REM font globally */
body,
button,
input,
select,
textarea,
.navbar,
.nav-link,
.btn,
.form-control {
  font-family: 'REM', sans-serif !important;
}
</style>
