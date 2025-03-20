<template>
  <Card>
    <CardContent class="p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-sm font-medium text-gray-500">{{ title }}</h3>
        <span
          :class="[
            'text-xs px-2 py-1 rounded-full',
            `bg-${statusColor}-50 text-${statusColor}-600`,
          ]"
          >{{ status }}</span
        >
      </div>
      <div class="text-2xl font-semibold text-gray-800">{{ value }}</div>
      <div
        :class="['mt-2 text-sm flex items-center', `text-${change.color}-500`]"
      >
        <i
          :class="[
            'fas mr-1',
            {
              'fa-arrow-up': change.direction === 'up',
              'fa-arrow-down': change.direction === 'down',
              'fa-equals': change.direction === 'equal',
            },
          ]"
        ></i>
        {{ change.value }} {{ change.period }}
      </div>
    </CardContent>
  </Card>
</template>

<script>
import { Card, CardContent } from "@/components/ui/card";

export default {
  name: "MetricCard",
  components: {
    Card,
    CardContent,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    statusColor: {
      type: String,
      required: true,
    },
    change: {
      type: Object,
      required: true,
      validator: (value) => {
        return ["value", "direction", "color", "period"].every(
          (key) => key in value
        );
      },
    },
  },
};
</script>
