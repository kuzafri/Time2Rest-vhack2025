<template>
  <div class="flex-1 w-full space-y-8">
    <HeaderPage
      title="Weather Forecast"
      description="Monitor weather conditions and forecasts for optimal planning"
    />

    <!-- Weather-based Irrigation Control Card -->
    <Card>
      <CardHeader>
        <CardTitle>Weather-Based Irrigation Control</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="rounded-lg bg-muted/50 p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Automation Status -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Automation Status</h3>
              <div class="flex items-center space-x-4">
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <span>Weather-based irrigation</span>
                    <Switch v-model="automationEnabled" />
                  </div>
                  <p class="text-sm text-muted-foreground mt-1">
                    {{ automationEnabled ? 'System will automatically adjust irrigation based on weather forecast' : 'Manual irrigation control is active' }}
                  </p>
                </div>
              </div>
              
              <div class="mt-4 p-4 rounded-lg" :class="statusCardClass">
                <h4 class="font-medium">Current Status</h4>
                <p class="mt-1">{{ irrigationStatus }}</p>
                <div v-if="lastIrrigationAction" class="mt-2 text-sm">
                  Last action: {{ lastIrrigationAction }}
                </div>
              </div>
            </div>
            
            <!-- Weather Rules -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Weather Rules</h3>
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span>Skip if rain is forecasted</span>
                  <Switch v-model="skipOnRain" />
                </div>
                <div class="flex items-center justify-between">
                  <span>Reduce watering on cloudy days</span>
                  <Switch v-model="reduceOnCloudy" />
                </div>
                <div class="flex items-center justify-between">
                  <span>Increase watering on hot days</span>
                  <Switch v-model="increaseOnHot" />
                </div>
              </div>
              
              <div class="mt-4">
                <Label>Temperature threshold for "hot day" (°C)</Label>
                <div class="flex items-center space-x-2 mt-1">
                  <Input 
                    type="number" 
                    v-model="hotDayThreshold" 
                    min="20" 
                    max="40" 
                    class="w-20" 
                  />
                  <Slider 
                    v-model="hotDayThreshold" 
                    :min="20" 
                    :max="40" 
                    class="flex-1" 
                  />
                </div>
              </div>
            </div>
          </div>
          
          <!-- Irrigation Forecast -->
          <div class="mt-8">
            <h3 class="text-lg font-semibold mb-4">Irrigation Forecast (Next 5 Days)</h3>
            <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Card v-for="(day, index) in irrigationForecast" :key="index" class="bg-card">
                <CardContent class="p-4">
                  <div class="font-semibold">{{ day.date }}</div>
                  <div class="flex items-center mt-2">
                    <Badge :variant="getIrrigationBadgeVariant(day.status)">
                      {{ day.status }}
                    </Badge>
                  </div>
                  <div class="mt-2 text-sm text-muted-foreground">
                    {{ day.reason }}
                  </div>
                  <div v-if="day.adjustedDuration" class="mt-2 text-sm">
                    <span class="font-medium">Duration:</span> 
                    {{ day.adjustedDuration }} min
                    <span v-if="day.originalDuration !== day.adjustedDuration" class="text-xs">
                      ({{ day.adjustedDuration > day.originalDuration ? '+' : '-' }}{{ Math.abs(day.adjustedDuration - day.originalDuration) }} min)
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="mt-6 flex justify-end space-x-4">
            <Button variant="outline" @click="resetToDefaults">Reset to Defaults</Button>
            <Button @click="saveSettings">Save Settings</Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Original Weather Forecast Card -->
    <Card>
      <div v-if="loading" class="py-10">
        <div class="space-y-4">
          <Skeleton class="h-8 w-3/4 mx-auto" />
          <Skeleton class="h-16 w-1/2 mx-auto" />
          <div class="flex gap-4 justify-center">
            <Skeleton class="h-4 w-24" />
            <Skeleton class="h-4 w-24" />
          </div>
        </div>
      </div>
      <div v-else-if="error" class="py-10 text-center text-lg text-red-600">
        {{ error }}
      </div>
      <div v-else>
        <CardHeader>
          <CardTitle>5-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="rounded-lg bg-muted/50 p-6">
            <!-- Current Weather -->
            <div class="mb-6 pb-6 border-b">
              <h2 class="text-2xl font-semibold text-foreground mb-4">
                Current Weather in {{ location }}
              </h2>
              <div class="space-y-4">
                <div class="text-6xl font-bold text-foreground">
                  {{ currentWeather.temperature }}°C
                </div>
                <div>
                  <Badge
                    :variant="getWeatherBadgeVariant(currentWeather.condition)"
                    class="text-lg"
                  >
                    {{ currentWeather.condition }}
                  </Badge>
                </div>
                <div class="flex gap-6 text-sm text-muted-foreground">
                  <p>Humidity: {{ currentWeather.humidity }}%</p>
                  <p>Wind: {{ currentWeather.wind }} km/h</p>
                </div>
              </div>
            </div>

            <!-- Forecast Days -->
            <div
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
            >
              <Card
                v-for="(day, index) in forecast"
                :key="index"
                class="bg-card"
              >
                <CardContent class="p-4 text-center">
                  <div class="font-semibold mb-2">{{ day.date }}</div>
                  <div class="space-x-1">
                    <span class="text-red-500">{{ day.highTemp }}°</span>
                    <span class="text-muted-foreground">/</span>
                    <span class="text-blue-500">{{ day.lowTemp }}°</span>
                  </div>
                  <div class="mt-2">
                    <Badge
                      :variant="getWeatherBadgeVariant(day.condition)"
                      class="text-xs"
                    >
                      {{ day.condition }}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  </div>
