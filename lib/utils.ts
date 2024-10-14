export const generateDates = (startDate: string): string[] => {
  const dates = [];
  const start = new Date(startDate);

  for (let i = -6; i <= 6; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    dates.push(formattedDate);
  }
  return dates;
};

export const formatDate = (dateString: string): string => {
  const [year, month, day] = dateString.split("-").map(Number);

  const date = new Date(year, month - 1, day);
  const today = new Date();
  const tomorrow = new Date(today);
  const yesterday = new Date(today);

  tomorrow.setDate(today.getDate() + 1);
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "2-digit",
    month: "short",
  };

  return date.toLocaleDateString("en-GB", options).replace(",", "");
};
