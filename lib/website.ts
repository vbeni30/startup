export function normalizeWebsite(input: string): string | null {
  const clean = input.trim();
  if (!clean || /\s/.test(clean)) return null;
  const hasScheme = /^[a-z][a-z\d+.-]*:/i.test(clean);
  try {
    const url = new URL(hasScheme ? clean : `https://${clean}`);
    const validHost = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i.test(url.hostname);
    if (!["https:", "http:"].includes(url.protocol) || !validHost || url.username || url.password) return null;
    return url.href;
  } catch {
    return null;
  }
}
