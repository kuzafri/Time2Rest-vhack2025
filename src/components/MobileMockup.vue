<template>
  <div class="flex justify-center">
    <div
      class="w-[280px] h-[580px] bg-zinc-900 rounded-[36px] p-3 shadow-2xl relative"
    >
      <div
        class="w-full h-full bg-zinc-50 rounded-[24px] overflow-hidden flex flex-col"
      >
        <!-- Header -->
        <div
          class="bg-emerald-100 text-white px-3 py-2 flex justify-center items-center"
        >
          <div class="flex items-center font-medium text-sm">
            <LeaveLet class="w-20 h-5 mr-1" />
          </div>
        </div>

        <!-- Grid Content -->
        <div
          class="flex-1 p-2 grid grid-cols-2 gap-2 overflow-y-auto bg-zinc-100/50"
        >
          <Card class="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
            <CardContent class="p-3 flex flex-col">
              <div class="flex items-center justify-between mb-2">
                <div
                  class="w-7 h-7 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center"
                >
                  <Droplets class="w-3.5 h-3.5" />
                </div>
                <Badge
                  variant="outline"
                  class="text-[10px] px-2 py-0 bg-blue-50 text-blue-600 border-blue-200"
                  >Optimal</Badge
                >
              </div>
              <div class="space-y-0.5">
                <p class="text-[11px] text-zinc-500 font-medium">
                  Soil Moisture
                </p>
                <div class="flex items-end gap-1">
                  <span class="text-base font-semibold text-zinc-900">68</span>
                  <span class="text-[10px] text-zinc-500 mb-0.5">%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card class="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
            <CardContent class="p-3 flex flex-col">
              <div class="flex items-center justify-between mb-2">
                <div
                  class="w-7 h-7 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center"
                >
                  <Sprout class="w-3.5 h-3.5" />
                </div>
                <Badge
                  class="text-[10px] px-2 py-0 bg-emerald-50 text-emerald-600 border-emerald-200"
                  >Zone 2</Badge
                >
              </div>
              <div class="space-y-0.5">
                <p class="text-[11px] text-zinc-500 font-medium">Irrigation</p>
                <div class="flex items-center gap-1.5">
                  <div
                    class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
                  ></div>
                  <span class="text-base font-semibold text-zinc-900"
                    >Active</span
                  >
                </div>
              </div>
            </CardContent>
          </Card>

          <Card class="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
            <CardContent class="p-3 flex flex-col">
              <div class="flex items-center justify-between mb-2">
                <div
                  class="w-7 h-7 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center"
                >
                  <Sun class="w-3.5 h-3.5" />
                </div>
                <Badge
                  class="text-[10px] px-2 py-0 bg-amber-50 text-amber-600 border-amber-200"
                  >Sunny</Badge
                >
              </div>
              <div class="space-y-0.5">
                <p class="text-[11px] text-zinc-500 font-medium">Weather</p>
                <div class="flex items-end gap-1">
                  <span class="text-base font-semibold text-zinc-900">24</span>
                  <span class="text-[10px] text-zinc-500 mb-0.5">°C</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card class="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
            <CardContent class="p-3 flex flex-col">
              <div class="flex items-center justify-between mb-2">
                <div
                  class="w-7 h-7 rounded-full bg-red-100 text-red-500 flex items-center justify-center"
                >
                  <BellRing class="w-3.5 h-3.5" />
                </div>
                <Badge
                  variant="warning"
                  class="text-[10px] px-2 py-0 bg-red-50 text-red-600 border-red-200"
                  >Attention</Badge
                >
              </div>
              <div class="space-y-0.5">
                <p class="text-[11px] text-zinc-500 font-medium">Alerts</p>
                <div class="flex items-center gap-1.5">
                  <span class="text-base font-semibold text-zinc-900">2</span>
                  <span class="text-[10px] text-red-500 font-medium">new</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Bottom Navigation -->
        <div
          class="flex justify-around bg-white px-2 py-3 border-t border-zinc-100"
        >
          <div class="flex flex-col items-center text-[10px] text-emerald-600">
            <Home class="w-5 h-5 mb-1" />
            <span>Home</span>
          </div>
          <div class="flex flex-col items-center text-[10px] text-zinc-400">
            <BarChart2 class="w-5 h-5 mb-1" />
            <span>Stats</span>
          </div>
          <div class="flex flex-col items-center text-[10px] text-zinc-400">
            <Settings class="w-5 h-5 mb-1" />
            <span>Control</span>
          </div>
          <div class="flex flex-col items-center text-[10px] text-zinc-400">
            <User class="w-5 h-5 mb-1" />
            <span>Profile</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Droplets,
  Sprout,
  Sun,
  BellRing,
  Home,
  BarChart2,
  Settings,
  User,
} from "lucide-vue-next";
import LeaveLet from "./icons/LeaveLet.vue";
</script>
