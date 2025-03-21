<script setup>
import HeaderPage from "@/components/HeaderPage.vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from "vue";
import { useMicroclimateChart } from "@/composables/useMicroclimateChart";
import {
  Thermometer,
  Droplets,
  Cloud,
  Sun,
  Plus,
  Minus,
  AlertTriangle,
} from "lucide-vue-next";

// Current readings
const temperature = ref(23.5);
const humidity = ref(65);
const co2 = ref(850);
const light = ref(12500);

// Target settings
const targetTemp = ref(24);
const targetHumidity = ref(70);
const targetCO2 = ref(900);
const targetLight = ref(80);

// Control modes
const tempMode = ref("auto");
const humidityMode = ref("auto");
const co2Mode = ref("auto");
const lightCycle = ref("18-6");

// Control statuses
const tempControlStatus = ref("active");
const humidityControlStatus = ref("active");
const co2ControlStatus = ref("inactive");
const lightControlStatus = ref("active");

// Climate controls configuration
const climateControls = [
  {
    id: "temperature",
    title: "Temperature Control",
    targetValue: targetTemp,
    unit: "°C",
    mode: tempMode,
    status: tempControlStatus,
    min: 15,
    max: 30,
    step: 0.5,
    decrease: decreaseTemp,
    increase: increaseTemp,
  },
  {
    id: "humidity",
    title: "Humidity Control",
    targetValue: targetHumidity,
    unit: "%",
    mode: humidityMode,
    status: humidityControlStatus,
    min: 40,
    max: 90,
    step: 5,
    decrease: decreaseHumidity,
    increase: increaseHumidity,
  },
  {
    id: "co2",
    title: "CO₂ Enrichment",
    targetValue: targetCO2,
    unit: "ppm",
    mode: co2Mode,
    status: co2ControlStatus,
    min: 400,
    max: 1500,
    step: 50,
    decrease: decreaseCO2,
    increase: increaseCO2,
  },
  {
    id: "light",
    title: "Lighting Control",
    targetValue: targetLight,
    unit: "%",
    mode: lightCycle,
    status: lightControlStatus,
    min: 0,
    max: 100,
    step: 5,
    decrease: decreaseLight,
    increase: increaseLight,
    isLightControl: true,
  },
];

// Charts
const trendChartEl = ref(null);
const { createChart, updateChart } = useMicroclimateChart();
const readingInterval = ref(null);

// Zones
const zones = ref([
  { id: 1, name: "Zone A - Leafy Greens", alerts: [2, 4] },
  { id: 2, name: "Zone B - Herbs", alerts: [] },
  { id: 3, name: "Zone C - Strawberries", alerts: [3] },
  { id: 4, name: "Zone D - Microgreens", alerts: [1] },
]);
const selectedZone = ref(1);

const getSelectedZone = () => {
  return (
    zones.value.find((zone) => zone.id === selectedZone.value) || zones.value[0]
  );
};

const temperatureStatus = computed(() => {
  if (temperature.value < 18) {
    return { message: "Too Cold", variant: "warn" };
  } else if (temperature.value > 28) {
    return { message: "Too Hot", variant: "destructive" };
  } else {
    return { message: "Optimal", variant: "default" };
  }
});

const humidityStatus = computed(() => {
  if (humidity.value < 50) {
    return { message: "Too Dry", variant: "warn" };
  } else if (humidity.value > 80) {
    return { message: "Too Humid", variant: "destructive" };
  } else {
    return { message: "Optimal", variant: "default" };
  }
});

const co2Status = computed(() => {
  if (co2.value < 600) {
    return { message: "Low", variant: "warn" };
  } else if (co2.value > 1200) {
    return { message: "High", variant: "destructive" };
  } else {
    return { message: "Optimal", variant: "default" };
  }
});

const lightStatus = computed(() => {
  if (light.value < 10000) {
    return { message: "Low Light", variant: "warn" };
  } else if (light.value > 30000) {
    return { message: "High Light", variant: "warning" };
  } else {
    return { message: "Optimal", variant: "default" };
  }
});

// Dashboard metrics configuration
const dashboardMetrics = [
  {
    id: "temperature",
    title: "Temperature",
    value: temperature,
    unit: "°C",
    icon: Thermometer,
    iconClass: "bg-red-100 text-red-500",
    getStatus: temperatureStatus,
  },
  {
    id: "humidity",
    title: "Humidity",
    value: humidity,
    unit: "%",
    icon: Droplets,
    iconClass: "bg-blue-100 text-blue-500",
    getStatus: humidityStatus,
  },
  {
    id: "co2",
    title: "CO₂ Level",
    value: co2,
    unit: "ppm",
    icon: Cloud,
    iconClass: "bg-green-100 text-green-500",
    getStatus: co2Status,
  },
  {
    id: "light",
    title: "Light Intensity",
    value: light,
    unit: "lux",
    icon: Sun,
    iconClass: "bg-yellow-100 text-yellow-500",
    getStatus: lightStatus,
  },
];

// Methods for controls
function selectZone(zoneId) {
  selectedZone.value = zoneId;
  updateChart();
}

