import { ref, onMounted, onBeforeUnmount } from "vue";
import Chart from "chart.js/auto";

export function useSoilHistory() {
  let chartInstance = null;
  const selectedPeriod = ref("daily");

  const periodData = {
    daily: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Moisture",
          data: [45, 42, 44, 40, 38, 42, 45],
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.4,
          fill: false,
          yAxisID: "y",
        },
        {
          label: "pH Level",
          data: [6.5, 6.4, 6.3, 6.2, 6.3, 6.4, 6.5],
          borderColor: "#ef4444",
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          tension: 0.4,
          fill: false,
          yAxisID: "y1",
        },
        {
          label: "Temperature",
          data: [18, 19, 20, 21, 20, 19, 18],
          borderColor: "#f59e0b",
          backgroundColor: "rgba(245, 158, 11, 0.1)",
          tension: 0.4,
          fill: false,
          yAxisID: "y2",
        },
      ],
    },
    weekly: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "Moisture",
          data: [42, 40, 38, 41],
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.4,
          fill: false,
          yAxisID: "y",
        },
        {
          label: "pH Level",
          data: [6.4, 6.3, 6.2, 6.3],
          borderColor: "#ef4444",
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          tension: 0.4,
          fill: false,
          yAxisID: "y1",
        },
        {
          label: "Temperature",
          data: [19, 20, 21, 20],
          borderColor: "#f59e0b",
          backgroundColor: "rgba(245, 158, 11, 0.1)",
          tension: 0.4,
          fill: false,
          yAxisID: "y2",
        },
      ],
    },
    monthly: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Moisture",
          data: [40, 38, 42, 45, 43, 41],
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.4,
          fill: false,
          yAxisID: "y",
        },
        {
          label: "pH Level",
          data: [6.5, 6.4, 6.3, 6.2, 6.3, 6.4],
          borderColor: "#ef4444",
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          tension: 0.4,
          fill: false,
          yAxisID: "y1",
        },
        {
          label: "Temperature",
          data: [17, 18, 20, 22, 21, 19],
          borderColor: "#f59e0b",
          backgroundColor: "rgba(245, 158, 11, 0.1)",
          tension: 0.4,
          fill: false,
          yAxisID: "y2",
        },
      ],
    },
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
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
      },
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Moisture (%)",
        },
        min: 0,
        max: 100,
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "pH Level",
        },
        min: 5,
        max: 8,
        grid: {
          drawOnChartArea: false,
        },
      },
      y2: {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Temperature (°C)",
        },
        min: 10,
        max: 30,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const updateChart = () => {
    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = document.getElementById("soilHistoryChart");
    if (ctx) {
      chartInstance = new Chart(ctx, {
        type: "line",
        data: periodData[selectedPeriod.value],
        options: chartOptions,
      });
    }
  };

  const changePeriod = (period) => {
    selectedPeriod.value = period;
    updateChart();
  };

  onMounted(() => {
    updateChart();
  });

  onBeforeUnmount(() => {
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }
  });

  return {
    selectedPeriod,
    changePeriod,
  };
}
