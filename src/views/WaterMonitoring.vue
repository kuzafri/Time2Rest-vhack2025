<template>


    <!-- Main Content -->
    <div class="flex">

      <!-- Water Monitoring Content -->
      <div class="flex-1 p-8">
        <div class="mb-8">
          <h2 class="text-xl font-medium text-gray-800 mb-1">Water Monitoring</h2>
          <p class="text-gray-500 text-sm">Track water usage and irrigation system performance</p>
        </div>
        
        <!-- Water Metrics Overview -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-medium text-gray-500">Total Water Usage</h3>
              <span class="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full">Efficient</span>
            </div>
            <div class="text-2xl font-semibold text-gray-800">2,450 L</div>
            <div class="mt-2 text-sm text-green-500 flex items-center">
              <i class="fas fa-arrow-down mr-1"></i> 8% from last week
            </div>
          </div>
          
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-medium text-gray-500">System Pressure</h3>
              <span class="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full">Normal</span>
            </div>
            <div class="text-2xl font-semibold text-gray-800">3.2 bar</div>
            <div class="mt-2 text-sm text-gray-500 flex items-center">
              <i class="fas fa-equals mr-1"></i> Stable
            </div>
          </div>
          
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-medium text-gray-500">Flow Rate</h3>
              <span class="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full">Optimal</span>
            </div>
            <div class="text-2xl font-semibold text-gray-800">12.5 L/min</div>
            <div class="mt-2 text-sm text-green-500 flex items-center">
              <i class="fas fa-arrow-up mr-1"></i> 2% from yesterday
            </div>
          </div>
          
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-medium text-gray-500">Irrigation Cycles</h3>
              <span class="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">Today</span>
            </div>
            <div class="text-2xl font-semibold text-gray-800">3/5</div>
            <div class="mt-2 text-sm text-gray-500 flex items-center">
              <i class="fas fa-clock mr-1"></i> Next: 5:30 PM
            </div>
          </div>
        </div>
        
        <!-- Water Usage Chart and Zone Status -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div class="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-center justify-between mb-6">
              <h3 class="font-medium text-gray-800">Water Usage Trends</h3>
              <div class="flex items-center space-x-2">
                <button class="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-md">Daily</button>
                <button class="text-xs px-2 py-1 text-gray-500 rounded-md">Weekly</button>
                <button class="text-xs px-2 py-1 text-gray-500 rounded-md">Monthly</button>
              </div>
            </div>
            <div class="h-80">
              <canvas id="waterUsageTrendsChart"></canvas>
            </div>
          </div>
          
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-center justify-between mb-6">
              <h3 class="font-medium text-gray-800">Irrigation Zones</h3>
              <button class="text-xs text-blue-600">View All</button>
            </div>
            <div class="space-y-4">
              <div class="p-3 bg-green-50 rounded-lg">
                <div class="flex justify-between items-center">
                  <div class="font-medium">Zone 1</div>
                  <div class="text-green-500 text-sm">Active</div>
                </div>
                <div class="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div>Flow: <span class="font-medium">4.2 L/min</span></div>
                  <div>Usage: <span class="font-medium">420 L</span></div>
                </div>
                <div class="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-green-500 h-2 rounded-full" style="width: 75%"></div>
                </div>
              </div>
              
              <div class="p-3 bg-gray-50 rounded-lg">
                <div class="flex justify-between items-center">
                  <div class="font-medium">Zone 2</div>
                  <div class="text-gray-500 text-sm">Scheduled</div>
                </div>
                <div class="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div>Flow: <span class="font-medium">0 L/min</span></div>
                  <div>Usage: <span class="font-medium">0 L</span></div>
                </div>
                <div class="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-gray-500 h-2 rounded-full" style="width: 0%"></div>
                </div>
              </div>
              
              <div class="p-3 bg-gray-50 rounded-lg">
                <div class="flex justify-between items-center">
                  <div class="font-medium">Zone 3</div>
                  <div class="text-gray-500 text-sm">Completed</div>
                </div>
                <div class="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div>Flow: <span class="font-medium">0 L/min</span></div>
                  <div>Usage: <span class="font-medium">850 L</span></div>
                </div>
                <div class="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-blue-500 h-2 rounded-full" style="width: 100%"></div>
                </div>
              </div>
              
              <div class="p-3 bg-yellow-50 rounded-lg">
                <div class="flex justify-between items-center">
                  <div class="font-medium">Zone 4</div>
                  <div class="text-yellow-500 text-sm">Paused</div>
                </div>
                <div class="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div>Flow: <span class="font-medium">0 L/min</span></div>
                  <div>Usage: <span class="font-medium">320 L</span></div>
                </div>
                <div class="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-yellow-500 h-2 rounded-full" style="width: 45%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Water System Status and Efficiency -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-center justify-between mb-6">
              <h3 class="font-medium text-gray-800">System Status</h3>
              <button class="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-md">All Systems Normal</button>
            </div>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                    <i class="fas fa-pump"></i>
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-medium">Main Pump</div>
                    <div class="text-xs text-gray-500">Running normally</div>
                  </div>
                </div>
                <div class="text-green-500">
                  <i class="fas fa-check-circle"></i>
                </div>
              </div>
              
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                    <i class="fas fa-tint"></i>
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-medium">Water Filters</div>
                    <div class="text-xs text-gray-500">Clean (87%)</div>
                  </div>
                </div>
                <div class="text-green-500">
                  <i class="fas fa-check-circle"></i>
                </div>
              </div>
              
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                    <i class="fas fa-battery-three-quarters"></i>
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-medium">Backup Power</div>
                    <div class="text-xs text-gray-500">Charged (92%)</div>
                  </div>
                </div>
                <div class="text-green-500">
                  <i class="fas fa-check-circle"></i>
                </div>
              </div>
              
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">
                    <i class="fas fa-wifi"></i>
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-medium">Network Connection</div>
                    <div class="text-xs text-gray-500">Signal strength (68%)</div>
                  </div>
                </div>
                <div class="text-yellow-500">
                  <i class="fas fa-exclamation-circle"></i>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-center justify-between mb-6">
              <h3 class="font-medium text-gray-800">Water Efficiency</h3>
              <select class="text-xs border border-gray-200 rounded-md px-2 py-1 bg-white">
                <option>This Month</option>
                <option>Last Month</option>
                <option>This Year</option>
              </select>
            </div>
            <div class="flex items-center justify-center mb-6">
              <div class="relative w-48 h-48">
                <svg class="w-full h-full" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#f3f4f6" stroke-width="3"></circle>
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#10b981" stroke-width="3" stroke-dasharray="75 25" stroke-dashoffset="0"></circle>
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                  <span class="text-3xl font-semibold text-gray-800">75%</span>
                  <span class="text-sm text-gray-500">Efficiency</span>
                </div>
              </div>
            </div>
            <div class="space-y-3">
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="font-medium">Water Saved</span>
                  <span>1,250 L</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-green-500 h-2 rounded-full" style="width: 65%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="font-medium">Energy Saved</span>
                  <span>42 kWh</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-blue-500 h-2 rounded-full" style="width: 55%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="font-medium">Cost Reduction</span>
                  <span>$85.20</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-purple-500 h-2 rounded-full" style="width: 70%"></div>
                </div>
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
  name: 'WaterMonitoring',
  mounted() {
    this.initWaterUsageTrendsChart()
  },
  methods: {
    initWaterUsageTrendsChart() {
      const ctx = document.getElementById('waterUsageTrendsChart')
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              label: 'This Week',
              data: [350, 420, 280, 450, 380, 320, 250],
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.4,
              fill: true
            },
            {
              label: 'Last Week',
              data: [400, 380, 320, 490, 420, 380, 300],
              borderColor: '#9ca3af',
              backgroundColor: 'rgba(156, 163, 175, 0.1)',
              tension: 0.4,
              fill: true,
              borderDash: [5, 5]
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                usePointStyle: true,
                boxWidth: 6
              }
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
              callbacks: {
                label: function(context) {
                  return context.dataset.label + ': ' + context.parsed.y + ' L';
                }
              }
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                color: '#f3f4f6'
              },
              ticks: {
                callback: function(value) {
                  return value + ' L';
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