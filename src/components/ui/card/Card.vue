<script setup>
import { cn } from "@/lib/utils";

const props = defineProps({
  class: { type: null, required: false },
  variant: { type: String, default: "default" },
});

const variantStyles = {
  default:
    "rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md dark:bg-card dark:text-card-foreground",
  feature:
    "bg-white rounded-xl p-5 shadow-md transition-transform duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg cursor-pointer text-center",
};
</script>

<template>
  <div
    :class="cn(variantStyles[variant] || variantStyles.default, props.class)"
  >
    <slot />
  </div>
</template>
