// import { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";
// import {
//   FaTint,
//   FaTemperatureHigh,
//   FaCloudRain,
//   FaBolt,
//   FaSolarPanel,
// } from "react-icons/fa";
// import { CircularProgressbar } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";

// /* ================= TYPES ================= */

// interface SensorData {
//   soil_moisture: number;
//   temperature: number;
//   humidity: number;
//   rain_detected: boolean;
//   pump_state: boolean;
//   servo_position: number;
// }

// interface HistoryPoint {
//   time: string;
//   moisture: number;
//   temp: number;
//   humidity: number;
// }

// /* ================= MAIN ================= */

// function App() {
//   const [data, setData] = useState<SensorData | null>(null);
//   const [history, setHistory] = useState<HistoryPoint[]>([]);

//   const fetchData = async () => {
//     try {
//       const res = await axios.get<SensorData>(
//         "http://127.0.0.1:8000/latest"
//       );

//       setData(res.data);

//       setHistory((prev) => [
//         ...prev.slice(-24),
//         {
//           time: new Date().toLocaleTimeString(),
//           moisture: res.data.soil_moisture,
//           temp: res.data.temperature,
//           humidity: res.data.humidity,
//         },
//       ]);
//     } catch {
//       console.log("Waiting for backend...");
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     const interval = setInterval(fetchData, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   if (!data) return <h1 style={{ color: "white" }}>Connecting...</h1>;

//   return (
//     <div style={styles.container}>
//       <header style={styles.header}>
//         <h1>🌿 AgroSync Smart Farm</h1>
//         <span style={styles.live}>● LIVE</span>
//       </header>

//       {/* KPI GRID */}
//       <div style={styles.grid}>
//         <StatCard icon={<FaTint />} label="Soil Moisture" value={data.soil_moisture} />
//         <StatCard icon={<FaTemperatureHigh />} label="Temperature" value={`${data.temperature} °C`} />
//         <StatCard icon={<FaCloudRain />} label="Humidity" value={`${data.humidity} %`} />
//         <StatCard icon={<FaBolt />} label="Pump" value={data.pump_state ? "ACTIVE" : "OFF"} highlight={data.pump_state} />
//       </div>

//       {/* SOLAR SECTION */}
//       <div style={styles.solarSection}>
//         <div style={styles.solarCard}>
//           <FaSolarPanel size={28} />
//           <h3>Solar Panel Angle</h3>
//           <div style={{ width: 120, height: 120 }}>
//             <CircularProgressbar
//               value={data.servo_position}
//               maxValue={180}
//               text={`${data.servo_position}°`}
//             />
//           </div>
//         </div>

//         <div style={styles.chartBox}>
//           <h3>Environmental Trends</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={history}>
//               <CartesianGrid stroke="#333" />
//               <XAxis dataKey="time" stroke="#aaa" />
//               <YAxis stroke="#aaa" />
//               <Tooltip />
//               <Line type="monotone" dataKey="moisture" stroke="#00e5ff" strokeWidth={3} dot={false} />
//               <Line type="monotone" dataKey="temp" stroke="#ff6b6b" strokeWidth={3} dot={false} />
//               <Line type="monotone" dataKey="humidity" stroke="#00ff95" strokeWidth={3} dot={false} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= COMPONENT ================= */

// function StatCard({
//   icon,
//   label,
//   value,
//   highlight,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   value: string | number;
//   highlight?: boolean;
// }) {
//   return (
//     <motion.div
//       whileHover={{ scale: 1.05 }}
//       style={{
//         ...styles.card,
//         border: highlight ? "2px solid #00ff95" : "1px solid #2a2a2a",
//       }}
//     >
//       <div style={{ fontSize: 28 }}>{icon}</div>
//       <h4>{label}</h4>
//       <h2>{value}</h2>
//     </motion.div>
//   );
// }

// /* ================= STYLES ================= */

// const styles: { [key: string]: React.CSSProperties } = {
//   container: {
//     minHeight: "100vh",
//     background: "linear-gradient(135deg, #0f172a, #1e293b)",
//     color: "white",
//     padding: "40px 80px",
//   },
//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginBottom: 40,
//   },
//   live: {
//     color: "#00ff95",
//     fontWeight: "bold",
//   },
//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//     gap: 25,
//     marginBottom: 50,
//   },
//   card: {
//     background: "#111827",
//     padding: 25,
//     borderRadius: 20,
//     textAlign: "center",
//     boxShadow: "0 0 30px rgba(0,0,0,0.4)",
//   },
//   solarSection: {
//     display: "grid",
//     gridTemplateColumns: "300px 1fr",
//     gap: 30,
//   },
//   solarCard: {
//     background: "#111827",
//     padding: 30,
//     borderRadius: 20,
//     textAlign: "center",
//     boxShadow: "0 0 30px rgba(0,0,0,0.4)",
//   },
//   chartBox: {
//     background: "#111827",
//     padding: 30,
//     borderRadius: 20,
//   },
// };

// export default App;



import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  FaTint,
  FaTemperatureHigh,
  FaCloudRain,
  FaBolt,
  FaSolarPanel,
  FaSatelliteDish,
  FaShieldAlt,
} from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

