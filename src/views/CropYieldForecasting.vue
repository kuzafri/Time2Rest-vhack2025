<template>
  <div class="crop-yield-forecasting">
    <h1>Predictive Crop Yield & Market Forecasting</h1>
    
    <div class="forecast-overview">
      <div class="overview-card">
        <div class="card-header">
          <h2>Current Season Yield Forecast</h2>
          <div class="confidence-indicator">
            <span>AI Confidence: 87%</span>
            <div class="confidence-bar">
              <div class="confidence-level" style="width: 87%"></div>
            </div>
          </div>
        </div>
        <div class="yield-summary">
          <div class="yield-metric">
            <div class="metric-value">14.2</div>
            <div class="metric-label">Tons/Hectare</div>
            <div class="metric-change positive">+8% from last season</div>
          </div>
          <div class="yield-metric">
            <div class="metric-value">$24,850</div>
            <div class="metric-label">Est. Revenue/Hectare</div>
            <div class="metric-change positive">+12% from last season</div>
          </div>
          <div class="yield-metric">
            <div class="metric-value">Oct 15</div>
            <div class="metric-label">Optimal Harvest Date</div>
            <div class="metric-change">5 days earlier than average</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="forecast-details">
      <div class="crop-selector">
        <button 
          v-for="crop in crops" 
          :key="crop.id" 
          @click="selectCrop(crop.id)"
          :class="{ active: selectedCrop === crop.id }"
          class="crop-button"
        >
          {{ crop.name }}
        </button>
      </div>
      
      <div class="forecast-charts">
        <div class="chart-card">
          <h3>Historical & Predicted Yield</h3>
          <div class="chart-container">
            <canvas ref="yieldChart"></canvas>
          </div>
        </div>
        
        <div class="chart-card">
          <h3>Market Price Forecast</h3>
          <div class="chart-container">
            <canvas ref="priceChart"></canvas>
          </div>
        </div>
      </div>
    </div>
    
    <div class="factors-analysis">
      <h2>Yield Influencing Factors</h2>
      <div class="factors-grid">
        <div class="factor-card">
          <div class="factor-icon weather">
            <i class="fas fa-cloud-sun"></i>
          </div>
          <div class="factor-content">
            <h3>Weather Conditions</h3>
            <div class="factor-impact positive">+12% Impact</div>
            <p>Favorable temperature and rainfall patterns predicted for the next 30 days.</p>
          </div>
        </div>
        
        <div class="factor-card">
          <div class="factor-icon soil">
            <i class="fas fa-seedling"></i>
          </div>
          <div class="factor-content">
            <h3>Soil Health</h3>
            <div class="factor-impact positive">+8% Impact</div>
            <p>Improved nitrogen levels and microbial activity detected in recent soil tests.</p>
          </div>
        </div>
        
        <div class="factor-card">
          <div class="factor-icon pests">
            <i class="fas fa-bug"></i>
          </div>
          <div class="factor-content">
            <h3>Pest Pressure</h3>
            <div class="factor-impact negative">-3% Impact</div>
            <p>Minor aphid presence detected. Preventative measures recommended.</p>
          </div>
        </div>
        
        <div class="factor-card">
          <div class="factor-icon market">
            <i class="fas fa-chart-line"></i>
          </div>
          <div class="factor-content">
            <h3>Market Demand</h3>
            <div class="factor-impact positive">+15% Impact</div>
            <p>Strong demand expected due to reduced imports and increased local consumption.</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="recommendations">
      <h2>AI Recommendations</h2>
      <div class="recommendations-list">
        <div class="recommendation-item">
          <div class="recommendation-icon">
            <i class="fas fa-calendar-alt"></i>
          </div>
          <div class="recommendation-content">
            <h3>Optimal Planting Schedule</h3>
            <p>For maximum yield, plant your next crop between March 15-20. This timing aligns with predicted favorable weather patterns and optimal soil temperature.</p>
          </div>
        </div>
        
        <div class="recommendation-item">
          <div class="recommendation-icon">
            <i class="fas fa-tint"></i>
          </div>
          <div class="recommendation-content">
            <h3>Irrigation Strategy</h3>
            <p>Reduce irrigation by 15% in zones 2 and 3 due to predicted rainfall. Increase by 10% in zone 1 to compensate for higher evaporation rates.</p>
          </div>
        </div>
        
        <div class="recommendation-item">
          <div class="recommendation-icon">
            <i class="fas fa-dollar-sign"></i>
          </div>
          <div class="recommendation-content">
            <h3>Market Timing</h3>
            <p>Consider staggered harvesting to capitalize on predicted price increases in late October. Early contracts recommended for 60% of yield, with 40% reserved for spot market.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  name: 'CropYieldForecasting',
  data() {
    return {
      crops: [
        { id: 1, name: 'Corn' },
        { id: 2, name: 'Soybeans' },
        { id: 3, name: 'Wheat' },
        { id: 4, name: 'Tomatoes' },
        { id: 5, name: 'Lettuce' }
      ],
      selectedCrop: 1,
      yieldChart: null,
      priceChart: null
    }
  },
  mounted() {
    this.initYieldChart()
    this.initPriceChart()
  },
  beforeUnmount() {
    if (this.yieldChart) {
      this.yieldChart.destroy()
    }
    if (this.priceChart) {
      this.priceChart.destroy()
    }
  },
  methods: {
    selectCrop(cropId) {
      this.selectedCrop = cropId
      this.updateCharts()
    },
    initYieldChart() {
      const ctx = this.$refs.yieldChart.getContext('2d')
      
      this.yieldChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['2019', '2020', '2021', '2022', '2023', '2024 (Predicted)'],
          datasets: [{
            label: 'Yield (Tons/Hectare)',
            data: [10.2, 11.5, 9.8, 12.3, 13.1, 14.2],
            backgroundColor: [
              'rgba(75, 192, 192, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(54, 162, 235, 0.7)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Yield (Tons/Hectare)'
              }
            }
          }
        }
      })
    },
    initPriceChart() {
      const ctx = this.$refs.priceChart.getContext('2d')
      
      this.priceChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Historical Price ($/Ton)',
              data: [1750, 1720, 1680, 1650, 1700, 1780, 1820, 1850, 1900, 1950, 1920, 1880],
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.1)',
              tension: 0.4,
              fill: true
            },
            {
              label: 'Predicted Price ($/Ton)',
              data: [1880, 1860, 1840, 1820, 1850, 1900, 1950, 2000, 2100, 2200, 2150, 2050],
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 0.1)',
              borderDash: [5, 5],
              tension: 0.4,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              title: {
                display: true,
                text: 'Price ($/Ton)'
              }
            }
          }
        }
      })
    },
    updateCharts() {
      // In a real app, you would fetch data for the selected crop
      // For demo, we'll just generate new random data
      const yieldData = [
        Math.random() * 3 + 8,
        Math.random() * 3 + 9,
        Math.random() * 3 + 8,
        Math.random() * 3 + 10,
        Math.random() * 3 + 11,
        Math.random() * 3 + 12
      ]
      
      const historicalPrices = Array(12).fill().map(() => Math.random() * 300 + 1600)
      const predictedPrices = Array(12).fill().map((_, i) => historicalPrices[i] * (1 + (Math.random() * 0.2)))
      
      this.yieldChart.data.datasets[0].data = yieldData
      this.yieldChart.update()
      
      this.priceChart.data.datasets[0].data = historicalPrices
      this.priceChart.data.datasets[1].data = predictedPrices
      this.priceChart.update()
    }
  }
}
</script>

