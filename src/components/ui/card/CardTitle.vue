<script setup>
import { cn } from "@/lib/utils";

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <h3 :class="cn('text-sm font-medium text-gray-500', props.class)">
    <slot />
  </h3>
</template>
