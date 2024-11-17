export const generateDates = (startDate: Date): Date[] => {
  const dates = [];
  const start = new Date(startDate);

  for (let i = -6; i <= 6; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    dates.push(date);
  }
  return dates;
};

export const formatDate = (date: Date): string => {
  const normalizeDate = (d: Date): Date => {
    const normalized = new Date(d);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
  };

  const today = normalizeDate(new Date());
  const tomorrow = new Date(today);
  const yesterday = new Date(today);

  tomorrow.setDate(today.getDate() + 1);
  yesterday.setDate(today.getDate() - 1);

  const targetDate = normalizeDate(date);

  if (targetDate.getTime() === today.getTime()) {
    return "Today";
  } else if (targetDate.getTime() === tomorrow.getTime()) {
    return "Tomorrow";
  } else if (targetDate.getTime() === yesterday.getTime()) {
    return "Yesterday";
  }

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
  };

  return targetDate.toLocaleDateString("en-GB", options).replace(",", "");
};
