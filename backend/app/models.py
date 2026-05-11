# app/models.py

from sqlalchemy import Column, Integer, Float, Boolean, DateTime
from datetime import datetime
from .database import Base

class SensorData(Base):
    __tablename__ = "sensor_data"

    id = Column(Integer, primary_key=True, index=True)
    soil_moisture = Column(Float)
    temperature = Column(Float)
    humidity = Column(Float)
    rain_detected = Column(Boolean)
    pump_state = Column(Boolean)
    timestamp = Column(DateTime, default=datetime.utcnow)
    servo_position = Column(Float)