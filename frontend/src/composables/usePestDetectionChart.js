import { ref, onMounted, onBeforeUnmount } from "vue";
import Chart from "chart.js/auto";

export function usePestDetectionChart() {
  const chartInstance = ref(null);

  const createChart = (canvas) => {
    if (chartInstance.value) {
      chartInstance.value.destroy();
    }

    const ctx = canvas.getContext("2d");
    chartInstance.value = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Pest Detections",
            data: [5, 8, 12, 7, 10, 6],
            borderColor: "#FF6384",
            backgroundColor: "rgba(255, 99, 132, 0.1)",
            tension: 0.4,
          },
          {
            label: "Disease Detections",
            data: [3, 5, 8, 13, 8, 12],
            borderColor: "#36A2EB",
            backgroundColor: "rgba(54, 162, 235, 0.1)",
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
        plugins: {
          title: {
            display: true,
            text: "Detection Trends Over Time",
          },
        },
      },
    });
  };

  onBeforeUnmount(() => {
    if (chartInstance.value) {
      chartInstance.value.destroy();
    }
  });

  return {
    createChart,
    chartInstance,
  };
}
