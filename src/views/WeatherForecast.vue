<template>
  <div class="flex-1">
    <HeaderPage
      title="Weather Forecast"
      description="Monitor weather conditions and forecasts for optimal planning"
    />
    <div class="weather-forecast">
      <div class="mb-8">
        <h2 class="text-xl font-medium text-gray-800 mb-1">Weather Forecast</h2>
        <p class="text-gray-500 text-sm">
          View upcoming weather conditions for your farm
        </p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div v-if="loading" class="loading">Loading weather data...</div>
        <div v-else-if="error" class="error">
          {{ error }}
        </div>
        <div v-else>
          <h3 class="font-medium text-gray-800 mb-4">5-Day Forecast</h3>
          <div class="forecast-container">
            <div class="current-weather">
              <h2>Current Weather in {{ location }}</h2>
              <div class="weather-info">
                <div class="temperature">
                  {{ currentWeather.temperature }}°C
                </div>
                <div class="condition">{{ currentWeather.condition }}</div>
                <div class="details">
                  <p>Humidity: {{ currentWeather.humidity }}%</p>
                  <p>Wind: {{ currentWeather.wind }} km/h</p>
                </div>
              </div>
            </div>

            <div class="forecast">
              <div class="forecast-list">
                <div
                  v-for="(day, index) in forecast"
                  :key="index"
                  class="forecast-day"
                >
                  <div class="day-name">{{ day.date }}</div>
                  <div class="day-temp">
                    <span class="high">{{ day.highTemp }}°</span> /
                    <span class="low">{{ day.lowTemp }}°</span>
                  </div>
                  <div class="day-condition">{{ day.condition }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderPage from "@/components/HeaderPage.vue";

export default {
  name: "WeatherForecast",
  components: {
    HeaderPage,
  },
  data() {
    return {
      loading: true,
      error: null,
      location: "Loading location...",
      currentWeather: {
        temperature: 0,
        condition: "",
        humidity: 0,
        wind: 0,
      },
      forecast: [],
      userCoords: null,
    };
  },
  mounted() {
    this.getUserLocation();
  },
  methods: {
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.userCoords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            this.fetchLocationName();
            this.fetchWeatherData();
          },
          (error) => {
            console.error("Error getting location:", error);
            this.error =
              "Unable to access your location. Using default location instead.";
            // Fall back to default location
            this.fetchWeatherData();
          },
          { timeout: 10000 }
        );
      } else {
        this.error =
          "Geolocation is not supported by your browser. Using default location.";
        this.fetchWeatherData();
      }
    },
    fetchLocationName() {
      if (this.userCoords) {
        this.location = "Finding your location...";

        // Use a free reverse geocoding API that doesn't require API key for demo purposes
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${this.userCoords.latitude}&lon=${this.userCoords.longitude}&zoom=10`;

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
                this.location = `${city}, ${state}`;
              } else if (city) {
                this.location = city;
              } else {
                // If we can't get a specific city name, use the display name
                this.location = data.display_name
                  .split(",")
                  .slice(0, 2)
                  .join(",");
              }
            } else {
              this.location = "Your Location";
            }
          })
          .catch((error) => {
            console.error("Error fetching location name:", error);
            this.location = "Your Location";
          });
      }
    },
    fetchWeatherData() {
      // This is mock data - in a real app, you would fetch from a weather API using the coordinates
      try {
        // Simulate API call with delay
        setTimeout(() => {
          if (this.userCoords) {
            // If we have user coordinates, we would use them to get local weather
            // For demo, we'll just show different data based on having coordinates
            this.currentWeather = {
              temperature: Math.floor(15 + Math.random() * 15),
              condition: ["Sunny", "Partly Cloudy", "Cloudy", "Rainy"][
                Math.floor(Math.random() * 4)
              ],
              humidity: Math.floor(50 + Math.random() * 40),
              wind: Math.floor(5 + Math.random() * 20),
            };

            // Generate random forecast based on current weather
            const conditions = [
              "Sunny",
              "Partly Cloudy",
              "Cloudy",
              "Rainy",
              "Stormy",
            ];
            const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const today = new Date();

            this.forecast = Array(5)
              .fill()
              .map((_, i) => {
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
            // Default location data (same as original)
            this.location = "New York";
            this.currentWeather = {
              temperature: 22,
              condition: "Partly Cloudy",
              humidity: 65,
              wind: 12,
            };

            this.forecast = [
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

          this.loading = false;
        }, 1500);
      } catch (err) {
        this.error = "Failed to load weather data. Please try again later.";
        this.loading = false;
        console.error("Error fetching weather data:", err);
      }
    },
  },
};
</script>

<style scoped>
.weather-forecast {
  max-width: 800px;
}

.loading,
.error {
  text-align: center;
  margin: 40px 0;
  font-size: 18px;
}

.error {
  color: #e74c3c;
}

.forecast-container {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.current-weather {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.temperature {
  font-size: 48px;
  font-weight: bold;
}

.condition {
  font-size: 24px;
  margin: 10px 0;
}

.details {
  display: flex;
  justify-content: space-between;
  max-width: 300px;
}

.forecast-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.forecast-day {
  flex: 1;
  min-width: 100px;
  text-align: center;
  padding: 15px 10px;
  background-color: white;
  margin: 5px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.day-name {
  font-weight: bold;
  margin-bottom: 8px;
}

.high {
  color: #e74c3c;
}

.low {
  color: #3498db;
}

h1,
h2 {
  color: #2c3e50;
}

h1 {
  margin-bottom: 30px;
}

h2 {
  margin-bottom: 20px;
}
</style>