</template>

<script setup>
import HeaderPage from "@/components/HeaderPage.vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ref, onMounted, computed, watch } from "vue";

const loading = ref(true);
const error = ref(null);
const location = ref("Loading location...");
const currentWeather = ref({
  temperature: 0,
  condition: "",
  humidity: 0,
  wind: 0,
});
const forecast = ref([]);
const userCoords = ref(null);

// Weather-based irrigation automation
const automationEnabled = ref(true);
const skipOnRain = ref(true);
const reduceOnCloudy = ref(true);
const increaseOnHot = ref(true);
const hotDayThreshold = ref(30);
const irrigationStatus = ref("Waiting for weather data");
const lastIrrigationAction = ref("");

const getWeatherBadgeVariant = (condition) => {
  switch (condition.toLowerCase()) {
    case "sunny":
      return "warn";
    case "partly cloudy":
      return "secondary";
    case "cloudy":
      return "outline";
    case "rainy":
    case "stormy":
      return "destructive";
    default:
      return "default";
  }
};

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userCoords.value = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        fetchLocationName();
        fetchWeatherData();
      },
      (geoError) => {
        console.error("Error getting location:", geoError);
        error.value =
          "Unable to access your location. Using default location instead.";
        fetchWeatherData();
      },
      { timeout: 10000 }
    );
  } else {
    error.value =
      "Geolocation is not supported by your browser. Using default location.";
    fetchWeatherData();
  }
}

