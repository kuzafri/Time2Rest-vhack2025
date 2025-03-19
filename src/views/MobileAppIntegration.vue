<template>
  <div class="mobile-app-integration">
    <h1>Mobile App & Smart Alerts</h1>
    
    <div class="app-overview">
      <div class="app-preview">
        <div class="phone-mockup">
          <div class="phone-screen">
            <div class="app-header">
              <div class="app-logo">
                <i class="fas fa-leaf"></i>
                <span>LeaveLet</span>
              </div>
              <div class="app-user">
                <i class="fas fa-user-circle"></i>
              </div>
            </div>
            
            <div class="app-dashboard">
              <div class="app-card soil-moisture">
                <div class="card-icon">
                  <i class="fas fa-tint"></i>
                </div>
                <div class="card-content">
                  <h3>Soil Moisture</h3>
                  <div class="card-value">68%</div>
                  <div class="card-status optimal">Optimal</div>
                </div>
              </div>
              
              <div class="app-card irrigation">
                <div class="card-icon">
                  <i class="fas fa-faucet"></i>
                </div>
                <div class="card-content">
                  <h3>Irrigation</h3>
                  <div class="card-value">Active</div>
                  <div class="card-status">Zone 2</div>
                </div>
              </div>
              
              <div class="app-card weather">
                <div class="card-icon">
                  <i class="fas fa-cloud-sun"></i>
                </div>
                <div class="card-content">
                  <h3>Weather</h3>
                  <div class="card-value">24°C</div>
                  <div class="card-status">Sunny</div>
                </div>
              </div>
              
              <div class="app-card alerts">
                <div class="card-icon">
                  <i class="fas fa-bell"></i>
                </div>
                <div class="card-content">
                  <h3>Alerts</h3>
                  <div class="card-value">2</div>
                  <div class="card-status warning">Attention Needed</div>
                </div>
              </div>
            </div>
            
            <div class="app-nav">
              <div class="nav-item active">
                <i class="fas fa-home"></i>
                <span>Home</span>
              </div>
              <div class="nav-item">
                <i class="fas fa-chart-bar"></i>
                <span>Stats</span>
              </div>
              <div class="nav-item">
                <i class="fas fa-cog"></i>
                <span>Control</span>
              </div>
              <div class="nav-item">
                <i class="fas fa-user"></i>
                <span>Profile</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="app-features">
        <h2>Mobile App Features</h2>
        <div class="features-list">
          <div class="feature-item">
            <div class="feature-icon">
              <i class="fas fa-tachometer-alt"></i>
            </div>
            <div class="feature-content">
              <h3>Real-time Dashboard</h3>
              <p>Monitor all your farm's vital statistics in real-time from anywhere. Get instant updates on soil moisture, irrigation status, and environmental conditions.</p>
            </div>
          </div>
          
          <div class="feature-item">
            <div class="feature-icon">
              <i class="fas fa-bell"></i>
            </div>
            <div class="feature-content">
              <h3>Smart Notifications</h3>
              <p>Receive instant alerts for critical events like low moisture levels, equipment failures, or extreme weather conditions. Customize notification preferences based on urgency.</p>
            </div>
          </div>
          
          <div class="feature-item">
            <div class="feature-icon">
              <i class="fas fa-sliders-h"></i>
            </div>
            <div class="feature-content">
              <h3>Remote Control</h3>
              <p>Manually override irrigation systems, adjust settings, and control farm equipment directly from your smartphone. Schedule operations in advance or make real-time adjustments.</p>
            </div>
          </div>
          
          <div class="feature-item">
            <div class="feature-icon">
              <i class="fas fa-chart-line"></i>
            </div>
            <div class="feature-content">
              <h3>Analytics & Reports</h3>
              <p>Access detailed analytics and historical data to track performance over time. Generate custom reports on water usage, crop health, and system efficiency.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="app-download">
      <h2>Get the Mobile App</h2>
      <p>Download our mobile app to access your smart farming system on the go. Available for iOS and Android devices.</p>
      <div class="download-buttons">
        <button class="download-btn apple">
          <i class="fab fa-apple"></i>
          <div class="btn-text">
            <span class="small-text">Download on the</span>
            <span class="large-text">App Store</span>
          </div>
        </button>
        <button class="download-btn google">
          <i class="fab fa-google-play"></i>
          <div class="btn-text">
            <span class="small-text">GET IT ON</span>
            <span class="large-text">Google Play</span>
          </div>
        </button>
      </div>
    </div>
    
    <div class="integration-setup">
      <h2>Connect Your Account</h2>
      <div class="setup-steps">
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>Download the App</h3>
            <p>Get the LeaveLet mobile app from the App Store or Google Play Store.</p>
          </div>
        </div>
        
        <div class="step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>Create an Account</h3>
            <p>Sign up with your email or use your existing LeaveLet account credentials.</p>
          </div>
        </div>
        
        <div class="step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3>Scan QR Code</h3>
            <p>Scan this unique QR code to link your mobile app to your farm system.</p>
            <div class="qr-code">
              <img src="https://via.placeholder.com/150" alt="QR Code">
            </div>
          </div>
        </div>
        
        <div class="step">
          <div class="step-number">4</div>
          <div class="step-content">
            <h3>Set Preferences</h3>
            <p>Customize your notification settings and dashboard layout according to your needs.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobileAppIntegration'
}
</script>

