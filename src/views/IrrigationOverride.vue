<script setup lang="ts">
import HeaderPage from "@/components/HeaderPage.vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Pause, Play, RotateCcw, Square } from "lucide-vue-next";
import { ref } from "vue";

interface Zone {
  id: number;
  name: string;
  status: "active" | "scheduled" | "completed" | "paused";
  flow: number;
  flowPercent: number;
  duration: string;
  intensity: "low" | "medium" | "high";
}

const selectedZoneFilter = ref<string>("all");
const zones = ref<Zone[]>([
  {
    id: 1,
    name: "Front Lawn",
    status: "active",
    flow: 4.2,
    flowPercent: 70,
    duration: "30",
    intensity: "medium",
  },
  {
    id: 2,
    name: "Backyard",
    status: "scheduled",
    flow: 0,
    flowPercent: 0,
    duration: "45",
    intensity: "high",
  },
  {
    id: 3,
    name: "Garden",
    status: "completed",
    flow: 0,
    flowPercent: 0,
    duration: "30",
    intensity: "low",
  },
  {
    id: 4,
    name: "Side Yard",
    status: "paused",
    flow: 0,
    flowPercent: 0,
    duration: "45",
    intensity: "medium",
  },
]);

const getZoneStatusBadgeVariant = (status: Zone["status"]) => {
  switch (status) {
    case "active":
      return "default";
    case "scheduled":
      return "secondary";
    case "completed":
      return "completed";
    case "paused":
      return "warn";
  }
};

const getZoneStatusText = (status: Zone["status"]) => {
  switch (status) {
    case "active":
      return "Currently Active";
    case "scheduled":
      return "Scheduled at 5:30 PM";
    case "completed":
      return "Completed Today";
    case "paused":
      return "Paused";
  }
};
</script>

<template>
  <div class="flex-1 w-full space-y-8">
    <HeaderPage
      title="Irrigation Override"
      description="Manually control and adjust irrigation settings"
    />

    <!-- System Status and Quick Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle class="text-sm font-medium text-gray-500"
              >System Status</CardTitle
            >
            <Badge variant="default">Operational</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-semibold text-gray-800">Automatic Mode</div>
          <div class="mt-2 text-sm text-gray-500">
            Next scheduled irrigation:
            <span class="font-medium">Today, 5:30 PM</span>
          </div>
          <div class="mt-4 flex space-x-2">
            <Button variant="destructive">Emergency Stop</Button>
            <Button variant="secondary">Switch to Manual</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle class="text-sm font-medium text-gray-500"
            >Quick Actions</CardTitle
          >
        </CardHeader>
        <CardContent>
          <div class="space-y-3">
            <Button variant="outline" class="w-full justify-start bg-green-50">
              <Play class="mr-2" />
              Start All Zones
            </Button>
            <Button variant="outline" class="w-full justify-start bg-yellow-50">
              <Pause class="mr-2" />
              Pause All Zones
            </Button>
            <Button variant="outline" class="w-full justify-start bg-red-50">
              <Square class="mr-2" />
              Stop All Zones
            </Button>
            <Button variant="outline" class="w-full justify-start bg-blue-50">
              <RotateCcw class="mr-2" />
              Reset System
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle class="text-sm font-medium text-gray-500"
              >System Schedule</CardTitle
            >
            <Button variant="link" class="text-xs p-0 h-auto"
              >Edit Schedule</Button
            >
          </div>
        </CardHeader>
        <CardContent>
          <div class="space-y-3">
            <div
              class="flex items-center justify-between"
              v-for="time in ['Morning', 'Afternoon', 'Evening']"
              :key="time"
            >
              <div class="flex items-center">
                <div
                  class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500"
                >
                  <i class="fas fa-clock" />
                </div>
                <div class="ml-3">
                  <div class="text-sm font-medium">{{ time }}</div>
                  <div class="text-xs text-gray-500">5:30 AM - 6:15 AM</div>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <i class="fas fa-toggle-on text-blue-500" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Zone Controls -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="font-semibold text-2xl text-gray-800">Zone Controls</h2>
        <Select v-model="selectedZoneFilter">
          <SelectTrigger class="w-[140px]">
            <SelectValue placeholder="Filter zones" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Zones</SelectItem>
              <SelectItem value="active">Active Zones</SelectItem>
              <SelectItem value="inactive">Inactive Zones</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card v-for="zone in zones" :key="zone.id">
          <CardHeader>
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div
                  :class="[
                    'h-10 w-10 rounded-full flex items-center justify-center',
                    {
                      'bg-green-100 text-green-500': zone.status === 'active',
                      'bg-gray-100 text-gray-500': zone.status === 'scheduled',
                      'bg-blue-100 text-blue-500': zone.status === 'completed',
                      'bg-yellow-100 text-yellow-500': zone.status === 'paused',
                    },
                  ]"
                >
                  <i class="fas fa-leaf" />
                </div>
                <div class="ml-3">
                  <div class="font-medium">
                    Zone {{ zone.id }} - {{ zone.name }}
                  </div>
                  <Badge :variant="getZoneStatusBadgeVariant(zone.status)">
                    {{ getZoneStatusText(zone.status) }}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div class="mb-4">
              <div class="flex justify-between text-sm mb-1">
                <span>Water Flow</span>
                <span>{{ zone.flow }} L/min</span>
              </div>
              <Progress :model-value="zone.flowPercent" />
            </div>

            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div class="text-xs text-gray-500 mb-1">Duration</div>
                <Select :model-value="zone.duration">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <div class="text-xs text-gray-500 mb-1">Intensity</div>
                <Select :model-value="zone.intensity">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div class="flex space-x-2">
              <Button variant="success" class="flex-1">
                {{ zone.status === "paused" ? "Resume" : "Start" }}
              </Button>
              <Button
                variant="warn"
                class="flex-1"
                :disabled="zone.status !== 'active'"
              >
                Pause
              </Button>
              <Button
                variant="destructive"
                class="flex-1"
                :disabled="!['active', 'paused'].includes(zone.status)"
              >
                Stop
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.toggle-checkbox:checked) {
  right: 0;
  border-color: #3b82f6;
}
:deep(.toggle-checkbox:checked + .toggle-label) {
  background-color: #3b82f6;
}
:deep(.toggle-checkbox) {
  right: 0;
  z-index: 1;
  border-color: #e5e7eb;
  transition: all 0.3s;
}
:deep(.toggle-label) {
  transition: background-color 0.3s;
}
</style>
