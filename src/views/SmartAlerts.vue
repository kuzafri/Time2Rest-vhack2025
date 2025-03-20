<template>
  <div class="flex-1 w-full space-y-8">
    <HeaderPage
      title="Smart Alerts"
      description="Monitor and manage system notifications and alerts"
    />

    <h1 class="text-2xl font-bold">Smart Alerts & Notifications</h1>

    <!-- Alert Summary Section -->
    <Card>
      <CardHeader class="flex flex-row items-center justify-between">
        <div class="flex gap-2">
          <Button
            variant="outline"
            :class="{
              'bg-emerald-600 text-white hover:bg-emerald-700':
                activeTimeFilter === 'today',
            }"
            @click="setTimeFilter('today')"
          >
            Today
          </Button>
          <Button
            variant="outline"
            :class="{
              'bg-emerald-600 text-white hover:bg-emerald-700':
                activeTimeFilter === 'week',
            }"
            @click="setTimeFilter('week')"
          >
            Week
          </Button>
          <Button
            variant="outline"
            :class="{
              'bg-emerald-600 text-white hover:bg-emerald-700':
                activeTimeFilter === 'month',
            }"
            @click="setTimeFilter('month')"
          >
            Month
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="flex items-center space-x-4">
            <div
              class="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center"
            >
              <AlertTriangle class="w-6 h-6" />
            </div>
            <div>
              <div class="text-2xl font-bold">{{ summaryData.critical }}</div>
              <div class="text-sm text-zinc-500">Critical</div>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <div
              class="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center"
            >
              <AlertCircle class="w-6 h-6" />
            </div>
            <div>
              <div class="text-2xl font-bold">{{ summaryData.warning }}</div>
              <div class="text-sm text-zinc-500">Warning</div>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <div
              class="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"
            >
              <Info class="w-6 h-6" />
            </div>
            <div>
              <div class="text-2xl font-bold">{{ summaryData.info }}</div>
              <div class="text-sm text-zinc-500">Information</div>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <div
              class="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center"
            >
              <CheckCircle class="w-6 h-6" />
            </div>
            <div>
              <div class="text-2xl font-bold">{{ summaryData.resolved }}</div>
              <div class="text-sm text-zinc-500">Resolved</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Active Alerts Section -->
    <div>
      <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
      >
        <h2 class="text-xl font-semibold">Active Alerts</h2>
        <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div class="relative flex-1 sm:flex-initial">
            <Search
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4"
            />
            <Input
              type="text"
              placeholder="Search alerts..."
              class="pl-9 pr-10"
              v-model="searchQuery"
            />
            <button
              v-if="searchQuery"
              @click="clearSearch"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
            >
              <X class="w-4 h-4" />
            </button>
          </div>

          <!-- Filter using Select -->
          <Select :value="selectedTypes" @update:value="updateSelectedTypes">
            <SelectTrigger class="w-[180px]">
              <SelectValue>
                {{ getFilterPlaceholder() }}
              </SelectValue>
            </SelectTrigger>
            <SelectContent @click.stop class="overflow-hidden">
              <SelectGroup>
                <SelectLabel class="px-2 mb-2">Alert Types</SelectLabel>
                <div class="p-2 space-y-2">
                  <div
                    v-for="(type, key) in filters"
                    :key="key"
                    class="flex items-center space-x-2 px-2 py-1.5 hover:bg-accent rounded-sm cursor-pointer"
                    @click.stop="toggleFilter(key)"
                  >
                    <label
                      :for="'filter-' + key"
                      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {{ getFilterLabel(key) }}
                    </label>
                  </div>
                </div>
                <SelectSeparator />
                <div class="p-2">
                  <Button
                    size="sm"
                    variant="outline"
                    class="w-full"
                    @click.stop="resetFilters"
                  >
                    Reset Filters
                  </Button>
                </div>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div class="space-y-4">
        <!-- Alert Items -->
        <Card
          v-for="alert in filteredAlerts"
          :key="alert.id"
          :class="[
            'border-l-4',
            {
              'border-l-red-500': alert.type === 'critical',
              'border-l-amber-500': alert.type === 'warning',
              'border-l-blue-500': alert.type === 'info',
            },
          ]"
        >
          <CardContent class="p-6 flex gap-4">
            <div
              :class="[
                'w-10 h-10 rounded-full flex items-center justify-center shrink-0',
                {
                  'bg-red-100 text-red-600': alert.type === 'critical',
                  'bg-amber-100 text-amber-600': alert.type === 'warning',
                },
              ]"
            >
              <component :is="alert.icon" class="w-5 h-5" />
            </div>
            <div class="flex-1 space-y-3">
              <div class="flex justify-between items-start">
                <h3 class="font-semibold">{{ alert.title }}</h3>
                <span class="text-sm text-zinc-500">{{ alert.time }}</span>
              </div>
              <p class="text-sm text-zinc-600">{{ alert.description }}</p>
              <div class="flex flex-wrap gap-2">
                <Button
                  v-for="action in alert.actions"
                  :key="action.label"
                  variant="outline"
                  class="h-8"
                >
                  <component :is="action.icon" class="w-4 h-4 mr-2" />
                  {{ action.label }}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div v-if="filteredAlerts.length === 0" class="text-center py-8">
          <div
            class="mx-auto w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mb-3"
          >
            <Search class="w-6 h-6 text-zinc-400" />
          </div>
          <h3 class="text-lg font-medium text-zinc-900 mb-1">
            No alerts found
          </h3>
          <p class="text-zinc-500">
            {{ getNoResultsMessage() }}
          </p>
          <div class="mt-4">
            <Button variant="outline" size="sm" @click="resetAll"
              >Reset All Filters</Button
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Notification Settings Section -->
    <h2 class="text-2xl font-semibold mb-4">Notification Settings</h2>
    <Card>
      <CardHeader class="pt-1" />
      <CardContent class="space-y-8">
        <!-- Alert Channels -->
        <div class="space-y-4">
          <h3 class="font-semibold">Alert Channels</h3>
          <div class="space-y-4">
            <div
              v-for="channel in notificationChannels"
              :key="channel.id"
              class="flex items-center justify-between"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center"
                >
                  <component :is="channel.icon" class="w-4 h-4" />
                </div>
                <span>{{ channel.label }}</span>
              </div>
              <Switch v-model="channel.enabled" />
            </div>
          </div>
        </div>

        <!-- Alert Priority Settings -->
        <div class="space-y-4">
          <h3 class="font-semibold">Alert Priority Settings</h3>
          <div class="space-y-4">
            <div
              v-for="priority in alertPriorities"
              :key="priority.level"
              class="flex items-center justify-between"
            >
              <span>{{ priority.label }}</span>
              <div class="flex gap-2">
                <Button
                  v-for="channel in priority.channels"
                  :key="channel.type"
                  :variant="channel.active ? 'default' : 'outline'"
                  class="w-8 h-8 p-0"
                  @click="togglePriorityChannel(priority.level, channel.type)"
                >
                  <component :is="channel.icon" class="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <!-- Quiet Hours -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold">Quiet Hours</h3>
            <Switch v-model:checked="quietHoursEnabled" />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-sm text-zinc-500">From</label>
              <TimePicker v-model="quietHoursStart" placeholder="Start time" />
            </div>
            <div class="space-y-2">
              <label class="text-sm text-zinc-500">To</label>
              <TimePicker v-model="quietHoursEnd" placeholder="End time" />
            </div>
          </div>

          <div class="flex items-center space-x-2">
            <Checkbox
              id="critical-alerts"
              v-model:checked="allowCriticalDuringQuiet"
            />
            <label for="critical-alerts" class="text-sm">
              Allow Critical Alerts During Quiet Hours
            </label>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Alert History Section -->
    <h2 class="text-2xl font-semibold mb-4">Alert History</h2>
    <Card>
      <CardHeader class="pt-1"> </CardHeader>
      <CardContent>
        <div class="h-[300px] mb-6">
          <canvas id="historyChart" ref="chartRef"></canvas>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="w-[300px]">Alert</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead class="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="alert in historyAlerts" :key="alert.id">
              <TableCell class="font-medium">{{ alert.title }}</TableCell>
              <TableCell>
                <Badge :variant="alert.typeVariant">{{ alert.type }}</Badge>
              </TableCell>
              <TableCell>{{ alert.time }}</TableCell>
              <TableCell>
                <Badge variant="outline" :class="alert.statusColor">
                  {{ alert.status }}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" class="h-8 w-8 p-0">
                  <Eye class="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from "vue";
