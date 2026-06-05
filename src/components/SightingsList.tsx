"use client";

import type { Sighting } from "@/types/sighting";

type Props = {
  sightings: Sighting[];
  isFetching: boolean;
  deletingId: string | null;
  onDelete: (id: string) => void;
};

export default function SightingsList({
  sightings,
  isFetching,
  deletingId,
  onDelete,
}: Props) {
  if (isFetching && sightings.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "#666", padding: "1rem" }}>
        Loading sightings...
      </p>
    );
  }

  if (sightings.length === 0)
    return (
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
    );

  const isRefreshing = isFetching && sightings.length > 0;

  return (
    <>
      {isRefreshing && (
        <p
          style={{
            textAlign: "center",
            color: "#888",
            fontSize: "0.9rem",
            marginBottom: "0.5rem",
          }}
        >
          Updating sightings...
        </p>
      )}

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
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "1rem",
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {sighting.species}
                </div>

                <div style={{ marginBottom: "0.25rem" }}>
                  Count: {sighting.count}
                </div>

                {sighting.notes && (
                  <div style={{ marginBottom: "0.25rem" }}>
                    Notes: {sighting.notes}
                  </div>
                )}

                <small
                  style={{
                    display: "block",
                    color: "#666",
                  }}
                >
                  {new Date(sighting.created_at).toLocaleString()}
                </small>
              </div>

              <button
                onClick={() => onDelete(sighting.id)}
                disabled={deletingId === sighting.id}
                style={{
                  marginTop: "0.5rem",
                  padding: "0.5rem 0.75rem",
                  border: "none",
                  borderRadius: "6px",
                  backgroundColor:
                    deletingId === sighting.id ? "#e57373" : "#d9534f",
                  color: "white",
                  cursor:
                    deletingId === sighting.id ? "not-allowed" : "pointer",
                  opacity: deletingId === sighting.id ? 0.7 : 1,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (deletingId === sighting.id) return;
                  e.currentTarget.style.backgroundColor = "#c9302c";
                }}
                onMouseLeave={(e) => {
                  if (deletingId === sighting.id) return;
                  e.currentTarget.style.backgroundColor = "#d9534f";
                }}
              >
                {deletingId === sighting.id ? "Deleting…" : "Delete"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
