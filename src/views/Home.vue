<template>
  <HeaderPage
    title="Dashboard Overview"
    description="Monitor your key metrics at a glance"
  />

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
    <!-- Total Moisture Card using Shadcn -->
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle>Total Moisture</CardTitle>
          <Badge variant="destructive"> High </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div class="flex items-center">
          <div class="relative w-16 h-16">
            <svg class="w-full h-full" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="#f3f4f6"
                stroke-width="3"
              ></circle>
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="#ef4444"
                stroke-width="3"
                stroke-dasharray="75 25"
                stroke-dashoffset="0"
              ></circle>
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-lg font-semibold text-gray-800">81%</span>
            </div>
          </div>
          <div class="ml-4">
            <div class="text-2xl font-semibold text-gray-800">81%</div>
            <div class="text-sm text-green-500 flex items-center">
              <i class="fas fa-arrow-up mr-1"></i> 12% from last week
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Average Moisture Card using Shadcn -->
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-500"
            >Average Moisture</CardTitle
          >
          <Badge variant="default"> Low </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div class="flex items-center">
          <div class="relative w-16 h-16">
            <svg class="w-full h-full" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="#f3f4f6"
                stroke-width="3"
              ></circle>
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="#10b981"
                stroke-width="3"
                stroke-dasharray="22 78"
                stroke-dashoffset="0"
              ></circle>
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-lg font-semibold text-gray-800">22%</span>
            </div>
          </div>
          <div class="ml-4">
            <div class="text-2xl font-semibold text-gray-800">22%</div>
            <div class="text-sm text-red-500 flex items-center">
              <i class="fas fa-arrow-down mr-1"></i> 5% from last week
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-500"
            >Total Land</CardTitle
          >
          <Badge variant="warn"> Medium </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div class="flex items-center">
          <div class="relative w-16 h-16">
            <svg class="w-full h-full" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="#f3f4f6"
                stroke-width="3"
              ></circle>
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="#3b82f6"
                stroke-width="3"
                stroke-dasharray="62 38"
                stroke-dashoffset="0"
              ></circle>
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-lg font-semibold text-gray-800">62%</span>
            </div>
          </div>
          <div class="ml-4">
            <div class="text-2xl font-semibold text-gray-800">62%</div>
            <div class="text-sm text-green-500 flex items-center">
              <i class="fas fa-arrow-up mr-1"></i> 8% from last week
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Alarm Section -->
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle>Activity Overview</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          default-value="weekly"
          class="w-full"
          @tab-change="handleTabChange"
        >
          <TabsList>
            <div class="flex items-center justify-center w-full">
              <TabsTrigger
                value="weekly"
                class="text-xs"
                @click="handleTabChange('weekly')"
                >Weekly</TabsTrigger
              >
              <TabsTrigger
                value="monthly"
                class="text-xs"
                @click="handleTabChange('monthly')"
                >Monthly</TabsTrigger
              >
            </div>
          </TabsList>
          <TabsContent value="weekly" class="mt-0 p-0">
            <div class="relative h-64">
              <canvas ref="weeklyChartCanvas" class="w-full h-full"></canvas>
              <div class="absolute top-4 right-8 bg-blue-50 rounded-md p-3">
                <div class="text-sm font-medium text-gray-800">
                  {{ weeklyStats.orders }} Orders
                </div>
                <div class="text-xs text-gray-500">
                  {{ weeklyStats.date }}
                </div>
              </div>
            </div>
            <div class="flex justify-between mt-4 text-xs text-gray-500">
              <div v-for="(day, index) in weekDays" :key="index">
                {{ day }}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="monthly" class="mt-0 p-0">
            <div class="relative h-64">
              <canvas ref="monthlyChartCanvas" class="w-full h-full"></canvas>
              <div class="absolute top-4 right-8 bg-blue-50 rounded-md p-3">
                <div class="text-sm font-medium text-gray-800">
                  {{ monthlyStats.orders }} Orders
                </div>
                <div class="text-xs text-gray-500">
                  {{ monthlyStats.date }}
                </div>
              </div>
            </div>
            <div class="flex justify-between mt-4 text-xs text-gray-500">
              <div v-for="(week, index) in monthWeeks" :key="index">
                {{ week }}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>

    <!-- Soil Ph Level Section -->
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle>Soil pH Levels</CardTitle>
          <div class="flex items-center space-x-2">
            <div class="flex items-center">
              <div class="h-3 w-3 rounded-full bg-blue-500 mr-1"></div>
              <span class="text-xs text-gray-500">Current</span>
            </div>
            <div class="flex items-center">
              <div class="h-3 w-3 rounded-full bg-red-500 mr-1"></div>
              <span class="text-xs text-gray-500">Threshold</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div class="h-64 relative">
          <canvas id="soilPhChart" class="w-full h-full"></canvas>
          <div
            class="absolute top-4 right-8 bg-blue-50 text-blue-800 text-xs px-2 py-1 rounded-md"
          >
            12,345
          </div>
          <div
            class="absolute bottom-8 right-8 bg-red-50 text-red-800 text-xs px-2 py-1 rounded-md"
          >
            34,890
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Water Usage Section -->
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle>Water Usage</CardTitle>
          <select
            class="text-xs border border-gray-200 rounded-md px-2 py-1 bg-white"
          >
            <option>This Week</option>
            <option>Last Week</option>
            <option>This Month</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <div class="h-64">
          <canvas id="waterUsageChart" class="w-full h-full"></canvas>
        </div>
      </CardContent>
    </Card>

    <!-- Recent Activity -->
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle>Recent Activity</CardTitle>
          <button class="text-xs text-blue-600">View All</button>
        </div>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div class="flex items-start">
            <div
              class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-500 mt-1"
            >
              <i class="fas fa-check-circle"></i>
            </div>
            <div class="ml-3">
              <div class="text-sm font-medium text-gray-800">
                Irrigation system activated
              </div>
              <div class="text-xs text-gray-500">Zone 3 • 2 hours ago</div>
            </div>
          </div>
          <div class="flex items-start">
            <div
              class="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500 mt-1"
            >
              <i class="fas fa-exclamation-circle"></i>
            </div>
            <div class="ml-3">
              <div class="text-sm font-medium text-gray-800">
                Low moisture alert
              </div>
              <div class="text-xs text-gray-500">Zone 1 • 5 hours ago</div>
            </div>
          </div>
          <div class="flex items-start">
            <div
              class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mt-1"
            >
              <i class="fas fa-sync"></i>
            </div>
            <div class="ml-3">
              <div class="text-sm font-medium text-gray-800">
                System maintenance completed
              </div>
              <div class="text-xs text-gray-500">All zones • Yesterday</div>
            </div>
          </div>
          <div class="flex items-start">
            <div
              class="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 mt-1"
            >
              <i class="fas fa-cloud-rain"></i>
            </div>
            <div class="ml-3">
              <div class="text-sm font-medium text-gray-800">
                Rain detected - irrigation paused
              </div>
              <div class="text-xs text-gray-500">All zones • Yesterday</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>

  <div class="grid grid-template-cols-3 gap-5 mt-8">
    <Card variant="feature" @click="$router.push('/pest-detection')">
      <CardContent>
        <div class="flex items-center justify-center mb-4">
          <Pest class="justify-center" />
        </div>
        <CardTitle class="mb-2 text-gray-800">AI Pest Detection</CardTitle>
        <p class="text-gray-600">
          Detect pests and diseases in real-time using AI-powered camera
          analysis
        </p>
      </CardContent>
    </Card>

    <Card variant="feature" @click="$router.push('/microclimate-monitoring')">
      <CardContent>
        <div class="flex items-center justify-center mb-4">
          <Climate class="justify-center" />
        </div>
        <CardTitle class="mb-2 text-gray-800"
          >Microclimate Monitoring</CardTitle
        >
        <p class="text-gray-600">
          Monitor and control greenhouse conditions for optimal plant growth
        </p>
      </CardContent>
    </Card>

    <Card variant="feature" @click="$router.push('/crop-yield-forecasting')">
      <CardContent>
        <div class="flex items-center justify-center mb-4">
          <Yield class="justify-center" />
        </div>
        <CardTitle class="mb-2 text-gray-800">Yield Forecasting</CardTitle>
        <p class="text-gray-600">
          AI-powered predictions for crop yields and market trends
        </p>
      </CardContent>
    </Card>

    <Card variant="feature" @click="$router.push('/mobile-app-integration')">
      <CardContent>
        <div class="flex items-center justify-center mb-4">
          <Mobile class="justify-center" />
        </div>
        <CardTitle class="mb-2 text-gray-800">Mobile App</CardTitle>
        <p class="text-gray-600">
          Access your farm data on the go with our dedicated mobile application
        </p>
      </CardContent>
    </Card>

    <Card variant="feature" @click="$router.push('/water-recycling')">
      <CardContent>
        <div class="flex items-center justify-center mb-4">
          <Compost class="justify-center" />
        </div>
        <CardTitle class="mb-2 text-gray-800">Water Recycling</CardTitle>

        <p class="text-gray-600">
          Monitor water usage efficiency and recycling systems
        </p>
      </CardContent>
    </Card>

    <Card variant="feature" @click="$router.push('/smart-alerts')">
      <CardContent>
        <div class="flex items-center justify-center mb-4">
          <Alert class="justify-center" />
        </div>
        <CardTitle class="mb-2 text-gray-800">Smart Alerts</CardTitle>
        <p class="text-gray-600">
          Receive notifications for critical events and system status
        </p>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick, reactive } from "vue";
