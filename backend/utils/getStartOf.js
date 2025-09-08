

export const getStartOf = (unit) => {
  const now = new Date();
  if (unit === "day") {
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }
  if (unit === "week") {
    const first = now.getDate() - now.getDay(); // Sunday as start
    return new Date(now.getFullYear(), now.getMonth(), first);
  }
  if (unit === "month") {
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }
  return now;
};

