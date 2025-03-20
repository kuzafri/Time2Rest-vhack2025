<template>
  <Card :class="backgroundColor">
    <CardContent class="p-4">
      <div class="flex items-center justify-between mb-3">
        <h4 class="font-medium">{{ name }}</h4>
        <Badge :variant="getBadgeVariant" class="capitalize">
          {{ status }}
        </Badge>
      </div>
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div class="text-gray-500">Moisture</div>
          <div class="font-medium">{{ metrics.moisture }}</div>
        </div>
        <div>
          <div class="text-gray-500">pH Level</div>
          <div class="font-medium">{{ metrics.ph }}</div>
        </div>
        <div>
          <div class="text-gray-500">Temperature</div>
          <div class="font-medium">{{ metrics.temp }}</div>
        </div>
        <div>
          <div class="text-gray-500">Nutrients</div>
          <div class="font-medium">{{ metrics.nutrients }}</div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script>
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default {
  name: "ZoneCard",
  components: {
    Card,
    CardContent,
    Badge,
  },
  props: {
    name: {
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
    backgroundColor: {
      type: String,
      required: true,
    },
    metrics: {
      type: Object,
      required: true,
      validator: (value) => {
        return ["moisture", "ph", "temp", "nutrients"].every(
          (key) => key in value
        );
      },
    },
  },
  computed: {
    getBadgeVariant() {
      switch (this.statusColor) {
        case "red":
          return "destructive";
        case "yellow":
          return "warn";
        case "green":
        default:
          return "default";
      }
    },
  },
};
</script>
