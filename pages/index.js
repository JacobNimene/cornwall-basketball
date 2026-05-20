import { useMemo, useState } from "react";

const skinTones = ["#ffd9c0", "#f2c19e", "#d99c6b", "#a56a44", "#6b3d24"];
const hairColors = ["#2a1f1b", "#5a3825", "#a45a3d", "#f5e6b2", "#6f2dbd", "#0ea5e9"];
const outfits = ["Royal Gown", "Explorer Suit", "Future Armor", "Comic Hero", "Street Star"];
const vibes = ["Brave", "Curious", "Funny", "Wise", "Chaotic Good"];
const archetypes = ["Tianna Verse Hero", "Inventor", "Time Traveler", "Mythic Guardian", "Comic Star", "Historical Remix"];
const historicalFigures = ["Harriet Tubman", "Leonardo da Vinci", "Cleopatra", "Ada Lovelace", "Mansa Musa", "Joan of Arc"];
const backgrounds = ["Neon City", "Ancient Library", "Sky Kingdom", "Ocean Dome", "Mystic Court"];

const bubbles = [
  "Whoa, this scene is legendary!",
  "Power-up complete!",
  "Let’s save the Tianna Verse!",
  "Comic panel drop incoming!",
  "My style level is 9999!",
];

const createDoll = (id, name = "") => ({
  id,
  name: name || `Star ${id}`,
  skin: skinTones[0],
  hair: hairColors[0],
  outfit: outfits[0],
  vibe: vibes[0],
  archetype: archetypes[0],
  figure: historicalFigures[0],
  background: backgrounds[0],
  sparkle: 60,
  speed: 50,
  pose: 50,
  dialogue: "I am ready for an epic comic scene!",
});

const controls = [
  ["sparkle", "Sparkle Energy"],
  ["speed", "Animation Speed"],
  ["pose", "Pose Intensity"],
];

