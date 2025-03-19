<template>
  <div class="smart-alerts">
    <h1>Smart Alerts & Notifications</h1>
    
    <div class="alerts-overview">
      <div class="overview-card">
        <div class="card-header">
          <h2>Alert Summary</h2>
          <div class="time-selector">
            <button class="time-btn active">Today</button>
            <button class="time-btn">Week</button>
            <button class="time-btn">Month</button>
          </div>
        </div>
        <div class="alert-summary">
          <div class="summary-item">
            <div class="summary-icon critical">
              <i class="fas fa-exclamation-triangle"></i>
            </div>
            <div class="summary-content">
              <div class="summary-value">2</div>
              <div class="summary-label">Critical</div>
            </div>
          </div>
          
          <div class="summary-item">
            <div class="summary-icon warning">
              <i class="fas fa-exclamation-circle"></i>
            </div>
            <div class="summary-content">
              <div class="summary-value">5</div>
              <div class="summary-label">Warning</div>
            </div>
          </div>
          
          <div class="summary-item">
            <div class="summary-icon info">
              <i class="fas fa-info-circle"></i>
            </div>
            <div class="summary-content">
              <div class="summary-value">12</div>
              <div class="summary-label">Information</div>
            </div>
          </div>
          
          <div class="summary-item">
            <div class="summary-icon success">
              <i class="fas fa-check-circle"></i>
            </div>
            <div class="summary-content">
              <div class="summary-value">8</div>
              <div class="summary-label">Resolved</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="active-alerts">
      <div class="section-header">
        <h2>Active Alerts</h2>
        <div class="filter-controls">
          <div class="search-box">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Search alerts...">
          </div>
          <div class="filter-dropdown">
            <button class="filter-btn">
              <i class="fas fa-filter"></i>
              Filter
            </button>
          </div>
        </div>
      </div>
      
      <div class="alerts-list">
        <div class="alert-item critical">
          <div class="alert-icon">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <div class="alert-content">
            <div class="alert-header">
              <h3>Irrigation Pump Failure</h3>
              <div class="alert-time">15 minutes ago</div>
            </div>
            <p class="alert-description">Main irrigation pump (Pump #2) has stopped working. System has switched to backup pump.</p>
            <div class="alert-actions">
              <button class="action-btn">
                <i class="fas fa-wrench"></i>
                Troubleshoot
              </button>
              <button class="action-btn">
                <i class="fas fa-check"></i>
                Mark as Resolved
              </button>
              <button class="action-btn">
                <i class="fas fa-bell-slash"></i>
                Mute
              </button>
            </div>
          </div>
        </div>
        
        <div class="alert-item critical">
          <div class="alert-icon">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <div class="alert-content">
            <div class="alert-header">
              <h3>Extreme Temperature Alert</h3>
              <div class="alert-time">32 minutes ago</div>
            </div>
            <p class="alert-description">Greenhouse temperature has exceeded 35°C. Ventilation system activated at maximum capacity.</p>
            <div class="alert-actions">
              <button class="action-btn">
                <i class="fas fa-thermometer-half"></i>
                View Temperature Log
              </button>
              <button class="action-btn">
                <i class="fas fa-check"></i>
                Mark as Resolved
              </button>
              <button class="action-btn">
                <i class="fas fa-bell-slash"></i>
                Mute
              </button>
            </div>
          </div>
        </div>
        
        <div class="alert-item warning">
          <div class="alert-icon">
            <i class="fas fa-exclamation-circle"></i>
          </div>
          <div class="alert-content">
            <div class="alert-header">
              <h3>Low Soil Moisture</h3>
              <div class="alert-time">1 hour ago</div>
            </div>
            <p class="alert-description">Zone 3 (Herbs) soil moisture has dropped below 25%. Scheduled irrigation will begin in 30 minutes.</p>
            <div class="alert-actions">
              <button class="action-btn">
                <i class="fas fa-tint"></i>
                Irrigate Now
              </button>
              <button class="action-btn">
                <i class="fas fa-check"></i>
                Mark as Resolved
              </button>
              <button class="action-btn">
                <i class="fas fa-bell-slash"></i>
                Mute
              </button>
            </div>
          </div>
        </div>
        
        <div class="alert-item warning">
          <div class="alert-icon">
            <i class="fas fa-exclamation-circle"></i>
          </div>
          <div class="alert-content">
            <div class="alert-header">
              <h3>Water Tank Level Low</h3>
              <div class="alert-time">3 hours ago</div>
            </div>
            <p class="alert-description">Main water storage tank is at 22% capacity. Automatic refill has been initiated.</p>
            <div class="alert-actions">
              <button class="action-btn">
                <i class="fas fa-eye"></i>
                View Tank Status
              </button>
              <button class="action-btn">
                <i class="fas fa-check"></i>
                Mark as Resolved
              </button>
              <button class="action-btn">
                <i class="fas fa-bell-slash"></i>
                Mute
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="notification-settings">
      <h2>Notification Settings</h2>
      
      <div class="settings-card">
        <div class="settings-section">
          <h3>Alert Channels</h3>
          <div class="channel-options">
            <div class="channel-option">
              <div class="option-label">
                <i class="fas fa-mobile-alt"></i>
                <span>Mobile App Push Notifications</span>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <div class="channel-option">
              <div class="option-label">
                <i class="fas fa-envelope"></i>
                <span>Email Notifications</span>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <div class="channel-option">
              <div class="option-label">
                <i class="fas fa-sms"></i>
                <span>SMS Notifications</span>
              </div>
              <label class="toggle-switch">
                <input type="checkbox">
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <div class="channel-option">
              <div class="option-label">
                <i class="fas fa-bell"></i>
                <span>Web Browser Notifications</span>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
        
        <div class="settings-section">
          <h3>Alert Priority Settings</h3>
          <div class="priority-settings">
            <div class="priority-option">
              <div class="priority-label">Critical Alerts</div>
              <div class="priority-channels">
                <div class="channel-tag active">
                  <i class="fas fa-mobile-alt"></i>
                </div>
                <div class="channel-tag active">
                  <i class="fas fa-envelope"></i>
                </div>
                <div class="channel-tag active">
                  <i class="fas fa-sms"></i>
                </div>
                <div class="channel-tag active">
                  <i class="fas fa-bell"></i>
                </div>
              </div>
            </div>
            
            <div class="priority-option">
              <div class="priority-label">Warning Alerts</div>
              <div class="priority-channels">
                <div class="channel-tag active">
                  <i class="fas fa-mobile-alt"></i>
                </div>
                <div class="channel-tag active">
                  <i class="fas fa-envelope"></i>
                </div>
                <div class="channel-tag">
                  <i class="fas fa-sms"></i>
                </div>
                <div class="channel-tag active">
                  <i class="fas fa-bell"></i>
                </div>
              </div>
            </div>
            
            <div class="priority-option">
              <div class="priority-label">Information Alerts</div>
              <div class="priority-channels">
                <div class="channel-tag active">
                  <i class="fas fa-mobile-alt"></i>
                </div>
                <div class="channel-tag">
                  <i class="fas fa-envelope"></i>
                </div>
                <div class="channel-tag">
                  <i class="fas fa-sms"></i>
                </div>
                <div class="channel-tag active">
                  <i class="fas fa-bell"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="settings-section">
          <h3>Quiet Hours</h3>
          <div class="quiet-hours-settings">
            <div class="quiet-hours-toggle">
              <span>Enable Quiet Hours</span>
              <label class="toggle-switch">
                <input type="checkbox">
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <div class="time-range">
              <div class="time-input">
                <label>From</label>
                <input type="time" value="22:00">
              </div>
              <div class="time-input">
                <label>To</label>
                <input type="time" value="06:00">
              </div>
            </div>
            
            <div class="override-option">
              <label class="checkbox-container">
                <input type="checkbox" checked>
                <span class="checkmark"></span>
                <span>Allow Critical Alerts During Quiet Hours</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="alert-history">
      <h2>Alert History</h2>
      
      <div class="history-chart-container">
        <canvas ref="historyChart"></canvas>
      </div>
      
      <div class="history-table">
        <table>
          <thead>
            <tr>
              <th>Alert</th>
              <th>Type</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Water Pump Maintenance Required</td>
              <td><span class="alert-type info">Info</span></td>
              <td>Today, 08:45</td>
              <td><span class="alert-status resolved">Resolved</span></td>
              <td>
                <button class="table-action-btn">
                  <i class="fas fa-eye"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td>Soil pH Level High in Zone 2</td>
              <td><span class="alert-type warning">Warning</span></td>
              <td>Yesterday, 14:22</td>
              <td><span class="alert-status resolved">Resolved</span></td>
              <td>
                <button class="table-action-btn">
                  <i class="fas fa-eye"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td>Power Outage Detected</td>
              <td><span class="alert-type critical">Critical</span></td>
              <td>2 days ago, 23:17</td>
              <td><span class="alert-status resolved">Resolved</span></td>
              <td>
                <button class="table-action-btn">
                  <i class="fas fa-eye"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td>Weather Alert: Heavy Rain Expected</td>
              <td><span class="alert-type warning">Warning</span></td>
              <td>3 days ago, 16:05</td>
              <td><span class="alert-status resolved">Resolved</span></td>
              <td>
                <button class="table-action-btn">
                  <i class="fas fa-eye"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  name: 'SmartAlerts',
  data() {
    return {
      historyChart: null
    }
  },
  mounted() {
    this.initHistoryChart()
  },
  beforeUnmount() {
    if (this.historyChart) {
      this.historyChart.destroy()
    }
  },
  methods: {
    initHistoryChart() {
      const ctx = this.$refs.historyChart.getContext('2d')
      
      this.historyChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              label: 'Critical',
              data: [2, 1, 3, 0, 2, 1, 2],
              backgroundColor: '#e74c3c'
            },
            {
              label: 'Warning',
              data: [5, 4, 3, 6, 2, 3, 5],
              backgroundColor: '#f39c12'
            },
            {
              label: 'Information',
              data: [8, 10, 6, 9, 12, 7, 12],
              backgroundColor: '#3498db'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              stacked: true
            },
            y: {
              stacked: true,
              beginAtZero: true
            }
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.smart-alerts {
  padding: 20px;
}

h1, h2, h3 {
  margin-top: 0;
}

.alerts-overview {
  margin-bottom: 30px;
}

.overview-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.time-selector {
  display: flex;
  gap: 10px;
}

.time-btn {
  padding: 6px 12px;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.time-btn.active {
  background-color: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.alert-summary {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.summary-item {
  display: flex;
  align-items: center;
}

.summary-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 1.5rem;
}

.summary-icon.critical {
  background-color: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

.summary-icon.warning {
  background-color: rgba(243, 156, 18, 0.1);
  color: #f39c12;
}

.summary-icon.info {
  background-color: rgba(52, 152, 219, 0.1);
  color: #3498db;
}

.summary-icon.success {
  background-color: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
}

.summary-content {
  display: flex;
  flex-direction: column;
}

.summary-value {
  font-size: 1.8rem;
  font-weight: bold;
  line-height: 1;
}

.summary-label {
  font-size: 0.9rem;
  color: #666;
}

.active-alerts {
  margin-bottom: 30px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.filter-controls {
  display: flex;
  gap: 10px;
}

.search-box {
  position: relative;
}

.search-box i {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.search-box input {
  padding: 8px 10px 8px 35px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 250px;
}

.filter-btn {
  padding: 8px 15px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.filter-btn i {
  color: #666;
}

.alerts-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.alert-item {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  border-left: 4px solid transparent;
}

.alert-item.critical {
  border-left-color: #e74c3c;
}

.alert-item.warning {
  border-left-color: #f39c12;
}

.alert-item.info {
  border-left-color: #3498db;
}

.alert-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 1.2rem;
}

.alert-item.critical .alert-icon {
  background-color: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

.alert-item.warning .alert-icon {
  background-color: rgba(243, 156, 18, 0.1);
  color: #f39c12;
}

.alert-item.info .alert-icon {
  background-color: rgba(52, 152, 219, 0.1);
  color: #3498db;
}

.alert-content {
  flex: 1;
}

.alert-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.alert-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

.alert-time {
  font-size: 0.8rem;
  color: #666;
}

.alert-description {
  margin: 0 0 15px 0;
  color: #333;
}

.alert-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  padding: 6px 12px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
  cursor: pointer;
}

.action-btn i {
  font-size: 0.8rem;
}

.notification-settings {
  margin-bottom: 30px;
}

.settings-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.settings-section {
  margin-bottom: 25px;
}

.settings-section h3 {
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.channel-options {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.channel-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.option-label {
  display: flex;
  align-items: center;
  gap: 10px;
}

.option-label i {
  width: 30px;
  height: 30px;
  background-color: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: #4CAF50;
}

input:checked + .toggle-slider:before {
  transform: translateX(26px);
}

.priority-settings {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.priority-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.priority-channels {
  display: flex;
  gap: 10px;
}

.channel-tag {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  color: #999;
}

.channel-tag.active {
  background-color: #4CAF50;
  color: white;
}

.quiet-hours-settings {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.quiet-hours-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.time-range {
  display: flex;
  gap: 20px;
}

.time-input {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.time-input label {
  font-size: 0.9rem;
  color: #666;
}

.time-input input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.checkbox-container {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 30px;
  cursor: pointer;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.checkbox-container:hover input ~ .checkmark {
  background-color: #eee;
}

.checkbox-container input:checked ~ .checkmark {
  background-color: #4CAF50;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-container .checkmark:after {
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.alert-history {
  margin-bottom: 30px;
}

.history-chart-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: 300px;
  margin-bottom: 20px;
}

.history-table {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.alert-type, .alert-status {
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  display: inline-block;
}

.alert-type.critical {
  background-color: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

.alert-type.warning {
  background-color: rgba(243, 156, 18, 0.1);
  color: #f39c12;
}

.alert-type.info {
  background-color: rgba(52, 152, 219, 0.1);
  color: #3498db;
}

.alert-status.active {
  background-color: rgba(52, 152, 219, 0.1);
  color: #3498db;
}

.alert-status.resolved {
  background-color: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
}

.table-action-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #f5f5f5;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.table-action-btn:hover {
  background-color: #eee;
}
</style> 