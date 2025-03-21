import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import { configureChartJS } from "./lib/chartUtils";

// Configure Chart.js to prevent stack overflow issues
configureChartJS();

createApp(App).use(router).mount("#app");
