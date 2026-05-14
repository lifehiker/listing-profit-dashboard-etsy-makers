export function resolveSqliteUrl() {
  const raw = process.env.DATABASE_URL || "file:./prisma/dev.db";
  return raw.startsWith("file:") ? raw.slice("file:".length) : raw;
}
