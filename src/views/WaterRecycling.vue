<template>
  <div class="water-recycling">
    <h1>Water Recycling & Efficiency Monitoring</h1>
    
    <div class="overview-cards">
      <div class="overview-card">
        <div class="card-icon">
          <i class="fas fa-tint"></i>
        </div>
        <div class="card-content">
          <h3>Total Water Usage</h3>
          <div class="card-value">12,450 <span class="unit">Liters</span></div>
          <div class="card-comparison">
            <i class="fas fa-arrow-down"></i> 8% from last week
          </div>
        </div>
      </div>
      
      <div class="overview-card">
        <div class="card-icon">
          <i class="fas fa-recycle"></i>
        </div>
        <div class="card-content">
          <h3>Recycled Water</h3>
          <div class="card-value">4,320 <span class="unit">Liters</span></div>
          <div class="card-comparison">
            <i class="fas fa-arrow-up"></i> 12% from last week
          </div>
        </div>
      </div>
      
      <div class="overview-card">
        <div class="card-icon">
          <i class="fas fa-percentage"></i>
        </div>
        <div class="card-content">
          <h3>Recycling Rate</h3>
          <div class="card-value">34.7<span class="unit">%</span></div>
          <div class="card-comparison">
            <i class="fas fa-arrow-up"></i> 5.2% from last week
          </div>
        </div>
      </div>
      
      <div class="overview-card">
        <div class="card-icon">
          <i class="fas fa-leaf"></i>
        </div>
        <div class="card-content">
          <h3>Water Savings</h3>
          <div class="card-value">1,850 <span class="unit">Liters</span></div>
          <div class="card-comparison">
            <i class="fas fa-arrow-up"></i> 15% from last week
          </div>
        </div>
      </div>
    </div>
    
    <div class="recycling-system">
      <h2>Recycling System Status</h2>
      <div class="system-diagram">
        <div class="diagram-container">
          <div class="diagram-node source">
            <i class="fas fa-faucet"></i>
            <span>Water Source</span>
          </div>
          <div class="diagram-arrow">
            <div class="flow-indicator"></div>
          </div>
          <div class="diagram-node irrigation">
            <i class="fas fa-seedling"></i>
            <span>Irrigation</span>
          </div>
          <div class="diagram-arrow">
            <div class="flow-indicator"></div>
          </div>
          <div class="diagram-node collection">
            <i class="fas fa-water"></i>
            <span>Collection</span>
          </div>
          <div class="diagram-arrow">
            <div class="flow-indicator"></div>
          </div>
          <div class="diagram-node filtration">
            <i class="fas fa-filter"></i>
            <span>Filtration</span>
          </div>
          <div class="diagram-arrow">
            <div class="flow-indicator"></div>
          </div>
          <div class="diagram-node storage">
            <i class="fas fa-database"></i>
            <span>Storage</span>
          </div>
          <div class="diagram-arrow return-arrow">
            <div class="flow-indicator"></div>
          </div>
        </div>
        
        <div class="system-stats">
          <div class="stat-item">
            <h3>Collection Efficiency</h3>
            <div class="progress-bar">
              <div class="progress" style="width: 78%"></div>
            </div>
            <div class="stat-value">78%</div>
          </div>
          
          <div class="stat-item">
            <h3>Filtration Quality</h3>
            <div class="progress-bar">
              <div class="progress" style="width: 92%"></div>
            </div>
            <div class="stat-value">92%</div>
          </div>
          
          <div class="stat-item">
            <h3>Storage Capacity</h3>
            <div class="progress-bar">
              <div class="progress" style="width: 45%"></div>
            </div>
            <div class="stat-value">45%</div>
          </div>
          
          <div class="stat-item">
            <h3>System Health</h3>
            <div class="progress-bar">
              <div class="progress" style="width: 85%"></div>
            </div>
            <div class="stat-value">85%</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="efficiency-analytics">
      <h2>Water Efficiency Analytics</h2>
      
      <div class="analytics-charts">
        <div class="chart-card">
          <h3>Water Usage vs. Recycling</h3>
          <div class="chart-container">
            <canvas ref="usageChart"></canvas>
          </div>
        </div>
        
        <div class="chart-card">
          <h3>Efficiency by Zone</h3>
          <div class="chart-container">
            <canvas ref="zoneChart"></canvas>
          </div>
        </div>
      </div>
      
      <div class="efficiency-table">
        <h3>Water Usage Breakdown</h3>
        <table>
          <thead>
            <tr>
              <th>Zone</th>
              <th>Usage (L)</th>
              <th>Recycled (L)</th>
              <th>Efficiency</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Zone 1 - Vegetables</td>
              <td>3,450</td>
              <td>1,240</td>
              <td>36%</td>
              <td><span class="status good">Good</span></td>
            </tr>
            <tr>
              <td>Zone 2 - Fruits</td>
              <td>4,120</td>
              <td>1,650</td>
              <td>40%</td>
              <td><span class="status excellent">Excellent</span></td>
            </tr>
            <tr>
              <td>Zone 3 - Herbs</td>
              <td>1,980</td>
              <td>580</td>
              <td>29%</td>
              <td><span class="status needs-improvement">Needs Improvement</span></td>
            </tr>
            <tr>
              <td>Zone 4 - Flowers</td>
              <td>2,900</td>
              <td>850</td>
              <td>29%</td>
              <td><span class="status needs-improvement">Needs Improvement</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <div class="optimization-recommendations">
      <h2>AI Optimization Recommendations</h2>
      
      <div class="recommendations-list">
        <div class="recommendation-item">
          <div class="recommendation-icon">
            <i class="fas fa-wrench"></i>
          </div>
          <div class="recommendation-content">
            <h3>Improve Zone 3 Collection System</h3>
            <p>The collection trays in Zone 3 are operating at reduced efficiency. Cleaning the filters and adjusting the collection angle could improve recycling rates by up to 15%.</p>
            <div class="recommendation-impact">
              <span>Estimated Impact:</span>
              <div class="impact-value positive">+290L weekly recycling</div>
            </div>
          </div>
        </div>
        
        <div class="recommendation-item">
          <div class="recommendation-icon">
            <i class="fas fa-clock"></i>
          </div>
          <div class="recommendation-content">
            <h3>Optimize Irrigation Timing</h3>
            <p>Shifting irrigation in Zone 1 to early morning (5-6 AM) could reduce evaporation loss by approximately 12%, increasing the amount of water available for recycling.</p>
            <div class="recommendation-impact">
              <span>Estimated Impact:</span>
              <div class="impact-value positive">+8% collection efficiency</div>
            </div>
          </div>
        </div>
        
        <div class="recommendation-item">
          <div class="recommendation-icon">
            <i class="fas fa-filter"></i>
          </div>
          <div class="recommendation-content">
            <h3>Upgrade Filtration System</h3>
            <p>The current filtration system is operating at 92% efficiency. Upgrading to a multi-stage filtration system would improve water quality and allow for expanded reuse applications.</p>
            <div class="recommendation-impact">
              <span>Estimated Impact:</span>
              <div class="impact-value positive">+5% overall recycling rate</div>
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
  name: 'WaterRecycling',
  data() {
    return {
      usageChart: null,
      zoneChart: null
    }
  },
  mounted() {
    this.initUsageChart()
    this.initZoneChart()
  },
  beforeUnmount() {
    if (this.usageChart) {
      this.usageChart.destroy()
    }
    if (this.zoneChart) {
      this.zoneChart.destroy()
    }
  },
  methods: {
    initUsageChart() {
      const ctx = this.$refs.usageChart.getContext('2d')
      
      this.usageChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
          datasets: [
            {
              label: 'Total Usage (L)',
              data: [14200, 13800, 13500, 13100, 12800, 12450],
              backgroundColor: 'rgba(54, 162, 235, 0.7)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            },
            {
              label: 'Recycled Water (L)',
              data: [3200, 3450, 3600, 3850, 4100, 4320],
              backgroundColor: 'rgba(75, 192, 192, 0.7)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Water Volume (Liters)'
              }
            }
          }
        }
      })
    },
    initZoneChart() {
      const ctx = this.$refs.zoneChart.getContext('2d')
      
      this.zoneChart = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: ['Collection Efficiency', 'Irrigation Efficiency', 'Recycling Rate', 'Water Quality', 'System Health'],
          datasets: [
            {
              label: 'Zone 1',
              data: [75, 82, 36, 90, 88],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              pointBackgroundColor: 'rgba(255, 99, 132, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
            },
            {
              label: 'Zone 2',
              data: [80, 85, 40, 92, 90],
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              pointBackgroundColor: 'rgba(54, 162, 235, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
            },
            {
              label: 'Zone 3',
              data: [65, 75, 29, 88, 82],
              backgroundColor: 'rgba(255, 206, 86, 0.2)',
              borderColor: 'rgba(255, 206, 86, 1)',
              pointBackgroundColor: 'rgba(255, 206, 86, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255, 206, 86, 1)'
            },
            {
              label: 'Zone 4',
              data: [70, 78, 29, 85, 80],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              pointBackgroundColor: 'rgba(75, 192, 192, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(75, 192, 192, 1)'
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            r: {
              angleLines: {
                display: true
              },
              suggestedMin: 0,
              suggestedMax: 100
            }
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.water-recycling {
  padding: 20px;
}

h1, h2 {
  margin-bottom: 20px;
}

.overview-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.overview-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  align-items: flex-start;
}

.card-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(76, 175, 80, 0.1);
  color: #4CAF50;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 1.5rem;
}

.card-content {
  flex: 1;
}

.card-content h3 {
  margin: 0 0 5px 0;
  font-size: 0.9rem;
  color: #666;
}

.card-value {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.unit {
  font-size: 1rem;
  font-weight: normal;
  color: #666;
}

.card-comparison {
  font-size: 0.9rem;
  color: #666;
}

.card-comparison i {
  margin-right: 5px;
}

.fa-arrow-up {
  color: #4CAF50;
}

.fa-arrow-down {
  color: #f44336;
}

.recycling-system {
  margin-bottom: 30px;
}

.system-diagram {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

@media (max-width: 992px) {
  .system-diagram {
    grid-template-columns: 1fr;
  }
}

.diagram-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.diagram-node {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  color: white;
  font-weight: bold;
  text-align: center;
}

.diagram-node i {
  font-size: 2rem;
  margin-bottom: 5px;
}

.source {
  background-color: #3498db;
}

.irrigation {
  background-color: #2ecc71;
}

.collection {
  background-color: #9b59b6;
}

.filtration {
  background-color: #e67e22;
}

.storage {
  background-color: #f1c40f;
}

.diagram-arrow {
  width: 50px;
  height: 10px;
  background-color: #ddd;
  position: relative;
  overflow: hidden;
}

.return-arrow {
  width: 10px;
  height: 50px;
  transform: translateY(-30px);
}

.flow-indicator {
  position: absolute;
  top: 0;
  left: -20px;
  width: 20px;
  height: 100%;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 5px,
    #4CAF50 5px,
    #4CAF50 10px
  );
  animation: flowAnimation 2s linear infinite;
}

.return-arrow .flow-indicator {
  top: -20px;
  left: 0;
  width: 100%;
  height: 20px;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 5px,
    #4CAF50 5px,
    #4CAF50 10px
  );
}

@keyframes flowAnimation {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(50px);
  }
}

