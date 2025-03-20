<template>
  <div class="flex-1 w-full space-y-8">
    <HeaderPage
      title="Weather Forecast"
      description="Monitor weather conditions and forecasts for optimal planning"
    />

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
import { ref, onMounted } from "vue";

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

onMounted(() => {
  getUserLocation();
});
</script>
