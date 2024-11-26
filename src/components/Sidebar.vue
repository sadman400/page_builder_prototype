<script setup lang="ts">
import { ref } from 'vue';
import { Menu, Image, Type } from 'lucide-vue-next';
import type { Tool } from '../types';

const tools: Tool[] = [
  { icon: Type, label: 'Rich Text', type: 'text' },
  { icon: Image, label: 'Image', type: 'image' },
  { icon: Menu, label: 'Button', type: 'button' }
];

const draggingTool = ref<string | null>(null);

const onDragStart = (event: DragEvent, tool: Tool) => {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'copy';
    event.dataTransfer.setData('application/json', JSON.stringify(tool));
    draggingTool.value = tool.type;
  }
};

const onDragEnd = () => {
  draggingTool.value = null;
};
</script>

<template>
  <aside class="w-[200px] bg-gray-100 h-screen p-4 border-r border-gray-200">
    <div class="space-y-2">
      <div v-for="tool in tools" 
           :key="tool.label"
           draggable="true"
           @dragstart="(e) => onDragStart(e, tool)"
           @dragend="onDragEnd"
           :class="{
             'flex items-center gap-2 p-2 rounded transition-colors': true,
             'hover:bg-gray-200 cursor-move': draggingTool !== tool.type,
             'bg-gray-200 opacity-50': draggingTool === tool.type
           }">
        <component :is="tool.icon" class="w-5 h-5" />
        <span>{{ tool.label }}</span>
      </div>
    </div>
  </aside>
</template>