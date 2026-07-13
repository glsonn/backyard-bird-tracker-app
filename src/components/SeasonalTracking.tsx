import { formatDate } from "@/lib/dateUtils";

type SeasonalSpecies = {
  species: string;
  firstSeen: string;
  lastSeen: string;
  daysSinceSeen: number;
};

type FirstSeenThisYear = {
  species: string;
  firstSeen: string;
};

type SeasonalTrackingProps = {
  speciesData: SeasonalSpecies[];
  firstSeenThisYear: FirstSeenThisYear[];
  visitorsNotSeenLately: VisitorNotSeenLately[];
};

type VisitorNotSeenLately = {
  species: string;
  lastSeen: string;
  daysSinceSeen: number;
};

export default function SeasonalTracking({
  speciesData,
  firstSeenThisYear,
  visitorsNotSeenLately,
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

      {firstSeenThisYear.length > 0 && (
        <div
          style={{
            marginBottom: "1.5rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid #eee",
          }}
        >
          <div
            style={{
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
          >
            First Seen This Year
          </div>

          {firstSeenThisYear.map((species) => (
            <div
              key={species.species}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "0.75rem",
                alignItems: "baseline",
                marginBottom: "0.35rem",
              }}
            >
              <span>{species.species}</span>

              <span
                style={{
                  whiteSpace: "nowrap",
                  color: "#666",
                  fontSize: "0.9rem",
                }}
              >
                {formatDate(species.firstSeen)}
              </span>
            </div>
          ))}
        </div>
      )}

      {visitorsNotSeenLately.length > 0 && (
        <div
          style={{
            marginBottom: "1.5rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid #eee",
          }}
        >
          <div
            style={{
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
          >
            Visitors We Haven&apos;t Seen Lately
          </div>

          {visitorsNotSeenLately.map((species) => (
            <div
              key={species.species}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "0.75rem",
                alignItems: "baseline",
                marginBottom: "0.35rem",
              }}
            >
              <span>{species.species}</span>

              <span
                style={{
                  whiteSpace: "nowrap",
                  color: "#666",
                  fontSize: "0.9rem",
                }}
              >
                {formatDate(species.lastSeen)}
              </span>
            </div>
          ))}
        </div>
      )}

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

          <div>First Seen: {formatDate(species.firstSeen)}</div>

          <div>Last Seen: {formatDate(species.lastSeen)}</div>

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
