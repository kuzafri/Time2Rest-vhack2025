<script setup>
import { cn } from '@/lib/utils';
import { DialogTitle } from 'reka-ui';

const props = defineProps({
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
});
</script>

<template>
  <DialogTitle
    :class="cn('text-lg font-semibold leading-none tracking-tight', props.class)"
    :as="as"
    :as-child="asChild"
  >
    <slot />
  </DialogTitle>
</template>