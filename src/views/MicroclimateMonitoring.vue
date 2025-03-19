<template>
  <div class="microclimate-monitoring">
    <h1>Microclimate Monitoring for Vertical Farming</h1>
    
    <div class="dashboard-overview">
      <div class="overview-card temperature">
        <div class="card-icon">
          <i class="fas fa-thermometer-half"></i>
        </div>
        <div class="card-content">
          <h3>Temperature</h3>
          <div class="reading">{{ temperature }}°C</div>
          <div class="status" :class="temperatureStatus.class">
            {{ temperatureStatus.message }}
          </div>
        </div>
      </div>
      
      <div class="overview-card humidity">
        <div class="card-icon">
          <i class="fas fa-tint"></i>
        </div>
        <div class="card-content">
          <h3>Humidity</h3>
          <div class="reading">{{ humidity }}%</div>
          <div class="status" :class="humidityStatus.class">
            {{ humidityStatus.message }}
          </div>
        </div>
      </div>
      
      <div class="overview-card co2">
        <div class="card-icon">
          <i class="fas fa-cloud"></i>
        </div>
        <div class="card-content">
          <h3>CO₂ Level</h3>
          <div class="reading">{{ co2 }} ppm</div>
          <div class="status" :class="co2Status.class">
            {{ co2Status.message }}
          </div>
        </div>
      </div>
      
      <div class="overview-card light">
        <div class="card-icon">
          <i class="fas fa-lightbulb"></i>
        </div>
        <div class="card-content">
          <h3>Light Intensity</h3>
          <div class="reading">{{ light }} lux</div>
          <div class="status" :class="lightStatus.class">
            {{ lightStatus.message }}
          </div>
        </div>
      </div>
    </div>
    
    <div class="zone-monitoring">
      <h2>Zone Monitoring</h2>
      <div class="zone-selector">
        <button 
          v-for="zone in zones" 
          :key="zone.id" 
          @click="selectZone(zone.id)"
          :class="{ active: selectedZone === zone.id }"
          class="zone-button"
        >
          {{ zone.name }}
        </button>
      </div>
      
      <div class="zone-details">
        <div class="zone-visualization">
          <div class="vertical-farm-visualization">
            <div 
              v-for="level in 5" 
              :key="level" 
              class="farm-level" 
              :class="{ 'level-alert': getSelectedZone.alerts.includes(level) }"
            >
              <div class="level-info">
                <span class="level-name">Level {{ level }}</span>
                <span class="level-temp">{{ 22 - level + Math.floor(Math.random() * 3) }}°C</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="zone-charts">
          <div class="chart-container">
            <h3>24-Hour Trends</h3>
            <canvas ref="trendChart"></canvas>
          </div>
        </div>
      </div>
    </div>
    
    <div class="climate-control">
      <h2>Climate Control</h2>
      <div class="control-grid">
        <div class="control-card">
          <h3>Temperature Control</h3>
          <div class="control-settings">
            <div class="setting">
              <label>Target Temperature</label>
              <div class="setting-control">
                <button @click="decreaseTemp" class="control-btn">-</button>
                <span class="setting-value">{{ targetTemp }}°C</span>
                <button @click="increaseTemp" class="control-btn">+</button>
              </div>
            </div>
            <div class="setting">
              <label>Mode</label>
              <select v-model="tempMode" class="mode-select">
                <option value="auto">Automatic</option>
                <option value="manual">Manual</option>
                <option value="schedule">Scheduled</option>
              </select>
            </div>
            <div class="control-status" :class="tempControlStatus">
              {{ tempControlStatus === 'active' ? 'Active' : 'Inactive' }}
            </div>
          </div>
        </div>
        
        <div class="control-card">
          <h3>Humidity Control</h3>
          <div class="control-settings">
            <div class="setting">
              <label>Target Humidity</label>
              <div class="setting-control">
                <button @click="decreaseHumidity" class="control-btn">-</button>
                <span class="setting-value">{{ targetHumidity }}%</span>
                <button @click="increaseHumidity" class="control-btn">+</button>
              </div>
            </div>
            <div class="setting">
              <label>Mode</label>
              <select v-model="humidityMode" class="mode-select">
                <option value="auto">Automatic</option>
                <option value="manual">Manual</option>
                <option value="schedule">Scheduled</option>
              </select>
            </div>
            <div class="control-status" :class="humidityControlStatus">
              {{ humidityControlStatus === 'active' ? 'Active' : 'Inactive' }}
            </div>
          </div>
        </div>
        
        <div class="control-card">
          <h3>CO₂ Enrichment</h3>
          <div class="control-settings">
            <div class="setting">
              <label>Target CO₂</label>
              <div class="setting-control">
                <button @click="decreaseCO2" class="control-btn">-</button>
                <span class="setting-value">{{ targetCO2 }} ppm</span>
                <button @click="increaseCO2" class="control-btn">+</button>
              </div>
            </div>
            <div class="setting">
              <label>Mode</label>
              <select v-model="co2Mode" class="mode-select">
                <option value="auto">Automatic</option>
                <option value="manual">Manual</option>
                <option value="schedule">Scheduled</option>
              </select>
            </div>
            <div class="control-status" :class="co2ControlStatus">
              {{ co2ControlStatus === 'active' ? 'Active' : 'Inactive' }}
            </div>
          </div>
        </div>
        
        <div class="control-card">
          <h3>Lighting Control</h3>
          <div class="control-settings">
            <div class="setting">
              <label>Light Intensity</label>
              <div class="setting-control">
                <button @click="decreaseLight" class="control-btn">-</button>
                <span class="setting-value">{{ targetLight }}%</span>
                <button @click="increaseLight" class="control-btn">+</button>
              </div>
            </div>
            <div class="setting">
              <label>Light Cycle</label>
              <select v-model="lightCycle" class="mode-select">
                <option value="18-6">18/6 (Veg)</option>
                <option value="12-12">12/12 (Flower)</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div class="control-status" :class="lightControlStatus">
              {{ lightControlStatus === 'active' ? 'Active' : 'Inactive' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  name: 'MicroclimateMonitoring',
  data() {
    return {
      // Current readings
      temperature: 23.5,
      humidity: 65,
      co2: 850,
      light: 12500,
      
      // Target settings
      targetTemp: 24,
      targetHumidity: 70,
      targetCO2: 900,
      targetLight: 80,
      
      // Control modes
      tempMode: 'auto',
      humidityMode: 'auto',
      co2Mode: 'auto',
      lightCycle: '18-6',
      
      // Control statuses
      tempControlStatus: 'active',
      humidityControlStatus: 'active',
      co2ControlStatus: 'inactive',
      lightControlStatus: 'active',
      
      // Zones
      zones: [
        { id: 1, name: 'Zone A - Leafy Greens', alerts: [2, 4] },
        { id: 2, name: 'Zone B - Herbs', alerts: [] },
        { id: 3, name: 'Zone C - Strawberries', alerts: [3] },
        { id: 4, name: 'Zone D - Microgreens', alerts: [1] }
      ],
      selectedZone: 1,
      
      // Charts
      trendChart: null,
      readingInterval: null
    }
  },
  computed: {
    temperatureStatus() {
      if (this.temperature < 18) {
        return { message: 'Too Cold', class: 'status-warning' }
      } else if (this.temperature > 28) {
        return { message: 'Too Hot', class: 'status-danger' }
      } else {
        return { message: 'Optimal', class: 'status-good' }
      }
    },
    humidityStatus() {
      if (this.humidity < 50) {
        return { message: 'Too Dry', class: 'status-warning' }
      } else if (this.humidity > 80) {
        return { message: 'Too Humid', class: 'status-danger' }
      } else {
        return { message: 'Optimal', class: 'status-good' }
      }
    },
    co2Status() {
      if (this.co2 < 600) {
        return { message: 'Low', class: 'status-warning' }
      } else if (this.co2 > 1200) {
        return { message: 'High', class: 'status-danger' }
      } else {
        return { message: 'Optimal', class: 'status-good' }
      }
    },
    lightStatus() {
      if (this.light < 10000) {
        return { message: 'Low Light', class: 'status-warning' }
      } else if (this.light > 30000) {
        return { message: 'High Light', class: 'status-warning' }
      } else {
        return { message: 'Optimal', class: 'status-good' }
      }
    },
    getSelectedZone() {
      return this.zones.find(zone => zone.id === this.selectedZone) || this.zones[0]
    }
  },
  mounted() {
    this.initTrendChart()
    this.simulateReadings()
  },
  beforeUnmount() {
    if (this.trendChart) {
      this.trendChart.destroy()
    }
    clearInterval(this.readingInterval)
  },
  methods: {
    selectZone(zoneId) {
      this.selectedZone = zoneId
      this.updateTrendChart()
    },
    initTrendChart() {
      const ctx = this.$refs.trendChart.getContext('2d')
      
      // Generate time labels for the last 24 hours
      const labels = []
      for (let i = 24; i >= 0; i--) {
        const hour = new Date()
        hour.setHours(hour.getHours() - i)
        labels.push(hour.getHours() + ':00')
      }
      
      // Generate random data for demonstration
      const tempData = Array(25).fill().map(() => Math.random() * 5 + 20)
      const humidityData = Array(25).fill().map(() => Math.random() * 20 + 60)
      const co2Data = Array(25).fill().map(() => Math.random() * 300 + 700)
      
      this.trendChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Temperature (°C)',
              data: tempData,
              borderColor: '#FF6384',
              backgroundColor: 'rgba(255, 99, 132, 0.1)',
              tension: 0.4,
              yAxisID: 'y'
            },
            {
              label: 'Humidity (%)',
              data: humidityData,
              borderColor: '#36A2EB',
              backgroundColor: 'rgba(54, 162, 235, 0.1)',
              tension: 0.4,
              yAxisID: 'y'
            },
            {
              label: 'CO₂ (ppm)',
              data: co2Data,
              borderColor: '#4BC0C0',
              backgroundColor: 'rgba(75, 192, 192, 0.1)',
              tension: 0.4,
              yAxisID: 'y1'
            }
          ]
        },
        options: {
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false
          },
          plugins: {
            title: {
              display: true,
              text: 'Environmental Conditions'
            }
          },
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              title: {
                display: true,
                text: 'Temperature (°C) / Humidity (%)'
              }
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              title: {
                display: true,
                text: 'CO₂ (ppm)'
              },
              grid: {
                drawOnChartArea: false
              }
            }
          }
        }
      })
    },
    updateTrendChart() {
      // In a real app, you would fetch data for the selected zone
      // For demo, we'll just generate new random data
      const tempData = Array(25).fill().map(() => Math.random() * 5 + 20)
      const humidityData = Array(25).fill().map(() => Math.random() * 20 + 60)
      const co2Data = Array(25).fill().map(() => Math.random() * 300 + 700)
      
      this.trendChart.data.datasets[0].data = tempData
      this.trendChart.data.datasets[1].data = humidityData
      this.trendChart.data.datasets[2].data = co2Data
      this.trendChart.update()
    },
    simulateReadings() {
      // Simulate changing readings
      this.readingInterval = setInterval(() => {
        this.temperature = +(this.temperature + (Math.random() - 0.5) * 0.5).toFixed(1)
        this.humidity = Math.round(this.humidity + (Math.random() - 0.5) * 2)
        this.co2 = Math.round(this.co2 + (Math.random() - 0.5) * 20)
        this.light = Math.round(this.light + (Math.random() - 0.5) * 500)
      }, 5000)
    },
    increaseTemp() {
      this.targetTemp = Math.min(30, this.targetTemp + 0.5)
    },
    decreaseTemp() {
      this.targetTemp = Math.max(15, this.targetTemp - 0.5)
    },
    increaseHumidity() {
      this.targetHumidity = Math.min(90, this.targetHumidity + 5)
    },
    decreaseHumidity() {
      this.targetHumidity = Math.max(40, this.targetHumidity - 5)
    },
    increaseCO2() {
      this.targetCO2 = Math.min(1500, this.targetCO2 + 50)
    },
    decreaseCO2() {
      this.targetCO2 = Math.max(400, this.targetCO2 - 50)
    },
    increaseLight() {
      this.targetLight = Math.min(100, this.targetLight + 5)
    },
    decreaseLight() {
      this.targetLight = Math.max(0, this.targetLight - 5)
    }
  }
}
</script>

