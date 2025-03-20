<template>
  <!-- Irrigation Override Content -->
  <div class="flex-1">
    <HeaderPage
      title="Irrigation Override"
      description="Manually control and adjust irrigation settings"
    />

    <!-- System Status and Quick Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-gray-500">System Status</h3>
          <span
            class="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full"
            >Operational</span
          >
        </div>
        <div class="text-2xl font-semibold text-gray-800">Automatic Mode</div>
        <div class="mt-2 text-sm text-gray-500">
          Next scheduled irrigation:
          <span class="font-medium">Today, 5:30 PM</span>
        </div>
        <div class="mt-4 flex space-x-2">
          <button
            class="px-3 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors"
          >
            Emergency Stop
          </button>
          <button
            class="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200 transition-colors"
          >
            Switch to Manual
          </button>
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-gray-500">Quick Actions</h3>
        </div>
        <div class="space-y-3">
          <button
            class="w-full px-3 py-2 bg-blue-50 text-blue-600 text-sm rounded-md hover:bg-blue-100 transition-colors flex items-center"
          >
            <i class="fas fa-play-circle mr-2"></i>
            Start All Zones
          </button>
          <button
            class="w-full px-3 py-2 bg-blue-50 text-blue-600 text-sm rounded-md hover:bg-blue-100 transition-colors flex items-center"
          >
            <i class="fas fa-pause-circle mr-2"></i>
            Pause All Zones
          </button>
          <button
            class="w-full px-3 py-2 bg-blue-50 text-blue-600 text-sm rounded-md hover:bg-blue-100 transition-colors flex items-center"
          >
            <i class="fas fa-stop-circle mr-2"></i>
            Stop All Zones
          </button>
          <button
            class="w-full px-3 py-2 bg-blue-50 text-blue-600 text-sm rounded-md hover:bg-blue-100 transition-colors flex items-center"
          >
            <i class="fas fa-sync mr-2"></i>
            Reset System
          </button>
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-gray-500">System Schedule</h3>
          <button class="text-xs text-blue-600">Edit Schedule</button>
        </div>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div
                class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500"
              >
                <i class="fas fa-clock"></i>
              </div>
              <div class="ml-3">
                <div class="text-sm font-medium">Morning</div>
                <div class="text-xs text-gray-500">5:30 AM - 6:15 AM</div>
              </div>
            </div>
            <div
              class="relative inline-block w-10 mr-2 align-middle select-none"
            >
              <input
                type="checkbox"
                name="toggle"
                id="morning"
                class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                checked
              />
              <label
                for="morning"
                class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              ></label>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div
                class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500"
              >
                <i class="fas fa-clock"></i>
              </div>
              <div class="ml-3">
                <div class="text-sm font-medium">Afternoon</div>
                <div class="text-xs text-gray-500">1:00 PM - 1:30 PM</div>
              </div>
            </div>
            <div
              class="relative inline-block w-10 mr-2 align-middle select-none"
            >
              <input
                type="checkbox"
                name="toggle"
                id="afternoon"
                class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                checked
              />
              <label
                for="afternoon"
                class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              ></label>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div
                class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500"
              >
                <i class="fas fa-clock"></i>
              </div>
              <div class="ml-3">
                <div class="text-sm font-medium">Evening</div>
                <div class="text-xs text-gray-500">5:30 PM - 6:15 PM</div>
              </div>
            </div>
            <div
              class="relative inline-block w-10 mr-2 align-middle select-none"
            >
              <input
                type="checkbox"
                name="toggle"
                id="evening"
                class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                checked
              />
              <label
                for="evening"
                class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              ></label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Zone Controls -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <h3 class="font-medium text-gray-800">Zone Controls</h3>
        <select
          class="text-xs border border-gray-200 rounded-md px-2 py-1 bg-white"
        >
          <option>All Zones</option>
          <option>Active Zones</option>
          <option>Inactive Zones</option>
        </select>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Zone 1 -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <div
                class="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-500"
              >
                <i class="fas fa-leaf"></i>
              </div>
              <div class="ml-3">
                <div class="font-medium">Zone 1 - Front Lawn</div>
                <div class="text-xs text-green-500">Currently Active</div>
              </div>
            </div>
            <div
              class="relative inline-block w-12 mr-2 align-middle select-none"
            >
              <input
                type="checkbox"
                name="toggle"
                id="zone1"
                class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                checked
              />
              <label
                for="zone1"
                class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              ></label>
            </div>
          </div>

          <div class="mb-4">
            <div class="flex justify-between text-sm mb-1">
              <span>Water Flow</span>
              <span>4.2 L/min</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-green-500 h-2 rounded-full"
                style="width: 70%"
              ></div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div class="text-xs text-gray-500 mb-1">Duration</div>
              <select
                class="w-full text-sm border border-gray-200 rounded-md px-2 py-1 bg-white"
              >
                <option>15 minutes</option>
                <option selected>30 minutes</option>
                <option>45 minutes</option>
                <option>60 minutes</option>
              </select>
            </div>
            <div>
              <div class="text-xs text-gray-500 mb-1">Intensity</div>
              <select
                class="w-full text-sm border border-gray-200 rounded-md px-2 py-1 bg-white"
              >
                <option>Low</option>
                <option selected>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          <div class="flex space-x-2">
            <button
              class="flex-1 px-3 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
            >
              Start
            </button>
            <button
              class="flex-1 px-3 py-2 bg-yellow-500 text-white text-sm rounded-md hover:bg-yellow-600 transition-colors"
            >
              Pause
            </button>
            <button
              class="flex-1 px-3 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors"
            >
              Stop
            </button>
          </div>
        </div>

        <!-- Zone 2 -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <div
                class="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500"
              >
                <i class="fas fa-leaf"></i>
              </div>
              <div class="ml-3">
                <div class="font-medium">Zone 2 - Backyard</div>
                <div class="text-xs text-gray-500">Scheduled at 5:30 PM</div>
              </div>
            </div>
            <div
              class="relative inline-block w-12 mr-2 align-middle select-none"
            >
              <input
                type="checkbox"
                name="toggle"
                id="zone2"
                class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label
                for="zone2"
                class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              ></label>
            </div>
          </div>

          <div class="mb-4">
            <div class="flex justify-between text-sm mb-1">
              <span>Water Flow</span>
              <span>0 L/min</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-gray-400 h-2 rounded-full" style="width: 0%"></div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div class="text-xs text-gray-500 mb-1">Duration</div>
              <select
                class="w-full text-sm border border-gray-200 rounded-md px-2 py-1 bg-white"
              >
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option selected>45 minutes</option>
                <option>60 minutes</option>
              </select>
            </div>
            <div>
              <div class="text-xs text-gray-500 mb-1">Intensity</div>
              <select
                class="w-full text-sm border border-gray-200 rounded-md px-2 py-1 bg-white"
              >
                <option>Low</option>
                <option>Medium</option>
                <option selected>High</option>
              </select>
            </div>
          </div>

          <div class="flex space-x-2">
            <button
              class="flex-1 px-3 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
            >
              Start
            </button>
            <button
              class="flex-1 px-3 py-2 bg-yellow-500 text-white text-sm rounded-md hover:bg-yellow-600 transition-colors opacity-50 cursor-not-allowed"
            >
              Pause
            </button>
            <button
              class="flex-1 px-3 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors opacity-50 cursor-not-allowed"
            >
              Stop
            </button>
          </div>
        </div>

        <!-- Zone 3 -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <div
                class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500"
              >
                <i class="fas fa-leaf"></i>
              </div>
              <div class="ml-3">
                <div class="font-medium">Zone 3 - Garden</div>
                <div class="text-xs text-blue-500">Completed Today</div>
              </div>
            </div>
            <div
              class="relative inline-block w-12 mr-2 align-middle select-none"
            >
              <input
                type="checkbox"
                name="toggle"
                id="zone3"
                class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label
                for="zone3"
                class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              ></label>
            </div>
          </div>

          <div class="mb-4">
            <div class="flex justify-between text-sm mb-1">
              <span>Water Flow</span>
              <span>0 L/min</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-blue-500 h-2 rounded-full"
                style="width: 100%"
              ></div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div class="text-xs text-gray-500 mb-1">Duration</div>
              <select
                class="w-full text-sm border border-gray-200 rounded-md px-2 py-1 bg-white"
              >
                <option>15 minutes</option>
                <option selected>30 minutes</option>
                <option>45 minutes</option>
                <option>60 minutes</option>
              </select>
            </div>
            <div>
              <div class="text-xs text-gray-500 mb-1">Intensity</div>
              <select
                class="w-full text-sm border border-gray-200 rounded-md px-2 py-1 bg-white"
              >
                <option selected>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          <div class="flex space-x-2">
            <button
              class="flex-1 px-3 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
            >
              Start Again
            </button>
            <button
              class="flex-1 px-3 py-2 bg-yellow-500 text-white text-sm rounded-md hover:bg-yellow-600 transition-colors opacity-50 cursor-not-allowed"
            >
              Pause
            </button>
            <button
              class="flex-1 px-3 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors opacity-50 cursor-not-allowed"
            >
              Stop
            </button>
          </div>
        </div>

        <!-- Zone 4 -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <div
                class="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500"
              >
                <i class="fas fa-leaf"></i>
              </div>
              <div class="ml-3">
                <div class="font-medium">Zone 4 - Side Yard</div>
                <div class="text-xs text-yellow-500">Paused</div>
              </div>
            </div>
            <div
              class="relative inline-block w-12 mr-2 align-middle select-none"
            >
              <input
                type="checkbox"
                name="toggle"
                id="zone4"
                class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                checked
              />
              <label
                for="zone4"
                class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              ></label>
            </div>
          </div>

          <div class="mb-4">
            <div class="flex justify-between text-sm mb-1">
              <span>Water Flow</span>
              <span>0 L/min</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-yellow-500 h-2 rounded-full"
                style="width: 45%"
              ></div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div class="text-xs text-gray-500 mb-1">Duration</div>
              <select
                class="w-full text-sm border border-gray-200 rounded-md px-2 py-1 bg-white"
              >
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option selected>45 minutes</option>
                <option>60 minutes</option>
              </select>
            </div>
            <div>
              <div class="text-xs text-gray-500 mb-1">Intensity</div>
              <select
                class="w-full text-sm border border-gray-200 rounded-md px-2 py-1 bg-white"
              >
                <option>Low</option>
                <option selected>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          <div class="flex space-x-2">
            <button
              class="flex-1 px-3 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
            >
              Resume
            </button>
            <button
              class="flex-1 px-3 py-2 bg-yellow-500 text-white text-sm rounded-md hover:bg-yellow-600 transition-colors opacity-50 cursor-not-allowed"
            >
              Pause
            </button>
            <button
              class="flex-1 px-3 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors"
            >
              Stop
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderPage from "@/components/HeaderPage.vue";

export default {
  name: "IrrigationOverride",
  components: {
    HeaderPage,
  },
};
</script>

<style scoped>
.toggle-checkbox:checked {
  right: 0;
  border-color: #3b82f6;
}
.toggle-checkbox:checked + .toggle-label {
  background-color: #3b82f6;
}
.toggle-checkbox {
  right: 0;
  z-index: 1;
  border-color: #e5e7eb;
  transition: all 0.3s;
}
.toggle-label {
  transition: background-color 0.3s;
}
</style>
