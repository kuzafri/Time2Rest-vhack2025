<script setup>
import { cn } from '@/lib/utils';
import { DialogDescription } from 'reka-ui';

const props = defineProps({
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
});
</script>

<template>
  <DialogDescription
    :class="cn('text-sm text-muted-foreground', props.class)"
    :as="as"
    :as-child="asChild"
  >
    <slot />
  </DialogDescription>
</template>