function fetchLocationName() {
  if (userCoords.value) {
    location.value = "Finding your location...";

    // Use a free reverse geocoding API that doesn't require API key for demo purposes
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${userCoords.value.latitude}&lon=${userCoords.value.longitude}&zoom=10`;

    fetch(url, {
      headers: {
        // Add a user agent as required by Nominatim usage policy
        "User-Agent": "FarmMonitoringApp/1.0",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.address) {
          // Extract city/district name from OpenStreetMap data
          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.suburb ||
            data.address.county;

          const state = data.address.state || data.address.region;

          if (city && state) {
            location.value = `${city}, ${state}`;
          } else if (city) {
            location.value = city;
          } else {
            // If we can't get a specific city name, use the display name
            location.value = data.display_name.split(",").slice(0, 2).join(",");
          }
        } else {
          location.value = "Your Location";
        }
      })
      .catch((error) => {
        console.error("Error fetching location name:", error);
        location.value = "Your Location";
      });
  }
}

function fetchWeatherData() {
  // This is mock data - in a real app, you would fetch from a weather API
  try {
    // Simulate API call with delay
    setTimeout(() => {
      if (userCoords.value) {
        currentWeather.value = {
          temperature: Math.floor(15 + Math.random() * 15),
          condition: ["Sunny", "Partly Cloudy", "Cloudy", "Rainy"][
            Math.floor(Math.random() * 4)
          ],
          humidity: Math.floor(50 + Math.random() * 40),
          wind: Math.floor(5 + Math.random() * 20),
        };

        const conditions = [
          "Sunny",
          "Partly Cloudy",
          "Cloudy",
          "Rainy",
          "Stormy",
        ];
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const today = new Date();

        forecast.value = Array.from({ length: 5 }, (_, i) => {
          const date = new Date(today);
          date.setDate(today.getDate() + i + 1);
          const dayName = days[date.getDay()];

          return {
            date: dayName,
            highTemp: Math.floor(18 + Math.random() * 12),
            lowTemp: Math.floor(10 + Math.random() * 10),
            condition:
              conditions[Math.floor(Math.random() * conditions.length)],
          };
        });
      } else {
        // Default location data
        location.value = "New York";
        currentWeather.value = {
          temperature: 22,
          condition: "Partly Cloudy",
          humidity: 65,
          wind: 12,
        };

        forecast.value = [
          { date: "Mon", highTemp: 24, lowTemp: 18, condition: "Sunny" },
          {
            date: "Tue",
            highTemp: 22,
            lowTemp: 17,
            condition: "Partly Cloudy",
          },
          { date: "Wed", highTemp: 19, lowTemp: 15, condition: "Rainy" },
          { date: "Thu", highTemp: 21, lowTemp: 16, condition: "Cloudy" },
          { date: "Fri", highTemp: 25, lowTemp: 19, condition: "Sunny" },
        ];
      }

      loading.value = false;
    }, 1500);
  } catch (err) {
    error.value = "Failed to load weather data. Please try again later.";
    loading.value = false;
    console.error("Error fetching weather data:", err);
  }
}

// Computed property for status card styling
const statusCardClass = computed(() => {
  if (!automationEnabled.value) return "bg-gray-100";
  
  const currentCondition = currentWeather.value?.condition?.toLowerCase() || "";
  
  if (currentCondition.includes("rain")) {
    return "bg-blue-50 text-blue-700";
  } else if (currentCondition.includes("cloud")) {
    return "bg-gray-100 text-gray-700";
  } else if (currentWeather.value?.temperature > hotDayThreshold.value) {
    return "bg-orange-50 text-orange-700";
  } else {
    return "bg-green-50 text-green-700";
  }
});

// Generate irrigation forecast based on weather forecast
const irrigationForecast = computed(() => {
  if (!forecast.value || forecast.value.length === 0) {
    return Array(5).fill().map((_, i) => ({
      date: `Day ${i+1}`,
      status: "Unknown",
      reason: "Waiting for weather data",
      originalDuration: 30,
      adjustedDuration: 30
    }));
  }
  
  return forecast.value.map(day => {
    const condition = day.condition.toLowerCase();
    const isRainy = condition.includes("rain") || condition.includes("storm");
    const isCloudy = condition.includes("cloud");
    const isHot = day.highTemp > hotDayThreshold.value;
    
    let status = "Scheduled";
    let reason = "Regular irrigation scheduled";
    let originalDuration = 30; // Default duration in minutes
    let adjustedDuration = originalDuration;
    
    if (automationEnabled.value) {
      if (isRainy && skipOnRain.value) {
        status = "Skipped";
        reason = "Rain forecasted";
        adjustedDuration = 0;
      } else if (isCloudy && reduceOnCloudy.value) {
        status = "Reduced";
        reason = "Cloudy conditions";
        adjustedDuration = Math.round(originalDuration * 0.7); // 30% reduction
      } else if (isHot && increaseOnHot.value) {
        status = "Increased";
        reason = `Hot day (${day.highTemp}°C)`;
        adjustedDuration = Math.round(originalDuration * 1.3); // 30% increase
      }
    }
    
    return {
      date: day.date,
      status,
      reason,
      originalDuration,
      adjustedDuration
    };
  });
});

// Update irrigation status based on current weather
watch([() => currentWeather.value, automationEnabled], () => {
  if (!automationEnabled.value) {
    irrigationStatus.value = "Automation disabled";
    return;
  }
  
  if (!currentWeather.value || !currentWeather.value.condition) {
    irrigationStatus.value = "Waiting for weather data";
    return;
  }
  
  const condition = currentWeather.value.condition.toLowerCase();
  const isRainy = condition.includes("rain") || condition.includes("storm");
  const isCloudy = condition.includes("cloud");
  const isHot = currentWeather.value.temperature > hotDayThreshold.value;
  
  if (isRainy && skipOnRain.value) {
    irrigationStatus.value = "Irrigation paused due to rain";
    lastIrrigationAction.value = "Skipped scheduled irrigation at " + new Date().toLocaleTimeString();
  } else if (isCloudy && reduceOnCloudy.value) {
    irrigationStatus.value = "Reduced irrigation due to cloudy conditions";
    lastIrrigationAction.value = "Reduced irrigation duration at " + new Date().toLocaleTimeString();
  } else if (isHot && increaseOnHot.value) {
    irrigationStatus.value = "Increased irrigation due to high temperature";
    lastIrrigationAction.value = "Increased irrigation duration at " + new Date().toLocaleTimeString();
  } else {
    irrigationStatus.value = "Regular irrigation schedule active";
  }
}, { immediate: true });

// Badge variant for irrigation status
const getIrrigationBadgeVariant = (status) => {
  switch (status.toLowerCase()) {
    case "skipped":
      return "destructive";
    case "reduced":
      return "warn";
    case "increased":
      return "default";
    case "scheduled":
      return "secondary";
    default:
      return "outline";
  }
};

// Reset settings to defaults
const resetToDefaults = () => {
  automationEnabled.value = true;
  skipOnRain.value = true;
  reduceOnCloudy.value = true;
  increaseOnHot.value = true;
  hotDayThreshold.value = 30;
};

// Save settings (in a real app, this would call an API)
const saveSettings = () => {
  // Simulate API call
  setTimeout(() => {
    alert("Weather-based irrigation settings saved successfully!");
  }, 500);
};

// Extend the existing onMounted to include irrigation automation initialization
const originalOnMounted = onMounted;
onMounted(() => {
  // Call the original onMounted function
  getUserLocation();
  
  // Initialize irrigation automation
  // In a real app, you would fetch these settings from your backend
  setTimeout(() => {
    if (currentWeather.value && currentWeather.value.condition) {
      const condition = currentWeather.value.condition.toLowerCase();
      if (condition.includes("rain") && skipOnRain.value) {
        lastIrrigationAction.value = "Automatically skipped irrigation at " + new Date().toLocaleTimeString();
      }
    }
  }, 2000);
});
</script>
