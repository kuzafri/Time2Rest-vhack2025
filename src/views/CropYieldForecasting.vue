<script setup>
import HeaderPage from "@/components/HeaderPage.vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { useYieldForecasting } from "@/composables/useYieldForecasting";
import {
  Sun,
  Sprout,
  Bug,
  TrendingUp,
  Calendar,
  Droplets,
  DollarSign,
} from "lucide-vue-next";

const crops = [
  { id: 1, name: "Corn" },
  { id: 2, name: "Soybeans" },
  { id: 3, name: "Wheat" },
  { id: 4, name: "Tomatoes" },
  { id: 5, name: "Lettuce" },
];

const selectedCrop = ref(1);
const yieldChartEl = ref(null);
const priceChartEl = ref(null);
const chartsInitialized = ref(false);

const { initYieldChart, initPriceChart, updateCharts } = useYieldForecasting();

const factors = [
  {
    id: 1,
    title: "Weather Conditions",
    impact: "+12% Impact",
    description:
      "Favorable temperature and rainfall patterns predicted for the next 30 days.",
    icon: Sun,
    iconClass: "bg-blue-100 text-blue-500",
    status: "positive",
  },
  {
    id: 2,
    title: "Soil Health",
    impact: "+8% Impact",
    description:
      "Improved nitrogen levels and microbial activity detected in recent soil tests.",
    icon: Sprout,
    iconClass: "bg-green-100 text-green-500",
    status: "positive",
  },
  {
    id: 3,
    title: "Pest Pressure",
    impact: "-3% Impact",
    description:
      "Minor aphid presence detected. Preventative measures recommended.",
    icon: Bug,
    iconClass: "bg-red-100 text-red-500",
    status: "negative",
  },
  {
    id: 4,
    title: "Market Demand",
    impact: "+15% Impact",
    description:
      "Strong demand expected due to reduced imports and increased local consumption.",
    icon: TrendingUp,
    iconClass: "bg-orange-100 text-orange-500",
    status: "positive",
  },
];

const recommendations = [
  {
    id: 1,
    title: "Optimal Planting Schedule",
    description:
      "For maximum yield, plant your next crop between March 15-20. This timing aligns with predicted favorable weather patterns and optimal soil temperature.",
    icon: Calendar,
  },
  {
    id: 2,
    title: "Irrigation Strategy",
    description:
      "Reduce irrigation by 15% in zones 2 and 3 due to predicted rainfall. Increase by 10% in zone 1 to compensate for higher evaporation rates.",
    icon: Droplets,
  },
  {
    id: 3,
    title: "Market Timing",
    description:
      "Consider staggered harvesting to capitalize on predicted price increases in late October. Early contracts recommended for 60% of yield, with 40% reserved for spot market.",
    icon: DollarSign,
  },
];

const cropMetrics = {
  1: {
    // Corn
    yield: 14.2,
    yieldChange: "+8%",
    revenue: 24850,
    revenueChange: "+12%",
    harvestDate: "Oct 15",
    harvestDateDiff: "5 days earlier than average",
  },
  2: {
    // Soybeans
    yield: 4.2,
    yieldChange: "+10%",
    revenue: 29400,
    revenueChange: "+15%",
    harvestDate: "Sep 28",
    harvestDateDiff: "on schedule",
  },
  3: {
    // Wheat
    yield: 6.0,
    yieldChange: "+12%",
    revenue: 21000,
    revenueChange: "+8%",
    harvestDate: "Aug 20",
    harvestDateDiff: "3 days later than average",
  },
  4: {
    // Tomatoes
    yield: 92.0,
    yieldChange: "+7%",
    revenue: 32200,
    revenueChange: "+18%",
    harvestDate: "Jul 30",
    harvestDateDiff: "on schedule",
  },
  5: {
    // Lettuce
    yield: 56.0,
    yieldChange: "+6%",
    revenue: 19600,
    revenueChange: "+9%",
    harvestDate: "Jun 15",
    harvestDateDiff: "2 days earlier than average",
  },
};

const currentMetrics = ref(cropMetrics[1]);

function selectCrop(cropId) {
  selectedCrop.value = cropId;
  currentMetrics.value = cropMetrics[cropId];
  // Only update charts if they've been initialized
  if (chartsInitialized.value) {
    updateCharts(cropId);
  }
}

