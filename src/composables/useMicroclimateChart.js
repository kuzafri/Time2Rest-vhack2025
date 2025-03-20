import { ref, onBeforeUnmount } from "vue";
import Chart from "chart.js/auto";

export function useMicroclimateChart() {
  const trendChart = ref(null);

  const createChart = (canvas) => {
    if (trendChart.value) {
      trendChart.value.destroy();
    }

    const labels = Array.from({ length: 25 }, (_, i) => {
      const hour = new Date();
      hour.setHours(hour.getHours() - (24 - i));
      return hour.getHours() + ":00";
    });

    const ctx = canvas.getContext("2d");
    trendChart.value = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Temperature (°C)",
            data: generateRandomData(20, 5),
            borderColor: "#FF6384",
            backgroundColor: "rgba(255, 99, 132, 0.1)",
            tension: 0.4,
            yAxisID: "y",
          },
          {
            label: "Humidity (%)",
            data: generateRandomData(60, 20),
            borderColor: "#36A2EB",
            backgroundColor: "rgba(54, 162, 235, 0.1)",
            tension: 0.4,
            yAxisID: "y",
          },
          {
            label: "CO₂ (ppm)",
            data: generateRandomData(700, 300),
            borderColor: "#4BC0C0",
            backgroundColor: "rgba(75, 192, 192, 0.1)",
            tension: 0.4,
            yAxisID: "y1",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          title: {
            display: true,
            text: "Environmental Conditions",
            font: {
              size: 14,
            },
          },
        },
        scales: {
          y: {
            type: "linear",
            display: true,
            position: "left",
            title: {
              display: true,
              text: "Temperature (°C) / Humidity (%)",
            },
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            title: {
              display: true,
              text: "CO₂ (ppm)",
            },
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      },
    });
  };

  const updateChart = () => {
    if (!trendChart.value) return;

    trendChart.value.data.datasets[0].data = generateRandomData(20, 5);
    trendChart.value.data.datasets[1].data = generateRandomData(60, 20);
    trendChart.value.data.datasets[2].data = generateRandomData(700, 300);
    trendChart.value.update();
  };

  const generateRandomData = (base, range) => {
    return Array(25)
      .fill()
      .map(() => Math.random() * range + base);
  };

  onBeforeUnmount(() => {
    if (trendChart.value) {
      trendChart.value.destroy();
    }
  });

  return {
    createChart,
    updateChart,
    trendChart,
  };
}