import { useRouter } from "vue-router";
import Chart from "chart.js/auto";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Compost from "@/components/icons/Compost.vue";
import Mobile from "@/components/icons/Mobile.vue";
import Alert from "@/components/icons/Alert.vue";
import Pest from "@/components/icons/Pest.vue";
import Climate from "@/components/icons/Climate.vue";
import Yield from "@/components/icons/Yield.vue";
import HeaderPage from "@/components/HeaderPage.vue";

const router = useRouter();

// Chart refs
const weeklyChartCanvas = ref(null);
const monthlyChartCanvas = ref(null);
const weeklyChartInstance = ref(null);
const monthlyChartInstance = ref(null);

// Active tab
const activeTab = ref("weekly");

// Chart data
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthWeeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

// Stats data
const weeklyStats = reactive({
  orders: 456,
  date: "Oct 18th, 2023",
});

const monthlyStats = reactive({
  orders: 2345,
  date: "March 2025",
});

onMounted(() => {
  // Initialize all charts on mount
  nextTick(() => {
    initAllCharts();
  });
});

// Simple function to handle tab change
function handleTabChange(tab) {
  activeTab.value = tab;
  // Reinitialize charts after tab change
  nextTick(() => {
    initAllCharts();
  });
}

// Initialize all charts in one go
function initAllCharts() {
  initWeeklyChart();
  initMonthlyChart();
  initSoilPhChart();
  initWaterUsageChart();
}

