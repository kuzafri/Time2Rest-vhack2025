<template>
  <div class="w-full space-y-8 overflow-x-hidden">
    <HeaderPage
      title="Soil Monitoring"
      description="Track soil health and conditions across your land"
    />

    <!-- Soil Metrics Overview -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <MetricCard
        v-for="metric in soilMetrics"
        :key="metric.title"
        v-bind="metric"
      />
    </div>

    <!-- Soil Map and Details -->
    <Card class="mb-8 relative z-10">
      <CardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle class="text-base font-medium">Soil Moisture Map</CardTitle>
        <Select v-model="selectedMapLayer" defaultValue="moisture">
          <SelectTrigger class="w-[140px] h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="moisture">Moisture</SelectItem>
              <SelectItem value="ph">pH Level</SelectItem>
              <SelectItem value="temperature">Temperature</SelectItem>
              <SelectItem value="nutrients">Nutrients</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div class="h-80 rounded-lg">
          <!-- Interactive soil map container -->
          <div
            ref="mapElement"
            id="soilMap"
            class="h-full w-full rounded-lg"
          ></div>
        </div>
        <div class="flex justify-between mt-4 text-xs text-gray-500">
          <div
            v-for="legend in mapLegends"
            :key="legend.label"
            class="flex items-center"
          >
            <div :class="['h-3 w-3 rounded-full mr-1', legend.color]"></div>
            <span>{{ legend.label }}</span>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card class="mb-8">
      <CardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle class="text-base font-medium">Zone Analysis</CardTitle>
        <button class="text-xs text-blue-600">View All</button>
      </CardHeader>
      <CardContent class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ZoneCard v-for="zone in zones" :key="zone.name" v-bind="zone" />
      </CardContent>
    </Card>

    <!-- Soil History Chart -->
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle>Soil Condition History</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          :default-value="selectedPeriod"
          @update:model-value="changePeriod"
        >
          <TabsList class="w-auto justify-start">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent :value="selectedPeriod">
            <div class="h-80">
              <canvas id="soilHistoryChart"></canvas>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import HeaderPage from "@/components/HeaderPage.vue";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MetricCard from "../components/MetricCard.vue";
import ZoneCard from "../components/ZoneCard.vue";
import { useSoilHistory } from "@/composables/useSoilHistory";
import { useSoilMetrics } from "@/composables/useSoilMetrics";

// Import OpenLayers
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import XYZ from "ol/source/XYZ"; // For satellite imagery
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import Overlay from "ol/Overlay";

const { soilMetrics, mapLegends, zones } = useSoilMetrics();
const { selectedPeriod, changePeriod } = useSoilHistory();

// Map state management
const selectedMapLayer = ref("moisture");
const mapElement = ref(null);
let map = null;
let vectorLayer = null;
let popupOverlay = null;
let popupElement = null;

// Sample soil data for demonstration - Penang, Malaysia
// In a real application, this would come from an API or backend
const soilData = {
  moisture: [
    { lat: 5.54031, lng: 100.39697, value: 80 }, // High moisture - Penang, Malaysia
    { lat: 5.54051, lng: 100.39717, value: 65 }, // Medium-high moisture
    { lat: 5.54071, lng: 100.39737, value: 45 }, // Medium moisture
    { lat: 5.54091, lng: 100.39757, value: 25 }, // Low moisture
    { lat: 5.54111, lng: 100.39777, value: 10 }, // Very low moisture
  ],
  ph: [
    { lat: 5.54031, lng: 100.39697, value: 7.2 },
    { lat: 5.54051, lng: 100.39717, value: 6.8 },
    { lat: 5.54071, lng: 100.39737, value: 6.5 },
    { lat: 5.54091, lng: 100.39757, value: 7.4 },
    { lat: 5.54111, lng: 100.39777, value: 5.9 },
  ],
  temperature: [
    { lat: 5.54031, lng: 100.39697, value: 32 },
    { lat: 5.54051, lng: 100.39717, value: 30 },
    { lat: 5.54071, lng: 100.39737, value: 33 },
    { lat: 5.54091, lng: 100.39757, value: 29 },
    { lat: 5.54111, lng: 100.39777, value: 28 },
  ],
  nutrients: [
    { lat: 5.54031, lng: 100.39697, value: 75 },
    { lat: 5.54051, lng: 100.39717, value: 60 },
    { lat: 5.54071, lng: 100.39737, value: 40 },
    { lat: 5.54091, lng: 100.39757, value: 55 },
    { lat: 5.54111, lng: 100.39777, value: 30 },
  ],
};

// Function to get color based on value
function getColor(value, type) {
  if (type === "moisture") {
    if (value > 70) return "#3b82f6"; // Blue for high moisture
    if (value > 50) return "#60a5fa";
    if (value > 30) return "#93c5fd";
    if (value > 15) return "#bfdbfe";
    return "#dbeafe";
  } else if (type === "ph") {
    if (value > 7.5) return "#818cf8"; // Purples for high pH
    if (value > 7.0) return "#a5b4fc";
    if (value > 6.5) return "#c7d2fe";
    if (value > 6.0) return "#ddd6fe";
    return "#ede9fe";
  } else if (type === "temperature") {
    if (value > 25) return "#ef4444"; // Reds for high temperature
    if (value > 22) return "#f87171";
    if (value > 20) return "#fca5a5";
    if (value > 18) return "#fecaca";
    return "#fee2e2";
  } else if (type === "nutrients") {
    if (value > 70) return "#10b981"; // Greens for high nutrients
    if (value > 50) return "#34d399";
    if (value > 30) return "#6ee7b7";
    if (value > 15) return "#a7f3d0";
    return "#d1fae5";
  }
  return "#d1d5db"; // Default gray
}

