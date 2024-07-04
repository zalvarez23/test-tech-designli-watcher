export const formatDate = (dateStr: string): string => {
  const [year, month, day] = new Date(dateStr)
    .toISOString()
    .split("T")[0]
    .split("-");
  return `${day}/${month}/${year}`;
};