import { useAlertHistoryChart } from "@/composables/useAlertHistoryChart";
import HeaderPage from "@/components/HeaderPage.vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { TimePicker } from "@/components/ui/time-picker";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle,
  Search,
  Filter,
  Wrench,
  Check,
  BellOff,
  Thermometer,
  Droplet,
  Eye,
  Phone,
  Mail,
  MessageSquare,
  Bell,
  X,
} from "lucide-vue-next";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectValue,
  SelectSeparator,
} from "@/components/ui/select";

// Reactive state
const activeTimeFilter = ref("today");
const searchQuery = ref("");
const selectedTypes = ref([]);
const filters = ref({
  critical: true,
  warning: true,
  info: true,
});

// Use our chart composable
const { chartRef, initChart, updateChart, cleanupChart } =
  useAlertHistoryChart();

const quietHoursEnabled = ref(false);
const quietHoursStart = ref("22:00");
const quietHoursEnd = ref("06:00");
const allowCriticalDuringQuiet = ref(true);

// Alert summary data for different time periods
const summaryDataByPeriod = {
  today: {
    critical: 2,
    warning: 5,
    info: 12,
    resolved: 8,
  },
  week: {
    critical: 8,
    warning: 15,
    info: 42,
    resolved: 35,
  },
  month: {
    critical: 24,
    warning: 58,
    info: 136,
    resolved: 112,
  },
};

