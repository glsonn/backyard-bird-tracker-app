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

  async function fetchSightings() {
    const { data, error } = await getSightings();

    if (error) {
      console.error(error);
      return;
    }

    setSightings(data || []);
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
  }

  async function handleDelete(id: string) {
    const { error } = await deleteSighting(id);

    if (error) {
      console.error(error);
      alert("Error deleting sighting");
      return;
    }

    fetchSightings();
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "600px" }}>
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
          <select value={species} onChange={(e) => setSpecies(e.target.value)}>
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
          />
        </div>

        <div>
          <label>Notes</label>
          <br />
          <textarea
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button onClick={addSighting} disabled={loading}>
          {loading ? "Adding..." : "Add Sighting"}
        </button>
      </div>

      <h2>Recent Sightings</h2>

      {sightings.length === 0 ? (
        <p>No sightings yet.</p>
      ) : (
        <ul>
          {sightings.map((sighting) => (
            <li key={sighting.id} style={{ marginBottom: "1rem" }}>
              <strong>{sighting.species}</strong>
              <br />
              Count: {sighting.count}
              <br />
              {sighting.notes && (
                <>
                  Notes: {sighting.notes}
                  <br />
                </>
              )}
              <button onClick={() => handleDelete(sighting.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