/* ================= TYPES ================= */

interface SensorData {
  soil_moisture: number;
  temperature: number;
  humidity: number;
  rain_detected: boolean;
  pump_state: boolean;
  servo_position: number;
}

interface HistoryPoint {
  time: string;
  moisture: number;
  temp: number;
  humidity: number;
}

type Tone = "cyan" | "green" | "red" | "amber" | "neutral";

/* ================= MAIN ================= */

export default function App() {
  const [data, setData] = useState<SensorData | null>(null);
  const [history, setHistory] = useState<HistoryPoint[]>([]);

  const fetchData = async () => {
    try {
      const res = await axios.get<SensorData>("http://127.0.0.1:8000/latest");
      setData(res.data);

      setHistory((prev) => [
        ...prev.slice(-40),
        {
          time: new Date().toLocaleTimeString(),
          moisture: res.data.soil_moisture,
          temp: res.data.temperature,
          humidity: res.data.humidity,
        },
      ]);
    } catch {
      // silent: UI shows status in header
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const kpis = useMemo(() => {
    if (!data) return [];
    return [
      {
        icon: <FaTint />,
        label: "Soil Moisture",
        value: `${data.soil_moisture.toFixed(1)}`,
        accent: "cyan" as Tone,
        sub: "Capacitive sensor",
      },
      {
        icon: <FaTemperatureHigh />,
        label: "Temperature",
        value: `${data.temperature.toFixed(1)} °C`,
        accent: "red" as Tone,
        sub: "Ambient probe",
      },
      {
        icon: <FaCloudRain />,
        label: "Humidity",
        value: `${data.humidity.toFixed(1)} %`,
        accent: "green" as Tone,
        sub: "Relative humidity",
      },
      {
        icon: <FaBolt />,
        label: "Pump Output",
        value: data.pump_state ? "ACTIVE" : "OFFLINE",
        accent: data.pump_state ? ("green" as Tone) : ("amber" as Tone),
        highlight: data.pump_state,
        sub: data.pump_state ? "Relay energized" : "Relay open",
      },
    ];
  }, [data]);

  if (!data) {
    return (
      <div style={styles.page}>
        <TopBar
          title="AgroLux Control Console"
          subtitle="Smart Irrigation System with Solar Monitoring"
          right={
            <div style={styles.statusRow}>
              <Chip tone="amber" icon={<FaSatelliteDish />} text="Connecting" />
              <Chip tone="neutral" icon={<FaShieldAlt />} text="Secure Link" />
            </div>
          }
        />

        <div style={styles.center}>
          <div style={styles.loaderCard}>
            <div style={styles.loaderTitle}>Establishing telemetry link…</div>
            <div style={styles.loaderSub}>
              Waiting for backend at{" "}
              <span style={styles.mono}>127.0.0.1:8000</span>
            </div>

            <div style={styles.progressRail}>
              <motion.div
                style={styles.progressFill}
                animate={{ x: ["-60%", "120%"] }}
                transition={{
                  duration: 1.3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const rainTone: Tone = data.rain_detected ? "cyan" : "neutral";
  const pumpTone: Tone = data.pump_state ? "green" : "amber";

  return (
    <div style={styles.page}>
      {/* scanline */}
      <motion.div
        style={styles.scanline}
        animate={{ y: ["-20%", "120%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      <TopBar
        title="AgroLux Control Console"
        subtitle="Smart Irrigation System with Solar Monitoring"
        right={
          <div style={styles.statusRow}>
            <Chip tone="green" icon="●" text="LIVE" />
            <Chip
              tone={rainTone}
              icon={<FaCloudRain />}
              text={data.rain_detected ? "Rain: YES" : "Rain: NO"}
            />
            <Chip
              tone={pumpTone}
              icon={<FaBolt />}
              text={data.pump_state ? "Pump: ACTIVE" : "Pump: OFF"}
            />
          </div>
        }
      />

      {/* ✅ 50/50 split */}
      <div style={styles.mainSplit}>
        {/* LEFT HALF */}
        <div style={styles.leftPane}>
          <Panel title="Field KPIs" icon={<FaSatelliteDish />}>
            <div style={styles.kpiGrid}>
              {kpis.map((k) => (
                <KpiCard
                  key={k.label}
                  icon={k.icon}
                  label={k.label}
                  value={k.value}
                  sub={k.sub}
                  accent={k.accent}
                  highlight={k.highlight}
                />
              ))}
            </div>
          </Panel>

          {/* Solar + Actuator States (two boxes) */}
          <Panel title="Solar & Actuators" icon={<FaSolarPanel />}>
            <div style={styles.solarActWrap}>
              {/* Solar */}
              <div style={styles.gaugeBlock}>
                <div style={styles.gaugeTitle}>Solar Tracker</div>

                <div style={{ width: 160, height: 160, margin: "14px auto 10px" }}>
                  <CircularProgressbar
                    value={clamp(data.servo_position, 0, 180)}
                    maxValue={180}
                    text={`${Math.round(data.servo_position)}°`}
                    styles={buildStyles({
                      textColor: "#E6F0FF",
                      pathColor: "rgba(0, 229, 255, 0.95)",
                      trailColor: "rgba(255,255,255,0.07)",
                      textSize: "18px",
                      pathTransitionDuration: 0.6,
                    })}
                  />
                </div>

                <div style={styles.gaugeMeta}>
                  <div style={styles.metaItem}>
                    <span style={styles.metaLabel}>Range</span>
                    <span style={styles.mono}>0–180°</span>
                  </div>
                  <div style={styles.metaItem}>
                    <span style={styles.metaLabel}>Mode</span>
                    <span style={styles.mono}>Auto Track</span>
                  </div>
                </div>

                <div style={styles.smallDivider} />

                <div style={styles.note}>
                  Servo position updates every <span style={styles.mono}>2s</span>.
                </div>
              </div>

              {/* ✅ Actuator States (BACK) */}
              <div style={styles.actuatorBlock}>
                <div style={styles.gaugeTitle}>Actuator States</div>

                <div style={styles.stateList}>
                  <StateRow
                    name="Pump Relay"
                    value={data.pump_state ? "ENERGIZED" : "OPEN"}
                    tone={data.pump_state ? "green" : "amber"}
                  />
                  <StateRow
                    name="Rain Sensor"
                    value={data.rain_detected ? "TRIGGERED" : "CLEAR"}
                    tone={data.rain_detected ? "cyan" : "neutral"}
                  />
                  <StateRow name="Telemetry" value="ONLINE" tone="green" />
                </div>

                <div style={styles.smallDivider} />

                <div style={styles.actuatorHint}>
                  Tip: Use hysteresis to prevent relay chatter.
                </div>
              </div>
            </div>
          </Panel>
        </div>

        {/* RIGHT HALF */}
        <div style={styles.rightPane}>
          <Panel title="Environmental Trends" icon={<FaTint />}>
            <div style={styles.chartHeader}>
              <div style={styles.chartLegend}>
                <LegendDot tone="cyan" label="Moisture" />
                <LegendDot tone="red" label="Temp" />
                <LegendDot tone="green" label="Humidity" />
              </div>
              <div style={styles.chartMeta}>
                Window:{" "}
                <span style={styles.mono}>
                  {Math.min(history.length, 41)} pts
                </span>
              </div>
            </div>

            <div style={styles.chartShell}>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart
                  data={history}
                  margin={{ top: 12, right: 18, left: 2, bottom: 0 }}
                >
                  <CartesianGrid
                    stroke="rgba(255,255,255,0.08)"
                    strokeDasharray="3 6"
                  />
                  <XAxis
                    dataKey="time"
                    stroke="rgba(230,240,255,0.55)"
                    tick={{ fill: "rgba(230,240,255,0.55)", fontSize: 12 }}
                    tickLine={{ stroke: "rgba(255,255,255,0.12)" }}
                    axisLine={{ stroke: "rgba(255,255,255,0.12)" }}
                  />
                  <YAxis
                    stroke="rgba(230,240,255,0.55)"
                    tick={{ fill: "rgba(230,240,255,0.55)", fontSize: 12 }}
                    tickLine={{ stroke: "rgba(255,255,255,0.12)" }}
                    axisLine={{ stroke: "rgba(255,255,255,0.12)" }}
                  />
                  <Tooltip content={<IndustrialTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="moisture"
                    stroke="rgba(0,229,255,0.95)"
                    strokeWidth={2.6}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="temp"
                    stroke="rgba(255,107,107,0.95)"
                    strokeWidth={2.6}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="humidity"
                    stroke="rgba(0,255,149,0.92)"
                    strokeWidth={2.6}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel title="Current Values" icon={<FaShieldAlt />}>
            <div style={styles.currentGrid}>
              <MiniStat
                label="Soil Moisture"
                value={`${data.soil_moisture.toFixed(1)}`}
                tone="cyan"
              />
              <MiniStat
                label="Temperature"
                value={`${data.temperature.toFixed(1)}°C`}
                tone="red"
              />
              <MiniStat
                label="Humidity"
                value={`${data.humidity.toFixed(1)}%`}
                tone="green"
              />
              <MiniStat
                label="Pump"
                value={data.pump_state ? "ACTIVE" : "OFF"}
                tone={data.pump_state ? "green" : "amber"}
              />
              <MiniStat
                label="Rain"
                value={data.rain_detected ? "YES" : "NO"}
                tone={data.rain_detected ? "cyan" : "neutral"}
              />
              <MiniStat
                label="Servo"
                value={`${Math.round(data.servo_position)}°`}
                tone="neutral"
              />
            </div>
          </Panel>
        </div>
      </div>

      <footer style={styles.footer}>
        <span style={styles.mono}>AGROSYNC •</span> Industrial Dashboard UI •
        Built for real-time telemetry
      </footer>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function TopBar({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right: React.ReactNode;
}) {
  return (
    <div style={styles.topbar}>
      <div>
        <div style={styles.topTitleRow}>
          <div style={styles.brandMark} />
          <div>
            <div style={styles.topTitle}>{title}</div>
            {subtitle && <div style={styles.topSub}>{subtitle}</div>}
          </div>
        </div>
      </div>
      <div>{right}</div>
    </div>
  );
}

function Panel({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={styles.panel}
    >
      <div style={styles.panelHeader}>
        <div style={styles.panelTitleRow}>
          <div style={styles.panelIcon}>{icon}</div>
          <div style={styles.panelTitle}>{title}</div>
        </div>
        <div style={styles.panelRight}>
          <div style={styles.panelPip} />
          <div style={styles.panelPip} />
          <div style={styles.panelPip} />
        </div>
      </div>
      <div style={styles.panelBody}>{children}</div>
    </motion.section>
  );
}

function KpiCard({
  icon,
  label,
  value,
  sub,
  accent,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  accent: Tone;
  highlight?: boolean;
}) {
  const glow = toneToGlow(accent);
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      style={{
        ...styles.kpiCard,
        border: highlight
          ? `1px solid ${glow.border}`
          : "1px solid rgba(255,255,255,0.10)",
        boxShadow: highlight
          ? `0 0 0 1px ${glow.border} inset, 0 0 26px ${glow.shadow}`
          : (styles.kpiCard.boxShadow as string),
      }}
    >
      <div style={styles.kpiTop}>
        <div
          style={{
            ...styles.kpiIcon,
            background: glow.badgeBg,
            borderColor: glow.border,
          }}
        >
          <span style={{ color: glow.icon }}>{icon}</span>
        </div>
        <div style={styles.kpiText}>
          <div style={styles.kpiLabel}>{label}</div>
          <div style={styles.kpiValue}>{value}</div>
        </div>
      </div>
      {sub && <div style={styles.kpiSub}>{sub}</div>}
      <div
        style={{
          ...styles.kpiUnderline,
          background: `linear-gradient(90deg, ${glow.border}, transparent)`,
        }}
      />
    </motion.div>
  );
}

function Chip({
  tone,
  icon,
  text,
}: {
  tone: Tone;
  icon: React.ReactNode;
  text: string;
}) {
  const c = toneToChip(tone);
  return (
    <div style={{ ...styles.chip, borderColor: c.border, background: c.bg }}>
      <span style={{ ...styles.chipIcon, color: c.icon }}>{icon}</span>
      <span style={{ color: c.text }}>{text}</span>
    </div>
  );
}

function LegendDot({ tone, label }: { tone: Tone; label: string }) {
  const c = toneToChip(tone);
  return (
    <div style={styles.legendItem}>
      <span style={{ ...styles.legendDot, background: c.border }} />
      <span style={styles.legendLabel}>{label}</span>
    </div>
  );
}

function MiniStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: Tone;
}) {
  const c = toneToChip(tone);
  return (
    <div style={styles.miniStat}>
      <div style={styles.miniLabel}>{label}</div>
      <div style={{ ...styles.miniValue, color: c.text }}>{value}</div>
    </div>
  );
}

function StateRow({ name, value, tone }: { name: string; value: string; tone: Tone }) {
  const c = toneToChip(tone);
  return (
    <div style={styles.stateRow}>
      <div style={styles.stateName}>{name}</div>
      <div
        style={{
          ...styles.stateValue,
          borderColor: c.border,
          color: c.text,
          background: c.bg,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function IndustrialTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={styles.tooltip}>
      <div style={styles.tooltipTitle}>{label}</div>
      <div style={styles.tooltipRow}>
        <span style={styles.tooltipKey}>Moisture</span>
        <span style={styles.tooltipVal}>
          {payload?.[0]?.value?.toFixed?.(1) ?? payload?.[0]?.value}
        </span>
      </div>
      <div style={styles.tooltipRow}>
        <span style={styles.tooltipKey}>Temp</span>
        <span style={styles.tooltipVal}>
          {payload?.[1]?.value?.toFixed?.(1) ?? payload?.[1]?.value}
        </span>
      </div>
      <div style={styles.tooltipRow}>
        <span style={styles.tooltipKey}>Humidity</span>
        <span style={styles.tooltipVal}>
          {payload?.[2]?.value?.toFixed?.(1) ?? payload?.[2]?.value}
        </span>
      </div>
    </div>
  );
}

/* ================= HELPERS ================= */

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function toneToChip(tone: Tone) {
  switch (tone) {
    case "cyan":
      return {
        bg: "rgba(0,229,255,0.10)",
        border: "rgba(0,229,255,0.35)",
        icon: "rgba(0,229,255,0.95)",
        text: "#E6F0FF",
      };
    case "green":
      return {
        bg: "rgba(0,255,149,0.10)",
        border: "rgba(0,255,149,0.35)",
        icon: "rgba(0,255,149,0.92)",
        text: "#E6F0FF",
      };
    case "red":
      return {
        bg: "rgba(255,107,107,0.10)",
        border: "rgba(255,107,107,0.35)",
        icon: "rgba(255,107,107,0.92)",
        text: "#E6F0FF",
      };
    case "amber":
      return {
        bg: "rgba(255,193,7,0.10)",
        border: "rgba(255,193,7,0.33)",
        icon: "rgba(255,193,7,0.92)",
        text: "#E6F0FF",
      };
    default:
      return {
        bg: "rgba(255,255,255,0.06)",
        border: "rgba(255,255,255,0.14)",
        icon: "rgba(230,240,255,0.75)",
        text: "#E6F0FF",
      };
  }
}

function toneToGlow(tone: Tone) {
  switch (tone) {
    case "cyan":
      return {
        border: "rgba(0,229,255,0.40)",
        shadow: "rgba(0,229,255,0.22)",
        icon: "rgba(0,229,255,0.95)",
        badgeBg: "rgba(0,229,255,0.10)",
      };
    case "green":
      return {
        border: "rgba(0,255,149,0.40)",
        shadow: "rgba(0,255,149,0.20)",
        icon: "rgba(0,255,149,0.92)",
        badgeBg: "rgba(0,255,149,0.10)",
      };
    case "red":
      return {
        border: "rgba(255,107,107,0.40)",
        shadow: "rgba(255,107,107,0.18)",
        icon: "rgba(255,107,107,0.92)",
        badgeBg: "rgba(255,107,107,0.10)",
      };
    case "amber":
      return {
        border: "rgba(255,193,7,0.38)",
        shadow: "rgba(255,193,7,0.18)",
        icon: "rgba(255,193,7,0.90)",
        badgeBg: "rgba(255,193,7,0.10)",
      };
    default:
      return {
        border: "rgba(255,255,255,0.16)",
        shadow: "rgba(0,0,0,0.35)",
        icon: "rgba(230,240,255,0.80)",
        badgeBg: "rgba(255,255,255,0.06)",
      };
  }
}

/* ================= STYLES ================= */

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    color: "#E6F0FF",
    padding: "28px 28px 18px",
    background:
      "radial-gradient(1200px 600px at 20% 10%, rgba(0,229,255,0.12), transparent 60%)," +
      "radial-gradient(900px 500px at 90% 40%, rgba(0,255,149,0.10), transparent 55%)," +
      "linear-gradient(180deg, #070B12 0%, #0B1220 35%, #060910 100%)",
    position: "relative",
    overflow: "hidden",
  },
  scanline: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 120,
    background:
      "linear-gradient(180deg, transparent, rgba(0,229,255,0.08), transparent)",
    filter: "blur(0.2px)",
    pointerEvents: "none",
    mixBlendMode: "screen",
  },

  topbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 16px",
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.10)",
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
    boxShadow: "0 18px 60px rgba(0,0,0,0.55)",
    backdropFilter: "blur(10px)",
    position: "relative",
    zIndex: 2,
  },
  topTitleRow: { display: "flex", alignItems: "center", gap: 12 },
  brandMark: {
    width: 12,
    height: 40,
    borderRadius: 10,
    background:
      "linear-gradient(180deg, rgba(0,229,255,0.95), rgba(0,255,149,0.85))",
    boxShadow: "0 0 18px rgba(0,229,255,0.25)",
  },
  topTitle: { fontSize: 20, fontWeight: 800, letterSpacing: 0.2 },
  topSub: { fontSize: 12, opacity: 0.75, marginTop: 2 },

  statusRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  chip: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 10px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.14)",
    fontSize: 12,
    letterSpacing: 0.2,
  },
  chipIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },

  mainSplit: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 18,
    marginTop: 18,
    alignItems: "start",
    position: "relative",
    zIndex: 2,
  },
  leftPane: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
    minWidth: 0,
  },
  rightPane: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
    minWidth: 0,
  },

  panel: {
    borderRadius: 20,
    border: "1px solid rgba(255,255,255,0.10)",
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.02))",
    boxShadow: "0 18px 70px rgba(0,0,0,0.55)",
    overflow: "hidden",
  },
  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 16px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(0,0,0,0.16)",
  },
  panelTitleRow: { display: "flex", alignItems: "center", gap: 10 },
  panelIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
    display: "grid",
    placeItems: "center",
  },
  panelTitle: {
    fontSize: 14,
    fontWeight: 800,
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  panelRight: { display: "flex", gap: 6, opacity: 0.6 },
  panelPip: {
    width: 6,
    height: 6,
    borderRadius: 999,
    background: "rgba(255,255,255,0.35)",
  },
  panelBody: { padding: 16 },

  kpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 12,
  },
  kpiCard: {
    borderRadius: 18,
    padding: 14,
    border: "1px solid rgba(255,255,255,0.10)",
    background:
      "radial-gradient(420px 220px at 10% 0%, rgba(0,229,255,0.08), transparent 55%)," +
      "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.10))",
    boxShadow: "0 16px 50px rgba(0,0,0,0.45)",
    position: "relative",
    overflow: "hidden",
  },
  kpiTop: { display: "flex", gap: 12, alignItems: "center" },
  kpiIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.12)",
    display: "grid",
    placeItems: "center",
  },
  kpiText: { display: "flex", flexDirection: "column", gap: 2 },
  kpiLabel: { fontSize: 12, opacity: 0.75 },
  kpiValue: { fontSize: 20, fontWeight: 900, letterSpacing: 0.2 },
  kpiSub: { marginTop: 10, fontSize: 12, opacity: 0.72 },
  kpiUnderline: { height: 2, width: "100%", marginTop: 12, opacity: 0.9 },

  solarActWrap: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  },
  gaugeBlock: {
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(0,0,0,0.14)",
    padding: 14,
  },
  actuatorBlock: {
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(0,0,0,0.14)",
    padding: 14,
  },
  gaugeTitle: {
    fontSize: 13,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    opacity: 0.9,
  },
  gaugeMeta: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginTop: 6,
  },
  metaItem: { display: "flex", flexDirection: "column", gap: 2 },
  metaLabel: { fontSize: 11, opacity: 0.65 },
  note: { fontSize: 12, opacity: 0.75, marginTop: 10, lineHeight: 1.4 },

  stateList: { display: "flex", flexDirection: "column", gap: 10, marginTop: 12 },
  stateRow: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 },
  stateName: { fontSize: 12, opacity: 0.75 },
  stateValue: {
    fontSize: 12,
    fontWeight: 800,
    borderRadius: 999,
    padding: "6px 10px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
    letterSpacing: 0.3,
  },
  actuatorHint: { fontSize: 12, opacity: 0.75, lineHeight: 1.4, marginTop: 10 },

  chartHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  chartLegend: { display: "flex", gap: 14, flexWrap: "wrap" },
  legendItem: { display: "inline-flex", alignItems: "center", gap: 8, opacity: 0.9 },
  legendDot: { width: 10, height: 10, borderRadius: 999 },
  legendLabel: { fontSize: 12, opacity: 0.8 },
  chartMeta: { fontSize: 12, opacity: 0.7 },

  chartShell: {
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.10)",
    background:
      "radial-gradient(900px 380px at 30% 10%, rgba(0,229,255,0.08), transparent 55%)," +
      "linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0.10))",
    padding: 12,
    overflow: "hidden",
  },

  currentGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 10,
  },
  miniStat: {
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(0,0,0,0.14)",
    padding: "10px 12px",
  },
  miniLabel: {
    fontSize: 11,
    opacity: 0.65,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  miniValue: { fontSize: 16, fontWeight: 900, marginTop: 4 },

  tooltip: {
    background: "rgba(8,12,18,0.96)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 14,
    padding: 12,
    boxShadow: "0 16px 50px rgba(0,0,0,0.6)",
    minWidth: 160,
  },
  tooltipTitle: { fontSize: 12, opacity: 0.75, marginBottom: 8 },
  tooltipRow: { display: "flex", justifyContent: "space-between", gap: 12, marginTop: 6 },
  tooltipKey: { fontSize: 12, opacity: 0.7 },
  tooltipVal: { fontSize: 12, fontWeight: 900 },

  footer: {
    marginTop: 16,
    opacity: 0.55,
    fontSize: 12,
    display: "flex",
    justifyContent: "center",
    paddingBottom: 6,
    position: "relative",
    zIndex: 2,
  },

  mono: {
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },

  center: {
    minHeight: "calc(100vh - 90px)",
    display: "grid",
    placeItems: "center",
    position: "relative",
    zIndex: 2,
  },
  loaderCard: {
    width: "min(520px, 92vw)",
    borderRadius: 20,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(0,0,0,0.20)",
    padding: 18,
    boxShadow: "0 18px 70px rgba(0,0,0,0.55)",
  },
  loaderTitle: { fontSize: 16, fontWeight: 900, letterSpacing: 0.2 },
  loaderSub: { marginTop: 6, opacity: 0.7, fontSize: 12, lineHeight: 1.4 },
  progressRail: {
    marginTop: 14,
    height: 10,
    borderRadius: 999,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.10)",
    overflow: "hidden",
    position: "relative",
  },
  progressFill: {
    width: "45%",
    height: "100%",
    borderRadius: 999,
    background:
      "linear-gradient(90deg, rgba(0,229,255,0.0), rgba(0,229,255,0.9), rgba(0,255,149,0.8), rgba(0,255,149,0.0))",
  },

  smallDivider: {
    height: 1,
    background: "rgba(255,255,255,0.08)",
    marginTop: 12,
  },
};