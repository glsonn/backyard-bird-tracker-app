"use client";

import { useState } from "react";
import type { Sighting } from "@/types/sighting";
// import { updateSighting } from "@/lib/sightings";
import SpeciesSelect from "@/components/SpeciesSelect";

const buttonBase: React.CSSProperties = {
  padding: "0.5rem 0.75rem",
  borderRadius: "6px",
  border: "none",
  color: "white",
  cursor: "pointer",
  fontSize: "0.9rem",
  lineHeight: 1,
  minWidth: "70px",
};

type Props = {
  sightings: Sighting[];
  isFetching: boolean;
  deletingId: string | null;
  onDelete: (id: string) => void;
  isFilterActive: boolean;
  onUpdateSighting: (
    id: string,
    draft: {
      species: string;
      count: number;
      notes: string;
      date_seen: string;
    },
  ) => Promise<void>;
  birds: string[];
};

export default function SightingsList({
  sightings,
  isFetching,
  deletingId,
  onDelete,
  isFilterActive,
  onUpdateSighting,
  birds,
}: Props) {
  const [draftSighting, setDraftSighting] = useState<{
    species: string;
    count: number;
    notes: string;
    date_seen: string;
  } | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  if (isFetching && sightings.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "#666", padding: "1rem" }}>
        Loading sightings...
      </p>
    );
  }

  if (sightings.length === 0 && !isFilterActive) {
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
  }

  if (sightings.length === 0 && isFilterActive) {
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
        No sightings match your filter.
      </p>
    );
  }

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
            <div>
              <div
                style={{
                  flex: 1,
                  color: "#222",
                }}
              >
                {editingId === sighting.id && draftSighting ? (
                  <div>
                    <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                      Editing sighting...
                    </div>

                    <SpeciesSelect
                      value={draftSighting.species}
                      options={birds}
                      onChange={(value) =>
                        setDraftSighting({
                          ...draftSighting,
                          species: value,
                        })
                      }
                    />

                    <div style={{ marginBottom: "0.5rem" }}>
                      <label>Count</label>
                      <input
                        type="number"
                        value={draftSighting.count}
                        onChange={(e) =>
                          setDraftSighting({
                            ...draftSighting,
                            count: Number(e.target.value),
                          })
                        }
                        onFocus={(e) => e.target.select()}
                        style={{
                          display: "block",
                          width: "100%",
                          padding: "0.4rem",
                          marginTop: "0.25rem",
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: "0.5rem" }}>
                      <label>Date Seen</label>
                      <input
                        type="date"
                        value={draftSighting.date_seen}
                        onChange={(e) =>
                          setDraftSighting({
                            ...draftSighting,
                            date_seen: e.target.value,
                          })
                        }
                        style={{
                          display: "block",
                          width: "100%",
                          padding: "0.4rem",
                          marginTop: "0.25rem",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: "0.5rem" }}>
                      <label>Notes</label>
                      <textarea
                        value={draftSighting.notes}
                        onChange={(e) =>
                          setDraftSighting({
                            ...draftSighting,
                            notes: e.target.value,
                          })
                        }
                        rows={4}
                        style={{
                          display: "block",
                          width: "100%",
                          padding: "0.4rem",
                          marginTop: "0.25rem",
                          boxSizing: "border-box",
                          resize: "vertical",
                        }}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        setDraftSighting(null);
                      }}
                      style={{
                        padding: "0.4rem 0.7rem",
                        borderRadius: "6px",
                        backgroundColor: "#6b7280",
                        color: "white",
                        border: "none",
                        marginRight: "0.5rem",
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={async () => {
                        if (!draftSighting || !editingId) return;

                        await onUpdateSighting(editingId, draftSighting);

                        setEditingId(null);
                        setDraftSighting(null);
                      }}
                      style={{
                        padding: "0.4rem 0.7rem",
                        borderRadius: "6px",
                        backgroundColor: "#2563eb",
                        color: "white",
                        border: "none",
                        marginRight: "0.5rem",
                      }}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <>
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

                    <div style={{ marginBottom: "0.25rem" }}>
                      Seen: {new Date(sighting.date_seen).toLocaleDateString()}
                    </div>

                    {sighting.notes && (
                      <div style={{ marginBottom: "0.25rem" }}>
                        Notes: {sighting.notes}
                      </div>
                    )}
                  </>
                )}
              </div>

              {editingId !== sighting.id && (
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    marginTop: "1rem",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(sighting.id);

                      setDraftSighting({
                        species: sighting.species,
                        count: sighting.count,
                        notes: sighting.notes ?? "",
                        date_seen: sighting.date_seen,
                      });
                    }}
                    style={{
                      ...buttonBase,
                      backgroundColor: "#2563eb",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(sighting.id)}
                    disabled={deletingId === sighting.id}
                    style={{
                      ...buttonBase,
                      backgroundColor:
                        deletingId === sighting.id ? "#e57373" : "#d9534f",
                      opacity: deletingId === sighting.id ? 0.7 : 1,
                      cursor:
                        deletingId === sighting.id ? "not-allowed" : "pointer",
                    }}
                  >
                    {deletingId === sighting.id ? "Deleting…" : "Delete"}
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