function initWeeklyChart() {
  if (!weeklyChartCanvas.value) return;

  // Destroy existing chart instance if it exists
  if (weeklyChartInstance.value) {
    weeklyChartInstance.value.destroy();
  }

  const ctx = weeklyChartCanvas.value.getContext("2d");

  weeklyChartInstance.value = new Chart(ctx, {
    type: "line",
    data: {
      labels: weekDays,
      datasets: [
        {
          label: "Activity",
          data: [30, 45, 60, 75, 45, 65, 55],
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.4,
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointBackgroundColor: "#3b82f6",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          mode: "index",
          intersect: false,
          backgroundColor: "white",
          titleColor: "#1f2937",
          bodyColor: "#6b7280",
          borderColor: "#e5e7eb",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            size: 14,
            weight: "bold",
          },
        },
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
          beginAtZero: true,
        },
      },
    },
  });
}

function initMonthlyChart() {
  if (!monthlyChartCanvas.value) return;

  // Destroy existing chart instance if it exists
  if (monthlyChartInstance.value) {
    monthlyChartInstance.value.destroy();
  }

  const ctx = monthlyChartCanvas.value.getContext("2d");

  monthlyChartInstance.value = new Chart(ctx, {
    type: "line",
    data: {
      labels: monthWeeks,
      datasets: [
        {
          label: "Monthly Activity",
          data: [350, 420, 580, 490],
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.4,
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointBackgroundColor: "#3b82f6",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          mode: "index",
          intersect: false,
          backgroundColor: "white",
          titleColor: "#1f2937",
          bodyColor: "#6b7280",
          borderColor: "#e5e7eb",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            size: 14,
            weight: "bold",
          },
        },
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
          beginAtZero: true,
        },
      },
    },
  });
}

