<script setup lang="ts">
defineProps<{
  url: string;
}>();
</script>

<template>
  <img 
    :src="url" 
    class="w-full h-auto rounded-lg"
    alt="Content block image" />
</template>