<style scoped>
.microclimate-monitoring {
  padding: 20px;
}

.dashboard-overview {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.overview-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  align-items: center;
}

.card-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 1.8rem;
}

.temperature .card-icon {
  background-color: rgba(255, 99, 132, 0.1);
  color: #FF6384;
}

.humidity .card-icon {
  background-color: rgba(54, 162, 235, 0.1);
  color: #36A2EB;
}

.co2 .card-icon {
  background-color: rgba(75, 192, 192, 0.1);
  color: #4BC0C0;
}

.light .card-icon {
  background-color: rgba(255, 205, 86, 0.1);
  color: #FFCD56;
}

.card-content {
  flex: 1;
}

.card-content h3 {
  margin: 0 0 5px 0;
  font-size: 1rem;
  color: #666;
}

.reading {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.status {
  font-size: 0.9rem;
  padding: 3px 8px;
  border-radius: 12px;
  display: inline-block;
}

.status-good {
  background-color: rgba(75, 192, 192, 0.2);
  color: #4BC0C0;
}

.status-warning {
  background-color: rgba(255, 205, 86, 0.2);
  color: #FFCD56;
}

.status-danger {
  background-color: rgba(255, 99, 132, 0.2);
  color: #FF6384;
}

.zone-monitoring {
  margin: 30px 0;
}

.zone-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0;
}

.zone-button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.zone-button.active {
  background-color: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.zone-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
}

.vertical-farm-visualization {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.farm-level {
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.level-alert {
  background-color: rgba(255, 99, 132, 0.2);
  border-left: 4px solid #FF6384;
}

.chart-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: 100%;
}

.chart-container h3 {
  margin-top: 0;
  margin-bottom: 15px;
}

.climate-control {
  margin: 30px 0;
}

.control-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.control-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.control-card h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
}

.control-settings {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.setting {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.setting label {
  font-size: 0.9rem;
  color: #666;
}

.setting-control {
  display: flex;
  align-items: center;
  gap: 10px;
}

.control-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background-color: #f5f5f5;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.setting-value {
  font-size: 1.2rem;
  font-weight: bold;
  min-width: 60px;
  text-align: center;
}

.mode-select {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white;
}

.control-status {
  padding: 5px 10px;
  border-radius: 4px;
  text-align: center;
  font-size: 0.9rem;
}

.active {
  background-color: rgba(75, 192, 192, 0.2);
  color: #4BC0C0;
}

.inactive {
  background-color: rgba(201, 203, 207, 0.2);
  color: #6c757d;
}
</style> 