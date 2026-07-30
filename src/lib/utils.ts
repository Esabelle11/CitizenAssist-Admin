import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  const d = new Date(date);

  if (isNaN(d.getTime())) {
    return "-";
  }

  const day = d.getDate();

  const month = d.toLocaleString("en-US", {
    month: "short",
    timeZone: "Asia/Kuala_Lumpur",
  });

  const year = d.getFullYear();

  let hour = d.getHours();
  const minute = d.getMinutes().toString().padStart(2, "0");

  const period = hour >= 12 ? "pm" : "am";

  hour = hour % 12 || 12;

  return `${day} ${month} ${year}, ${hour}:${minute} ${period}`;
}

export function urgencyColor(urgency: string) {
  switch (urgency) {
    case "CRITICAL":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    case "HIGH":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
    case "MEDIUM":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
    case "LOW":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
}

export function statusColor(status: string) {
  switch (status) {
    case "DELIVERED":
    case "RESOLVED":
    case "CLOSED":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    case "FAILED":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    case "PENDING":
    case "PENDING_GPS":
    case "QUEUED":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
    case "DISPATCHED":
    case "SENT":
    case "RETRYING":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
}
