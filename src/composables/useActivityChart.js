import { ref } from "vue";
import Chart from "chart.js/auto";

export function useActivityChart() {
  const chartInstance = ref(null);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthWeeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

  const weeklyStats = {
    orders: 456,
    date: "Oct 18th, 2023",
  };

  const monthlyStats = {
    orders: 2345,
    date: "March 2025",
  };

  function initChart(canvas, type = "weekly") {
    if (!canvas) return;

    // Destroy existing chart instance if it exists
    if (chartInstance.value) {
      chartInstance.value.destroy();
    }

    const ctx = canvas.getContext("2d");
    const isWeekly = type === "weekly";

    chartInstance.value = new Chart(ctx, {
      type: "line",
      data: {
        labels: isWeekly ? weekDays : monthWeeks,
        datasets: [
          {
            label: isWeekly ? "Weekly Activity" : "Monthly Activity",
            data: isWeekly
              ? [30, 45, 60, 75, 45, 65, 55]
              : [350, 420, 580, 490],
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.4,
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointBackgroundColor: "#3b82f6",
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
            titleFont: {
              size: 14,
              weight: "bold",
            },
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
            beginAtZero: true,
          },
        },
      },
    });
  }

  return {
    chartInstance,
    weekDays,
    monthWeeks,
    weeklyStats,
    monthlyStats,
    initChart,
  };
}
