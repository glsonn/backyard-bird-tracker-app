import { supabase } from "./supabase";

export async function getSightings() {
  return await supabase
    .from("sightings")
    .select("*")
    .order("created_at", { ascending: false });
}

export async function createSighting(
  species: string,
  count: number,
  notes: string,
  location: string,
  date_seen: string,
) {
  return await supabase
    .from("sightings")
    .insert([
      {
        species,
        count,
        notes: notes || null,
        location: location || null,
        date_seen,
      },
    ])
    .select()
    .single();
}

export async function deleteSighting(id: string) {
  return await supabase.from("sightings").delete().eq("id", id);
}

export async function updateSighting(
  id: string,
  updates: {
    species: string;
    count: number;
    notes: string;
    location: string;
    date_seen: string;
  },
) {
  const { data, error } = await supabase
    .from("sightings")
    .update({
      species: updates.species,
      count: updates.count,
      notes: updates.notes || null,
      location: updates.location || null,
      date_seen: updates.date_seen,
    })
    .eq("id", id)
    .select()
    .single();

  return { data, error };
}
