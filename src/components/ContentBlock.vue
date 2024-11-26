<script setup lang="ts">
import { computed } from 'vue';
import type { Block } from '../types';
import ButtonBlock from './blocks/ButtonBlock.vue';
import ImageBlock from './blocks/ImageBlock.vue';
import RichTextEditor from './RichTextEditor.vue';

const props = defineProps<{
  block: Block;
}>();

const emit = defineEmits<{
  (e: 'delete'): void;
}>();

const component = computed(() => {
  switch (props.block.type) {
    case 'text':
      return RichTextEditor;
    case 'button':
      return ButtonBlock;
    case 'image':
      return ImageBlock;
    default:
      return null;
  }
});
</script>

<template>
  <div class="relative group  rounded-lg mt-2">
    <button
      @click="emit('delete')"
      class="absolute top-1 right-1 w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition"
    >
      ✕
    </button>

    <component :is="component" v-bind="block" />
  </div>
</template>