function simulateReadings() {
  // Simulate changing readings
  readingInterval.value = setInterval(() => {
    temperature.value = +(
      temperature.value +
      (Math.random() - 0.5) * 0.5
    ).toFixed(1);
    humidity.value = Math.round(humidity.value + (Math.random() - 0.5) * 2);
    co2.value = Math.round(co2.value + (Math.random() - 0.5) * 20);
    light.value = Math.round(light.value + (Math.random() - 0.5) * 500);
  }, 5000);
}

function increaseTemp() {
  targetTemp.value = Math.min(30, targetTemp.value + 0.5);
}

function decreaseTemp() {
  targetTemp.value = Math.max(15, targetTemp.value - 0.5);
}

function increaseHumidity() {
  targetHumidity.value = Math.min(90, targetHumidity.value + 5);
}

function decreaseHumidity() {
  targetHumidity.value = Math.max(40, targetHumidity.value - 5);
}

function increaseCO2() {
  targetCO2.value = Math.min(1500, targetCO2.value + 50);
}

function decreaseCO2() {
  targetCO2.value = Math.max(400, targetCO2.value - 50);
}

function increaseLight() {
  targetLight.value = Math.min(100, targetLight.value + 5);
}

function decreaseLight() {
  targetLight.value = Math.max(0, targetLight.value - 5);
}

onMounted(() => {
  nextTick(() => {
    if (trendChartEl.value) {
      createChart(trendChartEl.value);
    }
  });
  simulateReadings();
});

onBeforeUnmount(() => {
  clearInterval(readingInterval.value);
});
</script>

<template>
  <div class="flex-1 w-full space-y-8">
    <HeaderPage
      title="Microclimate Monitoring"
      description="Track and analyze environmental conditions in your growing areas"
    />

    <h1 class="text-2xl font-semibold">
      Microclimate Monitoring for Vertical Farming
    </h1>

    <!-- Dashboard Overview -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card v-for="metric in dashboardMetrics" :key="metric.id" class="bg-card">
        <CardContent class="p-6">
          <div class="flex items-center space-x-4">
            <div
              :class="[
                'h-12 w-12 rounded-full flex items-center justify-center',
                metric.iconClass,
              ]"
            >
              <component :is="metric.icon" class="h-6 w-6" />
            </div>
            <div class="space-y-1">
              <h3 class="text-sm font-medium text-muted-foreground">
                {{ metric.title }}
              </h3>
              <div class="text-2xl font-bold">
                {{ metric.value.value }}{{ metric.unit }}
              </div>
              <Badge :variant="metric.getStatus.value.variant">
                {{ metric.getStatus.value.message }}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Zone Monitoring -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">Zone Monitoring</h2>
      <div class="flex flex-wrap gap-2">
        <Button
          v-for="zone in zones"
          :key="zone.id"
          :variant="selectedZone === zone.id ? 'default' : 'outline'"
          @click="selectZone(zone.id)"
        >
          {{ zone.name }}
        </Button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card class="lg:col-span-1">
          <CardHeader>
            <CardTitle>Vertical Farm Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-2">
              <div
                v-for="level in 5"
                :key="level"
                :class="[
                  'p-4 rounded-lg flex justify-between items-center',
                  getSelectedZone().alerts.includes(level)
                    ? 'bg-destructive/10 border-l-4 border-destructive'
                    : 'bg-muted',
                ]"
              >
                <div class="flex items-center space-x-2">
                  <span class="font-medium">Level {{ level }}</span>
                  <AlertTriangle
                    v-if="getSelectedZone().alerts.includes(level)"
                    class="h-4 w-4 text-destructive"
                  />
                </div>
                <span>{{ 22 - level + Math.floor(Math.random() * 3) }}°C</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card class="lg:col-span-2">
          <CardHeader>
            <CardTitle>24-Hour Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="h-auto">
              <canvas ref="trendChartEl"></canvas>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Climate Control -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">Climate Control</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card v-for="control in climateControls" :key="control.id">
          <CardHeader>
            <CardTitle class="text-center">{{ control.title }}</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-2">
              <div class="flex items-center justify-center mb-6">
                <div class="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    @click="control.decrease"
                  >
                    <Minus class="h-4 w-4" />
                  </Button>
                  <span class="w-16 text-center">
                    {{ control.targetValue }}{{ control.unit }}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    @click="control.increase"
                  >
                    <Plus class="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Select v-model="control.mode">
                <SelectTrigger>
                  <SelectValue
                    :placeholder="
                      control.isLightControl ? 'Select cycle' : 'Select mode'
                    "
                  />
                </SelectTrigger>
                <SelectContent>
                  <template v-if="control.isLightControl">
                    <SelectItem value="18-6">18/6 (Veg)</SelectItem>
                    <SelectItem value="12-12">12/12 (Flower)</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </template>
                  <template v-else>
                    <SelectItem value="auto">Automatic</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="schedule">Scheduled</SelectItem>
                  </template>
                </SelectContent>
              </Select>
              <Badge
                :variant="
                  control.status === 'active' ? 'completed' : 'secondary'
                "
              >
                {{ control.status === "active" ? "Active" : "Inactive" }}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
