const STORAGE_KEY = "bbt_user_id";

export function getUserId(): string {
  if (typeof window === "undefined") {
    return "";
  }

  const existingId = localStorage.getItem(STORAGE_KEY);

  if (existingId) {
    return existingId;
  }

  const newId = crypto.randomUUID();

  localStorage.setItem(STORAGE_KEY, newId);

  return newId;
}
