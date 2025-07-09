export const getOrdinalSuffix = (num: number) => {
  if ([11, 12, 13].includes(num % 100)) return "th";
  switch (num % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const formatNumberWithOrdinal = (num: number) => {
  if (!num) return ""; // Handle invalid or undefined values
  const formattedNumber = num.toLocaleString(); // Add commas
  return `${formattedNumber}`;
};