// Computed property to get the current summary data based on the active filter
const summaryData = computed(() => {
  return summaryDataByPeriod[activeTimeFilter.value];
});

// Method to set the active time filter
const setTimeFilter = (filter) => {
  activeTimeFilter.value = filter;
};

// Notification channels
const notificationChannels = ref([
  { id: 1, label: "Mobile Push Notifications", icon: Phone, enabled: true },
  { id: 2, label: "Email Notifications", icon: Mail, enabled: true },
  { id: 3, label: "SMS Notifications", icon: MessageSquare, enabled: false },
  { id: 4, label: "Web Browser Notifications", icon: Bell, enabled: true },
]);

// Alert priorities
const alertPriorities = ref([
  {
    level: "critical",
    label: "Critical Alerts",
    channels: [
      { type: "mobile", icon: Phone, active: true },
      { type: "email", icon: Mail, active: true },
      { type: "sms", icon: MessageSquare, active: true },
      { type: "web", icon: Bell, active: true },
    ],
  },
  {
    level: "warning",
    label: "Warning Alerts",
    channels: [
      { type: "mobile", icon: Phone, active: true },
      { type: "email", icon: Mail, active: true },
      { type: "sms", icon: MessageSquare, active: false },
      { type: "web", icon: Bell, active: true },
    ],
  },
  {
    level: "info",
    label: "Information Alerts",
    channels: [
      { type: "mobile", icon: Phone, active: true },
      { type: "email", icon: Mail, active: false },
      { type: "sms", icon: MessageSquare, active: false },
      { type: "web", icon: Bell, active: true },
    ],
  },
]);

// Active alerts data
const activeAlerts = ref([
  {
    id: 1,
    type: "critical",
    icon: AlertTriangle,
    title: "Irrigation Pump Failure",
    time: "15 minutes ago",
    description:
      "Main irrigation pump (Pump #2) has stopped working. System has switched to backup pump.",
    actions: [
      { label: "Troubleshoot", icon: Wrench },
      { label: "Mark as Resolved", icon: Check },
      { label: "Mute", icon: BellOff },
    ],
  },
  {
    id: 2,
    type: "critical",
    icon: AlertTriangle,
    title: "Extreme Temperature Alert",
    time: "32 minutes ago",
    description:
      "Greenhouse temperature has exceeded 35°C. Ventilation system activated at maximum capacity.",
    actions: [
      { label: "View Temperature Log", icon: Thermometer },
      { label: "Mark as Resolved", icon: Check },
      { label: "Mute", icon: BellOff },
    ],
  },
  {
    id: 3,
    type: "warning",
    icon: AlertCircle,
    title: "Low Soil Moisture",
    time: "1 hour ago",
    description:
      "Zone 3 (Herbs) soil moisture has dropped below 25%. Scheduled irrigation will begin in 30 minutes.",
    actions: [
      { label: "Irrigate Now", icon: Droplet },
      { label: "Mark as Resolved", icon: Check },
      { label: "Mute", icon: BellOff },
    ],
  },
  {
    id: 4,
    type: "info",
    icon: Info,
    title: "System Update Available",
    time: "3 hours ago",
    description:
      "A new firmware update (v2.3.5) is available for your irrigation controller. Contains security and performance improvements.",
    actions: [
      { label: "Update Now", icon: Wrench },
      { label: "Remind Later", icon: BellOff },
    ],
  },
]);