<style scoped>
.mobile-app-integration {
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}

.app-overview {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;
  margin-bottom: 40px;
}

@media (max-width: 992px) {
  .app-overview {
    grid-template-columns: 1fr;
  }
}

.app-preview {
  display: flex;
  justify-content: center;
}

.phone-mockup {
  width: 280px;
  height: 580px;
  background-color: #111;
  border-radius: 36px;
  padding: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  position: relative;
}

.phone-screen {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: #4CAF50;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-logo {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
}

.app-logo i {
  margin-right: 8px;
}

.app-dashboard {
  flex: 1;
  padding: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12px;
  overflow-y: auto;
}

.app-card {
  background-color: white;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.card-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.soil-moisture .card-icon {
  background-color: rgba(54, 162, 235, 0.1);
  color: #36A2EB;
}

.irrigation .card-icon {
  background-color: rgba(75, 192, 192, 0.1);
  color: #4BC0C0;
}

.weather .card-icon {
  background-color: rgba(255, 205, 86, 0.1);
  color: #FFCD56;
}

.alerts .card-icon {
  background-color: rgba(255, 99, 132, 0.1);
  color: #FF6384;
}

.card-content h3 {
  margin: 0 0 5px 0;
  font-size: 0.8rem;
  color: #666;
}

.card-value {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.card-status {
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 10px;
  display: inline-block;
  background-color: #f0f0f0;
}

.card-status.optimal {
  background-color: rgba(75, 192, 192, 0.2);
  color: #4BC0C0;
}

.card-status.warning {
  background-color: rgba(255, 205, 86, 0.2);
  color: #FFCD56;
}

.app-nav {
  display: flex;
  justify-content: space-around;
  background-color: white;
  padding: 10px 0;
  border-top: 1px solid #eee;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.7rem;
  color: #666;
}

.nav-item.active {
  color: #4CAF50;
}

.nav-item i {
  font-size: 1.2rem;
  margin-bottom: 4px;
}

.app-features {
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
}

.feature-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(76, 175, 80, 0.1);
  color: #4CAF50;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 1.5rem;
}

.feature-content {
  flex: 1;
}

.feature-content h3 {
  margin: 0 0 5px 0;
  font-size: 1.1rem;
}

.feature-content p {
  margin: 0;
  color: #666;
  line-height: 1.5;
}

.app-download {
  margin: 40px 0;
  text-align: center;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.download-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.download-btn {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.download-btn.apple {
  background-color: #000;
}

.download-btn.google {
  background-color: #414141;
}

.download-btn i {
  font-size: 2rem;
  margin-right: 10px;
}

.btn-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.small-text {
  font-size: 0.7rem;
}

.large-text {
  font-size: 1.1rem;
  font-weight: bold;
}

.integration-setup {
  margin-bottom: 40px;
}

.setup-steps {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

.step {
  display: flex;
  align-items: flex-start;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #4CAF50;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 15px;
}

.step-content {
  flex: 1;
}

.step-content h3 {
  margin: 0 0 10px 0;
  font-size: 1.2rem;
}

.step-content p {
  margin: 0 0 15px 0;
  color: #666;
}

.qr-code {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}
</style> 