import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SoilMonitoring from '../views/SoilMonitoring.vue'
import WaterMonitoring from '../views/WaterMonitoring.vue'
import IrrigationOverride from '../views/IrrigationOverride.vue'
import WeatherForecast from '../views/WeatherForecast.vue'

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
    path: '/weather-forecast',
    name: 'WeatherForecast',
    component: WeatherForecast
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 