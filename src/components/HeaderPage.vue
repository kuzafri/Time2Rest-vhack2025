<template>
  <div class="mb-4 border rounded-md p-4 bg-green-50">
    <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
      {{ title }}
    </h2>
    <p class="text-gray-500 text-sm hidden md:block">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>
