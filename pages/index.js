import { useMemo, useState } from "react";

const skinTones = ["#ffd9c0", "#f2c19e", "#d99c6b", "#a56a44", "#6b3d24"];
const hairColors = ["#2a1f1b", "#5a3825", "#a45a3d", "#f5e6b2", "#6f2dbd", "#0ea5e9"];
const outfits = ["Royal Gown", "Explorer Suit", "Future Armor", "Comic Hero", "Street Star"];
const vibes = ["Brave", "Curious", "Funny", "Wise", "Chaotic Good"];
const archetypes = [
  "Tianna Verse Hero",
  "Inventor",
  "Time Traveler",
  "Mythic Guardian",
  "Pixton-Style Star",
  "Historical Remix",
];
const historicalFigures = [
  "Harriet Tubman",
  "Leonardo da Vinci",
  "Cleopatra",
  "Ada Lovelace",
  "Mansa Musa",
  "Joan of Arc",
];

const newDoll = (name = "") => ({
  id: crypto.randomUUID(),
  name: name || "New Star",
  skin: skinTones[0],
  hair: hairColors[0],
  outfit: outfits[0],
  vibe: vibes[0],
  archetype: archetypes[0],
  figure: historicalFigures[0],
  sparkle: 60,
  speed: 50,
  pose: 50,
  dialogue: "I am ready for an epic comic scene!",
});

const bubbles = [
  "Whoa, this scene is legendary!",
  "Power-up complete!",
  "Let’s save the Tianna Verse!",
  "Comic panel drop incoming!",
  "My style level is 9999!",
];

