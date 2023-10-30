const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function formatDateNumber (date: string) {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export const  formatDateText =  (date: string) => {
  const d = new Date(date),
    month = "" + monthList[d.getMonth()],
    day = "" + weekday[d.getDay()],
    year = d.getFullYear();

  return day + ", " + month + " " + d.getDate() + ", " + year;
};

export function addCommas (input: string | number) {
  // Convert input to a string if it's a number
  if (typeof input === "number") {
    input = input.toString();
  }

  // Regex pattern to match numbers with optional decimal places
  const pattern = /(\d)(?=(\d{3})+(?!\d))/g;

  // Add comma separators to the number
  return input.replace(pattern, "$1,");
}

