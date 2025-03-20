<template>
  <div class="relative">
    <Input
      type="text"
      :value="formatTime(modelValue)"
      @click="isOpen = true"
      readonly
      class="cursor-pointer"
      :placeholder="placeholder"
    />
    <div
      v-if="isOpen"
      class="absolute mt-2 p-4 bg-white rounded-md border shadow-lg z-50 w-[280px]"
      v-click-outside="closeTimePicker"
    >
      <div class="flex gap-4 justify-center mb-4">
        <div class="flex flex-col items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            class="h-8 w-8"
            @click="adjustTime('hours', 1)"
          >
            <ChevronUp class="h-4 w-4" />
          </Button>
          <Input
            type="text"
            v-model="hours"
            class="w-14 text-center"
            @change="validateHours"
            @click.stop
          />
          <Button
            variant="ghost"
            size="icon"
            class="h-8 w-8"
            @click="adjustTime('hours', -1)"
          >
            <ChevronDown class="h-4 w-4" />
          </Button>
        </div>
        <div class="flex items-center font-bold text-xl">:</div>
        <div class="flex flex-col items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            class="h-8 w-8"
            @click="adjustTime('minutes', 1)"
          >
            <ChevronUp class="h-4 w-4" />
          </Button>
          <Input
            type="text"
            v-model="minutes"
            class="w-14 text-center"
            @change="validateMinutes"
            @click.stop
          />
          <Button
            variant="ghost"
            size="icon"
            class="h-8 w-8"
            @click="adjustTime('minutes', -1)"
          >
            <ChevronDown class="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div class="flex justify-end gap-2">
        <Button variant="outline" size="sm" @click="isOpen = false">
          Cancel
        </Button>
        <Button size="sm" @click="confirmTime"> OK </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-vue-next";
import { vClickOutside } from "@/directives/click-outside";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "Select time",
  },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const hours = ref("00");
const minutes = ref("00");

// Prevent multiple listeners causing unexpected behavior
let clickOutsideHandler = null;

const formatTime = (time) => {
  if (!time) return "";
  const [h, m] = time.split(":");
  return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
};

const parseTime = () => {
  if (props.modelValue) {
    const [h, m] = props.modelValue.split(":");
    hours.value = h.padStart(2, "0");
    minutes.value = m.padStart(2, "0");
  }
};

const validateHours = () => {
  let h = parseInt(hours.value);
  if (isNaN(h)) h = 0;
  h = Math.max(0, Math.min(23, h));
  hours.value = h.toString().padStart(2, "0");
};

const validateMinutes = () => {
  let m = parseInt(minutes.value);
  if (isNaN(m)) m = 0;
  m = Math.max(0, Math.min(59, m));
  minutes.value = m.toString().padStart(2, "0");
};

const adjustTime = (type, delta) => {
  if (type === "hours") {
    let h = parseInt(hours.value) + delta;
    if (h > 23) h = 0;
    if (h < 0) h = 23;
    hours.value = h.toString().padStart(2, "0");
  } else {
    let m = parseInt(minutes.value) + delta;
    if (m > 59) m = 0;
    if (m < 0) m = 59;
    minutes.value = m.toString().padStart(2, "0");
  }
};

const confirmTime = () => {
  emit("update:modelValue", `${hours.value}:${minutes.value}`);
  isOpen.value = false;
};

const closeTimePicker = (event) => {
  // Add a small delay to ensure we don't close immediately when opening
  setTimeout(() => {
    isOpen.value = false;
  }, 10);
};

// Listen for escape key to close the picker
const handleKeyDown = (e) => {
  if (e.key === "Escape" && isOpen.value) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeyDown);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeyDown);
});

watch(() => props.modelValue, parseTime, { immediate: true });
</script>
