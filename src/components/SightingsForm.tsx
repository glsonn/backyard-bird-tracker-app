"use client";

import { useState } from "react";

type Props = {
  birds: string[];
  onAdd: (species: string, count: number, notes: string) => Promise<void>;
  loading: boolean;
  successMessage: string;
};

export default function SightingsForm({
  birds,
  onAdd,
  loading,
  successMessage,
}: Props) {
  const [species, setSpecies] = useState(birds[0]);
  const [count, setCount] = useState(1);
  const [notes, setNotes] = useState("");

  async function handleSubmit() {
    await onAdd(species, count, notes);

    // reset form after successful submit
    setSpecies(birds[0]);
    setCount(1);
    setNotes("");
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginBottom: "2rem",
      }}
    >
      <div>
        <label>Species</label>
        <br />
        <select
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          style={{ padding: "0.5rem", width: "100%" }}
        >
          {birds.map((bird) => (
            <option key={bird} value={bird}>
              {bird}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Count</label>
        <br />
        <input
          type="number"
          min="1"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          style={{ padding: "0.5rem", width: "100%" }}
        />
      </div>

      <div>
        <label>Notes</label>
        <br />
        <textarea
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{ padding: "0.5rem", width: "100%" }}
        />
      </div>

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Adding..." : "Add Sighting"}
      </button>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
}
