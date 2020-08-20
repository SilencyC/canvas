export function toLocaleString(data) {
  if (isNaN(data)) return data;
  return (+data).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
