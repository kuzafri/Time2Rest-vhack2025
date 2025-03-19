import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SoilMonitoring from '../views/SoilMonitoring.vue'
import WaterMonitoring from '../views/WaterMonitoring.vue'
import IrrigationOverride from '../views/IrrigationOverride.vue'
import WeatherForecast from '../views/WeatherForecast.vue'
import PestDetection from '../views/PestDetection.vue'
import MicroclimateMonitoring from '../views/MicroclimateMonitoring.vue'
import CropYieldForecasting from '../views/CropYieldForecasting.vue'
import MobileAppIntegration from '../views/MobileAppIntegration.vue'
import WaterRecycling from '../views/WaterRecycling.vue'
import SmartAlerts from '../views/SmartAlerts.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/soil-monitoring',
    name: 'SoilMonitoring',
    component: SoilMonitoring
  },
  {
    path: '/water-monitoring',
    name: 'WaterMonitoring',
    component: WaterMonitoring
  },
  {
    path: '/irrigation-override',
    name: 'IrrigationOverride',
    component: IrrigationOverride
  },
  {
    path: '/weather',
    name: 'WeatherForecast',
    component: WeatherForecast
  },
  {
    path: '/pest-detection',
    name: 'PestDetection',
    component: PestDetection
  },
  {
    path: '/microclimate-monitoring',
    name: 'MicroclimateMonitoring',
    component: MicroclimateMonitoring
  },
  {
    path: '/crop-yield-forecasting',
    name: 'CropYieldForecasting',
    component: CropYieldForecasting
  },
  {
    path: '/mobile-app-integration',
    name: 'MobileAppIntegration',
    component: MobileAppIntegration
  },
  {
    path: '/water-recycling',
    name: 'WaterRecycling',
    component: WaterRecycling
  },
  {
    path: '/smart-alerts',
    name: 'SmartAlerts',
    component: SmartAlerts
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 