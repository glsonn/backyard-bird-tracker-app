"use client";

import { useEffect, useState } from "react";

import { getSightings, createSighting, deleteSighting } from "@/lib/sightings";

const birds = [
  "Northern Cardinal",
  "Blue Jay",
  "Black-capped Chickadee",
  "American Goldfinch",
  "Downy Woodpecker",
];

type Sighting = {
  id: string;
  species: string;
  count: number;
  notes: string | null;
  created_at: string;
};

export default function Home() {
  const [species, setSpecies] = useState(birds[0]);
  const [count, setCount] = useState(1);
  const [notes, setNotes] = useState("");

  const [sightings, setSightings] = useState<Sighting[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  async function fetchSightings() {
    setIsFetching(true);
    const { data, error } = await getSightings();

    if (error) {
      console.error(error);
      setIsFetching(false);
      return;
    }

    setSightings(data || []);
    setIsFetching(false);
  }

  useEffect(() => {
    fetchSightings();
  }, []);

  async function addSighting() {
    setLoading(true);

    const { error } = await createSighting(species, count, notes);

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Error adding sighting");
      return;
    }

    setNotes("");
    setCount(1);
    setSpecies(birds[0]);

    fetchSightings();

    setSuccessMessage("Sighting added successfully!");
    setTimeout(() => {
      setSuccessMessage("");
    }, 2500);
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this sighting?",
    );

    if (!confirmed) {
      return;
    }
    const { error } = await deleteSighting(id);

    if (error) {
      console.error(error);
      alert("Error deleting sighting");
      return;
    }

    fetchSightings();
  }

  return (
    <main
      style={{
        padding: "2rem",
        maxWidth: "700px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Bird Tracker</h1>

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
            style={{
              padding: "0.5rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              width: "100%",
              marginTop: "0.25rem",
              boxSizing: "border-box",
            }}
            min="1"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </div>

        <div>
          <label>Notes</label>
          <br />
          <textarea
            rows={4}
            style={{
              padding: "0.5rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              width: "100%",
              marginTop: "0.25rem",
              boxSizing: "border-box",
            }}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
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

        <button
          onClick={addSighting}
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
      </div>

      <h2>Recent Sightings</h2>

      {isFetching ? (
        <p
          style={{
            textAlign: "center",
            color: "#666",
            padding: "1rem",
          }}
        >
          Loading sightings...
        </p>
      ) : sightings.length === 0 ? (
        <p
          style={{
            padding: "1rem",
            border: "1px dashed #ccc",
            borderRadius: "8px",
            color: "#666",
            textAlign: "center",
            backgroundColor: "#fafafa",
          }}
        >
          No sightings yet. Start by adding your first bird sighting above 🐦
        </p>
      ) : (
        <ul style={{ padding: 0 }}>
          {sightings.map((sighting) => (
            <li
              key={sighting.id}
              style={{
                listStyle: "none",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1rem",
                marginBottom: "1rem",
                backgroundColor: "#fff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                lineHeight: "1.5",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  marginBottom: "0.5rem",
                }}
              >
                {sighting.species}
              </div>
              <br />
              Count: {sighting.count}
              <br />
              {sighting.notes && (
                <>
                  Notes: {sighting.notes}
                  <br />
                </>
              )}
              <div style={{ marginTop: "0.5rem" }}>
                <small>
                  Recorded on {new Date(sighting.created_at).toLocaleString()}
                </small>
              </div>
              <br />
              <button
                onClick={() => handleDelete(sighting.id)}
                style={{
                  marginTop: "0.5rem",
                  padding: "0.5rem 0.75rem",
                  border: "none",
                  borderRadius: "6px",
                  backgroundColor: "#d9534f",
                  color: "white",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#c9302c";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#d9534f";
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