// Initialize charts when component is mounted
onMounted(() => {
  nextTick(() => {
    if (yieldChartEl.value && priceChartEl.value) {
      initYieldChart(yieldChartEl.value);
      initPriceChart(priceChartEl.value);
      chartsInitialized.value = true;
    }
  });
});

// Clean up when component is unmounted
onBeforeUnmount(() => {
  chartsInitialized.value = false;
});
</script>

<template>
  <div class="flex-1 w-full space-y-8">
    <HeaderPage
      title="Crop Yield Forecasting"
      description="Predict and optimize your crop yields using AI-powered analytics"
    />
    <h2 class="text-2xl font-semibold">Yield Forecasting</h2>
    <Card class="bg-card">
      <CardHeader>
        <div
          class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
        >
          <CardTitle>Current Season Yield Forecast</CardTitle>
          <div class="flex flex-col items-end space-y-2">
            <span class="text-sm text-muted-foreground"
              >AI Confidence: 87%</span
            >
            <Progress :model-value="87" class="w-[150px]" />
            <!-- Fix Progress value syntax -->
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardContent class="p-6">
              <div class="space-y-2">
                <div class="text-3xl font-bold">
                  {{ currentMetrics.yield }}
                </div>
                <div class="text-sm text-muted-foreground">Tons/Hectare</div>
                <Badge variant="default"
                  >{{ currentMetrics.yieldChange }} from last season</Badge
                >
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent class="p-6">
              <div class="space-y-2">
                <div class="text-3xl font-bold">
                  ${{ currentMetrics.revenue.toLocaleString() }}
                </div>
                <div class="text-sm text-muted-foreground">
                  Est. Revenue/Hectare
                </div>
                <Badge variant="default"
                  >{{ currentMetrics.revenueChange }} from last season</Badge
                >
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent class="p-6">
              <div class="space-y-2">
                <div class="text-3xl font-bold">
                  {{ currentMetrics.harvestDate }}
                </div>
                <div class="text-sm text-muted-foreground">
                  Optimal Harvest Date
                </div>
                <Badge variant="secondary">{{
                  currentMetrics.harvestDateDiff
                }}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>

    <!-- Crop Selection & Charts -->
    <div class="space-y-6">
      <div class="flex flex-wrap gap-2">
        <Button
          v-for="crop in crops"
          :key="crop.id"
          :variant="selectedCrop === crop.id ? 'default' : 'outline'"
          @click="selectCrop(crop.id)"
        >
          {{ crop.name }}
        </Button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Historical & Predicted Yield</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="h-auto">
              <canvas ref="yieldChartEl"></canvas>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Market Price Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="h-auto">
              <canvas ref="priceChartEl"></canvas>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Yield Influencing Factors -->
    <div class="space-y-6">
      <h2 class="text-2xl font-semibold">Yield Influencing Factors</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card v-for="factor in factors" :key="factor.id">
          <CardContent class="p-6">
            <div class="flex items-start space-x-4">
              <div
                :class="[
                  'p-1 h-7 w-7 rounded-full flex items-center justify-center',
                  factor.iconClass,
                ]"
              >
                <component :is="factor.icon" class="h-8 w-8" />
              </div>
              <div class="space-y-2">
                <h3 class="font-medium">{{ factor.title }}</h3>
                <Badge
                  :variant="
                    factor.status === 'positive' ? 'default' : 'destructive'
                  "
                >
                  {{ factor.impact }}
                </Badge>
                <p class="text-sm text-muted-foreground">
                  {{ factor.description }}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- AI Recommendations -->
    <div class="space-y-6">
      <h2 class="text-2xl font-semibold">AI Recommendations</h2>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card v-for="rec in recommendations" :key="rec.id">
          <CardContent class="p-6">
            <div class="flex items-start space-x-4">
              <div
                class="p-2 h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center"
              >
                <component :is="rec.icon" class="h-6 w-6" />
              </div>
              <div class="space-y-2">
                <h3 class="font-medium">{{ rec.title }}</h3>
                <p class="text-sm text-muted-foreground">
                  {{ rec.description }}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
