"use client";

import { useEffect, useState } from "react";

import { getSightings, createSighting, deleteSighting } from "@/lib/sightings";
import SightingsForm from "@/components/SightingsForm";
import SightingsList from "@/components/SightingsList";
import type { Sighting } from "@/types/sighting";

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

  async function addSighting(
    species: string,
    count: number,
    notes: string,
  ): Promise<boolean> {
    setLoading(true);

    try {
      const { data, error } = await createSighting(species, count, notes);

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
  return (
    <main style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto" }}>
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

      <h2>Recent Sightings</h2>

      <SightingsList
        sightings={sightings}
        isFetching={isFetching}
        deletingId={deletingId}
        onDelete={handleDelete}
      />
    </main>
  );
}
