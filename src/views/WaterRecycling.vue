<template>
  <div class="flex-1 w-full space-y-8">
    <HeaderPage
      title="Water Recycling"
      description="Monitor and manage water recycling systems for sustainable farming"
    />

    <h1 class="text-2xl font-bold">Water Recycling & Efficiency Monitoring</h1>

    <!-- Overview Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card v-for="(item, index) in overviewData" :key="index">
        <CardContent class="p-6 flex items-start space-x-4">
          <div
            :class="[
              'w-12 h-12 rounded-full flex items-center justify-center',
              item.iconClass,
            ]"
          >
            <component :is="item.icon" class="w-6 h-6" />
          </div>
          <div>
            <h3 class="text-sm font-medium text-zinc-500 mb-1">
              {{ item.title }}
            </h3>
            <div class="text-xl font-bold">
              {{ item.value }}
              <span class="text-sm font-normal text-zinc-500">{{
                item.unit
              }}</span>
            </div>
            <div class="text-sm text-zinc-500 flex items-center mt-1">
              <component
                :is="item.trend === 'up' ? ArrowUpRight : ArrowDownRight"
                :class="[
                  'w-4 h-4 mr-1',
                  item.trend === 'up' ? 'text-emerald-500' : 'text-red-500',
                ]"
              />
              <span>{{ item.change }}% from last week</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Recycling System Status -->
    <h2 class="text-2xl font-bold mb-4">Recycling System Status</h2>
    <Card>
      <CardHeader class="pt-2"> </CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 bg-white rounded-md p-9 md:p-14">
            <Carousel
              class="w-full px-2"
              :opts="{
                align: 'start',
              }"
              :plugins="[
                Autoplay({
                  delay: 2000,
                }),
              ]"
            >
              <CarouselContent>
                <CarouselItem
                  v-for="(stage, index) in systemStages"
                  :key="index"
                  class="basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <div class="flex flex-col items-center p-2">
                    <div
                      :class="[
                        'w-24 h-124 p-2 rounded-full text-white flex flex-col items-center justify-center',
                        stage.bgColor,
                      ]"
                    >
                      <component :is="stage.icon" class="w-6 h-6 p-0 mb-1" />
                      <span class="text-xs font-light text-center">{{
                        stage.name
                      }}</span>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div class="space-y-4">
            <div
              v-for="(metric, key) in systemMetrics"
              :key="key"
              class="space-y-2"
            >
              <div class="flex justify-between items-center">
                <h3 class="text-sm font-medium">{{ metric.label }}</h3>
                <span class="text-sm font-semibold">{{ metric.value }}%</span>
              </div>
              <Progress :model-value="metric.value" class="h-2" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Water Efficiency Analytics -->
    <h2 class="text-2xl font-bold mb-4">Water Efficiency Analytics</h2>
    <Card>
      <CardHeader class="pt-2"> </CardHeader>

      <CardContent>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="bg-white rounded-md p-4">
            <h3 class="text-base font-medium mb-4">
              Water Usage vs. Recycling
            </h3>
            <div class="h-[300px]">
              <canvas ref="usageChartRef"></canvas>
            </div>
          </div>

          <div class="bg-white rounded-md p-4">
            <h3 class="text-base font-medium mb-4">Efficiency by Zone</h3>
            <div class="h-[300px]">
              <canvas ref="zoneChartRef"></canvas>
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-base font-semibold mb-4">Water Usage Breakdown</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Zone</TableHead>
                <TableHead>Usage (L)</TableHead>
                <TableHead>Recycled (L)</TableHead>
                <TableHead>Efficiency</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="(row, index) in zoneData" :key="index">
                <TableCell>{{ row.zone }}</TableCell>
                <TableCell>{{ row.usage }}</TableCell>
                <TableCell>{{ row.recycled }}</TableCell>
                <TableCell>{{ row.efficiency }}</TableCell>
                <TableCell>
                  <Badge variant="outline" :class="row.status.variant">{{
                    row.status.label
                  }}</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>

    <!-- AI Optimization Recommendations -->
    <Card>
      <CardHeader>
        <CardTitle class="text-base font-semibold"
          >AI Optimization Recommendations</CardTitle
        >
      </CardHeader>
      <CardContent>
        <div class="space-y-6">
          <div
            class="flex flex-col items-start space-y-4 p-4 rounded-lg border bg-card"
          >
            <div class="flex items-center space-x-4">
              <div
                class="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0"
              >
                <Wrench class="w-6 h-6" />
              </div>
              <h3 class="font-medium">Improve Zone 3 Collection System</h3>
            </div>
            <div class="space-y-2">
              <p class="text-muted-foreground">
                The collection trays in Zone 3 are operating at reduced
                efficiency. Cleaning the filters and adjusting the collection
                angle could improve recycling rates by up to 15%.
              </p>
              <div class="flex items-center text-sm">
                <span class="text-muted-foreground mr-2"
                  >Estimated Impact:</span
                >
                <span
                  class="px-2 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium text-center"
                  >+290L weekly recycling</span
                >
              </div>
            </div>
          </div>

          <div
            class="flex flex-col items-start space-y-4 p-4 rounded-lg border bg-card"
          >
            <div class="flex items-center space-x-4">
              <div
                class="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0"
              >
                <Clock class="w-6 h-6" />
              </div>
              <h3 class="font-medium">Optimize Irrigation Timing</h3>
            </div>
            <div class="space-y-2">
              <p class="text-muted-foreground">
                Shifting irrigation in Zone 1 to early morning (5-6 AM) could
                reduce evaporation loss by approximately 12%, increasing the
                amount of water available for recycling.
              </p>
              <div class="flex items-center text-sm">
                <span class="text-muted-foreground mr-2"
                  >Estimated Impact:</span
                >
                <span
                  class="px-2 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium text-center"
                  >+8% collection efficiency</span
                >
              </div>
            </div>
          </div>

          <div
            class="flex flex-col items-start space-y-4 p-4 rounded-lg border bg-card"
          >
            <div class="flex items-center space-x-4">
              <div
                class="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0"
              >
                <Filter class="w-6 h-6" />
              </div>
              <h3 class="font-medium">Upgrade Filtration System</h3>
            </div>
            <div class="space-y-2">
              <p class="text-muted-foreground">
                The current filtration system is operating at 92% efficiency.
                Upgrading to a multi-stage filtration system would improve water
                quality and allow for expanded reuse applications.
              </p>
              <div class="flex items-center text-sm">
                <span class="text-muted-foreground mr-2"
                  >Estimated Impact:</span
                >
                <span
                  class="px-2 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium text-center"
                  >+5% overall recycling rate</span
                >
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import HeaderPage from "@/components/HeaderPage.vue";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Droplet,
  Recycle,
  Percent,
  Flower,
  ArrowUpRight,
  ArrowDownRight,
  Sprout,
  Waves,
  Filter,
  Database,
  Wrench,
  Clock,
} from "lucide-vue-next";
import Chart from "chart.js/auto";