// History alerts data
const historyAlerts = ref([
  {
    id: 1,
    title: "Water Pump Maintenance Required",
    type: "Info",
    typeVariant: "secondary",
    time: "Today, 08:45",
    status: "Resolved",
    statusColor: "text-emerald-600",
  },
  {
    id: 2,
    title: "Soil pH Level High in Zone 2",
    type: "Warning",
    typeVariant: "warn",
    time: "Yesterday, 14:22",
    status: "Resolved",
    statusColor: "text-emerald-600",
  },
  {
    id: 3,
    title: "Power Outage Detected",
    type: "Critical",
    typeVariant: "destructive",
    time: "2 days ago, 23:17",
    status: "Resolved",
    statusColor: "text-emerald-600",
  },
  {
    id: 4,
    title: "Temperature Sensor Malfunction",
    type: "Warning",
    typeVariant: "warn",
    time: "3 days ago, 10:05",
    status: "Pending",
    statusColor: "text-amber-600",
  },
  {
    id: 5,
    title: "System Update Installation",
    type: "Info",
    typeVariant: "secondary",
    time: "4 days ago, 02:30",
    status: "Completed",
    statusColor: "text-emerald-600",
  },
]);

// Computed property for filtered alerts based on search and filter settings
const filteredAlerts = computed(() => {
  return activeAlerts.value.filter((alert) => {
    // Check if the alert type matches any of the enabled filters
    const typeEnabled =
      (alert.type === "critical" && filters.value.critical) ||
      (alert.type === "warning" && filters.value.warning) ||
      (alert.type === "info" && filters.value.info);

    // If alert type is not enabled in filters, don't show it
    if (!typeEnabled) return false;

    // If there's a search query, check if alert matches
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase();
      return (
        alert.title.toLowerCase().includes(query) ||
        alert.description.toLowerCase().includes(query)
      );
    }

    // If no search query and type is enabled, include the alert
    return true;
  });
});

// Reset filters to default values but keep the search query
const resetFilters = () => {
  filters.value = {
    critical: true,
    warning: true,
    info: true,
  };
};

// Clear search but keep filters
const clearSearch = () => {
  searchQuery.value = "";
};

// Reset everything
const resetAll = () => {
  resetFilters();
  clearSearch();
};

// Get appropriate message when no alerts match the current filters/search
const getNoResultsMessage = () => {
  const noTypeSelected =
    !filters.value.critical && !filters.value.warning && !filters.value.info;

  if (noTypeSelected) {
    return "No alert types are selected. Try enabling some alert types in the filter.";
  }

  if (searchQuery.value.trim()) {
    return `No alerts match your search "${searchQuery.value}". Try a different search term.`;
  }

  return "Try adjusting your search or filters.";
};

// Get placeholder text for filter select
const getFilterPlaceholder = () => {
  const selectedTypes = Object.entries(filters.value)
    .filter(([_, enabled]) => enabled)
    .map(([type]) => getFilterLabel(type));

  if (selectedTypes.length === 0) return "No types";
  if (selectedTypes.length === Object.keys(filters.value).length)
    return "All types";

  // Join selected type names with commas
  return selectedTypes.join(", ");
};

// Update selected types in the select component
const updateSelectedTypes = () => {
  selectedTypes.value = Object.entries(filters.value)
    .filter(([_, enabled]) => enabled)
    .map(([type]) => type);
};

// Helper function to get proper label for filter types
const getFilterLabel = (type) => {
  switch (type) {
    case "critical":
      return "Critical";
    case "warning":
      return "Warning";
    case "info":
      return "Information";
    default:
      return type;
  }
};

// Toggle individual filter
const toggleFilter = (type) => {
  filters.value[type] = !filters.value[type];
  updateSelectedTypes();
};

// Watch for changes in selectedTypes and update filters
watch(
  selectedTypes,
  (newTypes) => {
    // Update each filter based on whether its type is in the selectedTypes array
    filters.value.critical = newTypes.includes("critical");
    filters.value.warning = newTypes.includes("warning");
    filters.value.info = newTypes.includes("info");
  },
  { deep: true }
);

// Update chart when time filter changes
watch(activeTimeFilter, (newPeriod) => {
  updateChart(newPeriod);
});

onMounted(() => {
  // Initialize chart after a small delay
  setTimeout(() => {
    if (chartRef.value) {
      initChart(chartRef.value, activeTimeFilter.value);
    }
  }, 100);
});

onBeforeUnmount(() => {
  cleanupChart();
});
</script>
