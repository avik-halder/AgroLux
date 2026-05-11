import pandas as pd
import numpy as np

np.random.seed(42)

time = np.arange(0, 361, 2)   # 0–360 seconds (longer, stronger experiment)

data = []

moisture = 850   # Start dry
pump = 0
servo = 90

MOISTURE_ON = 650
MOISTURE_OFF = 550
RAIN_THRESHOLD = 300

for t in time:

    # ---------------- PHASE DESIGN ----------------
    
    # Phase 1: Initial Dry (0–60)
    if 0 <= t < 60:
        rain = np.random.randint(750, 900)
        moisture += np.random.randint(5, 15)

    # Phase 2: Rain Event 1 (60–120)
    elif 60 <= t < 120:
        rain = np.random.randint(150, 280)
        moisture -= np.random.randint(15, 35)

    # Phase 3: Drying (120–200)
    elif 120 <= t < 200:
        rain = np.random.randint(750, 900)
        moisture += np.random.randint(5, 15)

    # Phase 4: Rain Event 2 (200–260)
    elif 200 <= t < 260:
        rain = np.random.randint(150, 280)
        moisture -= np.random.randint(15, 30)

    # Phase 5: Final Strong Dry Phase (260–360)
    else:
        rain = np.random.randint(750, 900)
        moisture += np.random.randint(15, 25)

    # ---------------- NATURAL MOISTURE BOUNDS ----------------
    
    if moisture < 280:
        moisture = 280 + np.random.randint(-20, 20)

    if moisture > 950:
        moisture = 950

    # ---------------- ADVANCED CONTROL LOGIC ----------------
    
    if rain <= RAIN_THRESHOLD:
        pump = 0   # Rain override
    else:
        if moisture > MOISTURE_ON:
            pump = 1
        elif moisture < MOISTURE_OFF:
            pump = 0
        # else keep previous state (hysteresis)

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

    # ---------------- STORE DATA ----------------
    
    data.append([
        t,
        int(moisture),
        rain,
        pump,
        ldr_left,
        ldr_right,
        servo,
        humidity,
        temperature
    ])

columns = [
    "Time(s)",
    "Moisture(ADC)",
    "Rain_Value",
    "Pump",
    "LDR_Left",
    "LDR_Right",
    "Servo_Pos",
    "Humidity(%)",
    "Temperature(C)"
]

df = pd.DataFrame(data, columns=columns)

df.to_csv("smart_irrigation_advanced_full_cycle.csv", index=False)

print("Advanced full-cycle dataset saved successfully.")