// Overview cards data
const overviewData = ref([
  {
    icon: Droplet,
    iconClass: "bg-blue-100 text-blue-600",
    title: "Total Water Usage",
    value: "12,450",
    unit: "Liters",
    change: "-8",
    trend: "down",
  },
  {
    icon: Recycle,
    iconClass: "bg-emerald-100 text-emerald-600",
    title: "Recycled Water",
    value: "4,320",
    unit: "Liters",
    change: "12",
    trend: "up",
  },
  {
    icon: Percent,
    iconClass: "bg-amber-100 text-amber-600",
    title: "Recycling Rate",
    value: "34.7",
    unit: "%",
    change: "5.2",
    trend: "up",
  },
  {
    icon: Flower,
    iconClass: "bg-green-100 text-green-600",
    title: "Water Savings",
    value: "1,850",
    unit: "Liters",
    change: "15",
    trend: "up",
  },
]);

// Table data
const zoneData = ref([
  {
    zone: "Zone 1 - Vegetables",
    usage: "3,450",
    recycled: "1,240",
    efficiency: "36",
    status: {
      label: "Good",
      variant: "bg-blue-50 text-blue-600 border-blue-200",
    },
  },
  {
    zone: "Zone 2 - Fruits",
    usage: "4,120",
    recycled: "1,650",
    efficiency: "40",
    status: {
      label: "Excellent",
      variant: "bg-green-50 text-green-600 border-green-200",
    },
  },
  {
    zone: "Zone 3 - Herbs",
    usage: "1,980",
    recycled: "580",
    efficiency: "29",
    status: {
      label: "Needs Improvement",
      variant: "bg-orange-50 text-orange-600 border-orange-200",
    },
  },
  {
    zone: "Zone 4 - Flowers",
    usage: "2,900",
    recycled: "850",
    efficiency: "29",
    status: {
      label: "Needs Improvement",
      variant: "bg-orange-50 text-orange-600 border-orange-200",
    },
  },
]);

