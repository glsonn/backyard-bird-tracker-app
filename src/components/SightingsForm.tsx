"use client";

import { useState } from "react";
import SpeciesSelect from "@/components/SpeciesSelect";
import { getTodayDateString } from "@/lib/dateUtils";

type Props = {
  birds: string[];
  onAdd: (
    species: string,
    count: number,
    notes: string,
    location: string,
    date_seen: string,
  ) => Promise<boolean>;
  loading: boolean;
  successMessage: string;
  errorMessage: string;
};

export default function SightingsForm({
  birds,
  onAdd,
  loading,
  successMessage,
  errorMessage,
}: Props) {
  const [species, setSpecies] = useState("");
  const [count, setCount] = useState(1);
  const [notes, setNotes] = useState("");
  const [location, setLocation] = useState("");
  const [date_seen, setDateSeen] = useState(getTodayDateString());

  async function handleSubmit() {
    const success = await onAdd(species, count, notes, location, date_seen);

    if (success) {
      setSpecies("");
      setCount(1);
      setNotes("");
      setLocation("");
      setDateSeen(getTodayDateString());
    }
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
      <SpeciesSelect value={species} options={birds} onChange={setSpecies} />

      <div>
        <label>Count</label>
        <br />
        <input
          type="number"
          min="1"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          onFocus={(e) => e.target.select()}
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
        <label>Date Seen</label>
        <br />
        <input
          type="date"
          value={date_seen}
          onChange={(e) => setDateSeen(e.target.value)}
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
        <label>Location (optional)</label>
        <br />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Backyard, Park, Nature Center..."
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
        <label>Notes (optional)</label>
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

      {errorMessage && (
        <div
          style={{
            marginBottom: "0.5rem",
            padding: "0.75rem 1rem",
            borderRadius: "6px",
            backgroundColor: "#fdecea",
            color: "#b3261e",
            border: "1px solid #f5c2c0",
          }}
        >
          {errorMessage}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading || !species}
        style={{
          marginTop: "1rem",
          padding: "0.6rem 1rem",
          border: "none",
          borderRadius: "6px",
          backgroundColor: loading || !species ? "#999" : "#2e7d32",
          color: "white",
          cursor: loading || !species ? "not-allowed" : "pointer",
          fontSize: "1rem",
          width: "100%",
          transition: "background-color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          if (!loading && species) {
            e.currentTarget.style.backgroundColor = "#256628";
          }
        }}
        onMouseLeave={(e) => {
          if (!loading && species) {
            e.currentTarget.style.backgroundColor = "#2e7d32";
          }
        }}
      >
        {loading ? "Adding..." : "Add Sighting"}
      </button>
    </div>
  );
}
