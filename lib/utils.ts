import { iso3ToIso2Map } from "../constants/Countries";

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
    weekday: "short",
    day: "2-digit",
    month: "short",
  };

  return targetDate.toLocaleDateString("en-GB", options).replace(",", "");
};

export const iso2Code = (string: string): string => {
  return iso3ToIso2Map[string];
};

export const decodeBase64Url = (base64Url: string): string => {
  // In the browser, use atob to decode base64 URL
  if (typeof atob !== "undefined") {
    return atob(base64Url.replace(/-/g, "+").replace(/_/g, "/"));
  }

  // In Node.js, use Buffer for base64 decoding
  return Buffer.from(base64Url, "base64").toString("utf-8");
};