// System metrics data
const systemMetrics = ref({
  collectionEfficiency: {
    value: 78,
    label: "Collection Efficiency",
  },
  filtrationQuality: {
    value: 92,
    label: "Filtration Quality",
  },
  storageCapacity: {
    value: 45,
    label: "Storage Capacity",
  },
  systemHealth: {
    value: 85,
    label: "System Health",
  },
});

const systemStages = ref([
  {
    name: "Water Source",
    icon: Droplet,
    bgColor: "bg-blue-500",
  },
  {
    name: "Irrigation",
    icon: Sprout,
    bgColor: "bg-green-500",
  },
  {
    name: "Collection",
    icon: Waves,
    bgColor: "bg-purple-500",
  },
  {
    name: "Filtration",
    icon: Filter,
    bgColor: "bg-orange-500",
  },
  {
    name: "Storage",
    icon: Database,
    bgColor: "bg-yellow-500",
  },
]);

// Chart refs and data handling
const usageChartRef = ref(null);
const zoneChartRef = ref(null);
const usageChart = ref(null);
const zoneChart = ref(null);

// Initialize Water Usage vs Recycling Chart
const initUsageChart = () => {
  if (!usageChartRef.value) return;
  const ctx = usageChartRef.value.getContext("2d");
  if (!ctx) return;

  usageChart.value = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
      datasets: [
        {
          label: "Total Usage (L)",
          data: [14200, 13800, 13500, 13100, 12800, 12450],
          backgroundColor: "rgba(54, 162, 235, 0.7)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Recycled Water (L)",
          data: [3200, 3450, 3600, 3850, 4100, 4320],
          backgroundColor: "rgba(75, 192, 192, 0.7)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Water Volume (Liters)",
          },
        },
      },
    },
  });
};

// Initialize Zone Efficiency Chart
const initZoneChart = () => {
  if (!zoneChartRef.value) return;
  const ctx = zoneChartRef.value.getContext("2d");
  if (!ctx) return;

  zoneChart.value = new Chart(ctx, {
    type: "radar",
    data: {
      labels: [
        "Collection Efficiency",
        "Irrigation Efficiency",
        "Recycling Rate",
        "Water Quality",
        "System Health",
      ],
      datasets: [
        {
          label: "Zone 1",
          data: [75, 82, 36, 90, 88],
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          pointBackgroundColor: "rgba(255, 99, 132, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(255, 99, 132, 1)",
        },
        {
          label: "Zone 2",
          data: [80, 85, 40, 92, 90],
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          pointBackgroundColor: "rgba(54, 162, 235, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(54, 162, 235, 1)",
        },
        {
          label: "Zone 3",
          data: [65, 75, 29, 88, 82],
          backgroundColor: "rgba(255, 206, 86, 0.2)",
          borderColor: "rgba(255, 206, 86, 1)",
          pointBackgroundColor: "rgba(255, 206, 86, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(255, 206, 86, 1)",
        },
        {
          label: "Zone 4",
          data: [70, 78, 29, 85, 80],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          pointBackgroundColor: "rgba(75, 192, 192, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(75, 192, 192, 1)",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: {
            display: true,
          },
          suggestedMin: 0,
          suggestedMax: 100,
        },
      },
    },
  });
};

onMounted(() => {
  nextTick(() => {
    initUsageChart();
    initZoneChart();
  });
});

onBeforeUnmount(() => {
  if (usageChart.value) {
    usageChart.value.destroy();
  }
  if (zoneChart.value) {
    zoneChart.value.destroy();
  }
});
</script>

<style scoped>
@keyframes flowRight {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 0%;
  }
}

@keyframes flowLeft {
  0% {
    background-position: 100% 0%;
  }
  100% {
    background-position: 0% 0%;
  }
}

@keyframes flowUp {
  0% {
    background-position: 0% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}

.animate-flow-right {
  animation: flowRight 2s linear infinite;
}

.animate-flow-left {
  animation: flowLeft 2s linear infinite;
}

.animate-flow-up {
  animation: flowUp 2s linear infinite;
}
</style>
