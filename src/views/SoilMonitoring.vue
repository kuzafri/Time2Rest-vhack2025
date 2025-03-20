<template>
  <div class="w-full space-y-8 overflow-x-hidden">
    <HeaderPage
      title="Soil Monitoring"
      description="Track soil health and conditions across your land"
    />

    <!-- Soil Metrics Overview -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <MetricCard
        v-for="metric in soilMetrics"
        :key="metric.title"
        v-bind="metric"
      />
    </div>

    <!-- Soil Map and Details -->
    <Card class="mb-8">
      <CardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle class="text-base font-medium">Soil Moisture Map</CardTitle>
        <Select defaultValue="moisture">
          <SelectTrigger class="w-[140px] h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="moisture">Moisture</SelectItem>
              <SelectItem value="ph">pH Level</SelectItem>
              <SelectItem value="temperature">Temperature</SelectItem>
              <SelectItem value="nutrients">Nutrients</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div
          class="h-80 bg-gray-100 rounded-lg flex items-center justify-center"
        >
          <!-- Placeholder for soil map visualization -->
          <div class="text-gray-400">
            <i
              class="fas fa-map-marked-alt text-4xl mb-2 block text-center"
            ></i>
            <span>Interactive Soil Map</span>
          </div>
        </div>
        <div class="flex justify-between mt-4 text-xs text-gray-500">
          <div
            v-for="legend in mapLegends"
            :key="legend.label"
            class="flex items-center"
          >
            <div :class="['h-3 w-3 rounded-full mr-1', legend.color]"></div>
            <span>{{ legend.label }}</span>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card class="mb-8">
      <CardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle class="text-base font-medium">Zone Analysis</CardTitle>
        <button class="text-xs text-blue-600">View All</button>
      </CardHeader>
      <CardContent class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ZoneCard v-for="zone in zones" :key="zone.name" v-bind="zone" />
      </CardContent>
    </Card>

    <!-- Soil History Chart -->
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle>Soil Condition History</CardTitle>
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
              <canvas id="soilHistoryChart"></canvas>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import HeaderPage from "@/components/HeaderPage.vue";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MetricCard from "../components/MetricCard.vue";
import ZoneCard from "../components/ZoneCard.vue";
import { useSoilHistory } from "@/composables/useSoilHistory";
import { useSoilMetrics } from "@/composables/useSoilMetrics";

const { soilMetrics, mapLegends, zones } = useSoilMetrics();
const { selectedPeriod, changePeriod } = useSoilHistory();
</script>
