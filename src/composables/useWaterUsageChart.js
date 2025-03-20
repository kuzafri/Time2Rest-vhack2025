import { onMounted, ref } from "vue";
import Chart from "chart.js/auto";

export function useWaterUsageChart() {
  const selectedPeriod = ref("daily");
  let chart = null;

  const chartData = {
    daily: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "This Week",
          data: [350, 420, 280, 450, 380, 320, 250],
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Last Week",
          data: [400, 380, 320, 490, 420, 380, 300],
          borderColor: "#9ca3af",
          backgroundColor: "rgba(156, 163, 175, 0.1)",
          tension: 0.4,
          fill: true,
          borderDash: [5, 5],
        },
      ],
    },
    weekly: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "This Month",
          data: [2450, 2100, 2300, 2000],
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Last Month",
          data: [2200, 2400, 2100, 2300],
          borderColor: "#9ca3af",
          backgroundColor: "rgba(156, 163, 175, 0.1)",
          tension: 0.4,
          fill: true,
          borderDash: [5, 5],
        },
      ],
    },
    monthly: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "This Year",
          data: [9800, 8900, 9200, 8800, 9100, 8500],
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Last Year",
          data: [9200, 9400, 9000, 9300, 8800, 9000],
          borderColor: "#9ca3af",
          backgroundColor: "rgba(156, 163, 175, 0.1)",
          tension: 0.4,
          fill: true,
          borderDash: [5, 5],
        },
      ],
    },
  };

  const updateChart = () => {
    if (chart) {
      chart.destroy();
    }

    const ctx = document.getElementById("waterUsageTrendsChart");
    chart = new Chart(ctx, {
      type: "line",
      data: chartData[selectedPeriod.value],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              usePointStyle: true,
              boxWidth: 6,
            },
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
            callbacks: {
              label: function (context) {
                return context.dataset.label + ": " + context.parsed.y + " L";
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: "#f3f4f6",
            },
            ticks: {
              callback: function (value) {
                return value + " L";
              },
            },
          },
        },
      },
    });
  };

  onMounted(() => {
    updateChart();
  });

  const changePeriod = (period) => {
    selectedPeriod.value = period;
    updateChart();
  };

  return {
    selectedPeriod,
    changePeriod,
  };
}
