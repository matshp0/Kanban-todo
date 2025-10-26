export const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    ToDo: "#2196f3",
    InProgress: "#ff9800",
    Done: "#4caf50",
  };
  return statusColors[status] || "#757575";
};
