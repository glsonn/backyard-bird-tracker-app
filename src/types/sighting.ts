export type Sighting = {
  id: string;
  species: string;
  count: number;
  notes: string | null;
  location: string | null;
  created_at: string;
  date_seen: string;
};

export type SightingDayGroup = {
  date: string;
  sightings: Sighting[];
};
