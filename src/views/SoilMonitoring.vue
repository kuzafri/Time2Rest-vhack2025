<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header (reused from Home.vue) -->
    <div class="w-full bg-white px-8 py-4 shadow-sm flex items-center justify-between">
      <h1 class="text-2xl font-medium text-gray-800">LeaveLet</h1>
      <div class="flex items-center space-x-4">
        <button class="p-2 rounded-full hover:bg-gray-100">
          <i class="fas fa-search text-gray-500"></i>
        </button>
        <button class="p-2 rounded-full hover:bg-gray-100 relative">
          <i class="fas fa-bell text-gray-500"></i>
          <span class="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <div class="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
          <span>JD</span>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex">
      <!-- Sidebar (would be a component in a real app) -->
      <!-- ... sidebar code from Home.vue ... -->

      <!-- Soil Monitoring Content -->
      <div class="flex-1 p-8">
        <div class="mb-8">
          <h2 class="text-xl font-medium text-gray-800 mb-1">Soil Monitoring</h2>
          <p class="text-gray-500 text-sm">Track soil health and conditions across your land</p>
        </div>
        
        <!-- Soil Metrics Overview -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-medium text-gray-500">Soil Moisture</h3>
              <span class="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full">Optimal</span>
            </div>
            <div class="text-2xl font-semibold text-gray-800">42%</div>
            <div class="mt-2 text-sm text-green-500 flex items-center">
              <i class="fas fa-arrow-up mr-1"></i> 5% from yesterday
            </div>
          </div>
          
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-medium text-gray-500">Soil pH</h3>
              <span class="text-xs px-2 py-1 bg-yellow-50 text-yellow-600 rounded-full">Attention</span>
            </div>
            <div class="text-2xl font-semibold text-gray-800">6.2</div>
            <div class="mt-2 text-sm text-red-500 flex items-center">
              <i class="fas fa-arrow-down mr-1"></i> 0.3 from yesterday
            </div>
          </div>
          
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-medium text-gray-500">Soil Temperature</h3>
              <span class="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full">Optimal</span>
            </div>
            <div class="text-2xl font-semibold text-gray-800">18°C</div>
            <div class="mt-2 text-sm text-gray-500 flex items-center">
              <i class="fas fa-equals mr-1"></i> No change
            </div>
          </div>
          
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-medium text-gray-500">Nutrient Index</h3>
              <span class="text-xs px-2 py-1 bg-red-50 text-red-600 rounded-full">Low</span>
            </div>
            <div class="text-2xl font-semibold text-gray-800">3.8/10</div>
            <div class="mt-2 text-sm text-red-500 flex items-center">
              <i class="fas fa-arrow-down mr-1"></i> 0.5 from last week
            </div>
          </div>
        </div>
        
        <!-- Soil Map and Details -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div class="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-center justify-between mb-6">
              <h3 class="font-medium text-gray-800">Soil Moisture Map</h3>
              <select class="text-xs border border-gray-200 rounded-md px-2 py-1 bg-white">
                <option>Moisture</option>
                <option>pH Level</option>
                <option>Temperature</option>
                <option>Nutrients</option>
              </select>
            </div>
            <div class="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
              <!-- Placeholder for soil map visualization -->
              <div class="text-gray-400">
                <i class="fas fa-map-marked-alt text-4xl mb-2 block text-center"></i>
                <span>Interactive Soil Map</span>
              </div>
            </div>
            <div class="flex justify-between mt-4 text-xs text-gray-500">
              <div class="flex items-center">
                <div class="h-3 w-3 rounded-full bg-blue-500 mr-1"></div>
                <span>High Moisture</span>
              </div>
              <div class="flex items-center">
                <div class="h-3 w-3 rounded-full bg-green-500 mr-1"></div>
                <span>Optimal</span>
              </div>
              <div class="flex items-center">
                <div class="h-3 w-3 rounded-full bg-yellow-500 mr-1"></div>
                <span>Low Moisture</span>
              </div>
              <div class="flex items-center">
                <div class="h-3 w-3 rounded-full bg-red-500 mr-1"></div>
                <span>Critical</span>
              </div>
            </div>
          </div>
          
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-center justify-between mb-6">
              <h3 class="font-medium text-gray-800">Zone Analysis</h3>
              <button class="text-xs text-blue-600">View All</button>
            </div>
            <div class="space-y-4">
              <div class="p-3 bg-gray-50 rounded-lg">
                <div class="flex justify-between items-center">
                  <div class="font-medium">Zone A</div>
                  <div class="text-green-500 text-sm">Healthy</div>
                </div>
                <div class="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div>Moisture: <span class="font-medium">45%</span></div>
                  <div>pH: <span class="font-medium">6.8</span></div>
                  <div>Temp: <span class="font-medium">19°C</span></div>
                  <div>Nutrients: <span class="font-medium">7.2/10</span></div>
                </div>
              </div>
              
              <div class="p-3 bg-yellow-50 rounded-lg">
                <div class="flex justify-between items-center">
                  <div class="font-medium">Zone B</div>
                  <div class="text-yellow-500 text-sm">Needs Attention</div>
                </div>
                <div class="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div>Moisture: <span class="font-medium">28%</span></div>
                  <div>pH: <span class="font-medium">6.2</span></div>
                  <div>Temp: <span class="font-medium">18°C</span></div>
                  <div>Nutrients: <span class="font-medium">5.1/10</span></div>
                </div>
              </div>
              
              <div class="p-3 bg-red-50 rounded-lg">
                <div class="flex justify-between items-center">
                  <div class="font-medium">Zone C</div>
                  <div class="text-red-500 text-sm">Critical</div>
                </div>
                <div class="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div>Moisture: <span class="font-medium">15%</span></div>
                  <div>pH: <span class="font-medium">5.5</span></div>
                  <div>Temp: <span class="font-medium">17°C</span></div>
                  <div>Nutrients: <span class="font-medium">3.2/10</span></div>
                </div>
              </div>
              
              <div class="p-3 bg-gray-50 rounded-lg">
                <div class="flex justify-between items-center">
                  <div class="font-medium">Zone D</div>
                  <div class="text-green-500 text-sm">Healthy</div>
                </div>
                <div class="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div>Moisture: <span class="font-medium">42%</span></div>
                  <div>pH: <span class="font-medium">7.0</span></div>
                  <div>Temp: <span class="font-medium">18°C</span></div>
                  <div>Nutrients: <span class="font-medium">6.8/10</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Soil History Chart -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="flex items-center justify-between mb-6">
            <h3 class="font-medium text-gray-800">Soil Condition History</h3>
            <div class="flex items-center space-x-2">
              <button class="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-md">Weekly</button>
              <button class="text-xs px-2 py-1 text-gray-500 rounded-md">Monthly</button>
              <button class="text-xs px-2 py-1 text-gray-500 rounded-md">Yearly</button>
            </div>
          </div>
          <div class="h-80">
            <canvas id="soilHistoryChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  name: 'SoilMonitoring',
  mounted() {
    this.initSoilHistoryChart()
  },
  methods: {
    initSoilHistoryChart() {
      const ctx = document.getElementById('soilHistoryChart')
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
          datasets: [
            {
              label: 'Moisture',
              data: [40, 38, 45, 42, 25, 30, 35, 42],
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.4,
              fill: false,
              yAxisID: 'y'
            },
            {
              label: 'pH Level',
              data: [6.8, 6.7, 6.5, 6.3, 6.0, 6.2, 6.4, 6.2],
              borderColor: '#ef4444',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              tension: 0.4,
              fill: false,
              yAxisID: 'y1'
            },
            {
              label: 'Temperature',
              data: [16, 17, 18, 19, 20, 19, 18, 18],
              borderColor: '#f59e0b',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              tension: 0.4,
              fill: false,
              yAxisID: 'y2'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: 'white',
              titleColor: '#1f2937',
              bodyColor: '#6b7280',
              borderColor: '#e5e7eb',
              borderWidth: 1,
              padding: 12,
              cornerRadius: 8
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              }
            },
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              title: {
                display: true,
                text: 'Moisture (%)'
              },
              min: 0,
              max: 100
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              title: {
                display: true,
                text: 'pH Level'
              },
              min: 5,
              max: 8,
              grid: {
                drawOnChartArea: false
              }
            },
            y2: {
              type: 'linear',
              display: true,
              position: 'right',
              title: {
                display: true,
                text: 'Temperature (°C)'
              },
              min: 10,
              max: 30,
              grid: {
                drawOnChartArea: false
              }
            }
          }
        }
      })
    }
  }
}
</script> 