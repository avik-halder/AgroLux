# app/main.py

from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from .database import engine, Base, SessionLocal
from . import models, schemas, crud

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Smart Irrigation API")

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change later for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# POST sensor data
@app.post("/data", response_model=schemas.SensorDataResponse)
def receive_data(data: schemas.SensorDataCreate, db: Session = Depends(get_db)):
    return crud.create_sensor_data(db, data)

# GET all data
@app.get("/data", response_model=list[schemas.SensorDataResponse])
def read_all_data(db: Session = Depends(get_db)):
    return crud.get_all_data(db)

from fastapi import HTTPException

@app.get("/latest", response_model=schemas.SensorDataResponse)
def read_latest_data(db: Session = Depends(get_db)):
    latest = crud.get_latest_data(db)
    
    if latest is None:
        raise HTTPException(status_code=404, detail="No data available")
    
    return latest

# Manual pump control endpoint
@app.post("/pump/{state}")
def control_pump(state: bool):
    return {"message": f"Pump turned {'ON' if state else 'OFF'}"}