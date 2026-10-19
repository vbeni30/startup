export type Device = "desktop" | "mobile";

export function clampCompare(rawValue: unknown): number {
  return Math.max(0, Math.min(100, Math.round(Number(rawValue) || 0)));
}

export function parseDevice(value: string | null | undefined): Device {
  return value === "mobile" ? "mobile" : "desktop";
}

export function readComparisonQuery(input: {
  device?: string | string[] | null;
  compare?: string | string[] | null;
}): { device: Device; compare: number } {
  const device = Array.isArray(input.device) ? input.device[0] : input.device;
  const compare = Array.isArray(input.compare) ? input.compare[0] : input.compare;
  return {
    device: parseDevice(device),
    compare: compare == null ? 50 : clampCompare(compare),
  };
}

export function applyComparisonSearch(url: URL, device: Device, compare: number) {
  if (device === "mobile") url.searchParams.set("device", "mobile");
  else url.searchParams.delete("device");

  if (compare === 50) url.searchParams.delete("compare");
  else url.searchParams.set("compare", String(compare));
}

export function withComparison(href: string, device: Device, compare: number): string {
  const url = new URL(href);
  applyComparisonSearch(url, device, compare);
  return `${url.pathname}${url.search}${url.hash}`;
}