export default function Home() {
  const [nextId, setNextId] = useState(2);
  const [dolls, setDolls] = useState([createDoll(1, "Tianna Prime")]);
  const [activeId, setActiveId] = useState(1);
  const [panelText, setPanelText] = useState("A portal opens over Neo-Cornwall City...");

  const activeDoll = useMemo(() => dolls.find((d) => d.id === activeId) ?? dolls[0], [dolls, activeId]);

  const updateActive = (field, value) => {
    setDolls((prev) => prev.map((doll) => (doll.id === activeId ? { ...doll, [field]: value } : doll)));
  };

  const addDoll = () => {
    const id = nextId;
    const doll = createDoll(id);
    setDolls((prev) => [...prev, doll]);
    setActiveId(id);
    setNextId((prev) => prev + 1);
  };

  const removeDoll = (id) => {
    if (dolls.length === 1) return;
    const next = dolls.filter((doll) => doll.id !== id);
    setDolls(next);
    if (activeId === id) {
      setActiveId(next[0].id);
    }
  };

  return (
    <main style={styles.page}>
      <div style={styles.wrapper}>
        <header>
          <h1 style={styles.title}>Tianna Verse Doll + Comic Studio</h1>
          <p style={styles.subtitle}>Create multiple characters, remix with history, and build comic panels with live updates.</p>
        </header>

        <div style={styles.layout}>
          <section style={styles.card}>
            <h2 style={styles.sectionTitle}>Character Lab</h2>

            <div style={styles.tabList}>
              {dolls.map((doll) => (
                <button
                  key={doll.id}
                  onClick={() => setActiveId(doll.id)}
                  style={{ ...styles.tab, ...(doll.id === activeId ? styles.activeTab : null) }}
                >
                  {doll.name}
                  <span
                    onClick={(event) => {
                      event.stopPropagation();
                      removeDoll(doll.id);
                    }}
                    style={styles.remove}
                    aria-label={`Remove ${doll.name}`}
                    role="button"
                  >
                    ✕
                  </span>
                </button>
              ))}
              <button onClick={addDoll} style={styles.addButton}>+ Add Doll</button>
            </div>

            <label style={styles.label}>Name</label>
            <input value={activeDoll?.name ?? ""} onChange={(event) => updateActive("name", event.target.value)} style={styles.input} />

            <div style={styles.twoCol}>
              <FieldSelect label="Archetype" value={activeDoll?.archetype} options={archetypes} onChange={(value) => updateActive("archetype", value)} />
              <FieldSelect
                label="Historical Figure"
                value={activeDoll?.figure}
                options={historicalFigures}
                onChange={(value) => updateActive("figure", value)}
              />
            </div>

            <div style={styles.twoCol}>
              <ColorInput label="Skin tone" value={activeDoll?.skin ?? skinTones[0]} onChange={(value) => updateActive("skin", value)} />
              <ColorInput label="Hair color" value={activeDoll?.hair ?? hairColors[0]} onChange={(value) => updateActive("hair", value)} />
            </div>

            <div style={styles.twoCol}>
              <FieldSelect label="Outfit" value={activeDoll?.outfit} options={outfits} onChange={(value) => updateActive("outfit", value)} />
              <FieldSelect label="Vibe" value={activeDoll?.vibe} options={vibes} onChange={(value) => updateActive("vibe", value)} />
            </div>

            <FieldSelect label="Scene Background" value={activeDoll?.background} options={backgrounds} onChange={(value) => updateActive("background", value)} />

            {controls.map(([field, label]) => (
              <div key={field}>
                <label style={styles.label}>{label}: {activeDoll?.[field]}</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={activeDoll?.[field] ?? 50}
                  onChange={(event) => updateActive(field, Number(event.target.value))}
                  style={styles.range}
                />
              </div>
            ))}

            <label style={styles.label}>Catchphrase</label>
            <textarea
              value={activeDoll?.dialogue ?? ""}
              onChange={(event) => updateActive("dialogue", event.target.value)}
              style={{ ...styles.input, minHeight: 72 }}
            />
          </section>

          <section style={styles.card}>
            <h2 style={styles.sectionTitle}>Live Stage + Comic Builder</h2>
            <div style={{ ...styles.stage, boxShadow: `0 0 ${Math.max(8, (activeDoll?.sparkle ?? 0) / 2)}px rgba(99,102,241,0.55)` }}>
              <div style={{ ...styles.avatar, background: activeDoll?.skin }}>
                <div style={{ ...styles.hair, background: activeDoll?.hair }} />
                <div style={{ ...styles.aura, opacity: (activeDoll?.sparkle ?? 0) / 150 }} />
                <div style={styles.speech}>{activeDoll?.dialogue}</div>
              </div>
              <div>
                <h3 style={styles.previewTitle}>{activeDoll?.name}</h3>
                <p style={styles.previewText}><strong>{activeDoll?.archetype}</strong> inspired by {activeDoll?.figure}</p>
                <p style={styles.previewText}>Outfit: {activeDoll?.outfit} | Vibe: {activeDoll?.vibe}</p>
                <p style={styles.previewText}>Scene: {activeDoll?.background}</p>
                <p style={styles.previewText}>FX: Sparkle {activeDoll?.sparkle} • Speed {activeDoll?.speed} • Pose {activeDoll?.pose}</p>
              </div>
            </div>

            <label style={styles.label}>Comic panel setup</label>
            <textarea value={panelText} onChange={(event) => setPanelText(event.target.value)} style={{ ...styles.input, minHeight: 72 }} />

            <div style={styles.panelGrid}>
              {dolls.slice(0, 6).map((doll, index) => (
                <article key={doll.id} style={styles.comicPanel}>
                  <p style={styles.previewText}><strong>Panel {index + 1}</strong>: {panelText}</p>
                  <p style={styles.previewText}>{doll.name} ({doll.archetype})</p>
                  <p style={{ ...styles.previewText, fontStyle: "italic" }}>
                    "{bubbles[(doll.sparkle + index) % bubbles.length]}"
                  </p>
                  <small>{doll.background} • {doll.outfit} • {doll.vibe}</small>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function FieldSelect({ label, value, options, onChange }) {
  return (
    <div>
      <label style={styles.label}>{label}</label>
      <select value={value} onChange={(event) => onChange(event.target.value)} style={styles.input}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

function ColorInput({ label, value, onChange }) {
  return (
    <div>
      <label style={styles.label}>{label}</label>
      <input type="color" value={value} onChange={(event) => onChange(event.target.value)} style={styles.color} />
    </div>
  );
}

const styles = {
  page: { fontFamily: "Inter, Arial, sans-serif", minHeight: "100vh", margin: 0, background: "linear-gradient(120deg, #eef2ff, #fff7ed)" },
  wrapper: { padding: "1.2rem", maxWidth: 1200, margin: "0 auto" },
  title: { marginBottom: 6 },
  subtitle: { marginTop: 0 },
  layout: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" },
  card: { background: "#fff", borderRadius: 16, padding: "1rem", boxShadow: "0 8px 24px rgba(15,23,42,0.08)" },
  sectionTitle: { marginTop: 0, fontSize: "1.2rem" },
  tabList: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 },
  tab: { borderRadius: 999, padding: "6px 10px", background: "#f4f4f5", display: "inline-flex", alignItems: "center", cursor: "pointer", border: "1px solid #d4d4d8" },
  activeTab: { border: "2px solid #4f46e5" },
  remove: { marginLeft: 8, color: "#dc2626", cursor: "pointer" },
  addButton: { borderRadius: 999, padding: "6px 10px", background: "#4f46e5", color: "#fff", border: "1px solid #4f46e5", cursor: "pointer" },
  label: { display: "block", marginTop: 10, marginBottom: 4, fontWeight: 600 },
  input: { width: "100%", border: "1px solid #d4d4d8", borderRadius: 10, padding: 8, fontSize: 14 },
  color: { width: "100%", height: 38, border: "1px solid #d4d4d8", borderRadius: 10, padding: 4, background: "#fff" },
  range: { width: "100%" },
  twoCol: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 },
  stage: { display: "grid", gridTemplateColumns: "130px 1fr", gap: 14, alignItems: "center", border: "1px solid #e4e4e7", borderRadius: 14, padding: 12, marginBottom: 10 },
  avatar: { width: 110, height: 130, borderRadius: 24, position: "relative", border: "3px solid #27272a", overflow: "visible" },
  hair: { width: 88, height: 34, borderRadius: 24, position: "absolute", top: -12, left: 9, border: "2px solid #27272a" },
  aura: { position: "absolute", inset: -8, borderRadius: 30, background: "radial-gradient(circle, rgba(129,140,248,.4), rgba(129,140,248,0))", zIndex: -1 },
  speech: { position: "absolute", bottom: -24, left: -18, background: "#fff", border: "1px solid #a1a1aa", borderRadius: 12, padding: "4px 8px", fontSize: 10, width: 140 },
  previewTitle: { margin: "0 0 4px" },
  previewText: { margin: "0 0 6px" },
  panelGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  comicPanel: { border: "1px solid #e4e4e7", borderRadius: 12, padding: 10, background: "linear-gradient(160deg, #ffffff, #f5f3ff)" },
};
