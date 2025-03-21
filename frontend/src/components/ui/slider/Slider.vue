<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: [Number, Array],
    default: 0,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const percentage = computed(() => {
  return ((value.value - props.min) / (props.max - props.min)) * 100
})

const handleSliderChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  value.value = Number(target.value)
}
</script>

<template>
  <div
    class="relative flex w-full touch-none select-none items-center"
    :data-disabled="disabled"
  >
    <div class="relative w-full h-2 rounded-full bg-secondary">
      <div
        class="absolute h-full bg-primary rounded-full"
        :style="{ width: `${percentage}%` }"
      ></div>
      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="value"
        :disabled="disabled"
        @input="handleSliderChange"
        class="absolute w-full h-full opacity-0 cursor-pointer"
      />
      <div
        class="absolute w-5 h-5 rounded-full bg-primary -translate-y-1/2 top-1/2"
        :style="{ left: `calc(${percentage}% - 10px)` }"
      ></div>
    </div>
  </div>
</template> 