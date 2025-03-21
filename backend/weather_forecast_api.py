from flask import Flask, jsonify, request, Response
import os
from ultralytics import YOLO
import cv2
import numpy as np
from PIL import Image
import io
import base64
from flask_cors import CORS
import datetime
import json
import threading
import time

# Path to the YOLOv8 model
MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 
                         "CV", "smartagro_runs", "yolov8_training_cpu2", "weights", "best.pt")

# Weather conditions mapping
WEATHER_CLASSES = {
    0: "clear",  # Clear/Shine
    1: "cloud",  # Cloud/Cloudy
    2: "rain"    # Rain
}

# Initialize Flask application
app = Flask(__name__)
CORS(app)

# MQTT configuration for pump control
MQTT_BROKER = "34.42.195.199"  # Update with your MQTT broker address
MQTT_PORT = 1883
MQTT_CONTROL_TOPIC = "SmartAgro/control"

# Initialize MQTT client for publishing control commands
mqtt_client = None
try:
    import paho.mqtt.client as mqtt
    mqtt_client = mqtt.Client(client_id="weather_pump_controller", clean_session=True)
    mqtt_client.connect(MQTT_BROKER, MQTT_PORT, 60)
    mqtt_client.loop_start()
    print("MQTT client initialized for pump control")
except Exception as e:
    print(f"Error initializing MQTT client: {str(e)}")

# Pump control settings
MOISTURE_THRESHOLDS = {
    "morning": 2100,    # 6AM-10AM
    "daytime": 2300,    # 10AM-6PM
    "evening": 2200,    # 6PM-10PM
    "nighttime": 2400   # 10PM-6AM
}
# Safety parameters
MAX_PUMP_RUNTIME = 300  # 5 minutes in seconds
MIN_PUMP_INTERVAL = 3600  # 1 hour in seconds
last_pump_activation = 0

# Cache for weather predictions
last_prediction = {
    "weather": "unknown",
    "confidence": 0.0,
    "timestamp": None,
    "image": None
}
prediction_lock = threading.Lock()

# Cache for pump status
pump_status = {
    "active": False,
    "last_activated": 0,
    "last_deactivated": 0,
    "reason": ""
}
pump_status_lock = threading.Lock()

def load_model():
    """Load the YOLOv8 model"""
    try:
        print(f"Loading YOLOv8 model from {MODEL_PATH}")
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")
        
        model = YOLO(MODEL_PATH)
        print("Model loaded successfully!")
        return model
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        return None

# Load model on startup
model = load_model()

def predict_weather(image_data, model):
    """
    Make a prediction on the input image using the YOLOv8 model
    
    Args:
        image_data: Input image data (numpy array)
        model: YOLOv8 model
        
    Returns:
        dict: Prediction result with weather class, confidence, and annotated image
    """
    try:
        if model is None:
            return {"error": "Model not loaded"}
        
        # Run inference
        results = model(image_data, verbose=False)
        
        # Get prediction results
        if len(results) == 0 or len(results[0].boxes) == 0:
            return {
                "weather": "unknown",
                "confidence": 0.0,
                "image": None
            }
        
        # Get the highest confidence prediction
        boxes = results[0].boxes
        confidences = boxes.conf.cpu().numpy()
        class_ids = boxes.cls.cpu().numpy().astype(int)
        
        # Get the highest confidence prediction
        best_idx = np.argmax(confidences)
        best_class_id = class_ids[best_idx]
        best_confidence = confidences[best_idx]
        
        # Get weather class name
        weather_class = WEATHER_CLASSES.get(best_class_id, "unknown")
        
        # Get annotated image
        annotated_img = results[0].plot()
        _, buffer = cv2.imencode('.jpg', annotated_img)
        img_str = base64.b64encode(buffer).decode()
        
        return {
            "weather": weather_class,
            "confidence": float(best_confidence),
            "image": img_str
        }
    except Exception as e:
        print(f"Prediction error: {str(e)}")
        return {"error": str(e)}

