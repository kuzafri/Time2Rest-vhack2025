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
import { format } from "date-fns";

interface Zone {
  id: number;
  name: string;
  status: "active" | "scheduled" | "completed" | "paused";
  flow: number;
  flowPercent: number;
  duration: string;
  intensity: "low" | "medium" | "high";
}

interface IrrigationHistoryEntry {
  id: number;
  zoneId: number;
  zoneName: string;
  pumpId: string;
  startTime: Date;
  duration: number; // in minutes
  waterUsage: number; // in liters
  status: "completed" | "interrupted" | "error";
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

// Irrigation History Data
const irrigationHistory = ref<IrrigationHistoryEntry[]>([
  {
    id: 1,
    zoneId: 1,
    zoneName: "Front Lawn",
    pumpId: "P-101",
    startTime: new Date(2023, 9, 15, 6, 30), // Oct 15, 2023, 6:30 AM
    duration: 30,
    waterUsage: 120,
    status: "completed"
  },
  {
    id: 2,
    zoneId: 2,
    zoneName: "Backyard",
    pumpId: "P-102",
    startTime: new Date(2023, 9, 15, 7, 0), // Oct 15, 2023, 7:00 AM
    duration: 45,
    waterUsage: 180,
    status: "completed"
  },
  {
    id: 3,
    zoneId: 3,
    zoneName: "Garden",
    pumpId: "P-101",
    startTime: new Date(2023, 9, 14, 6, 30), // Oct 14, 2023, 6:30 AM
    duration: 20,
    waterUsage: 80,
    status: "completed"
  },
  {
    id: 4,
    zoneId: 4,
    zoneName: "Side Yard",
    pumpId: "P-103",
    startTime: new Date(2023, 9, 14, 7, 15), // Oct 14, 2023, 7:15 AM
    duration: 15,
    waterUsage: 60,
    status: "interrupted"
  },
  {
    id: 5,
    zoneId: 1,
    zoneName: "Front Lawn",
    pumpId: "P-101",
    startTime: new Date(2023, 9, 13, 6, 30), // Oct 13, 2023, 6:30 AM
    duration: 30,
    waterUsage: 120,
    status: "error"
  }
]);

const formatDate = (date: Date) => {
  return format(date, "MMM dd, yyyy");
};

const formatTime = (date: Date) => {
  return format(date, "h:mm a");
};

const getStatusColor = (status: IrrigationHistoryEntry["status"]) => {
  switch (status) {
    case "completed":
      return "text-green-600";
    case "interrupted":
      return "text-yellow-600";
    case "error":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

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

    <!-- Irrigation History -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="font-semibold text-2xl text-gray-800">Irrigation History</h2>
        <Button variant="outline" size="sm">
          <i class="fas fa-download mr-2"></i>
          Export Data
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Irrigation Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b">
                  <th class="text-left py-3 px-4 font-medium">Zone</th>
                  <th class="text-left py-3 px-4 font-medium">Pump ID</th>
                  <th class="text-left py-3 px-4 font-medium">Date</th>
                  <th class="text-left py-3 px-4 font-medium">Time</th>
                  <th class="text-left py-3 px-4 font-medium">Duration</th>
                  <th class="text-left py-3 px-4 font-medium">Water Usage</th>
                  <th class="text-left py-3 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="entry in irrigationHistory" 
                  :key="entry.id"
                  class="border-b hover:bg-gray-50"
                >
                  <td class="py-3 px-4">
                    <div class="font-medium">{{ entry.zoneName }}</div>
                    <div class="text-xs text-gray-500">Zone {{ entry.zoneId }}</div>
                  </td>
                  <td class="py-3 px-4">{{ entry.pumpId }}</td>
                  <td class="py-3 px-4">{{ formatDate(entry.startTime) }}</td>
                  <td class="py-3 px-4">{{ formatTime(entry.startTime) }}</td>
                  <td class="py-3 px-4">{{ entry.duration }} min</td>
                  <td class="py-3 px-4">{{ entry.waterUsage }} L</td>
                  <td class="py-3 px-4">
                    <span :class="getStatusColor(entry.status)" class="font-medium">
                      {{ entry.status.charAt(0).toUpperCase() + entry.status.slice(1) }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="mt-6 flex justify-between items-center">
            <div class="text-sm text-gray-500">
              Showing 5 of 24 entries
            </div>
            <div class="flex space-x-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
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
