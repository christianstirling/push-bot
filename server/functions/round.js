// server/functions/round.js

// Rounds a number to the given decimal

export function round(number, decimal) {
  const factor = Math.pow(10, decimal);
  return Math.round(number * factor) / factor;
}