export default function Home() {
  const [dolls, setDolls] = useState([newDoll("Tianna Prime")]);
  const [activeId, setActiveId] = useState(dolls[0].id);
  const [panelText, setPanelText] = useState("A portal opens over Neo-Cornwall City...");

  const activeDoll = useMemo(
    () => dolls.find((d) => d.id === activeId) ?? dolls[0],
    [dolls, activeId]
  );

  const updateActive = (field, value) => {
    setDolls((prev) => prev.map((d) => (d.id === activeId ? { ...d, [field]: value } : d)));
  };

  const addDoll = () => {
    const doll = newDoll(`Star ${dolls.length + 1}`);
    setDolls((prev) => [...prev, doll]);
    setActiveId(doll.id);
  };

  const removeDoll = (id) => {
    if (dolls.length === 1) return;
    const next = dolls.filter((d) => d.id !== id);
    setDolls(next);
    if (activeId === id) setActiveId(next[0].id);
  };

  return (
    <main style={{ fontFamily: "Inter, Arial, sans-serif", minHeight: "100vh", margin: 0, background: "linear-gradient(120deg, #eef2ff, #fff7ed)" }}>
      <div style={{ padding: "1.2rem", maxWidth: 1200, margin: "0 auto" }}>
        <h1 style={{ marginBottom: 6 }}>Tianna Verse Doll + Comic Studio</h1>
        <p style={{ marginTop: 0 }}>Build unlimited dolls, remix with historical icons, and generate comic-ready scenes instantly.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <section style={card}>
            <h2 style={h2}>Character Lab</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
              {dolls.map((d) => (
                <button key={d.id} onClick={() => setActiveId(d.id)} style={{ ...pill, border: d.id === activeId ? "2px solid #4f46e5" : "1px solid #d4d4d8" }}>
                  {d.name}
                  <span onClick={(e) => { e.stopPropagation(); removeDoll(d.id); }} style={{ marginLeft: 8, color: "#dc2626", cursor: "pointer" }}>✕</span>
                </button>
              ))}
              <button onClick={addDoll} style={{ ...pill, background: "#4f46e5", color: "white" }}>+ Add Doll</button>
            </div>

            <label style={label}>Name</label>
            <input value={activeDoll?.name ?? ""} onChange={(e) => updateActive("name", e.target.value)} style={input} />

            <label style={label}>Archetype</label>
            <select value={activeDoll?.archetype ?? archetypes[0]} onChange={(e) => updateActive("archetype", e.target.value)} style={input}>{archetypes.map((x) => <option key={x}>{x}</option>)}</select>

            <label style={label}>Historical figure inspiration</label>
            <select value={activeDoll?.figure ?? historicalFigures[0]} onChange={(e) => updateActive("figure", e.target.value)} style={input}>{historicalFigures.map((x) => <option key={x}>{x}</option>)}</select>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div>
                <label style={label}>Skin tone</label>
                <input type="color" value={activeDoll?.skin ?? skinTones[0]} onChange={(e) => updateActive("skin", e.target.value)} style={colorPick} />
              </div>
              <div>
                <label style={label}>Hair color</label>
                <input type="color" value={activeDoll?.hair ?? hairColors[0]} onChange={(e) => updateActive("hair", e.target.value)} style={colorPick} />
              </div>
            </div>

            <label style={label}>Outfit</label>
            <select value={activeDoll?.outfit ?? outfits[0]} onChange={(e) => updateActive("outfit", e.target.value)} style={input}>{outfits.map((x) => <option key={x}>{x}</option>)}</select>

            <label style={label}>Vibe</label>
            <select value={activeDoll?.vibe ?? vibes[0]} onChange={(e) => updateActive("vibe", e.target.value)} style={input}>{vibes.map((x) => <option key={x}>{x}</option>)}</select>

            {[
              ["sparkle", "Sparkle Energy"],
              ["speed", "Animation Speed"],
              ["pose", "Pose Intensity"],
            ].map(([field, txt]) => (
              <div key={field}>
                <label style={label}>{txt}: {activeDoll?.[field]}</label>
                <input type="range" min="0" max="100" value={activeDoll?.[field] ?? 50} onChange={(e) => updateActive(field, Number(e.target.value))} style={{ width: "100%" }} />
              </div>
            ))}

            <label style={label}>Catchphrase</label>
            <textarea value={activeDoll?.dialogue ?? ""} onChange={(e) => updateActive("dialogue", e.target.value)} style={{ ...input, minHeight: 70 }} />
          </section>

          <section style={card}>
            <h2 style={h2}>Live Preview + Comic Builder</h2>
            <div style={{ ...stage, boxShadow: `0 0 ${Math.max(6, activeDoll?.sparkle / 3)}px rgba(99,102,241,0.6)` }}>
              <div style={{ ...avatar, background: activeDoll?.skin }}>
                <div style={{ ...hair, background: activeDoll?.hair }} />
                <div style={{ ...speech }}>{activeDoll?.dialogue}</div>
              </div>
              <div>
                <h3 style={{ margin: "0 0 4px" }}>{activeDoll?.name}</h3>
                <p style={{ margin: "0 0 6px" }}><strong>{activeDoll?.archetype}</strong> inspired by {activeDoll?.figure}</p>
                <p style={{ margin: "0 0 6px" }}>Outfit: {activeDoll?.outfit} | Vibe: {activeDoll?.vibe}</p>
                <p style={{ margin: 0 }}>FX: Sparkle {activeDoll?.sparkle} • Speed {activeDoll?.speed} • Pose {activeDoll?.pose}</p>
              </div>
            </div>

            <label style={label}>Comic panel setup</label>
            <textarea value={panelText} onChange={(e) => setPanelText(e.target.value)} style={{ ...input, minHeight: 70 }} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {dolls.slice(0, 4).map((d, i) => (
                <div key={d.id} style={comicPanel}>
                  <p style={{ margin: "0 0 8px" }}><strong>Panel {i + 1}</strong>: {panelText}</p>
                  <p style={{ margin: "0 0 6px" }}>{d.name} ({d.archetype})</p>
                  <p style={{ margin: "0 0 6px", fontStyle: "italic" }}>
                    "{bubbles[(d.sparkle + i) % bubbles.length]}"
                  </p>
                  <small>{d.outfit} • {d.vibe}</small>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

const card = { background: "#fff", borderRadius: 16, padding: "1rem", boxShadow: "0 8px 24px rgba(15,23,42,0.08)" };
const h2 = { marginTop: 0, fontSize: "1.2rem" };
const label = { display: "block", marginTop: 10, marginBottom: 4, fontWeight: 600 };
const input = { width: "100%", border: "1px solid #d4d4d8", borderRadius: 10, padding: 8, fontSize: 14 };
const colorPick = { width: "100%", height: 38, border: "1px solid #d4d4d8", borderRadius: 10, padding: 4, background: "#fff" };
const pill = { borderRadius: 999, padding: "6px 10px", background: "#f4f4f5", display: "inline-flex", alignItems: "center", cursor: "pointer" };
const stage = { display: "grid", gridTemplateColumns: "130px 1fr", gap: 14, alignItems: "center", border: "1px solid #e4e4e7", borderRadius: 14, padding: 12, marginBottom: 10 };
const avatar = { width: 110, height: 130, borderRadius: 24, position: "relative", border: "3px solid #27272a", transition: "all .2s ease" };
const hair = { width: 88, height: 34, borderRadius: 24, position: "absolute", top: -12, left: 9, border: "2px solid #27272a" };
const speech = { position: "absolute", bottom: -24, left: -18, background: "#fff", border: "1px solid #a1a1aa", borderRadius: 12, padding: "4px 8px", fontSize: 10, width: 140 };
const comicPanel = { border: "1px solid #e4e4e7", borderRadius: 12, padding: 10, background: "linear-gradient(160deg, #ffffff, #f5f3ff)" };
