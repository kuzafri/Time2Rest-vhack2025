<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <h1 class="text-xl font-bold text-gray-800">LeaveLet</h1>
    </div>

    <div class="sidebar-section">
      <div class="section-title">MAIN</div>
      <nav class="sidebar-nav">
        <router-link to="/" class="sidebar-link" exact>
          <i class="fas fa-home"></i>
          <span>Home</span>
        </router-link>
        <router-link to="/soil-monitoring" class="sidebar-link">
          <i class="fas fa-seedling"></i>
          <span>Soil Monitoring</span>
        </router-link>
        <router-link to="/water-monitoring" class="sidebar-link">
          <i class="fas fa-tint"></i>
          <span>Water Monitoring</span>
        </router-link>
        <router-link to="/irrigation-override" class="sidebar-link">
          <i class="fas fa-faucet"></i>
          <span>Irrigation Override</span>
        </router-link>
        <router-link to="/weather" class="sidebar-link">
          <i class="fas fa-cloud-sun"></i>
          <span>Weather Forecast</span>
        </router-link>
        <router-link to="/pest-detection" class="sidebar-link">
          <i class="fas fa-bug"></i>
          <span>Pest & Disease Detection</span>
        </router-link>
        <router-link to="/microclimate-monitoring" class="sidebar-link">
          <i class="fas fa-temperature-high"></i>
          <span>Microclimate Monitoring</span>
        </router-link>
        <router-link to="/crop-yield-forecasting" class="sidebar-link">
          <i class="fas fa-chart-line"></i>
          <span>Crop Yield Forecasting</span>
        </router-link>
        <router-link to="/mobile-app-integration" class="sidebar-link">
          <i class="fas fa-mobile-alt"></i>
          <span>Mobile App Integration</span>
        </router-link>
        <router-link to="/water-recycling" class="sidebar-link">
          <i class="fas fa-recycle"></i>
          <span>Water Recycling</span>
        </router-link>
        <router-link to="/smart-alerts" class="sidebar-link">
          <i class="fas fa-bell"></i>
          <span>Smart Alerts</span>
        </router-link>
      </nav>
    </div>

    <div class="sidebar-section">
      <div class="section-title">MANAGEMENT</div>
      <nav class="sidebar-nav">
        <router-link to="/team" class="sidebar-link">
          <i class="fas fa-users"></i>
          <span>Team</span>
        </router-link>
        <router-link to="/settings" class="sidebar-link">
          <i class="fas fa-cog"></i>
          <span>Settings</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: white;
  border-right: 1px solid #e5e7eb;
  padding: 1.5rem 1rem;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  margin-bottom: 2rem;
}

.sidebar-header h1 {
  color: #333;
  font-weight: bold;
}

.sidebar-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 0.75rem;
  color: #9ca3af;
  margin-bottom: 0.75rem;
  padding-left: 0.5rem;
  letter-spacing: 0.05em;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
}

.sidebar-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  margin-bottom: 0.25rem;
  border-radius: 0.5rem;
  color: #4b5563;
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 0.95rem;
}

.sidebar-link i {
  margin-right: 0.75rem;
  width: 1.25rem;
  text-align: center;
}

.sidebar-link:hover {
  background-color: #f3f4f6;
  color: #1f2937;
}

.router-link-active {
  background-color: #e0e7ff;
  color: #4f46e5;
  font-weight: 500;
}
</style>
