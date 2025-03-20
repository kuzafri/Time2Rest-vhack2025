import { ref } from "vue";
import Chart from "chart.js/auto";

export function useSoilPhChart() {
  const chartInstance = ref(null);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
  ];
  const currentLevels = [
    20000, 25000, 18000, 30000, 40000, 35000, 25000, 32000, 28000,
  ];
  const thresholdLevels = [
    30000, 15000, 25000, 35000, 22000, 38000, 28000, 35000, 40000,
  ];

  function initChart(canvas) {
    if (!canvas) return;

    // Destroy existing chart instance if it exists
    if (chartInstance.value) {
      chartInstance.value.destroy();
    }

    const ctx = canvas.getContext("2d");

    chartInstance.value = new Chart(ctx, {
      type: "line",
      data: {
        labels: months,
        datasets: [
          {
            label: "Current Level",
            data: currentLevels,
            borderColor: "#3b82f6",
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 5,
          },
          {
            label: "Threshold",
            data: thresholdLevels,
            borderColor: "#ef4444",
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 5,
            borderDash: [5, 5],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: "index",
            intersect: false,
            backgroundColor: "white",
            titleColor: "#1f2937",
            bodyColor: "#6b7280",
            borderColor: "#e5e7eb",
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#9ca3af",
              font: {
                size: 10,
              },
            },
          },
          y: {
            display: true,
            position: "left",
            grid: {
              color: "#f3f4f6",
            },
            ticks: {
              color: "#9ca3af",
              font: {
                size: 10,
              },
              callback: function (value) {
                return value / 1000 + "k";
              },
            },
          },
        },
      },
    });
  }

  return {
    chartInstance,
    months,
    currentLevels,
    thresholdLevels,
    initChart,
  };
}
