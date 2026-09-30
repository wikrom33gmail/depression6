import { cn } from "cn";

export { cn };

export const PHQ9_MAX_SCORE = 27;

export function calculatePHQ9Score(answers) {
  return Object.values(answers).reduce((sum, v) => sum + parseInt(v), 0);
}

export function getPHQ9Severity(score) {
  if (score <= 4) return "minimal";
  if (score <= 9) return "mild";
  if (score <= 14) return "moderate";
  if (score <= 19) return "severe";
  return "severe";
}
