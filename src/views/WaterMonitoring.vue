<template>
  <div class="flex-1 w-full space-y-8">
    <HeaderPage
      title="Water Monitoring"
      description="Monitor water usage and quality across your irrigation system"
    />

    <!-- Water Metrics Overview -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle class="text-sm font-medium text-gray-500"
              >Total Water Usage</CardTitle
            >
            <Badge variant="default">Efficient</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-semibold text-gray-800">2,450 L</div>
          <div class="mt-2 text-sm text-green-500 flex items-center">
            <i class="fas fa-arrow-down mr-1"></i> 8% from last week
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle class="text-sm font-medium text-gray-500"
              >System Pressure</CardTitle
            >
            <Badge variant="default">Normal</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-semibold text-gray-800">3.2 bar</div>
          <div class="mt-2 text-sm text-gray-500 flex items-center">
            <i class="fas fa-equals mr-1"></i> Stable
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle class="text-sm font-medium text-gray-500"
              >Flow Rate</CardTitle
            >
            <Badge variant="default">Optimal</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-semibold text-gray-800">12.5 L/min</div>
          <div class="mt-2 text-sm text-green-500 flex items-center">
            <i class="fas fa-arrow-up mr-1"></i> 2% from yesterday
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle class="text-sm font-medium text-gray-500"
              >Irrigation Cycles</CardTitle
            >
            <Badge variant="secondary">Today</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-semibold text-gray-800">3/5</div>
          <div class="mt-2 text-sm text-gray-500 flex items-center">
            <i class="fas fa-clock mr-1"></i> Next: 5:30 PM
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Water Usage Chart and Zone Status -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <Card class="lg:col-span-2">
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle>Water Usage Trends</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs
            :default-value="selectedPeriod"
            @update:model-value="changePeriod"
          >
            <TabsList class="w-auto justify-start">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            <TabsContent :value="selectedPeriod">
              <div class="h-80">
                <canvas id="waterUsageTrendsChart"></canvas>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle>Irrigation Zones</CardTitle>
            <button class="text-xs text-blue-600">View All</button>
          </div>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div class="p-3 bg-green-50 rounded-lg">
              <div class="flex justify-between items-center">
                <div class="font-medium">Zone 1</div>
                <div class="text-green-500 text-sm">Active</div>
              </div>
              <div class="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div>Flow: <span class="font-medium">4.2 L/min</span></div>
                <div>Usage: <span class="font-medium">420 L</span></div>
              </div>
              <div class="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-green-500 h-2 rounded-full"
                  style="width: 75%"
                ></div>
              </div>
            </div>

            <div class="p-3 bg-gray-50 rounded-lg">
              <div class="flex justify-between items-center">
                <div class="font-medium">Zone 2</div>
                <div class="text-gray-500 text-sm">Scheduled</div>
              </div>
              <div class="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div>Flow: <span class="font-medium">0 L/min</span></div>
                <div>Usage: <span class="font-medium">0 L</span></div>
              </div>
              <div class="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-gray-500 h-2 rounded-full"
                  style="width: 0%"
                ></div>
              </div>
            </div>

            <div class="p-3 bg-gray-50 rounded-lg">
              <div class="flex justify-between items-center">
                <div class="font-medium">Zone 3</div>
                <div class="text-gray-500 text-sm">Completed</div>
              </div>
              <div class="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div>Flow: <span class="font-medium">0 L/min</span></div>
                <div>Usage: <span class="font-medium">850 L</span></div>
              </div>
              <div class="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-blue-500 h-2 rounded-full"
                  style="width: 100%"
                ></div>
              </div>
            </div>

            <div class="p-3 bg-yellow-50 rounded-lg">
              <div class="flex justify-between items-center">
                <div class="font-medium">Zone 4</div>
                <div class="text-yellow-500 text-sm">Paused</div>
              </div>
              <div class="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div>Flow: <span class="font-medium">0 L/min</span></div>
                <div>Usage: <span class="font-medium">320 L</span></div>
              </div>
              <div class="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-yellow-500 h-2 rounded-full"
                  style="width: 45%"
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Water System Status and Efficiency -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle>System Status</CardTitle>
            <Badge variant="default">All Systems Normal</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div
                  class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-500"
                >
                  <i class="fas fa-pump"></i>
                </div>
                <div class="ml-3">
                  <div class="text-sm font-medium">Main Pump</div>
                  <div class="text-xs text-gray-500">Running normally</div>
                </div>
              </div>
              <div class="text-green-500">
                <i class="fas fa-check-circle"></i>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div
                  class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-500"
                >
                  <i class="fas fa-tint"></i>
                </div>
                <div class="ml-3">
                  <div class="text-sm font-medium">Water Filters</div>
                  <div class="text-xs text-gray-500">Clean (87%)</div>
                </div>
              </div>
              <div class="text-green-500">
                <i class="fas fa-check-circle"></i>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div
                  class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-500"
                >
                  <i class="fas fa-battery-three-quarters"></i>
                </div>
                <div class="ml-3">
                  <div class="text-sm font-medium">Backup Power</div>
                  <div class="text-xs text-gray-500">Charged (92%)</div>
                </div>
              </div>
              <div class="text-green-500">
                <i class="fas fa-check-circle"></i>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div
                  class="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500"
                >
                  <i class="fas fa-wifi"></i>
                </div>
                <div class="ml-3">
                  <div class="text-sm font-medium">Network Connection</div>
                  <div class="text-xs text-gray-500">Signal strength (68%)</div>
                </div>
              </div>
              <div class="text-yellow-500">
                <i class="fas fa-exclamation-circle"></i>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle>Water Efficiency</CardTitle>
            <Select defaultValue="thisMonth">
              <SelectTrigger class="w-[120px] h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="thisMonth">This Month</SelectItem>
                  <SelectItem value="lastMonth">Last Month</SelectItem>
                  <SelectItem value="thisYear">This Year</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div class="flex items-center justify-center mb-6">
            <div class="relative w-48 h-48">
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
                  stroke-dasharray="75 25"
                  stroke-dashoffset="0"
                ></circle>
              </svg>
              <div
                class="absolute inset-0 flex flex-col items-center justify-center"
              >
                <span class="text-3xl font-semibold text-gray-800">75%</span>
                <span class="text-sm text-gray-500">Efficiency</span>
              </div>
            </div>
          </div>
          <div class="space-y-3">
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span class="font-medium">Water Saved</span>
                <span>1,250 L</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-green-500 h-2 rounded-full"
                  style="width: 65%"
                ></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span class="font-medium">Energy Saved</span>
                <span>42 kWh</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-blue-500 h-2 rounded-full"
                  style="width: 55%"
                ></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span class="font-medium">Cost Reduction</span>
                <span>$85.20</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-purple-500 h-2 rounded-full"
                  style="width: 70%"
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { onMounted, nextTick } from "vue";
import HeaderPage from "@/components/HeaderPage.vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWaterUsageChart } from "@/composables/useWaterUsageChart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const { selectedPeriod, initChart, updatePeriod } = useWaterUsageChart();

onMounted(() => {
  nextTick(() => {
    const chartElement = document.getElementById("waterUsageTrendsChart");
    if (chartElement) {
      initChart(chartElement);
    }
  });
});

const changePeriod = (period) => {
  updatePeriod(period);
  nextTick(() => {
    const chartElement = document.getElementById("waterUsageTrendsChart");
    if (chartElement) {
      initChart(chartElement);
    }
  });
};
</script>
