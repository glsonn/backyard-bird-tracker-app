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
          style={{
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            width: "100%",
            marginTop: "0.25rem",
          }}
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
          style={{
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            width: "100%",
            marginTop: "0.25rem",
            boxSizing: "border-box",
          }}
        />
      </div>

      <div>
        <label>Notes</label>
        <br />
        <textarea
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            width: "100%",
            marginTop: "0.25rem",
            boxSizing: "border-box",
          }}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          marginTop: "1rem",
          padding: "0.6rem 1rem",
          border: "none",
          borderRadius: "6px",
          backgroundColor: loading ? "#999" : "#2e7d32",
          color: "white",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "1rem",
          width: "100%",
          transition: "background-color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.currentTarget.style.backgroundColor = "#256628";
          }
        }}
        onMouseLeave={(e) => {
          if (!loading) {
            e.currentTarget.style.backgroundColor = "#2e7d32";
          }
        }}
      >
        {loading ? "Adding..." : "Add Sighting"}
      </button>

      {successMessage && (
        <div
          style={{
            marginBottom: "0.5rem",
            padding: "0.75rem 1rem",
            borderRadius: "6px",
            backgroundColor: "#e6f4ea",
            color: "#2e7d32",
            border: "1px solid #b7dfc1",
          }}
        >
          {successMessage}
        </div>
      )}
    </div>
  );
}
