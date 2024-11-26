<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';

const editor = useEditor({
  content: '<p></p>',
  extensions: [StarterKit],
  editorProps: {
    attributes: {
      class: 'prose prose-sm sm:prose-lg lg:prose-xl max-w-none p-2 focus:outline-none',
    },
  },
});
</script>

<template>
  <div class="rounded-lg overflow-hidden">
    <div class="bg-gray-50 p-2">
      <div class="flex gap-2">
        <button 
          @click="editor?.chain().focus().toggleBold().run()"
          class="p-1 rounded hover:bg-gray-200">
          Bold
        </button>
        <button 
          @click="editor?.chain().focus().toggleItalic().run()"
          class="p-1 rounded hover:bg-gray-200">
          Italic
        </button>
      </div>
    </div>
    <editor-content :editor="editor" class="min-h-[200px] p-2 border border-gray-200" />
  </div>
</template>
