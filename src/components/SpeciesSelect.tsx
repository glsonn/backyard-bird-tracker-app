"use client";

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
