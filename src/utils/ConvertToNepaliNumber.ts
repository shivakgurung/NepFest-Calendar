export const toNepaliNumber = (num: number | string) => {
    const nepaliDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
    return num.toString().split("").map(digit => nepaliDigits[parseInt(digit)] || digit).join("");
  };