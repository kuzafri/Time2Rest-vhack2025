<script setup>
import { cn } from "@/lib/utils";

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <li
    data-sidebar="menu-item"
    :class="
      cn('group/menu-item relative items-center justify-center', props.class)
    "
  >
    <slot />
  </li>
</template>
