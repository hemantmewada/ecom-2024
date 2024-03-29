import { format as f } from "date-fns";

export const shortStr = (str, length) => {
  if (str.length > length) {
    return `${str.substring(0, length)}...`;
  }
  return str;
};
export const dateFormat = (date, format = "d-MM-yyyy h:mm:ss a") => {
  return f(new Date(date), format);
};
export const numberFormat = (number) => {
  return `${number.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  })}/-`;
};