function initSoilPhChart() {
  const chart = document.getElementById("soilPhChart");
  if (!chart) return;

  // Check if chart instance exists on the element and destroy it
  if (chart._chart) {
    chart._chart.destroy();
  }

  const ctx = chart.getContext("2d");

  const chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      datasets: [
        {
          label: "Current Level",
          data: [20000, 25000, 18000, 30000, 40000, 35000, 25000, 32000, 28000],
          borderColor: "#3b82f6",
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 5,
        },
        {
          label: "Threshold",
          data: [30000, 15000, 25000, 35000, 22000, 38000, 28000, 35000, 40000],
          borderColor: "#ef4444",
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 5,
          borderDash: [5, 5],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          mode: "index",
          intersect: false,
          backgroundColor: "white",
          titleColor: "#1f2937",
          bodyColor: "#6b7280",
          borderColor: "#e5e7eb",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: "#9ca3af",
            font: {
              size: 10,
            },
          },
        },
        y: {
          display: true,
          position: "left",
          grid: {
            color: "#f3f4f6",
          },
          ticks: {
            color: "#9ca3af",
            font: {
              size: 10,
            },
            callback: function (value) {
              return value / 1000 + "k";
            },
          },
        },
      },
    },
  });

  // Store chart instance on the element for future reference
  chart._chart = chartInstance;
}

function initWaterUsageChart() {
  const chart = document.getElementById("waterUsageChart");
  if (!chart) return;

  // Check if chart instance exists on the element and destroy it
  if (chart._chart) {
    chart._chart.destroy();
  }

  const ctx = chart.getContext("2d");

  const chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Water Usage",
          data: [60, 80, 40, 65, 60, 25, 60],
          backgroundColor: [
            "#3b82f6",
            "#10b981",
            "#3b82f6",
            "#10b981",
            "#3b82f6",
            "#10b981",
            "#3b82f6",
          ],
          borderWidth: 0,
          borderRadius: 6,
          barThickness: 12,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "white",
          titleColor: "#1f2937",
          bodyColor: "#6b7280",
          borderColor: "#e5e7eb",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: "#9ca3af",
            font: {
              size: 10,
            },
          },
        },
        y: {
          beginAtZero: true,
          max: 100,
          grid: {
            color: "#f3f4f6",
          },
          ticks: {
            stepSize: 20,
            color: "#9ca3af",
            font: {
              size: 10,
            },
          },
        },
      },
    },
  });

  // Store chart instance on the element for future reference
  chart._chart = chartInstance;
}
</script>

<style scoped>
.home {
  width: 100%;
}

.grid.grid-template-cols-3 {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>
