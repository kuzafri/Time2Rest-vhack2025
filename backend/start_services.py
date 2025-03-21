import subprocess
import threading
import time
import os
import sys

def run_command(command, name):
    """Run a command in a subprocess and handle output"""
    print(f"Starting {name}...")
    process = subprocess.Popen(
        command,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        universal_newlines=True,
        shell=True
    )
    
    # Read and print output
    for line in process.stdout:
        print(f"[{name}] {line.strip()}")
    
    # Wait for process to complete
    process.wait()
    print(f"{name} process exited with code {process.returncode}")

def start_main_backend():
    """Start the main Flask backend"""
    run_command("python Script_Flask1502.py", "Main Backend")

def start_weather_api():
    """Start the weather forecast API"""
    run_command("python weather_forecast_api.py", "Weather API")

if __name__ == "__main__":
    # Create threads for each service
    main_backend_thread = threading.Thread(target=start_main_backend)
    weather_api_thread = threading.Thread(target=start_weather_api)
    
    # Start threads
    main_backend_thread.start()
    time.sleep(2)  # Give a short delay between starting services
    weather_api_thread.start()
    
    try:
        # Keep the main thread alive
        while main_backend_thread.is_alive() or weather_api_thread.is_alive():
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nShutting down services...")
        sys.exit(0) 