<style scoped>
.crop-yield-forecasting {
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}

.forecast-overview {
  margin-bottom: 30px;
}

.overview-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.confidence-indicator {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.confidence-indicator span {
  margin-bottom: 5px;
  font-size: 0.9rem;
  color: #666;
}

.confidence-bar {
  width: 150px;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.confidence-level {
  height: 100%;
  background-color: #4CAF50;
}

.yield-summary {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.yield-metric {
  text-align: center;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.metric-value {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.metric-label {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
}

.metric-change {
  font-size: 0.85rem;
  padding: 3px 8px;
  border-radius: 12px;
  display: inline-block;
  background-color: rgba(201, 203, 207, 0.2);
  color: #6c757d;
}

.metric-change.positive {
  background-color: rgba(75, 192, 192, 0.2);
  color: #4BC0C0;
}

.metric-change.negative {
  background-color: rgba(255, 99, 132, 0.2);
  color: #FF6384;
}

.forecast-details {
  margin-bottom: 30px;
}

.crop-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.crop-button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.crop-button.active {
  background-color: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.forecast-charts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .forecast-charts {
    grid-template-columns: 1fr;
  }
}

.chart-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.chart-card h3 {
  margin-top: 0;
  margin-bottom: 15px;
}

.chart-container {
  height: 300px;
}

.factors-analysis {
  margin-bottom: 30px;
}

.factors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.factor-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  align-items: flex-start;
}

.factor-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 1.5rem;
}

.weather {
  background-color: rgba(54, 162, 235, 0.1);
  color: #36A2EB;
}

.soil {
  background-color: rgba(75, 192, 192, 0.1);
  color: #4BC0C0;
}

.pests {
  background-color: rgba(255, 99, 132, 0.1);
  color: #FF6384;
}

.market {
  background-color: rgba(255, 159, 64, 0.1);
  color: #FF9F40;
}

.factor-content {
  flex: 1;
}

.factor-content h3 {
  margin: 0 0 5px 0;
  font-size: 1.1rem;
}

.factor-impact {
  font-size: 0.9rem;
  padding: 3px 8px;
  border-radius: 12px;
  display: inline-block;
  margin-bottom: 10px;
}

.factor-impact.positive {
  background-color: rgba(75, 192, 192, 0.2);
  color: #4BC0C0;
}

.factor-impact.negative {
  background-color: rgba(255, 99, 132, 0.2);
  color: #FF6384;
}

.factor-content p {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}

.recommendations-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.recommendation-item {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  align-items: flex-start;
}

.recommendation-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(75, 192, 192, 0.1);
  color: #4BC0C0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 1.5rem;
}

.recommendation-content {
  flex: 1;
}

.recommendation-content h3 {
  margin: 0 0 10px 0;
  font-size: 1.2rem;
}

.recommendation-content p {
  margin: 0;
  color: #666;
  line-height: 1.5;
}
</style> 