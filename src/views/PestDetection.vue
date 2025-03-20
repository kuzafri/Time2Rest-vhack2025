<script setup>
import HeaderPage from "@/components/HeaderPage.vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { usePestDetectionChart } from "@/composables/usePestDetectionChart";
import { Camera, CameraOff, Square } from "lucide-vue-next";

const isStreaming = ref(false);
const stream = ref(null);
const videoElement = ref(null);
const canvasElement = ref(null);
const historyChartEl = ref(null);

const { createChart } = usePestDetectionChart();

const detectionResults = ref([
  {
    image: "https://placehold.co/300x200",
    issue: "Powdery Mildew",
    confidence: 92,
    description:
      "Powdery mildew detected on cucumber leaves. This fungal disease appears as white powdery spots on the upper sides of leaves.",
    recommendation:
      "Apply organic fungicide and improve air circulation around plants. Remove severely affected leaves.",
    timestamp: "2023-06-15 14:32",
  },
  {
    image: "https://placehold.co/300x200",
    issue: "Aphid Infestation",
    confidence: 87,
    description:
      "Small clusters of aphids detected on tomato stems. These pests suck plant sap and can transmit viruses.",
    recommendation:
      "Spray with insecticidal soap or neem oil. Introduce ladybugs as natural predators.",
    timestamp: "2023-06-14 09:15",
  },
]);

function startCamera() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((streamData) => {
        stream.value = streamData;
        isStreaming.value = true;
        nextTick(() => {
          videoElement.value.srcObject = streamData;
        });
      })
      .catch((err) => {
        console.error("Error accessing camera:", err);
        alert("Unable to access camera. Please check permissions.");
      });
  } else {
    alert("Your browser does not support camera access");
  }
}

function stopCamera() {
  if (stream.value) {
    stream.value.getTracks().forEach((track) => track.stop());
    stream.value = null;
    isStreaming.value = false;
  }
}

function captureImage() {
  const video = videoElement.value;
  const canvas = canvasElement.value;
  const context = canvas.getContext("2d");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imageData = canvas.toDataURL("image/png");

  // Simulate AI analysis (in a real app, you'd send this to your AI service)
  setTimeout(() => {
    detectionResults.value.unshift({
      image: imageData,
      issue: "Leaf Spot Disease",
      confidence: Math.floor(Math.random() * 20) + 80, // Random confidence between 80-99%
      description:
        "Brown spots detected on leaves indicating fungal infection. This can spread to other plants if not treated.",
      recommendation:
        "Remove affected leaves, improve air circulation, and apply copper-based fungicide.",
      timestamp: new Date().toLocaleString(),
    });
  }, 1500);
}

onMounted(() => {
  nextTick(() => {
    if (historyChartEl.value) {
      createChart(historyChartEl.value);
    }
  });
});

onBeforeUnmount(() => {
  stopCamera();
});
</script>

<template>
  <div class="flex-1 w-full space-y-8">
    <HeaderPage
      title="Pest & Disease Detection"
      description="Monitor and identify potential threats to your crops"
    />

    <!-- Camera Section -->
    <Card>
      <CardContent class="p-6">
        <div class="flex flex-col items-center space-y-4">
          <div
            class="w-full max-w-2xl h-[480px] bg-muted rounded-lg overflow-hidden relative"
          >
            <div
              v-if="!isStreaming"
              class="h-full flex flex-col items-center justify-center text-muted-foreground"
            >
              <i class="fas fa-camera text-6xl mb-4"></i>
              <p>Camera feed will appear here</p>
              <Button class="mt-4" variant="default" @click="startCamera">
                Start Camera
              </Button>
            </div>
            <video
              v-else
              ref="videoElement"
              class="w-full h-full object-cover"
              autoplay
            ></video>
            <canvas ref="canvasElement" class="hidden"></canvas>
          </div>

          <div v-if="isStreaming" class="flex gap-4">
            <Button @click="captureImage">
              <Camera class="mr-2" /> Capture Image
            </Button>
            <Button variant="destructive" @click="stopCamera">
              <CameraOff class="mr-2" /> Stop Camera
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Detection Results -->
    <div v-if="detectionResults.length > 0">
      <h2 class="text-2xl font-semibold mb-4">
        Detection Results ({{ detectionResults.length }})
      </h2>
      <div class="grid grid-cols-1 gap-6">
        <Card v-for="(result, index) in detectionResults" :key="index">
          <div class="flex flex-col lg:flex-row">
            <img
              :src="result.image"
              alt="Captured image"
              class="w-full lg:w-[300px] h-[200px] object-cover rounded-t-md"
            />
            <Card class="mt-3 bg-muted/50 mx-3 w-full">
              <CardContent class="p-4">
                <h4 class="font-semibold mb-2">Recommended Action:</h4>
                <p class="text-sm text-muted-foreground">
                  {{ result.recommendation }}
                </p>
              </CardContent>
            </Card>
          </div>
          <div class="flex flex-col justify-between h-full">
            <CardContent class="flex-1 p-6">
              <CardTitle class="mb-4">{{ result.issue }}</CardTitle>
              <div class="space-y-2">
                <div class="flex justify-between text-sm mb-1">
                  <span>Confidence</span>
                  <span>{{ result.confidence }}%</span>
                </div>
                <Progress :model-value="result.confidence" />
              </div>
              <p class="mt-4 text-muted-foreground">
                {{ result.description }}
              </p>

              <p class="mt-4 text-sm text-muted-foreground">
                Detected on: {{ result.timestamp }}
              </p>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>

    <!-- Detection History -->
    <div>
      <h2 class="text-2xl font-semibold mb-4">Detection History</h2>
      <Card>
        <CardContent class="p-6">
          <div class="h-auto mb-8">
            <canvas ref="historyChartEl"></canvas>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent class="p-4 text-center">
                <h3 class="text-sm font-medium text-muted-foreground mb-2">
                  Total Scans
                </h3>
                <p class="text-3xl font-bold text-primary">124</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent class="p-4 text-center">
                <h3 class="text-sm font-medium text-muted-foreground mb-2">
                  Issues Detected
                </h3>
                <p class="text-3xl font-bold text-destructive">18</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent class="p-4 text-center">
                <h3 class="text-sm font-medium text-muted-foreground mb-2">
                  Healthy Scans
                </h3>
                <p class="text-3xl font-bold text-success">106</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent class="p-4 text-center">
                <h3 class="text-sm font-medium text-muted-foreground mb-2">
                  Detection Rate
                </h3>
                <p class="text-3xl font-bold text-warning">14.5%</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
