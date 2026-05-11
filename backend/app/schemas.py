# app/schemas.py

from pydantic import BaseModel
from datetime import datetime

class SensorDataCreate(BaseModel):
    soil_moisture: float
    temperature: float
    humidity: float
    rain_detected: bool
    pump_state: bool
    servo_position: float

class SensorDataResponse(SensorDataCreate):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True