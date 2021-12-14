export const convertToLongDay = (utcNum) => {
  const weekday = new Date(utcNum * 1000).toLocaleDateString(undefined, {
    weekday: "long",
  });
  return weekday;
};

const formatSunTimes = (utcNum) =>
  new Date(utcNum * 1000).toLocaleTimeString([], { hour12: false }).slice(0, 5);

const convertToLongDate = (utcNum) => {
  let formatDate = new Date(utcNum * 1000).toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
  });
  if (!Number.isInteger(+formatDate.slice(-1))) return formatDate;
  if (formatDate.endsWith("1") && !formatDate.includes("11")) {
    formatDate = `${formatDate}st`;
  } else if (formatDate.endsWith("2") && !formatDate.includes("12")) {
    formatDate = `${formatDate}nd`;
  } else if (formatDate.endsWith("3") && !formatDate.includes("13")) {
    formatDate = `${formatDate}rd`;
  } else {
    formatDate = `${formatDate}th`;
  }
  return formatDate;
};