// Function to initialize popup overlay
function createPopupOverlay() {
  // Create popup overlay DOM elements
  const container = document.createElement("div");
  container.className = "ol-popup";
  container.style.display = "none"; // Hidden by default
  popupElement = container;

  const content = document.createElement("div");
  content.className = "ol-popup-content";
  container.appendChild(content);

  // Create and add the overlay to the map
  popupOverlay = new Overlay({
    element: container,
    autoPan: false, // Don't auto-pan on hover
    positioning: "bottom-center",
    offset: [0, -15], // Offset to position above the point
  });

  map.addOverlay(popupOverlay);

  // Return the content element so we can update it later
  return content;
}

// Initialize and update map layer
function updateMapLayer() {
  if (!map) return;

  // Remove existing vector layer if exists
  if (vectorLayer) {
    map.removeLayer(vectorLayer);
  }

  // Create features for the selected data type
  const features = soilData[selectedMapLayer.value].map((point) => {
    const feature = new Feature({
      geometry: new Point(fromLonLat([point.lng, point.lat])),
      value: point.value,
      type: selectedMapLayer.value,
    });

    // Set feature style with enhanced aesthetics
    feature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 18,
          fill: new Fill({
            color: getColor(point.value, selectedMapLayer.value) + "CC", // More opacity for better visibility
          }),
          stroke: new Stroke({
            color: "#ffffff", // White border for better contrast on satellite imagery
            width: 2,
          }),
        }),
      })
    );

    return feature;
  });

  // Create a vector source with the features
  const vectorSource = new VectorSource({
    features: features,
  });

  // Create a vector layer with the source
  vectorLayer = new VectorLayer({
    source: vectorSource,
    zIndex: 1, // Ensure vector layer is above the tile layer
  });

  // Add the vector layer to the map
  map.addLayer(vectorLayer);
}

// Initialize map on component mount
onMounted(() => {
  // Create OpenLayers map with ESRI satellite imagery
  map = new Map({
    target: mapElement.value,
    layers: [
      new TileLayer({
        source: new XYZ({
          // Using ESRI World Imagery satellite basemap
          url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          maxZoom: 19,
          attributions:
            "Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
        }),
      }),
    ],
    view: new View({
      center: fromLonLat([100.39697, 5.54031]), // OpenLayers uses [longitude, latitude] order
      zoom: 17, // Higher zoom level for better detail
      maxZoom: 19,
    }),
    controls: [], // Hide default controls for cleaner look
  });

  // Create popup content element
  const popupContentElement = createPopupOverlay();

  // Add hover interaction for features
  let hoveredFeature = null;

  map.on("pointermove", function (event) {
    if (event.dragging) {
      // Hide popup while dragging
      popupElement.style.display = "none";
      return;
    }

    const pixel = map.getEventPixel(event.originalEvent);
    const hit = map.hasFeatureAtPixel(pixel);

    map.getTargetElement().style.cursor = hit ? "pointer" : "";

    // Find feature under pointer
    const feature = map.forEachFeatureAtPixel(pixel, function (feature) {
      return feature;
    });

    if (feature) {
      // Show popup with feature info
      hoveredFeature = feature;
      const value = feature.get("value");
      const type = feature.get("type");

      // Format value based on type
      let formattedValue = value;
      if (type === "moisture" || type === "nutrients") {
        formattedValue = value + "%";
      } else if (type === "temperature") {
        formattedValue = value + "°C";
      } else if (type === "ph") {
        formattedValue = "pH " + value;
      }

      // Update popup content with styled info
      popupContentElement.innerHTML = `
        <div class="popup-title">${
          type.charAt(0).toUpperCase() + type.slice(1)
        }</div>
        <div class="popup-value">${formattedValue}</div>
      `;

      // Position popup over feature
      const coords = feature.getGeometry().getCoordinates();
      popupOverlay.setPosition(coords);

      // Show popup
      popupElement.style.display = "block";
    } else if (hoveredFeature) {
      // Hide popup when not over feature
      popupElement.style.display = "none";
      hoveredFeature = null;
    }
  });

  // Add initial soil data layer
  updateMapLayer();
});

// Watch for changes to selected map layer
watch(selectedMapLayer, () => {
  updateMapLayer();
});
</script>

<style>
/* Map container styling */
#soilMap {
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* OpenLayers popup styling with improved aesthetics */
.ol-popup {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.3);
  padding: 12px 15px;
  border-radius: 8px;
  border: none;
  min-width: 110px;
  text-align: center;
  z-index: 1000;
  transition: opacity 0.2s;
  pointer-events: none;
  transform: translate(-50%, -100%);
}

/* Enhance popup visibility for dark background */
.ol-popup:after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -10px;
  border-width: 10px;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.95) transparent transparent transparent;
}

.popup-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  margin-bottom: 3px;
}

.popup-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
}

/* Custom styling for the map controls */
.ol-control {
  background-color: transparent;
}

.ol-control button {
  background-color: rgba(255, 255, 255, 0.9);
  color: #374151;
}

.ol-control button:hover {
  background-color: rgba(255, 255, 255, 1);
}
</style>
