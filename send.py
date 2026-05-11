import numpy as np
import requests
import time

# ================= CONFIG =================

BACKEND_URL = "http://127.0.0.1:8000/data"
np.random.seed(42)

MOISTURE_ON = 650
MOISTURE_OFF = 550
RAIN_THRESHOLD = 300

moisture = 850
pump = 0
servo = 90

t = 0

print("Starting Smart Irrigation IoT Simulator...\n")

while True:

    # ---------------- PHASE DESIGN ----------------

    if 0 <= t < 60:
        rain = np.random.randint(750, 900)
        moisture += np.random.randint(5, 15)

    elif 60 <= t < 120:
        rain = np.random.randint(150, 280)
        moisture -= np.random.randint(15, 35)

    elif 120 <= t < 200:
        rain = np.random.randint(750, 900)
        moisture += np.random.randint(5, 15)

    elif 200 <= t < 260:
        rain = np.random.randint(150, 280)
        moisture -= np.random.randint(15, 30)

    elif 260 <= t < 360:
        rain = np.random.randint(750, 900)
        moisture += np.random.randint(15, 25)

    else:
        t = 0
        continue

    # ---------------- MOISTURE LIMITS ----------------

    if moisture < 280:
        moisture = 280 + np.random.randint(-20, 20)

    if moisture > 950:
        moisture = 950

    # ---------------- CONTROL LOGIC ----------------

    if rain <= RAIN_THRESHOLD:
        pump = 0
    else:
        if moisture > MOISTURE_ON:
            pump = 1
        elif moisture < MOISTURE_OFF:
            pump = 0
        # else keep previous pump state

    # ---------------- LDR SIMULATION ----------------

    angle = (t % 180) / 180 * np.pi
    ldr_left = int(512 + 400 * np.sin(angle))
    ldr_right = int(512 + 400 * np.cos(angle))

    ldr_left = max(0, min(1023, ldr_left))
    ldr_right = max(0, min(1023, ldr_right))

    if ldr_left > ldr_right + 50:
        servo = max(0, servo - 5)
    elif ldr_right > ldr_left + 50:
        servo = min(180, servo + 5)

    # ---------------- DHT SIMULATION ----------------

    if rain <= RAIN_THRESHOLD:
        humidity = np.random.randint(80, 95)
        temperature = np.random.randint(22, 27)
    else:
        humidity = np.random.randint(35, 60)
        temperature = np.random.randint(28, 35)

    # ---------------- PREPARE PAYLOAD ----------------

    payload = {
        "soil_moisture": int(moisture),
        "temperature": int(temperature),
        "humidity": int(humidity),
        "rain_detected": bool(rain <= RAIN_THRESHOLD),
        "pump_state": bool(pump),
        "servo_position": int(servo)
    }

    # ---------------- SEND TO BACKEND ----------------

    try:
        response = requests.post(BACKEND_URL, json=payload)
        print(f"[{t}s] Sent:", payload, "| Status:", response.status_code)
    except Exception as e:
        print("Connection error:", e)

    # ---------------- LOOP CONTROL ----------------

    t += 2
    time.sleep(2)