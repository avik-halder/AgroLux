import pandas as pd
import numpy as np

# ===============================
# 1. Load Dataset
# ===============================
df = pd.read_csv(r"C:\Users\V\OneDrive\Desktop\irrigaation\code\smart_irrigation_advanced_full_cycle.csv")

# Columns assumed:
# 'Rain_Value', 'Humidity(%)', 'Temperature(C)'

# ===============================
# 2. Define Thresholds & Constants
# ===============================
R_th = 300        # Rain detection threshold (ADC)
alpha = 1.0       # Weight for humidity
beta = 1.0        # Weight for temperature
gamma = 0.2       # Validation threshold (tune if needed)

# ===============================
# 3. Create Binary Rain Indicator from Sensor
# ===============================
df["R_b"] = np.where(df["Rain_Value"] <= R_th, 1, 0)

# ===============================
# 4. Normalize Humidity & Temperature
# ===============================
H_min = df["Humidity(%)"].min()
H_max = df["Humidity(%)"].max()

T_min = df["Temperature(C)"].min()
T_max = df["Temperature(C)"].max()

df["H_n"] = (df["Humidity(%)"] - H_min) / (H_max - H_min)
df["T_n"] = (df["Temperature(C)"] - T_min) / (T_max - T_min)

# ===============================
# 5. Compute Environmental Validation Index
# ===============================
df["V"] = alpha * df["H_n"] - beta * df["T_n"]

# ===============================
# 6. Environmental Rain Decision
# ===============================
df["R_env"] = np.where(df["V"] > gamma, 1, 0)

# ===============================
# 7. Compute Validation Accuracy
# ===============================
N_total = len(df)
N_correct = (df["R_b"] == df["R_env"]).sum()

eta_v = (N_correct / N_total) * 100

print("Validation Accuracy: {:.2f}%".format(eta_v))