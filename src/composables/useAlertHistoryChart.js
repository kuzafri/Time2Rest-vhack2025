import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import Chart from "chart.js/auto";

export function useAlertHistoryChart() {
  const chartRef = ref(null);
  const chartInstance = ref(null);

  const chartDataByPeriod = {
    today: {
      labels: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM"],
      critical: [0, 1, 0, 1, 0, 0, 0],
      warning: [1, 1, 0, 1, 1, 1, 0],
      info: [2, 1, 3, 1, 2, 2, 1],
    },
    week: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      critical: [2, 1, 3, 0, 2, 1, 2],
      warning: [5, 4, 3, 6, 2, 3, 5],
      info: [8, 10, 6, 9, 12, 7, 12],
    },
    month: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      critical: [7, 6, 5, 6],
      warning: [18, 15, 12, 13],
      info: [35, 32, 38, 31],
    },
  };

  const initChart = (element, period = "today") => {
    if (!element) return;

    const ctx = element.getContext("2d");
    if (!ctx) return;

    // Clear any existing chart
    if (chartInstance.value) {
      chartInstance.value.destroy();
    }

    const chartData = chartDataByPeriod[period] || chartDataByPeriod.week;

    chartInstance.value = new Chart(ctx, {
      type: "bar",
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: "Critical",
            data: chartData.critical,
            backgroundColor: "#ef4444",
          },
          {
            label: "Warning",
            data: chartData.warning,
            backgroundColor: "#f59e0b",
          },
          {
            label: "Information",
            data: chartData.info,
            backgroundColor: "#3b82f6",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { stacked: true },
          y: { stacked: true, beginAtZero: true },
        },
      },
    });
  };

  const updateChart = (period) => {
    if (chartRef.value) {
      initChart(chartRef.value, period);
    }
  };

  const cleanupChart = () => {
    if (chartInstance.value) {
      chartInstance.value.destroy();
      chartInstance.value = null;
    }
  };

  return {
    chartRef,
    initChart,
    updateChart,
    cleanupChart,
  };
}
