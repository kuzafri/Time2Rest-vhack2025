import { ref, onBeforeUnmount } from "vue";
import Chart from "chart.js/auto";

const cropData = {
  1: {
    // Corn
    yield: [9.8, 10.2, 9.5, 11.3, 12.1, 14.2],
    prices: {
      historical: [
        1550, 1580, 1620, 1590, 1650, 1700, 1750, 1800, 1850, 1820, 1780, 1750,
      ],
      predicted: [
        1750, 1800, 1850, 1900, 1950, 2000, 2100, 2200, 2150, 2050, 1950, 1900,
      ],
    },
  },
  2: {
    // Soybeans
    yield: [3.2, 3.4, 3.1, 3.6, 3.8, 4.2],
    prices: {
      historical: [
        2100, 2150, 2200, 2180, 2250, 2300, 2350, 2400, 2450, 2400, 2350, 2300,
      ],
      predicted: [
        2300, 2350, 2400, 2450, 2500, 2600, 2700, 2800, 2750, 2650, 2550, 2500,
      ],
    },
  },
  3: {
    // Wheat
    yield: [4.5, 4.8, 4.3, 5.1, 5.4, 6.0],
    prices: {
      historical: [
        1800, 1850, 1900, 1880, 1950, 2000, 2050, 2100, 2150, 2100, 2050, 2000,
      ],
      predicted: [
        2000, 2050, 2100, 2150, 2200, 2300, 2400, 2500, 2450, 2350, 2250, 2200,
      ],
    },
  },
  4: {
    // Tomatoes
    yield: [75.5, 78.2, 74.8, 82.3, 85.6, 92.0],
    prices: {
      historical: [
        850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1150, 1100, 1050, 1000,
      ],
      predicted: [
        1000, 1050, 1100, 1150, 1200, 1300, 1400, 1500, 1450, 1350, 1250, 1200,
      ],
    },
  },
  5: {
    // Lettuce
    yield: [45.2, 47.5, 44.8, 50.3, 52.6, 56.0],
    prices: {
      historical: [
        750, 800, 850, 900, 950, 1000, 1050, 1100, 1050, 1000, 950, 900,
      ],
      predicted: [
        900, 950, 1000, 1050, 1100, 1200, 1300, 1400, 1350, 1250, 1150, 1100,
      ],
    },
  },
};

// Define chart configurations outside any functions to avoid recreating them
const getYieldChartConfig = (data) => ({
  type: "bar",
  data: {
    labels: ["2019", "2020", "2021", "2022", "2023", "2024 (Predicted)"],
    datasets: [
      {
        label: "Yield (Tons/Hectare)",
        data: data.yield,
        backgroundColor: [
          "rgba(75, 192, 192, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(54, 162, 235, 0.7)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Yield (Tons/Hectare)",
        },
      },
    },
    animation: false, // Disable animation to prevent recursive updates
  },
});

const getPriceChartConfig = (data) => ({
  type: "line",
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Historical Price (RM/Ton)",
        data: data.prices.historical,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Predicted Price (RM/Ton)",
        data: data.prices.predicted,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.1)",
        borderDash: [5, 5],
        tension: 0.4,
        fill: true,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Price (RM/Ton)",
        },
      },
    },
    animation: false, // Disable animation to prevent recursive updates
  },
});

export function useYieldForecasting() {
  const yieldChart = ref(null);
  const priceChart = ref(null);
  const currentCropId = ref(1);

  // Create new chart instead of updating existing one
  const createYieldChart = (canvas, cropId) => {
    if (!canvas || !canvas.getContext) {
      console.error("Invalid canvas element for yield chart");
      return null;
    }

    // Ensure we have valid crop data
    const id = cropId || currentCropId.value;
    if (!cropData[id]) {
      console.error("Invalid crop ID:", id);
      return null;
    }

    // Clean up any existing chart
    if (yieldChart.value) {
      yieldChart.value.destroy();
    }

    try {
      // Create a completely new chart with the current data
      const ctx = canvas.getContext("2d");
      const config = getYieldChartConfig(cropData[id]);
      yieldChart.value = new Chart(ctx, config);
      return yieldChart.value;
    } catch (error) {
      console.error("Failed to create yield chart:", error);
      return null;
    }
  };

  // Create new chart instead of updating existing one
  const createPriceChart = (canvas, cropId) => {
    if (!canvas || !canvas.getContext) {
      console.error("Invalid canvas element for price chart");
      return null;
    }

    // Ensure we have valid crop data
    const id = cropId || currentCropId.value;
    if (!cropData[id]) {
      console.error("Invalid crop ID:", id);
      return null;
    }

    // Clean up any existing chart
    if (priceChart.value) {
      priceChart.value.destroy();
    }

    try {
      // Create a completely new chart with the current data
      const ctx = canvas.getContext("2d");
      const config = getPriceChartConfig(cropData[id]);
      priceChart.value = new Chart(ctx, config);
      return priceChart.value;
    } catch (error) {
      console.error("Failed to create price chart:", error);
      return null;
    }
  };

  // Initialize yield chart when component mounts
  const initYieldChart = (canvas) => {
    return createYieldChart(canvas, currentCropId.value);
  };

  // Initialize price chart when component mounts
  const initPriceChart = (canvas) => {
    return createPriceChart(canvas, currentCropId.value);
  };

  // Update charts by recreating them completely
  // This avoids the recursive call issues that were happening before
  const updateCharts = (cropId) => {
    if (!cropId || !cropData[cropId]) {
      console.error("Invalid crop ID:", cropId);
      return;
    }

    // Update the current crop ID
    currentCropId.value = cropId;

    // For the yield chart, recreate instead of update
    if (yieldChart.value && yieldChart.value.canvas) {
      createYieldChart(yieldChart.value.canvas, cropId);
    }

    // For the price chart, recreate instead of update
    if (priceChart.value && priceChart.value.canvas) {
      createPriceChart(priceChart.value.canvas, cropId);
    }
  };

  // Clean up charts when component unmounts
  onBeforeUnmount(() => {
    if (yieldChart.value) {
      yieldChart.value.destroy();
      yieldChart.value = null;
    }

    if (priceChart.value) {
      priceChart.value.destroy();
      priceChart.value = null;
    }
  });

  return {
    initYieldChart,
    initPriceChart,
    updateCharts,
  };
}
