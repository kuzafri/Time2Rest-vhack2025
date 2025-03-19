<template>
  <div class="home">
    <div class="mb-8">
      <h2 class="text-xl font-medium text-gray-800 mb-1">Dashboard Overview</h2>
      <p class="text-gray-500 text-sm">Monitor your key metrics at a glance</p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-gray-500">Total Moisture</h3>
          <span class="text-xs px-2 py-1 bg-red-50 text-red-600 rounded-full">High</span>
        </div>
        <div class="flex items-center">
          <div class="relative w-16 h-16">
            <svg class="w-full h-full" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15" fill="none" stroke="#f3f4f6" stroke-width="3"></circle>
              <circle cx="18" cy="18" r="15" fill="none" stroke="#ef4444" stroke-width="3" stroke-dasharray="75 25" stroke-dashoffset="0"></circle>
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-lg font-semibold text-gray-800">81%</span>
            </div>
          </div>
          <div class="ml-4">
            <div class="text-2xl font-semibold text-gray-800">81%</div>
            <div class="text-sm text-green-500 flex items-center">
              <i class="fas fa-arrow-up mr-1"></i> 12% from last week
            </div>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-gray-500">Average Moisture</h3>
          <span class="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full">Low</span>
        </div>
        <div class="flex items-center">
          <div class="relative w-16 h-16">
            <svg class="w-full h-full" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15" fill="none" stroke="#f3f4f6" stroke-width="3"></circle>
              <circle cx="18" cy="18" r="15" fill="none" stroke="#10b981" stroke-width="3" stroke-dasharray="22 78" stroke-dashoffset="0"></circle>
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-lg font-semibold text-gray-800">22%</span>
            </div>
          </div>
          <div class="ml-4">
            <div class="text-2xl font-semibold text-gray-800">22%</div>
            <div class="text-sm text-red-500 flex items-center">
              <i class="fas fa-arrow-down mr-1"></i> 5% from last week
            </div>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-gray-500">Total Land</h3>
          <span class="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">Medium</span>
        </div>
        <div class="flex items-center">
          <div class="relative w-16 h-16">
            <svg class="w-full h-full" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15" fill="none" stroke="#f3f4f6" stroke-width="3"></circle>
              <circle cx="18" cy="18" r="15" fill="none" stroke="#3b82f6" stroke-width="3" stroke-dasharray="62 38" stroke-dashoffset="0"></circle>
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-lg font-semibold text-gray-800">62%</span>
            </div>
          </div>
          <div class="ml-4">
            <div class="text-2xl font-semibold text-gray-800">62%</div>
            <div class="text-sm text-green-500 flex items-center">
              <i class="fas fa-arrow-up mr-1"></i> 8% from last week
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Alarm Section -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-6">
          <h3 class="font-medium text-gray-800">Activity Overview</h3>
          <div class="flex items-center space-x-2">
            <button class="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-md">Weekly</button>
            <button class="text-xs px-2 py-1 text-gray-500 rounded-md">Monthly</button>
          </div>
        </div>
        <div class="relative h-64">
          <canvas id="alarmChart" class="w-full h-full"></canvas>
          <div class="absolute top-4 right-8 bg-blue-50 rounded-md p-3">
            <div class="text-sm font-medium text-gray-800">456 Orders</div>
            <div class="text-xs text-gray-500">Oct 18th, 2023</div>
          </div>
        </div>
        <div class="flex justify-between mt-4 text-xs text-gray-500">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
      </div>

      <!-- Soil Ph Level Section -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-6">
          <h3 class="font-medium text-gray-800">Soil pH Levels</h3>
          <div class="flex items-center space-x-2">
            <div class="flex items-center">
              <div class="h-3 w-3 rounded-full bg-blue-500 mr-1"></div>
              <span class="text-xs text-gray-500">Current</span>
            </div>
            <div class="flex items-center">
              <div class="h-3 w-3 rounded-full bg-red-500 mr-1"></div>
              <span class="text-xs text-gray-500">Threshold</span>
            </div>
          </div>
        </div>
        <div class="h-64 relative">
          <canvas id="soilPhChart" class="w-full h-full"></canvas>
          <div class="absolute top-4 right-8 bg-blue-50 text-blue-800 text-xs px-2 py-1 rounded-md">12,345</div>
          <div class="absolute bottom-8 right-8 bg-red-50 text-red-800 text-xs px-2 py-1 rounded-md">34,890</div>
        </div>
      </div>

      <!-- Water Usage Section -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-6">
          <h3 class="font-medium text-gray-800">Water Usage</h3>
          <select class="text-xs border border-gray-200 rounded-md px-2 py-1 bg-white">
            <option>This Week</option>
            <option>Last Week</option>
            <option>This Month</option>
          </select>
        </div>
        <div class="h-64">
          <canvas id="waterUsageChart" class="w-full h-full"></canvas>
        </div>
      </div>
      
      <!-- Recent Activity -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-6">
          <h3 class="font-medium text-gray-800">Recent Activity</h3>
          <button class="text-xs text-blue-600">View All</button>
        </div>
        <div class="space-y-4">
          <div class="flex items-start">
            <div class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-500 mt-1">
              <i class="fas fa-check-circle"></i>
            </div>
            <div class="ml-3">
              <div class="text-sm font-medium text-gray-800">Irrigation system activated</div>
              <div class="text-xs text-gray-500">Zone 3 • 2 hours ago</div>
            </div>
          </div>
          <div class="flex items-start">
            <div class="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500 mt-1">
              <i class="fas fa-exclamation-circle"></i>
            </div>
            <div class="ml-3">
              <div class="text-sm font-medium text-gray-800">Low moisture alert</div>
              <div class="text-xs text-gray-500">Zone 1 • 5 hours ago</div>
            </div>
          </div>
          <div class="flex items-start">
            <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mt-1">
              <i class="fas fa-sync"></i>
            </div>
            <div class="ml-3">
              <div class="text-sm font-medium text-gray-800">System maintenance completed</div>
              <div class="text-xs text-gray-500">All zones • Yesterday</div>
            </div>
          </div>
          <div class="flex items-start">
            <div class="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 mt-1">
              <i class="fas fa-cloud-rain"></i>
            </div>
            <div class="ml-3">
              <div class="text-sm font-medium text-gray-800">Rain detected - irrigation paused</div>
              <div class="text-xs text-gray-500">All zones • Yesterday</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="feature-cards">
      <div class="feature-card" @click="$router.push('/pest-detection')">
        <i class="fas fa-bug"></i>
        <h3>AI Pest Detection</h3>
        <p>Detect pests and diseases in real-time using AI-powered camera analysis</p>
      </div>
      
      <div class="feature-card" @click="$router.push('/microclimate-monitoring')">
        <i class="fas fa-temperature-high"></i>
        <h3>Microclimate Monitoring</h3>
        <p>Monitor and control greenhouse conditions for optimal plant growth</p>
      </div>
      
      <div class="feature-card" @click="$router.push('/crop-yield-forecasting')">
        <i class="fas fa-chart-line"></i>
        <h3>Yield Forecasting</h3>
        <p>AI-powered predictions for crop yields and market trends</p>
      </div>
      
      <div class="feature-card" @click="$router.push('/mobile-app-integration')">
        <i class="fas fa-mobile-alt"></i>
        <h3>Mobile App</h3>
        <p>Access your farm data on the go with our dedicated mobile application</p>
      </div>
      
      <div class="feature-card" @click="$router.push('/water-recycling')">
        <i class="fas fa-recycle"></i>
        <h3>Water Recycling</h3>
        <p>Monitor water usage efficiency and recycling systems</p>
      </div>
      
      <div class="feature-card" @click="$router.push('/smart-alerts')">
        <i class="fas fa-bell"></i>
        <h3>Smart Alerts</h3>
        <p>Receive notifications for critical events and system status</p>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  name: 'Home',
  mounted() {
    this.initAlarmChart()
    this.initSoilPhChart()
    this.initWaterUsageChart()
  },
  methods: {
    initAlarmChart() {
      const ctx = document.getElementById('alarmChart')
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          datasets: [{
            label: 'Activity',
            data: [30, 45, 60, 75, 45, 65, 55],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointBackgroundColor: '#3b82f6'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: 'white',
              titleColor: '#1f2937',
              bodyColor: '#6b7280',
              borderColor: '#e5e7eb',
              borderWidth: 1,
              padding: 12,
              cornerRadius: 8,
              titleFont: {
                size: 14,
                weight: 'bold'
              }
            }
          },
          scales: {
            x: {
              display: false
            },
            y: {
              display: false,
              beginAtZero: true
            }
          }
        }
      })
    },
    initSoilPhChart() {
      const ctx = document.getElementById('soilPhChart')
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          datasets: [
            {
              label: 'Current Level',
              data: [20000, 25000, 18000, 30000, 40000, 35000, 25000, 32000, 28000],
              borderColor: '#3b82f6',
              tension: 0.4,
              pointRadius: 0,
              pointHoverRadius: 5
            },
            {
              label: 'Threshold',
              data: [30000, 15000, 25000, 35000, 22000, 38000, 28000, 35000, 40000],
              borderColor: '#ef4444',
              tension: 0.4,
              pointRadius: 0,
              pointHoverRadius: 5,
              borderDash: [5, 5]
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
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
              },
              ticks: {
                color: '#9ca3af',
                font: {
                  size: 10
                }
              }
            },
            y: {
              display: true,
              position: 'left',
              grid: {
                color: '#f3f4f6'
              },
              ticks: {
                color: '#9ca3af',
                font: {
                  size: 10
                },
                callback: function(value) {
                  return value / 1000 + 'k'
                }
              }
            }
          }
        }
      })
    },
    initWaterUsageChart() {
      const ctx = document.getElementById('waterUsageChart')
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Water Usage',
            data: [60, 80, 40, 65, 60, 25, 60],
            backgroundColor: [
              '#3b82f6', '#10b981', '#3b82f6', '#10b981', '#3b82f6', '#10b981', '#3b82f6'
            ],
            borderWidth: 0,
            borderRadius: 6,
            barThickness: 12
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
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
              },
              ticks: {
                color: '#9ca3af',
                font: {
                  size: 10
                }
              }
            },
            y: {
              beginAtZero: true,
              max: 100,
              grid: {
                color: '#f3f4f6'
              },
              ticks: {
                stepSize: 20,
                color: '#9ca3af',
                font: {
                  size: 10
                }
              }
            }
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.home {
  max-width: 1200px;
}

.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.feature-card {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.feature-card i {
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: #4CAF50;
}

.feature-card h3 {
  margin-bottom: 10px;
  color: #333;
}

.feature-card p {
  color: #666;
}
</style> 