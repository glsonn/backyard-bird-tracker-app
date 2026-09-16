"use client";

import { useEffect, useRef, useState } from "react";

import {
  getSightings,
  findJournal,
  createSighting,
  deleteSighting,
  updateSighting,
  replaceJournal,
} from "@/lib/sightings";
import SightingsForm from "@/components/SightingsForm";
import SightingsList from "@/components/SightingsList";
import SeasonalTracking from "@/components/SeasonalTracking";
import { formatDate, daysSince } from "@/lib/dateUtils";
import { birds } from "@/lib/birds";
import type { Sighting, SightingDayGroup } from "@/types/sighting";
import { getUserId, setUserId } from "@/lib/userId";

type SortOrder = "newest" | "oldest";

export default function Home() {
  const [sightings, setSightings] = useState<Sighting[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [journalId, setJournalId] = useState("");
  const [recoveryId, setRecoveryId] = useState("");
  const [recoveryMessage, setRecoveryMessage] = useState("");
  const [isRecovering, setIsRecovering] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importPreview, setImportPreview] = useState<Sighting[]>([]);
  const [importMessage, setImportMessage] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(() => {
    if (typeof window === "undefined") {
      return "newest";
    }

    const saved = localStorage.getItem("sortOrder");

    return saved === "oldest" ? "oldest" : "newest";
  });
  const [speciesFilter, setSpeciesFilter] = useState<string>("");
  const [selectedSpecies, setSelectedSpecies] = useState<string>("");
  const sightingsRef = useRef<HTMLDivElement | null>(null);
  const topRef = useRef<HTMLElement | null>(null);

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

  useEffect(() => {
    setJournalId(getUserId());
  }, []);

  useEffect(() => {
    const savedSortOrder = localStorage.getItem("sortOrder");

    if (savedSortOrder === "newest" || savedSortOrder === "oldest") {
      setSortOrder(savedSortOrder);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sortOrder", sortOrder);
  }, [sortOrder]);

  async function handleJournalRecovery() {
    const id = recoveryId.trim();

    if (!id) {
      setRecoveryMessage("Please enter your Journal ID.");
      return;
    }

    setIsRecovering(true);
    setRecoveryMessage("");

    try {
      const { count, error } = await findJournal(id);

      if (error) {
        console.error(error);
        setRecoveryMessage(
          "We couldn't check that Journal ID. Please try again.",
        );
        return;
      }

      if (!count) {
        setRecoveryMessage(
          "No sightings were found for that Journal ID. Please check the ID and try again.",
        );
        return;
      }

      const confirmed = window.confirm(
        `We found ${count} ${count === 1 ? "sighting" : "sightings"} in that journal. Restore it on this browser?`,
      );

      if (!confirmed) {
        return;
      }

      setUserId(id);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setRecoveryMessage("Network error while checking the Journal ID.");
    } finally {
      setIsRecovering(false);
    }
  }

  async function handleCopyJournalId() {
    try {
      await navigator.clipboard.writeText(journalId);
      setCopyMessage("Copied!");

      setTimeout(() => {
        setCopyMessage("");
      }, 2000);
    } catch (error) {
      console.error(error);
      setCopyMessage("Unable to copy.");
    }
  }

  function handleExportJournal() {
    if (sightings.length === 0) {
      alert("There are no sightings to export yet.");
      return;
    }

    const headers = [
      "id",
      "created_at",
      "species",
      "count",
      "notes",
      "location",
      "date_seen",
    ];

    const escapeCsvValue = (value: string | number | null | undefined) => {
      const stringValue = String(value ?? "");

      return `"${stringValue.replace(/"/g, '""')}"`;
    };

    const rows = sightings.map((sighting) =>
      [
        sighting.id,
        sighting.created_at,
        sighting.species,
        sighting.count,
        sighting.notes,
        sighting.location,
        sighting.date_seen,
      ]
        .map(escapeCsvValue)
        .join(","),
    );

    const csv = [headers.join(","), ...rows].join("\r\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `backyard-bird-tracker-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  function handleImportFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setImportFile(file);
    setImportPreview([]);
    setImportMessage("");

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const text = String(reader.result ?? "");
        const lines: string[] = [];
        let currentLine = "";
        let insideQuotes = false;

        for (let i = 0; i < text.length; i++) {
          const character = text[i];

          if (character === '"') {
            if (insideQuotes && text[i + 1] === '"') {
              currentLine += '""';
              i++;
            } else {
              insideQuotes = !insideQuotes;
              currentLine += character;
            }
          } else if (
            (character === "\n" || character === "\r") &&
            !insideQuotes
          ) {
            if (character === "\r" && text[i + 1] === "\n") {
              i++;
            }

            lines.push(currentLine);
            currentLine = "";
          } else {
            currentLine += character;
          }
        }

        if (currentLine) {
          lines.push(currentLine);
        }

        if (lines.length < 2) {
          setImportMessage("This file doesn't contain any sightings.");
          return;
        }

        const headers = lines[0].split(",").map((header) => header.trim());

        const requiredHeaders = [
          "id",
          "created_at",
          "species",
          "count",
          "notes",
          "location",
          "date_seen",
        ];

        const hasRequiredHeaders = requiredHeaders.every((header) =>
          headers.includes(header),
        );

        if (!hasRequiredHeaders) {
          setImportMessage(
            "This doesn't appear to be a Backyard Bird Tracker journal export.",
          );
          return;
        }

        const headerIndexes = {
          id: headers.indexOf("id"),
          created_at: headers.indexOf("created_at"),
          species: headers.indexOf("species"),
          count: headers.indexOf("count"),
          notes: headers.indexOf("notes"),
          location: headers.indexOf("location"),
          date_seen: headers.indexOf("date_seen"),
        };

        function parseCsvLine(line: string): string[] {
          const values: string[] = [];
          let current = "";
          let insideQuotes = false;

          for (let i = 0; i < line.length; i++) {
            const character = line[i];

            if (character === '"') {
              if (insideQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
              } else {
                insideQuotes = !insideQuotes;
              }
            } else if (character === "," && !insideQuotes) {
              values.push(current);
              current = "";
            } else {
              current += character;
            }
          }

          values.push(current);

          return values;
        }

        const importedSightings: Sighting[] = [];

        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();

          if (!line) {
            continue;
          }

          const values = parseCsvLine(line);

          const id = values[headerIndexes.id]?.trim();
          const created_at = values[headerIndexes.created_at]?.trim();
          const species = values[headerIndexes.species]?.trim();
          const count = Number(values[headerIndexes.count]);
          const notes = values[headerIndexes.notes]?.trim() ?? "";
          const location = values[headerIndexes.location]?.trim() ?? "";
          const date_seen = values[headerIndexes.date_seen]?.trim();

          if (
            !id ||
            !created_at ||
            !species ||
            !Number.isInteger(count) ||
            count < 1 ||
            !date_seen
          ) {
            setImportPreview([]);
            setImportMessage(
              `The import file contains an invalid sighting on row ${i + 1}.`,
            );
            return;
          }

          importedSightings.push({
            id,
            created_at,
            species,
            count,
            notes,
            location,
            date_seen,
            user_id: journalId,
          });
        }

        if (importedSightings.length === 0) {
          setImportMessage("This file doesn't contain any sightings.");
          return;
        }

        setImportPreview(importedSightings);
        setImportMessage(
          `${importedSightings.length} ${
            importedSightings.length === 1 ? "sighting" : "sightings"
          } ready to import.`,
        );
      } catch (error) {
        console.error(error);
        setImportPreview([]);
        setImportMessage(
          "We couldn't read this file. Please choose a Backyard Bird Tracker CSV export.",
        );
      }
    };

    reader.onerror = () => {
      setImportPreview([]);
      setImportMessage("We couldn't read that file. Please try again.");
    };

    reader.readAsText(file);
  }

  async function handleReplaceJournal() {
    if (importPreview.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      `This will replace your current journal with ${importPreview.length} ${
        importPreview.length === 1 ? "sighting" : "sightings"
      } from the selected file.\n\nYour Journal ID will not change.\n\nContinue?`,
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);
    setImportMessage("");

    try {
      const { error } = await replaceJournal(journalId, importPreview);

      if (error) {
        console.error(error);
        setImportMessage(
          "We couldn't import your journal. Your existing journal may still be unchanged.",
        );
        return;
      }

      window.location.reload();
    } catch (error) {
      console.error(error);
      setImportMessage(
        "Network error while importing your journal. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  const displayedSightings = sightings
    .filter((sighting) => {
      if (!speciesFilter) return true;

      return sighting.species === speciesFilter;
    })
    .sort((a, b) => {
      if (sortOrder === "oldest") {
        return (
          new Date(a.date_seen).getTime() - new Date(b.date_seen).getTime()
        );
      }

      return new Date(b.date_seen).getTime() - new Date(a.date_seen).getTime();
    });

  const groupedSightings: SightingDayGroup[] = [];

  for (const sighting of displayedSightings) {
    const lastGroup = groupedSightings[groupedSightings.length - 1];

    if (lastGroup?.date === sighting.date_seen) {
      lastGroup.sightings.push(sighting);
    } else {
      groupedSightings.push({
        date: sighting.date_seen,
        sightings: [sighting],
      });
    }
  }

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

  const speciesSummary = Array.from(
    new Set(sightings.map((sighting) => sighting.species)),
  )
    .map((species) => {
      const speciesSightings = sightings.filter(
        (sighting) => sighting.species === species,
      );

      const sortedDates = speciesSightings
        .map((sighting) => sighting.date_seen)
        .sort();

      return {
        species,
        sightingsCount: speciesSightings.length,
        lastSeen: sortedDates[sortedDates.length - 1],
      };
    })
    .sort((a, b) => b.sightingsCount - a.sightingsCount);

  const seasonalSpeciesData = speciesSeenList.map((species) => {
    const speciesSightings = sightings.filter(
      (sighting) => sighting.species === species,
    );

    const sortedDates = speciesSightings
      .map((sighting) => sighting.date_seen)
      .sort();

    const firstSeen = sortedDates[0];
    const lastSeen = sortedDates[sortedDates.length - 1];

    const daysSinceSeen = daysSince(lastSeen);

    return {
      species,
      firstSeen,
      lastSeen,
      daysSinceSeen,
    };
  });

  const currentYear = new Date().getFullYear();

  const firstSeenThisYear = speciesSeenList
    .map((species) => {
      const sightingsThisYear = sightings.filter(
        (sighting) =>
          sighting.species === species &&
          sighting.date_seen.startsWith(String(currentYear)),
      );

      if (sightingsThisYear.length === 0) {
        return null;
      }

      const firstSeen = sightingsThisYear
        .map((sighting) => sighting.date_seen)
        .sort()[0];

      return {
        species,
        firstSeen,
      };
    })
    .filter(
      (
        item,
      ): item is {
        species: string;
        firstSeen: string;
      } => item !== null,
    )
    .sort((a, b) => a.firstSeen.localeCompare(b.firstSeen));

  const visitorsNotSeenLately = seasonalSpeciesData
    .filter((species) => {
      const seenThisYear = sightings.some(
        (sighting) =>
          sighting.species === species.species &&
          sighting.date_seen.startsWith(String(currentYear)),
      );

      return seenThisYear && species.daysSinceSeen >= 30;
    })
    .sort((a, b) => b.daysSinceSeen - a.daysSinceSeen);

  async function addSighting(
    species: string,
    count: number,
    notes: string,
    location: string,
    date_seen: string,
  ): Promise<boolean> {
    setLoading(true);

    const existingSightings = sightings.filter((s) => s.species === species);

    const isFirstEver = existingSightings.length === 0;

    const year = date_seen.slice(0, 4);

    const hasSeenThisYear = existingSightings.some((s) =>
      s.date_seen.startsWith(year),
    );

    const isFirstThisYear = !isFirstEver && !hasSeenThisYear;

    const previousSighting = existingSightings.reduce<Sighting | null>(
      (latest, current) =>
        !latest || current.date_seen > latest.date_seen ? current : latest,
      null,
    );

    const daysAgo = previousSighting
      ? daysSince(previousSighting.date_seen)
      : null;

    try {
      const { data, error } = await createSighting(
        species,
        count,
        notes,
        location,
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

      let message = `✓ ${species} recorded.`;

      if (isFirstEver) {
        message = `🎉 Your first ${species}!`;
      } else if (isFirstThisYear) {
        message = `🌸 First ${species} of ${year}.`;
      } else if (daysAgo !== null && daysAgo >= 30) {
        message = `✓ ${species} recorded. Last seen ${daysAgo} days ago.`;
      }

      setSuccessMessage(message);
      setTimeout(() => setSuccessMessage(""), 4000);

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
      "Remove this sighting from your journal?\n\nThis action can't be undone.",
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
      location: string;
      date_seen: string;
    },
  ): Promise<boolean> {
    const { data, error } = await updateSighting(id, draft);

    if (error) {
      console.error(error);
      setErrorMessage("Error updating sighting");
      setTimeout(() => setErrorMessage(""), 2500);
      return false;
    }

    if (data) {
      setSightings((prev) => prev.map((s) => (s.id === data.id ? data : s)));
    }

    return true;
  }
  const lastSeenSighting = sightings
    .filter((sighting) => sighting.species === selectedSpecies)
    .sort((a, b) => b.date_seen.localeCompare(a.date_seen))[0];

  return (
    <main
      ref={topRef}
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

      {!isFetching && totalSightings === 0 && (
        <p>Start your bird journal by recording your first visitors today.</p>
      )}

      <SightingsForm
        birds={birds}
        onAdd={addSighting}
        loading={loading}
        successMessage={successMessage}
        errorMessage={errorMessage}
        selectedSpecies={selectedSpecies}
        onSpeciesChange={setSelectedSpecies}
        lastSeenSighting={lastSeenSighting}
      />

      <p
        style={{
          marginTop: "-0.25rem",
          marginBottom: "1.5rem",
          fontSize: "0.85rem",
          color: "#666",
          textAlign: "center",
        }}
      >
        Don't see the bird you're looking for?
        <br />
        <a
          href="mailto:contact@backyardbirdtracker.com"
          style={{
            color: "#355c45",
            fontWeight: 600,
          }}
        >
          Let us know.
        </a>
      </p>

      {!isFetching && totalSightings === 0 && (
        <p>Record today's first visitor above.</p>
      )}

      {!isFetching && totalSightings > 0 && displayedSightings.length === 0 && (
        <>
          <p>No sightings match the selected bird.</p>
          <p>Try choosing "All Birds" to view your full journal.</p>
        </>
      )}

      {displayedSightings.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "0.5rem 0 1.5rem",
          }}
        >
          <button
            type="button"
            onClick={() =>
              sightingsRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
            style={{
              padding: "0.5rem 0.9rem",
              borderRadius: "6px",
              border: "1px solid #2563eb",
              backgroundColor: "#2563eb",
              color: "white",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
          >
            Jump to Recent Sightings
          </button>
        </div>
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

        {speciesSummary.length === 0 ? (
          <p>
            As you record birds, this list will become a living history of your
            backyard visitors.
          </p>
        ) : (
          <ul
            style={{
              margin: 0,
              paddingLeft: "1.25rem",
            }}
          >
            {speciesSummary.map((bird) => (
              <div
                key={bird.species}
                style={{
                  marginBottom: "0.75rem",
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {bird.species}
                </div>

                <div
                  style={{
                    fontSize: "0.9rem",
                    color: "#666",
                  }}
                >
                  {bird.sightingsCount}{" "}
                  {bird.sightingsCount === 1 ? "sighting" : "sightings"}
                  {" • Last seen "}
                  {formatDate(bird.lastSeen)}
                </div>
              </div>
            ))}
          </ul>
        )}
      </div>

      <SeasonalTracking
        speciesData={seasonalSpeciesData}
        firstSeenThisYear={firstSeenThisYear}
        visitorsNotSeenLately={visitorsNotSeenLately}
      />

      <h2>Recent Sightings</h2>

      <button
        type="button"
        onClick={() =>
          topRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
        style={{
          padding: "0.3rem 0",
          marginBottom: "0.75rem",
          background: "none",
          border: "none",
          color: "#2563eb",
          cursor: "pointer",
          fontSize: "0.9rem",
        }}
      >
        ↑ Back to top
      </button>

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
        <div
          style={{
            flex: "1 1 200px",
            minWidth: 0,
          }}
        >
          <label
            htmlFor="speciesFilter"
            style={{
              display: "block",
              marginBottom: "0.25rem",
              fontSize: "0.9rem",
              fontWeight: 500,
            }}
          >
            Bird
          </label>

          <select
            id="speciesFilter"
            value={speciesFilter}
            onChange={(e) => setSpeciesFilter(e.target.value)}
            style={{
              width: "100%",
              maxWidth: "100%",
              boxSizing: "border-box",
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
            backgroundColor: !speciesFilter ? "#d1d5db" : "#dc2626",
            color: "white",
            border: "1px solid #b91c1c",
            cursor: !speciesFilter ? "not-allowed" : "pointer",
            opacity: !speciesFilter ? 0.7 : 1,
          }}
        >
          Clear
        </button>

        <div
          style={{
            flex: "1 1 200px",
            minWidth: 0,
          }}
        >
          <label
            htmlFor="sortOrder"
            style={{
              display: "block",
              marginBottom: "0.25rem",
              fontSize: "0.9rem",
              fontWeight: 500,
            }}
          >
            Sort
          </label>

          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            style={{
              width: "100%",
              maxWidth: "100%",
              boxSizing: "border-box",
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

      <div ref={sightingsRef}>
        <SightingsList
          groups={groupedSightings}
          isFetching={isFetching}
          deletingId={deletingId}
          onDelete={handleDelete}
          isFilterActive={speciesFilter !== ""}
          onUpdateSighting={handleUpdateSighting}
          birds={birds}
        />
      </div>

      <div
        style={{
          marginTop: "2rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid #ddd",
        }}
      >
        <h2
          style={{
            marginTop: 0,
            fontSize: "1rem",
          }}
        >
          Journal Recovery
        </h2>

        <p
          style={{
            fontSize: "0.9rem",
            color: "#666",
            lineHeight: 1.5,
          }}
        >
          Your journal is connected to this browser using a unique Journal ID.
          Keep this ID somewhere safe in case your browser data is ever cleared.
        </p>

        <div style={{ marginTop: "1rem" }}>
          <button
            type="button"
            onClick={handleExportJournal}
            disabled={sightings.length === 0}
            style={{
              padding: "0.5rem 0.75rem",
              borderRadius: "6px",
              border: "none",
              backgroundColor: sightings.length === 0 ? "#999" : "#355c45",
              color: "white",
              cursor: sightings.length === 0 ? "not-allowed" : "pointer",
            }}
          >
            Export Journal
          </button>

          <p
            style={{
              marginTop: "0.5rem",
              marginBottom: 0,
              fontSize: "0.85rem",
              color: "#666",
            }}
          >
            Save a copy of your journal as a CSV file.
          </p>
        </div>

        <details style={{ marginTop: "1rem" }}>
          <summary
            style={{
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Import Journal
          </summary>

          <div style={{ marginTop: "1rem" }}>
            <label
              htmlFor="journalImport"
              style={{
                display: "inline-block",
                padding: "0.5rem 0.75rem",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#355c45",
                color: "white",
                cursor: "pointer",
              }}
            >
              Choose a Backyard Bird Tracker CSV file
            </label>

            <input
              id="journalImport"
              type="file"
              accept=".csv,text/csv"
              onChange={handleImportFile}
              style={{ display: "none" }}
            />

            {importFile && (
              <p
                style={{
                  marginTop: "0.75rem",
                  marginBottom: 0,
                  fontSize: "0.85rem",
                  color: "#666",
                  wordBreak: "break-word",
                }}
              >
                Selected file: <strong>{importFile.name}</strong>
              </p>
            )}

            {importMessage && (
              <p
                style={{
                  marginTop: "0.75rem",
                  marginBottom: 0,
                  fontSize: "0.9rem",
                  color: importPreview.length > 0 ? "#355c45" : "#b91c1c",
                }}
              >
                {importMessage}
              </p>
            )}

            {importPreview.length > 0 && (
              <div
                style={{
                  marginTop: "1rem",
                  padding: "1rem",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "6px",
                }}
              >
                <strong>Import preview</strong>

                <p
                  style={{
                    marginTop: "0.5rem",
                    marginBottom: "0.75rem",
                    fontSize: "0.9rem",
                  }}
                >
                  This file contains <strong>{importPreview.length}</strong>{" "}
                  {importPreview.length === 1 ? "sighting" : "sightings"} from{" "}
                  <strong>
                    {
                      new Set(importPreview.map((sighting) => sighting.species))
                        .size
                    }
                  </strong>{" "}
                  {new Set(importPreview.map((sighting) => sighting.species))
                    .size === 1
                    ? "species"
                    : "species"}
                  .
                </p>

                <p
                  style={{
                    marginBottom: 0,
                    fontSize: "0.85rem",
                    color: "#666",
                  }}
                >
                  No changes have been made to your journal.
                </p>
                <button
                  type="button"
                  onClick={handleReplaceJournal}
                  disabled={loading}
                  style={{
                    marginTop: "1rem",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: loading ? "#999" : "#355c45",
                    color: "white",
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "Importing..." : "Replace Current Journal"}
                </button>
              </div>
            )}
          </div>
        </details>

        <div style={{ marginTop: "1rem" }}>
          <strong
            style={{
              display: "block",
              marginBottom: "0.35rem",
              fontSize: "0.9rem",
            }}
          >
            Your Journal ID
          </strong>

          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              gap: "0.5rem",
            }}
          >
            <div
              style={{
                flex: 1,
                minWidth: 0,
                backgroundColor: "#f5f5f5",
                padding: "0.75rem",
                borderRadius: "6px",
                fontSize: "0.85rem",
                wordBreak: "break-all",
                lineHeight: 1.4,
              }}
            >
              {journalId}
            </div>

            <button
              type="button"
              onClick={handleCopyJournalId}
              style={{
                padding: "0.5rem 0.75rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
                backgroundColor: "white",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {copyMessage || "Copy"}
            </button>
          </div>
        </div>

        <details style={{ marginTop: "1rem" }}>
          <summary
            style={{
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Restore an existing journal
          </summary>

          <div style={{ marginTop: "1rem" }}>
            <label
              htmlFor="recoveryId"
              style={{
                display: "block",
                marginBottom: "0.35rem",
                fontSize: "0.9rem",
              }}
            >
              Previous Journal ID
            </label>

            <input
              id="recoveryId"
              type="text"
              value={recoveryId}
              onChange={(e) => setRecoveryId(e.target.value)}
              placeholder="Enter your previous Journal ID"
              style={{
                display: "block",
                width: "100%",
                boxSizing: "border-box",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginBottom: "0.75rem",
              }}
            />

            <button
              type="button"
              onClick={handleJournalRecovery}
              disabled={isRecovering}
              style={{
                padding: "0.5rem 0.75rem",
                borderRadius: "6px",
                border: "none",
                backgroundColor: isRecovering ? "#999" : "#355c45",
                color: "white",
                cursor: isRecovering ? "not-allowed" : "pointer",
              }}
            >
              {isRecovering ? "Checking…" : "Restore Journal"}
            </button>

            {recoveryMessage && (
              <p
                style={{
                  marginTop: "0.75rem",
                  color: "#666",
                  fontSize: "0.9rem",
                }}
              >
                {recoveryMessage}
              </p>
            )}
          </div>
        </details>
      </div>
    </main>
  );
}
