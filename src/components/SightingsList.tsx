"use client";

type Sighting = {
  id: string;
  species: string;
  count: number;
  notes: string | null;
  created_at: string;
};

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
  if (isFetching)
    return (
      <p
        style={{
          textAlign: "center",
          color: "#666",
          padding: "1rem",
        }}
      >
        Loading sightings...
      </p>
    );

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

  return (
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
          <small>{new Date(sighting.created_at).toLocaleString()}</small>
          <br />
          <button
            onClick={() => onDelete(sighting.id)}
            disabled={deletingId === sighting.id}
            style={{
              marginTop: "0.5rem",
              padding: "0.5rem 0.75rem",
              border: "none",
              borderRadius: "6px",
              backgroundColor: "#d9534f",
              color: "white",
              cursor: deletingId === sighting.id ? "not-allowed" : "pointer",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#c9302c";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#d9534f";
            }}
          >
            {deletingId === sighting.id ? "Deleting..." : "Delete"}
          </button>
        </li>
      ))}
    </ul>
  );
}
