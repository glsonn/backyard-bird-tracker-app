"use client";

import { useState } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label?: string;
  placeholder?: string;
  searchable?: boolean;
};

export default function SpeciesSelect({
  value,
  onChange,
  options,
  label = "Species",
  placeholder = "Select a species...",
  searchable = false,
}: Props) {
  const [search, setSearch] = useState("");
  const filteredOptions = options.filter((species) =>
    species.toLowerCase().includes(search.toLowerCase()),
  );
  if (searchable) {
    return (
      <div style={{ marginBottom: "0.5rem" }}>
        <label>{label}</label>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          style={{
            display: "block",
            width: "100%",
            padding: "0.4rem",
            marginTop: "0.25rem",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />

        <div
          style={{
            marginTop: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "6px",
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {filteredOptions.map((species) => (
            <div
              key={species}
              style={{
                padding: "0.5rem",
                borderBottom: "1px solid #eee",
              }}
            >
              {species}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: "0.5rem" }}>
      <label>{label}</label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          display: "block",
          width: "100%",
          padding: "0.4rem",
          marginTop: "0.25rem",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((species) => (
          <option key={species} value={species}>
            {species}
          </option>
        ))}
      </select>
    </div>
  );
}
