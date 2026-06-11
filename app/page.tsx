"use client";

import { useEffect, useState } from "react";

import {
  getSightings,
  createSighting,
  deleteSighting,
  updateSighting,
} from "@/lib/sightings";
import SightingsForm from "@/components/SightingsForm";
import SightingsList from "@/components/SightingsList";
import type { Sighting } from "@/types/sighting";
import SeasonalTracking from "@/components/SeasonalTracking";

type SortOrder = "newest" | "oldest";

const birds = [
  "Northern Cardinal",
  "Blue Jay",
  "Black-capped Chickadee",
  "American Goldfinch",
  "Downy Woodpecker",
];

export default function Home() {
  const [sightings, setSightings] = useState<Sighting[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [speciesFilter, setSpeciesFilter] = useState<string>("");

  async function fetchSightings(): Promise<void> {
    setIsFetching(true);

    try {
      const { data, error } = await getSightings();

      if (error) {
        console.error(error);
        setErrorMessage("Error loading sightings");
        setTimeout(() => setErrorMessage(""), 2500);
        return;
      }

      setSightings(data ?? []);
    } catch (error) {
      console.error(error);
      setErrorMessage("Network error while loading sightings");
      setTimeout(() => setErrorMessage(""), 2500);
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    fetchSightings();
  }, []);

  const displayedSightings = sightings
    .filter((sighting) => {
      if (!speciesFilter) return true;

      return sighting.species === speciesFilter;
    })
    .sort((a, b) => {
      if (sortOrder === "oldest") {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      }

      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });

  const speciesOptions = Array.from(
    new Set(sightings.map((sighting) => sighting.species)),
  ).sort();

  const totalSightings = sightings.length;

  const speciesSeen = new Set(sightings.map((sighting) => sighting.species))
    .size;

  const totalBirdsCounted = sightings.reduce(
    (sum, sighting) => sum + sighting.count,
    0,
  );

  const sightingCountsBySpecies = sightings.reduce(
    (acc, sighting) => {
      acc[sighting.species] = (acc[sighting.species] || 0) + 1;

      return acc;
    },
    {} as Record<string, number>,
  );

  const highestSightingCount = Math.max(
    0,
    ...Object.values(sightingCountsBySpecies),
  );

  const topVisitors = Object.entries(sightingCountsBySpecies)
    .filter(([, count]) => count === highestSightingCount)
    .map(([species]) => species)
    .sort();

  const topVisitorsText =
    topVisitors.length > 0 ? topVisitors.join(", ") : "None";

  const speciesSeenList = Array.from(
    new Set(sightings.map((sighting) => sighting.species)),
  ).sort();

  const seasonalSpeciesData = speciesSeenList.map((species) => {
    const speciesSightings = sightings.filter(
      (sighting) => sighting.species === species,
    );

    const sortedDates = speciesSightings
      .map((sighting) => sighting.date_seen)
      .sort();

    const firstSeen = sortedDates[0];
    const lastSeen = sortedDates[sortedDates.length - 1];

    const daysSinceSeen = Math.floor(
      (Date.now() - new Date(lastSeen).getTime()) / (1000 * 60 * 60 * 24),
    );

    return {
      species,
      firstSeen,
      lastSeen,
      daysSinceSeen,
    };
  });

  async function addSighting(
    species: string,
    count: number,
    notes: string,
    date_seen: string,
  ): Promise<boolean> {
    setLoading(true);

    try {
      const { data, error } = await createSighting(
        species,
        count,
        notes,
        date_seen,
      );

      if (error) {
        console.error(error);
        setErrorMessage("Error adding sighting");
        setTimeout(() => setErrorMessage(""), 2500);
        return false;
      }

      if (data) {
        setSightings((prev) => [data, ...prev]);
      }

      setSuccessMessage("Sighting added successfully!");
      setTimeout(() => setSuccessMessage(""), 2500);

      return true;
    } catch (error) {
      console.error(error);
      setErrorMessage("Network error while adding sighting");
      setTimeout(() => setErrorMessage(""), 2500);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this sighting?",
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    try {
      const { error } = await deleteSighting(id);

      if (error) {
        console.error(error);
        alert("Error deleting sighting");
        return;
      }

      setSightings((prev) => prev.filter((sighting) => sighting.id !== id));
    } finally {
      setDeletingId(null);
    }
  }

  async function handleUpdateSighting(
    id: string,
    draft: {
      species: string;
      count: number;
      notes: string;
      date_seen: string;
    },
  ) {
    const { data, error } = await updateSighting(id, draft);

    if (error) {
      console.error(error);
      setErrorMessage("Error updating sighting");
      setTimeout(() => setErrorMessage(""), 2500);
      return;
    }

    if (data) {
      setSightings((prev) => prev.map((s) => (s.id === data.id ? data : s)));
    }
  }

  return (
    <main
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        padding: "2rem",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
        Backyard Bird Tracker
      </h1>

      <SightingsForm
        birds={birds}
        onAdd={addSighting}
        loading={loading}
        successMessage={successMessage}
        errorMessage={errorMessage}
      />

      {!isFetching && displayedSightings.length === 0 && (
        <p style={{ marginTop: "1rem" }}>No sightings match your filter.</p>
      )}

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "1rem",
          marginBottom: "1.5rem",
          backgroundColor: "#f8fafc",
          color: "#222",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <h2
          style={{
            marginTop: 0,
            marginBottom: "1rem",
            fontSize: "1.1rem",
            color: "#1e3a8a",
          }}
        >
          Yard Stats
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "0.75rem",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "0.85rem",
                color: "#666",
              }}
            >
              Total Sightings
            </div>

            <div
              style={{
                fontSize: "1.4rem",
                fontWeight: 700,
              }}
            >
              {totalSightings}
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: "0.85rem",
                color: "#666",
              }}
            >
              Species Seen
            </div>

            <div
              style={{
                fontSize: "1.4rem",
                fontWeight: 700,
              }}
            >
              {speciesSeen}
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: "0.85rem",
                color: "#666",
              }}
            >
              Birds Counted
            </div>

            <div
              style={{
                fontSize: "1.4rem",
                fontWeight: 700,
              }}
            >
              {totalBirdsCounted}
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: "1rem",
            paddingTop: "1rem",
            borderTop: "1px solid #ddd",
          }}
        >
          <div
            style={{
              fontSize: "0.85rem",
              color: "#666",
              marginBottom: "0.25rem",
            }}
          >
            Top Visitors
          </div>

          <div
            style={{
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            {topVisitorsText}
          </div>
        </div>
      </div>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "1rem",
          marginBottom: "1.5rem",
          backgroundColor: "#fff",
          color: "#222",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <h2
          style={{
            marginTop: 0,
            marginBottom: "1rem",
            fontSize: "1.1rem",
            color: "#1e3a8a",
          }}
        >
          Species Seen ({speciesSeenList.length})
        </h2>

        <ul
          style={{
            margin: 0,
            paddingLeft: "1.25rem",
          }}
        >
          {speciesSeenList.map((species) => (
            <div
              key={species}
              style={{
                marginBottom: "0.35rem",
              }}
            >
              ✓ {species}
            </div>
          ))}
        </ul>
      </div>

      <SeasonalTracking speciesData={seasonalSpeciesData} />

      <h2>Recent Sightings</h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap",
          padding: "1rem",
          marginBottom: "1.5rem",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <strong
          style={{
            width: "100%",
            display: "block",
            marginBottom: "0.5rem",
          }}
        >
          List Controls
        </strong>
        <div>
          <label htmlFor="speciesFilter" style={{ marginRight: "0.5rem" }}>
            Bird:
          </label>

          <select
            id="speciesFilter"
            value={speciesFilter}
            onChange={(e) => setSpeciesFilter(e.target.value)}
            style={{
              padding: "0.4rem",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          >
            <option value="">All Birds</option>

            {speciesOptions.map((bird) => (
              <option key={bird} value={bird}>
                {bird}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={() => setSpeciesFilter("")}
          disabled={!speciesFilter}
          style={{
            padding: "0.4rem 0.7rem",
            borderRadius: "6px",
            backgroundColor: "#dc2626",
            color: "white",
            border: "1px solid #b91c1c",
            cursor: "pointer",
          }}
        >
          Clear
        </button>

        <div>
          <label htmlFor="sortOrder" style={{ marginRight: "0.5rem" }}>
            Sort:
          </label>

          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            style={{
              padding: "0.4rem",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>
      <SightingsList
        sightings={displayedSightings}
        isFetching={isFetching}
        deletingId={deletingId}
        onDelete={handleDelete}
        isFilterActive={speciesFilter !== ""}
        onUpdateSighting={handleUpdateSighting}
        birds={birds}
      />
    </main>
  );
}
