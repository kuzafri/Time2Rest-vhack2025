<template>
  <AppLayout>
    <div class="mb-8">
      <h2 class="text-xl font-medium text-gray-800 mb-1">Weather Forecast</h2>
      <p class="text-gray-500 text-sm">View upcoming weather conditions for your farm</p>
    </div>
    
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 class="font-medium text-gray-800 mb-4">5-Day Forecast</h3>
      <div class="forecast-container">
        <div class="current-weather">
          <h2>Current Weather in {{ location }}</h2>
          <div class="weather-info">
            <div class="temperature">{{ currentWeather.temperature }}°C</div>
            <div class="condition">{{ currentWeather.condition }}</div>
            <div class="details">
              <p>Humidity: {{ currentWeather.humidity }}%</p>
              <p>Wind: {{ currentWeather.wind }} km/h</p>
            </div>
          </div>
        </div>
        
        <div class="forecast">
          <div class="forecast-list">
            <div v-for="(day, index) in forecast" :key="index" class="forecast-day">
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
  </AppLayout>
</template>

<script>
import AppLayout from '../components/AppLayout.vue'

export default {
  name: 'WeatherForecast',
  components: {
    AppLayout
  },
  data() {
    return {
      loading: true,
      error: null,
      location: 'Your Location',
      currentWeather: {
        temperature: 0,
        condition: '',
        humidity: 0,
        wind: 0
      },
      forecast: []
    }
  },
  mounted() {
    // Simulate fetching weather data
    setTimeout(() => {
      this.fetchWeatherData();
    }, 1000);
  },
  methods: {
    fetchWeatherData() {
      // This is mock data - in a real app, you would fetch from a weather API
      try {
        // Simulate API call
        this.location = 'New York';
        this.currentWeather = {
          temperature: 22,
          condition: 'Partly Cloudy',
          humidity: 65,
          wind: 12
        };
        
        this.forecast = [
          { date: 'Mon', highTemp: 24, lowTemp: 18, condition: 'Sunny' },
          { date: 'Tue', highTemp: 22, lowTemp: 17, condition: 'Partly Cloudy' },
          { date: 'Wed', highTemp: 19, lowTemp: 15, condition: 'Rainy' },
          { date: 'Thu', highTemp: 21, lowTemp: 16, condition: 'Cloudy' },
          { date: 'Fri', highTemp: 25, lowTemp: 19, condition: 'Sunny' }
        ];
        
        this.loading = false;
      } catch (err) {
        this.error = 'Failed to load weather data. Please try again later.';
        this.loading = false;
        console.error('Error fetching weather data:', err);
      }
    }
  }
}
</script>

<style scoped>
.weather-forecast {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.loading, .error {
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

h1, h2 {
  color: #2c3e50;
}

h1 {
  margin-bottom: 30px;
}

h2 {
  margin-bottom: 20px;
}
</style>

