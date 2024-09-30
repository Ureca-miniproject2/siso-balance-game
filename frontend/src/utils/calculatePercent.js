export default function calculatePercent(value, total) {
  return total > 0 ? ((value / total) * 100).toFixed(0) : 0;
}
