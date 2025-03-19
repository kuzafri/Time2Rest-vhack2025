<template>
  <nav class="nav-menu">
    <router-link to="/" class="nav-link">Home</router-link>
    <router-link to="/weather" class="nav-link">Weather Forecast</router-link>
    <router-link to="/soil-monitoring" class="nav-link">Soil Monitoring</router-link>
    <router-link to="/water-monitoring" class="nav-link">Water Monitoring</router-link>
    <router-link to="/irrigation-override" class="nav-link">Irrigation Override</router-link>
  </nav>
</template>

<script>
export default {
  name: 'NavMenu'
}
</script>

<style scoped>
.nav-menu {
  display: flex;
  background-color: #f8f9fa;
  padding: 1rem;
  margin-bottom: 1rem;
}

.nav-link {
  margin-right: 1rem;
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

.nav-link:hover {
  color: #007bff;
}

.router-link-active {
  color: #007bff;
}
</style> 