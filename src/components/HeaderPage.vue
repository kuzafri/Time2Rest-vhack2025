<template>
  <div class="mb-8">
    <h2 class="text-xl font-medium text-gray-800 mb-1">{{ title }}</h2>
    <p class="text-gray-500 text-sm">
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
