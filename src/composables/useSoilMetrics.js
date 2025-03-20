import { ref } from "vue";

export function useSoilMetrics() {
  const selectedPeriod = ref("Weekly");
  const timePeriods = ["Weekly", "Monthly", "Yearly"];

  const soilMetrics = [
    {
      title: "Soil Moisture",
      value: "42%",
      status: "Optimal",
      statusColor: "green",
      change: {
        value: "5%",
        direction: "up",
        color: "green",
        period: "from yesterday",
      },
    },
    {
      title: "Soil pH",
      value: "6.2",
      status: "Attention",
      statusColor: "yellow",
      change: {
        value: "0.3",
        direction: "down",
        color: "red",
        period: "from yesterday",
      },
    },
    {
      title: "Soil Temperature",
      value: "18°C",
      status: "Optimal",
      statusColor: "green",
      change: {
        value: "",
        direction: "equal",
        color: "gray",
        period: "No change",
      },
    },
    {
      title: "Nutrient Index",
      value: "3.8/10",
      status: "Low",
      statusColor: "red",
      change: {
        value: "0.5",
        direction: "down",
        color: "red",
        period: "from last week",
      },
    },
  ];

  const mapLegends = [
    { label: "High Moisture", color: "bg-blue-500" },
    { label: "Optimal", color: "bg-green-500" },
    { label: "Low Moisture", color: "bg-yellow-500" },
    { label: "Critical", color: "bg-red-500" },
  ];

  const zones = [
    {
      name: "Zone A",
      status: "Healthy",
      statusColor: "green",
      backgroundColor: "bg-gray-50",
      metrics: {
        moisture: "45%",
        ph: "6.8",
        temp: "19°C",
        nutrients: "7.2/10",
      },
    },
    {
      name: "Zone B",
      status: "Needs Attention",
      statusColor: "yellow",
      backgroundColor: "bg-yellow-50",
      metrics: {
        moisture: "28%",
        ph: "6.2",
        temp: "18°C",
        nutrients: "5.1/10",
      },
    },
    {
      name: "Zone C",
      status: "Critical",
      statusColor: "red",
      backgroundColor: "bg-red-50",
      metrics: {
        moisture: "15%",
        ph: "5.5",
        temp: "17°C",
        nutrients: "3.2/10",
      },
    },
    {
      name: "Zone D",
      status: "Healthy",
      statusColor: "green",
      backgroundColor: "bg-gray-50",
      metrics: {
        moisture: "42%",
        ph: "7.0",
        temp: "18°C",
        nutrients: "6.8/10",
      },
    },
  ];

  return {
    selectedPeriod,
    timePeriods,
    soilMetrics,
    mapLegends,
    zones,
  };
}
