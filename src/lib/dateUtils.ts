export function formatDate(dateString: string) {
  return new Date(`${dateString}T12:00:00`).toLocaleDateString("en-US");
}