@app.route('/api/weather/predict', methods=['POST'])
def weather_prediction():
    """API endpoint for weather prediction from uploaded image"""
    try:
        if model is None:
            return jsonify({"error": "Model not loaded"}), 500
        
        if 'image' not in request.files:
            return jsonify({"error": "No image provided"}), 400
        
        # Get image file
        image_file = request.files['image']
        
        # Read and process image
        img_bytes = image_file.read()
        img = Image.open(io.BytesIO(img_bytes))
        img_array = np.array(img)
        
        # Make prediction
        prediction = predict_weather(img_array, model)
        
        # Update last prediction
        with prediction_lock:
            last_prediction["weather"] = prediction.get("weather", "unknown")
            last_prediction["confidence"] = prediction.get("confidence", 0.0)
            last_prediction["timestamp"] = datetime.datetime.now().isoformat()
            last_prediction["image"] = prediction.get("image")
        
        return jsonify(prediction)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/weather/current', methods=['GET'])
def get_current_weather():
    """API endpoint to get the latest weather prediction"""
    with prediction_lock:
        return jsonify(last_prediction)

@app.route('/api/weather/simulate', methods=['GET'])
def simulate_weather():
    """Simulate weather prediction using a test image (for development)"""
    try:
        if model is None:
            return jsonify({"error": "Model not loaded"}), 500
        
        # For demo purposes: create a simulated prediction
        # In real deployment, you would have a camera feed or other image source
        weather_type = ["clear", "cloud", "rain"]
        confidence = np.random.uniform(0.7, 0.98)
        
        current_time = datetime.datetime.now()
        hour = current_time.hour
        
        # Simple time-based simulation
        if 6 <= hour < 8:  # Morning
            weather = "clear"
        elif 8 <= hour < 12:  # Morning to noon
            weather = "clear"
        elif 12 <= hour < 17:  # Afternoon
            if np.random.random() > 0.7:  # 30% chance of rain in afternoon
                weather = "rain"
            else:
                weather = "clear"
        elif 17 <= hour < 19:  # Evening
            weather = "cloud"
        else:  # Night
            if np.random.random() > 0.8:  # 20% chance of rain at night
                weather = "rain"
            else:
                weather = "cloud"
        
        result = {
            "weather": weather,
            "confidence": float(confidence),
            "timestamp": current_time.isoformat(),
            "simulated": True
        }
        
        # Update last prediction
        with prediction_lock:
            last_prediction["weather"] = result["weather"]
            last_prediction["confidence"] = result["confidence"]
            last_prediction["timestamp"] = result["timestamp"]
            last_prediction["simulated"] = True
        
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/weather/forecast', methods=['GET'])
def get_weather_forecast():
    """Generate a 24-hour weather forecast based on current conditions"""
    try:
        current_weather = None
        with prediction_lock:
            current_weather = last_prediction["weather"]
        
        # If no prediction available, simulate one
        if current_weather == "unknown" or current_weather is None:
            response = simulate_weather()
            current_weather = json.loads(response.data)["weather"]
        
        # Get current time
        current_time = datetime.datetime.now()
        forecast = []
        
        # Generate hourly forecast for next 24 hours
        for i in range(24):
            forecast_time = current_time + datetime.timedelta(hours=i)
            hour = forecast_time.hour
            
            # Simple weather transition logic based on current conditions and time
            if i == 0:
                weather = current_weather
            else:
                prev_weather = forecast[i-1]["weather"]
                
                # Morning transition (5am-8am)
                if 5 <= hour < 8:
                    if prev_weather in ["cloud", "rain"]:
                        weather = np.random.choice(["cloud", "clear"], p=[0.3, 0.7])
                    else:
                        weather = "clear"
                
                # Day conditions (8am-5pm)
                elif 8 <= hour < 17:
                    if prev_weather == "rain":
                        weather = np.random.choice(["rain", "cloud", "clear"], p=[0.3, 0.5, 0.2])
                    elif prev_weather == "cloud":
                        weather = np.random.choice(["cloud", "rain", "clear"], p=[0.5, 0.3, 0.2])
                    else:
                        weather = np.random.choice(["clear", "cloud"], p=[0.7, 0.3])
                
                # Evening transition (5pm-8pm)
                elif 17 <= hour < 20:
                    if prev_weather == "clear":
                        weather = np.random.choice(["clear", "cloud"], p=[0.3, 0.7])
                    elif prev_weather == "rain":
                        weather = "cloud"
                    else:
                        weather = prev_weather
                
                # Night conditions (8pm-5am)
                else:
                    if prev_weather == "clear":
                        weather = "cloud"
                    elif prev_weather == "rain":
                        weather = np.random.choice(["rain", "cloud"], p=[0.4, 0.6])
                    else:
                        weather = np.random.choice(["cloud", "rain"], p=[0.7, 0.3])
            
            forecast.append({
                "time": forecast_time.strftime("%H:%M"),
                "hour": hour,
                "weather": weather,
                "temperature": round(np.random.uniform(20, 35), 1),  # Random temperature between 20-35°C
                "humidity": round(np.random.uniform(50, 95), 1),     # Random humidity between 50-95%
                "precipitation": round(np.random.uniform(0, 100), 1) if weather == "rain" else 0
            })
        
        return jsonify({
            "current": {
                "weather": current_weather,
                "timestamp": datetime.datetime.now().isoformat()
            },
            "hourly": forecast
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Health check endpoint
@app.route('/api/weather/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok", "model_loaded": model is not None})

def publish_pump_control(should_pump_on, reason=""):
    """Publish pump control command to MQTT"""
    try:
        if mqtt_client is None:
            print("MQTT client not initialized")
            return False
            
        # Only send command if status is changing
        with pump_status_lock:
            if pump_status["active"] == should_pump_on:
                print(f"Pump already in desired state: {should_pump_on}")
                return True
        
        # Create control message
        control_message = {
            "command": "pump",
            "state": should_pump_on,
            "reason": reason,
            "timestamp": int(time.time())
        }
        
        # Publish to MQTT
        result = mqtt_client.publish(MQTT_CONTROL_TOPIC, json.dumps(control_message))
        
        if result.rc == 0:
            current_time = int(time.time())
            with pump_status_lock:
                pump_status["active"] = should_pump_on
                pump_status["reason"] = reason
                if should_pump_on:
                    pump_status["last_activated"] = current_time
                else:
                    pump_status["last_deactivated"] = current_time
            
            print(f"Published pump control command: {control_message}")
            return True
        else:
            print(f"Failed to publish pump control command: {result}")
            return False
    except Exception as e:
        print(f"Error publishing pump control: {str(e)}")
        return False

def get_time_based_threshold():
    """Get moisture threshold based on current time of day"""
    current_hour = datetime.datetime.now().hour
    
    if 6 <= current_hour < 10:
        return MOISTURE_THRESHOLDS["morning"]
    elif 10 <= current_hour < 18:
        return MOISTURE_THRESHOLDS["daytime"]
    elif 18 <= current_hour < 22:
        return MOISTURE_THRESHOLDS["evening"]
    else:
        return MOISTURE_THRESHOLDS["nighttime"]

def is_safe_to_activate_pump():
    """Check safety conditions for pump activation"""
    current_time = int(time.time())
    
    with pump_status_lock:
        # Check if pump has been running too long
        if (pump_status["active"] and 
            (current_time - pump_status["last_activated"] > MAX_PUMP_RUNTIME)):
            return False, "Pump has been running too long"
        
        # Check if minimum interval has passed since last pump operation
        if (not pump_status["active"] and
            (current_time - pump_status["last_deactivated"] < MIN_PUMP_INTERVAL)):
            return False, "Minimum interval between pump activations not met"
    
    return True, "Safe to activate pump"

def should_activate_pump(soil_moisture, weather_condition, confidence):
    """Determine if pump should be activated based on soil moisture and weather"""
    # Get appropriate moisture threshold for time of day
    moisture_threshold = get_time_based_threshold()
    
    # Check if soil is already moist enough
    if soil_moisture >= moisture_threshold:
        return False, "Soil moisture level sufficient"
    
    # Check if it's raining (don't water if it's raining)
    if weather_condition == "rain" and confidence > 0.6:
        return False, "Currently raining"
    
    # Check safety conditions
    is_safe, reason = is_safe_to_activate_pump()
    if not is_safe:
        return False, reason
    
    # All conditions satisfied, activate pump
    return True, "Low soil moisture requires watering"

@app.route('/api/weather/pump_control', methods=['POST'])
def pump_control():
    """API endpoint for controlling water pump based on soil moisture and weather"""
    try:
        # Get soil moisture data from request
        data = request.json
        if not data or 'soil_moisture' not in data:
            return jsonify({"error": "Soil moisture data required"}), 400
            
        soil_moisture = int(data['soil_moisture'])
        
        # Check if this is a manual override
        manual_override = data.get('manual_override', False)
        force_state = data.get('force_state', None)
        
        # If manual override with specific state, use that instead of decision logic
        if manual_override and force_state is not None:
            activate_pump = force_state
            reason = "Manual control override"
        else:
            # Get current weather prediction
            weather_condition = "unknown"
            confidence = 0.0
            with prediction_lock:
                weather_condition = last_prediction["weather"]
                confidence = last_prediction["confidence"]
            
            # If no current weather prediction, try to get a simulated one
            if weather_condition == "unknown":
                try:
                    response = simulate_weather()
                    sim_data = json.loads(response.data)
                    weather_condition = sim_data["weather"]
                    confidence = sim_data["confidence"]
                except Exception as e:
                    print(f"Error getting simulated weather: {str(e)}")
            
            # Decide if pump should be activated
            activate_pump, reason = should_activate_pump(soil_moisture, weather_condition, confidence)
        
        # Send command to MQTT
        success = publish_pump_control(activate_pump, reason)
        
        response_data = {
            "success": success,
            "pump_activated": activate_pump,
            "reason": reason,
            "weather_condition": weather_condition if 'weather_condition' in locals() else "unknown",
            "weather_confidence": confidence if 'confidence' in locals() else 0.0,
            "soil_moisture": soil_moisture,
            "moisture_threshold": get_time_based_threshold(),
            "timestamp": datetime.datetime.now().isoformat()
        }
        
        return jsonify(response_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/weather/pump_status', methods=['GET'])
def get_pump_status():
    """API endpoint to get current pump status"""
    with pump_status_lock:
        status_copy = pump_status.copy()
    
    # Add current weather information
    with prediction_lock:
        status_copy["weather_condition"] = last_prediction["weather"]
        status_copy["weather_confidence"] = last_prediction["confidence"]
    
    return jsonify(status_copy)

@app.route('/api/weather/esp32_data', methods=['POST'])
def handle_esp32_data():
    """API endpoint for ESP32 to send both camera image and soil data in one request"""
    try:
        if model is None:
            return jsonify({"error": "Weather model not loaded"}), 500
            
        # Check if there's an image in the request
        image_file = None
        if 'image' in request.files:
            image_file = request.files['image']
        
        # Get soil data
        soil_data = {}
        if 'soil_data' in request.form:
            soil_data = json.loads(request.form['soil_data'])
        
        response_data = {}
        
        # Process image if provided
        if image_file:
            # Read and process image
            img_bytes = image_file.read()
            img = Image.open(io.BytesIO(img_bytes))
            img_array = np.array(img)
            
            # Make prediction
            prediction = predict_weather(img_array, model)
            
            # Update last prediction
            with prediction_lock:
                last_prediction["weather"] = prediction.get("weather", "unknown")
                last_prediction["confidence"] = prediction.get("confidence", 0.0)
                last_prediction["timestamp"] = datetime.datetime.now().isoformat()
                last_prediction["image"] = prediction.get("image")
            
            response_data["weather_prediction"] = {
                "weather": prediction.get("weather", "unknown"),
                "confidence": prediction.get("confidence", 0.0)
            }
        
        # Process soil data if provided
        if soil_data and 'soil_moisture' in soil_data:
            soil_moisture = int(soil_data['soil_moisture'])
            
            # Get current weather
            weather_condition = "unknown"
            confidence = 0.0
            with prediction_lock:
                weather_condition = last_prediction["weather"]
                confidence = last_prediction["confidence"]
            
            # If no weather prediction, use simulated data
            if weather_condition == "unknown":
                try:
                    sim_response = simulate_weather()
                    sim_data = json.loads(sim_response.data)
                    weather_condition = sim_data["weather"]
                    confidence = sim_data["confidence"]
                except Exception as e:
                    print(f"Error getting simulated weather: {str(e)}")
            
            # Decide if pump should be activated
            activate_pump, reason = should_activate_pump(soil_moisture, weather_condition, confidence)
            
            # Send command to MQTT
            success = publish_pump_control(activate_pump, reason)
            
            response_data["pump_control"] = {
                "success": success,
                "pump_activated": activate_pump,
                "reason": reason
            }
        
        return jsonify(response_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def cleanup():
    """Clean up resources before shutdown"""
    if mqtt_client:
        try:
            mqtt_client.loop_stop()
            mqtt_client.disconnect()
            print("MQTT client disconnected")
        except Exception as e:
            print(f"Error disconnecting MQTT client: {str(e)}")

if __name__ == '__main__':
    try:
        app.run(host='0.0.0.0', port=5001, debug=True)
    finally:
        cleanup() 