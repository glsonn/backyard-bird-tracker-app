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
  if (isFetching) return <p>Loading sightings...</p>;

  if (sightings.length === 0)
    return <p>No sightings yet. Start by adding one 🐦</p>;

  return (
    <ul style={{ padding: 0 }}>
      {sightings.map((sighting) => (
        <li
          key={sighting.id}
          style={{ listStyle: "none", marginBottom: "1rem" }}
        >
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
          <small>{new Date(sighting.created_at).toLocaleString()}</small>
          <br />
          <button
            onClick={() => onDelete(sighting.id)}
            disabled={deletingId === sighting.id}
          >
            {deletingId === sighting.id ? "Deleting..." : "Delete"}
          </button>
        </li>
      ))}
    </ul>
  );
}
