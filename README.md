# AgroLux - Solar-Powered Smart Irrigation System

AgroLux is a low-cost solar-powered smart irrigation framework designed for sustainable agriculture. It combines soil moisture sensing, rainfall detection, solar tracking, automatic pump control, and a web-based monitoring dashboard.

---

## Features

- Real-time irrigation monitoring
- Soil moisture-based pump control
- Hysteresis-based irrigation logic
- Rainfall detection and pump override
- Solar tracking using LDR sensors and servo motor
- Temperature and humidity monitoring
- FastAPI backend
- React frontend dashboard
- SQLite database storage
- Remote system visualization

---

## Tech Stack

### Backend

- Python
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic
- Uvicorn

### Frontend

- React
- JavaScript
- Tailwind CSS
- Axios
- Chart Visualization

### Hardware

- Arduino Uno
- Soil Moisture Sensor
- Rain Sensor
- DHT11 / DHT22 Sensor
- Relay Module
- DC Water Pump
- Solar Panel
- Battery
- LDR Sensors
- Servo Motor
- LCD Display

---

## Project Overview

The system automatically controls irrigation based on soil moisture level and rainfall condition. A hysteresis control mechanism is used to prevent frequent pump switching. The rain sensor stops irrigation during rainfall to save water, while the solar tracking system improves energy harvesting by adjusting the solar panel direction.

---

## Control Logic

- Pump turns ON when soil is dry
- Pump turns OFF when soil becomes wet
- Pump remains OFF during rainfall
- Hysteresis band prevents rapid ON/OFF switching
- Solar tracker adjusts panel direction based on LDR readings

---

## Project Structure

```bash
AgroLux/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── crud.py
│   │   └── __init__.py
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## Backend Setup

```bash
cd backend
python -m venv env
env\Scripts\activate
pip install -r requirements.txt
```

---

## Run Backend

```bash
python -m uvicorn app.main:app --reload
```

Backend will run at:

```bash
http://127.0.0.1:8000
```

API documentation:

```bash
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend will run at:

```bash
http://localhost:3000
```

---

## API Endpoints

### Sensor Data

```bash
POST /sensor-data
GET /sensor-data
GET /sensor-data/latest
```

### Irrigation Control

```bash
GET /pump-status
POST /pump-control
```

### Dashboard Data

```bash
GET /dashboard
```

---

## Experimental Results

- Stable pump operation using hysteresis control
- Successful rainfall-based irrigation suppression
- Solar tracking support for sustainable power generation
- Water utilization efficiency: **35%**
- Rain suppression accuracy: **100%**

---

## Research Purpose

This project aims to provide a sustainable, affordable, and remotely monitorable smart irrigation system for precision agriculture, especially in resource-limited farming environments.

---

## License

This project is licensed under the MIT License.