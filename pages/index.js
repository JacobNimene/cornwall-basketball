import { useMemo, useState } from "react";

const skinTones = ["#ffd9c0", "#f2c19e", "#d99c6b", "#a56a44", "#6b3d24"];
const hairColors = ["#2a1f1b", "#5a3825", "#a45a3d", "#f5e6b2", "#6f2dbd", "#0ea5e9"];
const outfits = ["Royal Gown", "Explorer Suit", "Future Armor", "Comic Hero", "Street Star"];
const vibes = ["Brave", "Curious", "Funny", "Wise", "Chaotic Good"];
const archetypes = ["Tianna Verse Hero", "Inventor", "Time Traveler", "Mythic Guardian", "Comic Star", "Historical Remix"];
const historicalFigures = ["Harriet Tubman", "Leonardo da Vinci", "Cleopatra", "Ada Lovelace", "Mansa Musa", "Joan of Arc"];
const backgrounds = ["Neon City", "Ancient Library", "Sky Kingdom", "Ocean Dome", "Mystic Court"];
const bubbles = ["Whoa, this scene is legendary!", "Power-up complete!", "Let’s save the Tianna Verse!", "Comic panel drop incoming!", "My style level is 9999!"];

const challenges = [
  { title: "Time-Travel Rescue", objective: "Create 3 dolls with different archetypes and one historical remix.", minDolls: 3, uniqueArchetypes: 3 },
  { title: "Neon Run", objective: "Set sparkle to 80+ on at least 2 dolls and use different backgrounds.", minSparkleDolls: 2, minSparkle: 80, uniqueBackgrounds: 2 },
  { title: "Comic Sprint", objective: "Write 20+ chars panel text and make 4 dolls for a full mini comic.", minDolls: 4, minPanelChars: 20 },
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

export default function Home() {
  const [nextId, setNextId] = useState(2);
  const [dolls, setDolls] = useState([createDoll(1, "Tianna Prime")]);
  const [activeId, setActiveId] = useState(1);
  const [panelText, setPanelText] = useState("A portal opens over Neo-Cornwall City...");
  const [challengeIndex, setChallengeIndex] = useState(0);

  const activeDoll = useMemo(() => dolls.find((doll) => doll.id === activeId) ?? dolls[0], [dolls, activeId]);
  const challenge = challenges[challengeIndex];

  const score = useMemo(() => {
    const uniqueArchetypes = new Set(dolls.map((doll) => doll.archetype)).size;
    const uniqueBackgrounds = new Set(dolls.map((doll) => doll.background)).size;
    const sparkleStars = dolls.filter((doll) => doll.sparkle >= 80).length;
    const points = dolls.length * 100 + uniqueArchetypes * 50 + uniqueBackgrounds * 40 + sparkleStars * 30 + Math.min(panelText.length, 100);
    return { points, uniqueArchetypes, uniqueBackgrounds, sparkleStars };
  }, [dolls, panelText]);

  const challengePassed =
    dolls.length >= (challenge.minDolls ?? 0) &&
    score.uniqueArchetypes >= (challenge.uniqueArchetypes ?? 0) &&
    score.uniqueBackgrounds >= (challenge.uniqueBackgrounds ?? 0) &&
    score.sparkleStars >= (challenge.minSparkleDolls ?? 0) &&
    dolls.filter((doll) => doll.sparkle >= (challenge.minSparkle ?? 0)).length >= (challenge.minSparkleDolls ?? 0) &&
    panelText.trim().length >= (challenge.minPanelChars ?? 0);

  const updateActive = (field, value) => {
    setDolls((prev) => prev.map((doll) => (doll.id === activeId ? { ...doll, [field]: value } : doll)));
  };

  const addDoll = () => {
    const id = nextId;
    setDolls((prev) => [...prev, createDoll(id)]);
    setActiveId(id);
    setNextId((prev) => prev + 1);
  };

  const removeDoll = (id) => {
    if (dolls.length === 1) return;
    const next = dolls.filter((doll) => doll.id !== id);
    setDolls(next);
    if (activeId === id) setActiveId(next[0].id);
  };

  const randomizeActive = () => {
    if (!activeDoll) return;
    updateActive("archetype", archetypes[Math.floor(Math.random() * archetypes.length)]);
    updateActive("figure", historicalFigures[Math.floor(Math.random() * historicalFigures.length)]);
    updateActive("outfit", outfits[Math.floor(Math.random() * outfits.length)]);
    updateActive("vibe", vibes[Math.floor(Math.random() * vibes.length)]);
    updateActive("background", backgrounds[Math.floor(Math.random() * backgrounds.length)]);
    updateActive("sparkle", Math.floor(Math.random() * 101));
  };

  return (
    <main style={styles.page}><div style={styles.wrapper}>
      <h1 style={styles.title}>Tianna Verse: Playable Doll + Comic Game</h1>
      <p style={styles.subtitle}>How to play: pick a challenge, create dolls, customize them, and complete the objective to win.</p>

      <section style={styles.gameBar}>
        <div>
          <strong>Challenge:</strong> {challenge.title}<br />
          <small>{challenge.objective}</small>
        </div>
        <div><strong>Score:</strong> {score.points} XP</div>
        <button style={styles.cta} onClick={() => setChallengeIndex((challengeIndex + 1) % challenges.length)}>Next Challenge</button>
        <div style={{ color: challengePassed ? "#166534" : "#991b1b", fontWeight: 700 }}>{challengePassed ? "✅ Challenge Complete" : "⏳ In Progress"}</div>
      </section>

      <div style={styles.layout}>
        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>Character Lab</h2>
          <div style={styles.tabList}>
            {dolls.map((doll) => (
              <button key={doll.id} onClick={() => setActiveId(doll.id)} style={{ ...styles.tab, ...(doll.id === activeId ? styles.activeTab : null) }}>
                {doll.name}
                <span onClick={(event) => { event.stopPropagation(); removeDoll(doll.id); }} style={styles.remove}>✕</span>
              </button>
            ))}
            <button onClick={addDoll} style={styles.addButton}>+ Add Doll</button>
            <button onClick={randomizeActive} style={styles.randomButton}>🎲 Randomize</button>
          </div>
          <label style={styles.label}>Name</label>
          <input value={activeDoll?.name ?? ""} onChange={(event) => updateActive("name", event.target.value)} style={styles.input} />
          <FieldSelect label="Archetype" value={activeDoll?.archetype} options={archetypes} onChange={(value) => updateActive("archetype", value)} />
          <FieldSelect label="Historical Figure" value={activeDoll?.figure} options={historicalFigures} onChange={(value) => updateActive("figure", value)} />
          <FieldSelect label="Outfit" value={activeDoll?.outfit} options={outfits} onChange={(value) => updateActive("outfit", value)} />
          <FieldSelect label="Vibe" value={activeDoll?.vibe} options={vibes} onChange={(value) => updateActive("vibe", value)} />
          <FieldSelect label="Scene Background" value={activeDoll?.background} options={backgrounds} onChange={(value) => updateActive("background", value)} />
          <ColorInput label="Skin tone" value={activeDoll?.skin ?? skinTones[0]} onChange={(value) => updateActive("skin", value)} />
          <ColorInput label="Hair color" value={activeDoll?.hair ?? hairColors[0]} onChange={(value) => updateActive("hair", value)} />
          <label style={styles.label}>Sparkle: {activeDoll?.sparkle}</label>
          <input type="range" min="0" max="100" value={activeDoll?.sparkle ?? 50} onChange={(event) => updateActive("sparkle", Number(event.target.value))} style={styles.range} />
        </section>

        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>Live Stage + Comic Builder</h2>
          <div style={{ ...styles.stage, boxShadow: `0 0 ${Math.max(8, (activeDoll?.sparkle ?? 0) / 2)}px rgba(99,102,241,0.55)` }}>
            <div style={{ ...styles.avatar, background: activeDoll?.skin }}><div style={{ ...styles.hair, background: activeDoll?.hair }} /></div>
            <div>
              <h3 style={styles.previewTitle}>{activeDoll?.name}</h3>
              <p style={styles.previewText}><strong>{activeDoll?.archetype}</strong> inspired by {activeDoll?.figure}</p>
              <p style={styles.previewText}>{activeDoll?.background} • {activeDoll?.outfit} • {activeDoll?.vibe}</p>
            </div>
          </div>
          <label style={styles.label}>Comic panel setup</label>
          <textarea value={panelText} onChange={(event) => setPanelText(event.target.value)} style={{ ...styles.input, minHeight: 80 }} />
          <div style={styles.panelGrid}>
            {dolls.slice(0, 6).map((doll, index) => (
              <article key={doll.id} style={styles.comicPanel}>
                <p style={styles.previewText}><strong>Panel {index + 1}</strong>: {panelText}</p>
                <p style={styles.previewText}>{doll.name} ({doll.archetype})</p>
                <p style={{ ...styles.previewText, fontStyle: "italic" }}>
                  "{bubbles[(doll.sparkle + index) % bubbles.length]}"
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div></main>
  );
}

function FieldSelect({ label, value, options, onChange }) {
  return <><label style={styles.label}>{label}</label><select value={value} onChange={(event) => onChange(event.target.value)} style={styles.input}>{options.map((option) => <option key={option}>{option}</option>)}</select></>;
}
function ColorInput({ label, value, onChange }) {
  return <><label style={styles.label}>{label}</label><input type="color" value={value} onChange={(event) => onChange(event.target.value)} style={styles.color} /></>;
}

const styles = {
  page: { fontFamily: "Inter, Arial, sans-serif", minHeight: "100vh", margin: 0, background: "linear-gradient(120deg, #eef2ff, #fff7ed)" },
  wrapper: { padding: "1.2rem", maxWidth: 1200, margin: "0 auto" }, title: { marginBottom: 6 }, subtitle: { marginTop: 0 },
  gameBar: { display: "grid", gridTemplateColumns: "2fr 1fr auto 1fr", gap: 10, alignItems: "center", background: "#fff", border: "1px solid #ddd", borderRadius: 12, padding: 12, marginBottom: 12 },
  cta: { borderRadius: 10, padding: "8px 10px", border: "1px solid #4f46e5", background: "#4f46e5", color: "#fff", cursor: "pointer" },
  layout: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }, card: { background: "#fff", borderRadius: 16, padding: "1rem", boxShadow: "0 8px 24px rgba(15,23,42,0.08)" },
  sectionTitle: { marginTop: 0, fontSize: "1.2rem" }, tabList: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 },
  tab: { borderRadius: 999, padding: "6px 10px", background: "#f4f4f5", display: "inline-flex", alignItems: "center", cursor: "pointer", border: "1px solid #d4d4d8" }, activeTab: { border: "2px solid #4f46e5" },
  remove: { marginLeft: 8, color: "#dc2626", cursor: "pointer" }, addButton: { borderRadius: 999, padding: "6px 10px", background: "#4f46e5", color: "#fff", border: "1px solid #4f46e5", cursor: "pointer" },
  randomButton: { borderRadius: 999, padding: "6px 10px", background: "#f59e0b", color: "#111", border: "1px solid #f59e0b", cursor: "pointer" },
  label: { display: "block", marginTop: 10, marginBottom: 4, fontWeight: 600 }, input: { width: "100%", border: "1px solid #d4d4d8", borderRadius: 10, padding: 8, fontSize: 14 },
  color: { width: "100%", height: 38, border: "1px solid #d4d4d8", borderRadius: 10, padding: 4, background: "#fff" }, range: { width: "100%" },
  stage: { display: "grid", gridTemplateColumns: "130px 1fr", gap: 14, alignItems: "center", border: "1px solid #e4e4e7", borderRadius: 14, padding: 12, marginBottom: 10 },
  avatar: { width: 110, height: 130, borderRadius: 24, position: "relative", border: "3px solid #27272a" }, hair: { width: 88, height: 34, borderRadius: 24, position: "absolute", top: -12, left: 9, border: "2px solid #27272a" },
  previewTitle: { margin: "0 0 4px" }, previewText: { margin: "0 0 6px" }, panelGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }, comicPanel: { border: "1px solid #e4e4e7", borderRadius: 12, padding: 10, background: "linear-gradient(160deg, #ffffff, #f5f3ff)" },
};
