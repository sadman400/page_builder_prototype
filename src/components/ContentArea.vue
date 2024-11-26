<script setup lang="ts">
import { ref } from 'vue';
import { nanoid } from 'nanoid';
import ContentBlock from './ContentBlock.vue';
import type { Block, Tool, Row } from '../types';

const rows = ref<Row[]>([
  {
    id: nanoid(),
    columns: [
      {
        id: nanoid(),
        blocks: [],
      },
    ],
  },
]);

const draggedBlock = ref<{
  block: Block;
  fromRowIndex: number;
  fromColumnIndex: number;
} | null>(null);

const addRow = () => {
  rows.value.push({
    id: nanoid(),
    columns: [
      {
        id: nanoid(),
        blocks: [],
      },
    ],
  });
};

const addColumn = (rowIndex: number) => {
  rows.value[rowIndex].columns.push({
    id: nanoid(),
    blocks: [],
  });
};

const onDragStart = (block: Block, rowIndex: number, columnIndex: number) => {
  draggedBlock.value = { block, fromRowIndex: rowIndex, fromColumnIndex: columnIndex };
};

const onDrop = (event: DragEvent, rowIndex: number, columnIndex: number) => {
  event.preventDefault();

  const data = event.dataTransfer?.getData('application/json');
  const droppedBlock = draggedBlock.value;

  if (data) {
    try {
      const parsedData = JSON.parse(data) as Tool;
      const newBlock: Block = {
        id: nanoid(),
        type: parsedData.type,
        content: '',
        ...(parsedData.type === 'image' ? { url: `https://picsum.photos/800/400?random=${Date.now()}` } : {}),
      };
      rows.value[rowIndex].columns[columnIndex].blocks.push(newBlock);
    } catch (error) {
      console.error('Failed to parse drop data:', error);
    }
  } else if (droppedBlock) {
    const fromBlocks = rows.value[droppedBlock.fromRowIndex].columns[droppedBlock.fromColumnIndex].blocks;
    const blockIndex = fromBlocks.findIndex((b) => b.id === droppedBlock.block.id);
    if (blockIndex !== -1) {
      fromBlocks.splice(blockIndex, 1);
    }

    rows.value[rowIndex].columns[columnIndex].blocks.push(droppedBlock.block);

    draggedBlock.value = null;
  }
};

const deleteBlock = (rowIndex: number, columnIndex: number, blockIndex: number) => {
  rows.value[rowIndex].columns[columnIndex].blocks.splice(blockIndex, 1);
};
</script>

<template>
  <main class="flex-1 p-6 min-h-screen">
    <div class="max-w-6xl mx-auto space-y-6">
      <div v-for="(row, rowIndex) in rows" :key="row.id" class="space-y-4">
        <div class="flex justify-end gap-3">
          <button
            @click="addColumn(rowIndex)"
            class="px-3 py-1.5 bg-green-600 text-white rounded-lg shadow hover:bg-green-500 transition duration-200"
          >
            + Add Column
          </button>
        </div>

        <div class="flex flex-wrap gap-4">
          <div
            v-for="(column, columnIndex) in row.columns"
            :key="column.id"
            :class="[
              'flex-1 p-2 rounded-lg transition-all duration-300',
              column.blocks.length === 0
                ? 'border-2 border-dotted border-gray-400 hover:border-gray-500'
                : ''
            ]"
            @dragover.prevent
            @drop="onDrop($event, rowIndex, columnIndex)"
          >
            <div
              v-for="(block, blockIndex) in column.blocks"
              :key="block.id"
              draggable="true"
              @dragstart="onDragStart(block, rowIndex, columnIndex)"
              class="group cursor-move"
            >
              <ContentBlock
                :block="block"
                @delete="deleteBlock(rowIndex, columnIndex, blockIndex)"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        @click="addRow"
        class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition duration-200"
      >
        + Add Row
      </button>
    </div>
  </main>
</template>

<style scoped>
button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
