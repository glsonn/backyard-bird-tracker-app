type SeasonalSpecies = {
  species: string;
  firstSeen: string;
  lastSeen: string;
  daysSinceSeen: number;
};

type SeasonalTrackingProps = {
  speciesData: SeasonalSpecies[];
};

export default function SeasonalTracking({
  speciesData,
}: SeasonalTrackingProps) {
  if (speciesData.length === 0) {
    return null;
  }
  return (
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
        Seasonal Tracking
      </h2>

      {speciesData.map((species) => (
        <div
          key={species.species}
          style={{
            marginBottom: "1rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid #eee",
          }}
        >
          <div style={{ fontWeight: 600 }}>{species.species}</div>

          <div>
            First Seen:{" "}
            {new Date(species.firstSeen).toLocaleDateString("en-US")}
          </div>

          <div>
            Last Seen: {new Date(species.lastSeen).toLocaleDateString("en-US")}
          </div>

          <div>
            {species.daysSinceSeen === 0
              ? "Seen Today"
              : species.daysSinceSeen === 1
                ? "Seen Yesterday"
                : `Seen ${species.daysSinceSeen} days ago`}
          </div>
        </div>
      ))}
    </div>
  );
}
