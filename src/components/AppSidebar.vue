<script setup>
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
  Home,
  Sprout,
  Droplets,
  Droplet, // Changed from Tap to Drop for irrigation
  Cloud,
  Bug,
  Thermometer,
  TrendingUp,
  Smartphone,
  Recycle,
  Bell,
  Users,
  Settings,
} from "lucide-vue-next";
import LeaveLet from "./icons/LeaveLet.vue";

const props = defineProps({
  side: { type: String, required: false },
  variant: { type: String, required: false, default: "floating" },
  collapsible: { type: String, required: false },
  class: { type: null, required: false },
});

const navigation = {
  main: [
    { title: "Home", icon: Home, url: "/" },
    { title: "Soil Monitoring", icon: Sprout, url: "/soil-monitoring" },
    { title: "Water Monitoring", icon: Droplets, url: "/water-monitoring" },
    {
      title: "Irrigation Override",
      icon: Droplet,
      url: "/irrigation-override",
    },
    { title: "Weather Forecast", icon: Cloud, url: "/weather" },
    { title: "Pest & Disease Detection", icon: Bug, url: "/pest-detection" },
    {
      title: "Microclimate Monitoring",
      icon: Thermometer,
      url: "/microclimate-monitoring",
    },
    {
      title: "Crop Yield Forecasting",
      icon: TrendingUp,
      url: "/crop-yield-forecasting",
    },
    {
      title: "Mobile App Integration",
      icon: Smartphone,
      url: "/mobile-app-integration",
    },
    { title: "Water Recycling", icon: Recycle, url: "/water-recycling" },
    { title: "Smart Alerts", icon: Bell, url: "/smart-alerts" },
  ],
  management: [
    { title: "Team", icon: Users, url: "/team" },
    { title: "Settings", icon: Settings, url: "/settings" },
  ],
};
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="md" as-child>
            <LeaveLet class="h-16 w-full" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu class="gap-1">
          <SidebarMenuItem>
            <SidebarMenuButton class="uppercase"> Main </SidebarMenuButton>
            <SidebarMenuSub>
              <SidebarMenuSubItem
                v-for="item in navigation.main"
                :key="item.title"
              >
                <SidebarMenuSubButton as-child>
                  <router-link :to="item.url" class="flex items-center gap-2">
                    <component :is="item.icon" class="h-4 w-4" />
                    <span>{{ item.title }}</span>
                  </router-link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton class="uppercase">
              Management
            </SidebarMenuButton>
            <SidebarMenuSub>
              <SidebarMenuSubItem
                v-for="item in navigation.management"
                :key="item.title"
              >
                <SidebarMenuSubButton as-child>
                  <router-link :to="item.url" class="flex items-center gap-2">
                    <component :is="item.icon" class="h-4 w-4" />
                    <span>{{ item.title }}</span>
                  </router-link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>

<style scoped>
.router-link-active {
  background-color: var(--sidebar-active-bg, #e0e7ff);
  color: var(--sidebar-active-fg, #4f46e5);
  font-weight: 500;
}
</style>
