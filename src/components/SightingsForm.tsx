"use client";

import { useState } from "react";
import SpeciesSelect from "@/components/SpeciesSelect";
import { getTodayDateString, formatDate, daysSince } from "@/lib/dateUtils";
import type { Sighting } from "@/types/sighting";

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
  selectedSpecies: string;
  onSpeciesChange: (species: string) => void;
  lastSeenSighting: Sighting;
};

export default function SightingsForm({
  birds,
  onAdd,
  loading,
  successMessage,
  errorMessage,
  selectedSpecies,
  onSpeciesChange,
  lastSeenSighting,
}: Props) {
  const [count, setCount] = useState(1);
  const [notes, setNotes] = useState("");
  const [location, setLocation] = useState("");
  const [date_seen, setDateSeen] = useState(getTodayDateString());

  const lastSeenRelativeText = lastSeenSighting
    ? (() => {
        const days = daysSince(lastSeenSighting.date_seen);

        if (days === 0) {
          return "today";
        }

        if (days === 1) {
          return "1 day ago";
        }

        return `${days} days ago`;
      })()
    : "";

  async function handleSubmit() {
    const success = await onAdd(
      selectedSpecies,
      count,
      notes,
      location,
      date_seen,
    );

    if (success) {
      onSpeciesChange("");
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
      <SpeciesSelect
        value={selectedSpecies}
        options={birds}
        onChange={onSpeciesChange}
        searchable
      />
      {selectedSpecies && (
        <div
          style={{
            marginTop: "-0.5rem",
            fontSize: "0.9rem",
            color: "#555",
          }}
        >
          {lastSeenSighting ? (
            <>
              Last seen: {formatDate(lastSeenSighting.date_seen)} (
              {lastSeenRelativeText})
            </>
          ) : (
            <>This is your first recorded sighting of this species.</>
          )}
        </div>
      )}
      <div>
        <label>Count</label>
        <br />
        <input
          type="number"
          min="1"
          step="1"
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
          max={getTodayDateString()}
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
        disabled={loading || !selectedSpecies}
        style={{
          marginTop: "1rem",
          padding: "0.6rem 1rem",
          border: "none",
          borderRadius: "6px",
          backgroundColor: loading || !selectedSpecies ? "#999" : "#2e7d32",
          color: "white",
          cursor: loading || !selectedSpecies ? "not-allowed" : "pointer",
          fontSize: "1rem",
          width: "100%",
          transition: "background-color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          if (!loading && selectedSpecies) {
            e.currentTarget.style.backgroundColor = "#256628";
          }
        }}
        onMouseLeave={(e) => {
          if (!loading && selectedSpecies) {
            e.currentTarget.style.backgroundColor = "#2e7d32";
          }
        }}
      >
        {loading ? "Adding..." : "Add Sighting"}
      </button>
    </div>
  );
}
