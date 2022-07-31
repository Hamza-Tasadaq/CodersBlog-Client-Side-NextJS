import { IArticles } from "../types";

export const formatDate = (dateString: String): String => {
  const date = new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return date;
};

export const capitallizedFirstLetter: String = (str: String) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const makeCategory: String = (slug: String) => {
  if (typeof slug === "string") {
    return slug.split("-").join(" ");
  }
  return "";
};

export const debounce = (func: (query: String) => void, timeOut = 300) => {
  let timer: NodeJS.Timeout;

  const debounced = (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeOut);
  };

  return debounced;
};
