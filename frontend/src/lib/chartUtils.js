// Chart.js configuration utils
import Chart from "chart.js/auto";

// Disable animations globally to prevent potential stack overflow issues
export function configureChartJS() {
  Chart.defaults.animation = false;
  Chart.defaults.responsive = true;
  Chart.defaults.maintainAspectRatio = true;

  // Prevent recursive resolution issues with plugins
  const originalResolvePlugins = Chart.registry.plugins.resolveAll;
  if (originalResolvePlugins) {
    const seenPlugins = new WeakSet();

    Chart.registry.plugins.resolveAll = function (...args) {
      const result = originalResolvePlugins.apply(this, args);
      return result.filter((plugin) => {
        if (seenPlugins.has(plugin)) {
          return false;
        }
        seenPlugins.add(plugin);
        return true;
      });
    };
  }
}
