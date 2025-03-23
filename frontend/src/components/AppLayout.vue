<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
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
      <!-- Sidebar -->
      <div class="w-64 bg-white min-h-screen border-r border-gray-100 shadow-sm">
        <nav class="mt-2">
          <div class="px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">Main</div>
          <ul>
            <li @click="navigateTo('/')" 
                :class="getMenuItemClass('/')">
              <i class="fas fa-home text-gray-400 w-5"></i>
              <span class="ml-3" :class="{ 'font-medium': isActive('/') }">Home</span>
            </li>
            <li @click="navigateTo('/soil-monitoring')" 
                :class="getMenuItemClass('/soil-monitoring')">
              <i class="fas fa-seedling text-gray-400 w-5"></i>
              <span class="ml-3" :class="{ 'font-medium': isActive('/soil-monitoring') }">Soil Monitoring</span>
            </li>
            <li @click="navigateTo('/water-monitoring')" 
                :class="getMenuItemClass('/water-monitoring')">
              <i class="fas fa-tint text-gray-400 w-5"></i>
              <span class="ml-3" :class="{ 'font-medium': isActive('/water-monitoring') }">Water Monitoring</span>
            </li>
            <li @click="navigateTo('/irrigation-override')" 
                :class="getMenuItemClass('/irrigation-override')">
              <i class="fas fa-sliders-h text-gray-400 w-5"></i>
              <span class="ml-3" :class="{ 'font-medium': isActive('/irrigation-override') }">Irrigation Override</span>
            </li>
            <li @click="navigateTo('/weather-forecast')" 
                :class="getMenuItemClass('/weather-forecast')">
              <i class="fas fa-cloud-sun-rain text-gray-400 w-5"></i>
              <span class="ml-3" :class="{ 'font-medium': isActive('/weather-forecast') }">Weather Forecast</span>
            </li>
            <li class="px-4 py-2 flex items-center text-gray-600 hover:bg-gray-50 rounded-lg mx-2 transition-colors cursor-pointer">
              <i class="fas fa-bell text-gray-400 w-5"></i>
              <span class="ml-3">Notifications</span>
            </li>
            <li class="px-4 py-2 flex items-center text-gray-600 hover:bg-gray-50 rounded-lg mx-2 transition-colors justify-between cursor-pointer">
              <div class="flex items-center">
                <i class="fas fa-boxes text-gray-400 w-5"></i>
                <span class="ml-3">Projects</span>
              </div>
              <i class="fas fa-chevron-right text-xs text-gray-400"></i>
            </li>
          </ul>
          
          <div class="px-4 py-2 mt-6 text-xs font-medium text-gray-400 uppercase tracking-wider">Management</div>
          <ul>
            <li class="px-4 py-2 flex items-center text-gray-600 hover:bg-gray-50 rounded-lg mx-2 transition-colors cursor-pointer">
              <i class="fas fa-users text-gray-400 w-5"></i>
              <span class="ml-3">Team</span>
            </li>
            <li class="px-4 py-2 flex items-center text-gray-600 hover:bg-gray-50 rounded-lg mx-2 transition-colors cursor-pointer">
              <i class="fas fa-cog text-gray-400 w-5"></i>
              <span class="ml-3">Settings</span>
            </li>
          </ul>
          <div class="px-4 py-2 mt-6 text-xs font-medium text-gray-400 uppercase tracking-wider">Mobile App</div>
          <ul>
            <li class="px-4 py-2 flex items-center text-gray-600 hover:bg-gray-50 rounded-lg mx-2 transition-colors cursor-pointer">
              <i class="fas fa-users text-gray-400 w-5"></i>
              <span class="ml-3">Download App</span>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Page Content -->
      <div class="flex-1 p-8">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppLayout',
  methods: {
    navigateTo(route) {
      if (this.$route.path !== route) {
        this.$router.push(route)
      }
    },
    isActive(route) {
      return this.$route.path === route
    },
    getMenuItemClass(route) {
      return {
        'px-4 py-2 flex items-center rounded-lg mx-2 transition-colors cursor-pointer': true,
        'text-blue-600 bg-blue-50': this.isActive(route),
        'text-gray-600 hover:bg-gray-50': !this.isActive(route)
      }
    }
  }
}
</script> 