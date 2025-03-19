<template>
  <div class="pest-detection">
    <h1>AI-Powered Pest & Disease Detection</h1>
    
    <div class="camera-section">
      <div class="camera-feed">
        <div v-if="!isStreaming" class="camera-placeholder">
          <i class="fas fa-camera"></i>
          <p>Camera feed will appear here</p>
          <button @click="startCamera" class="primary-button">Start Camera</button>
        </div>
        <video v-else ref="videoElement" autoplay></video>
        <canvas ref="canvasElement" style="display: none;"></canvas>
      </div>
      
      <div class="camera-controls" v-if="isStreaming">
        <button @click="captureImage" class="primary-button">
          <i class="fas fa-camera"></i> Capture Image
        </button>
        <button @click="stopCamera" class="secondary-button">
          <i class="fas fa-stop"></i> Stop Camera
        </button>
      </div>
    </div>
    
    <div class="detection-results" v-if="detectionResults.length > 0">
      <h2>Detection Results</h2>
      <div class="results-grid">
        <div v-for="(result, index) in detectionResults" :key="index" class="result-card">
          <img :src="result.image" alt="Captured image" class="result-image">
          <div class="result-details">
            <h3>{{ result.issue }}</h3>
            <div class="confidence">
              <span>Confidence: {{ result.confidence }}%</span>
              <div class="confidence-bar">
                <div class="confidence-level" :style="{width: result.confidence + '%'}"></div>
              </div>
            </div>
            <p>{{ result.description }}</p>
            <div class="recommendation">
              <h4>Recommended Action:</h4>
              <p>{{ result.recommendation }}</p>
            </div>
            <p class="timestamp">Detected on: {{ result.timestamp }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="detection-history">
      <h2>Detection History</h2>
      <div class="history-chart">
        <canvas ref="historyChart"></canvas>
      </div>
      <div class="history-stats">
        <div class="stat-card">
          <h3>Total Scans</h3>
          <p>124</p>
        </div>
        <div class="stat-card">
          <h3>Issues Detected</h3>
          <p>18</p>
        </div>
        <div class="stat-card">
          <h3>Healthy Scans</h3>
          <p>106</p>
        </div>
        <div class="stat-card">
          <h3>Detection Rate</h3>
          <p>14.5%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  name: 'PestDetection',
  data() {
    return {
      isStreaming: false,
      stream: null,
      detectionResults: [
        {
          image: 'https://via.placeholder.com/300x200',
          issue: 'Powdery Mildew',
          confidence: 92,
          description: 'Powdery mildew detected on cucumber leaves. This fungal disease appears as white powdery spots on the upper sides of leaves.',
          recommendation: 'Apply organic fungicide and improve air circulation around plants. Remove severely affected leaves.',
          timestamp: '2023-06-15 14:32'
        },
        {
          image: 'https://via.placeholder.com/300x200',
          issue: 'Aphid Infestation',
          confidence: 87,
          description: 'Small clusters of aphids detected on tomato stems. These pests suck plant sap and can transmit viruses.',
          recommendation: 'Spray with insecticidal soap or neem oil. Introduce ladybugs as natural predators.',
          timestamp: '2023-06-14 09:15'
        }
      ],
      historyChart: null
    }
  },
  mounted() {
    this.initHistoryChart()
  },
  beforeUnmount() {
    this.stopCamera()
    if (this.historyChart) {
      this.historyChart.destroy()
    }
  },
  methods: {
    startCamera() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
            this.stream = stream
            this.isStreaming = true
            this.$nextTick(() => {
              this.$refs.videoElement.srcObject = stream
            })
          })
          .catch(err => {
            console.error('Error accessing camera:', err)
            alert('Unable to access camera. Please check permissions.')
          })
      } else {
        alert('Your browser does not support camera access')
      }
    },
    stopCamera() {
      if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop())
        this.stream = null
        this.isStreaming = false
      }
    },
    captureImage() {
      const video = this.$refs.videoElement
      const canvas = this.$refs.canvasElement
      const context = canvas.getContext('2d')
      
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      context.drawImage(video, 0, 0, canvas.width, canvas.height)
      
      const imageData = canvas.toDataURL('image/png')
      
      // Simulate AI analysis (in a real app, you'd send this to your AI service)
      setTimeout(() => {
        this.detectionResults.unshift({
          image: imageData,
          issue: 'Leaf Spot Disease',
          confidence: Math.floor(Math.random() * 20) + 80, // Random confidence between 80-99%
          description: 'Brown spots detected on leaves indicating fungal infection. This can spread to other plants if not treated.',
          recommendation: 'Remove affected leaves, improve air circulation, and apply copper-based fungicide.',
          timestamp: new Date().toLocaleString()
        })
      }, 1500)
    },
    initHistoryChart() {
      const ctx = this.$refs.historyChart.getContext('2d')
      
      this.historyChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Pest Detections',
              data: [5, 8, 12, 7, 10, 6],
              borderColor: '#FF6384',
              backgroundColor: 'rgba(255, 99, 132, 0.1)',
              tension: 0.4
            },
            {
              label: 'Disease Detections',
              data: [3, 5, 8, 13, 8, 12],
              borderColor: '#36A2EB',
              backgroundColor: 'rgba(54, 162, 235, 0.1)',
              tension: 0.4
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Detection Trends Over Time'
            }
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.pest-detection {
  padding: 20px;
}

.camera-section {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.camera-feed {
  width: 100%;
  max-width: 640px;
  height: 480px;
  background-color: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.camera-feed video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.camera-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
}

.camera-placeholder i {
  font-size: 4rem;
  margin-bottom: 15px;
}

.camera-controls {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}

.primary-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
}

.secondary-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
}

.detection-results {
  margin: 30px 0;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.result-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
}

.result-image {
  width: 300px;
  height: 200px;
  object-fit: cover;
}

.result-details {
  padding: 15px;
  flex: 1;
}

.confidence {
  margin: 10px 0;
}

.confidence-bar {
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  margin-top: 5px;
  overflow: hidden;
}

.confidence-level {
  height: 100%;
  background-color: #4CAF50;
}

.recommendation {
  margin-top: 15px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.timestamp {
  margin-top: 15px;
  font-size: 0.9rem;
  color: #666;
}

.detection-history {
  margin: 30px 0;
}

.history-chart {
  margin: 20px 0;
  height: 300px;
}

.history-stats {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.stat-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
  text-align: center;
}

.stat-card h3 {
  margin-bottom: 10px;
  color: #555;
  font-size: 1rem;
}

.stat-card p {
  font-size: 2rem;
  font-weight: bold;
  color: #4CAF50;
}
</style> 