export function formatDate(dateString: string) {
  return new Date(`${dateString}T12:00:00`).toLocaleDateString("en-US");
}

export function getTodayDateString(): string {
  const today = new Date();

  return new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
}

export function parseLocalDate(dateString: string): Date {
  return new Date(`${dateString}T12:00:00`);
}
