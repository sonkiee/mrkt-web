export const date = (dateString: string, showTime: boolean = true) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (showTime) {
    options.hour = "numeric";
    options.minute = "2-digit";
    options.hour12 = true;
  }

  return new Date(dateString).toLocaleString(undefined, options);
};
