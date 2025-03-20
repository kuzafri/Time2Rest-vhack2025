import { ref, watch } from "vue";
import Chart from "chart.js/auto";

export function useWaterUsageChart() {
  const chartInstance = ref(null);
  const selectedPeriod = ref("daily");

  const chartData = {
    daily: {
      labels: ["12AM", "4AM", "8AM", "12PM", "4PM", "8PM"],
      data: [30, 45, 75, 70, 85, 60],
    },
    weekly: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      data: [60, 80, 40, 65, 60, 25, 60],
    },
    monthly: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      data: [250, 320, 280, 290],
    },
  };

  const initChart = (element) => {
    if (!element) return;

    if (chartInstance.value) {
      chartInstance.value.destroy();
    }

    const currentData = chartData[selectedPeriod.value];

    chartInstance.value = new Chart(element.getContext("2d"), {
      type: "bar",
      data: {
        labels: currentData.labels,
        datasets: [
          {
            label: "Water Usage",
            data: currentData.data,
            backgroundColor: currentData.labels.map((_, i) =>
              i % 2 === 0 ? "#3b82f6" : "#10b981"
            ),
            borderWidth: 0,
            borderRadius: 6,
            barThickness: 12,
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
            beginAtZero: true,
            max: selectedPeriod.value === "monthly" ? 400 : 100,
            grid: {
              color: "#f3f4f6",
            },
            ticks: {
              stepSize: selectedPeriod.value === "monthly" ? 100 : 20,
              color: "#9ca3af",
              font: {
                size: 10,
              },
            },
          },
        },
      },
    });
  };

  const updatePeriod = (period) => {
    selectedPeriod.value = period;
  };

  watch(selectedPeriod, () => {
    const element = document.getElementById("waterUsageTrendsChart");
    if (element) {
      initChart(element);
    }
  });

  return {
    selectedPeriod,
    initChart,
    updatePeriod,
  };
}