.return-arrow .flow-indicator {
  animation: flowAnimationVertical 2s linear infinite;
}

@keyframes flowAnimationVertical {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(50px);
  }
}

.system-stats {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.stat-item h3 {
  margin: 0 0 10px 0;
  font-size: 1rem;
  color: #333;
}

.progress-bar {
  height: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 5px;
}

.progress {
  height: 100%;
  background-color: #4CAF50;
}

.stat-value {
  text-align: right;
  font-weight: bold;
  color: #333;
}

.efficiency-analytics {
  margin-bottom: 30px;
}

.analytics-charts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

@media (max-width: 992px) {
  .analytics-charts {
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

.efficiency-table {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.efficiency-table h3 {
  margin-top: 0;
  margin-bottom: 15px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f9f9f9;
  font-weight: bold;
  color: #333;
}

.status {
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
}

.status.excellent {
  background-color: rgba(46, 204, 113, 0.2);
  color: #2ecc71;
}

.status.good {
  background-color: rgba(52, 152, 219, 0.2);
  color: #3498db;
}

.status.needs-improvement {
  background-color: rgba(230, 126, 34, 0.2);
  color: #e67e22;
}

.optimization-recommendations {
  margin-bottom: 30px;
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
  background-color: rgba(76, 175, 80, 0.1);
  color: #4CAF50;
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
  margin: 0 0 15px 0;
  color: #666;
  line-height: 1.5;
}

.recommendation-impact {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
}

.impact-value {
  padding: 3px 8px;
  border-radius: 12px;
  font-weight: bold;
}

.impact-value.positive {
  background-color: rgba(46, 204, 113, 0.2);
  color: #2ecc71;
}

.impact-value.negative {
  background-color: rgba(231, 76, 60, 0.2);
  color: #e74c3c;
}
</style> 