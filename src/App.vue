<script setup lang="ts">
import Sidebar from './components/Sidebar.vue';
import ContentArea from './components/ContentArea.vue';
</script>

<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <ContentArea />
  </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>