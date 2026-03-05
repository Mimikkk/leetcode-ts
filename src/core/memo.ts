import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";

type Awaitable<T = unknown> = Promise<T> | T;
type Fn = (...args: any[]) => Awaitable<unknown>;

export const memo = <TFn extends Fn>({
  filename,
  expiryMs,
  skip = false,
  type = "json",
  fn,
}: {
  filename: string | ((...args: Parameters<TFn>) => string);
  expiryMs: number;
  skip?: boolean;
  type?: "json" | "text";
  fn: TFn;
}): ((...args: Parameters<TFn>) => Promise<Awaited<ReturnType<TFn>>>) => {
  return async (...args: Parameters<TFn>): Promise<Awaited<ReturnType<TFn>>> => {
    const cacheDir = ".cache";

    const filenameStr = typeof filename === "function" ? filename(...args) : filename;
    const cachePath = `${cacheDir}/${filenameStr}`;

    if (skip || existsSync(cachePath)) {
      console.log(`[Use cache] ${filenameStr}`);
      const cached = await loadFile<{ timestamp: number; data: Awaited<ReturnType<TFn>> }>(cachePath);

      const cacheAge = Date.now() - cached.timestamp;

      if (cacheAge < expiryMs) {
        return cached.data;
      }
    }

    console.log(`[Use new] ${filenameStr}`);
    const data = (await fn(...args)) as Awaited<ReturnType<TFn>>;
    await storeFile(cachePath, { timestamp: Date.now(), data: data });
    return data;
  };
};

export const ensureDir = async (path: string) => {
  const dir = path.substring(0, path.lastIndexOf("/"));
  await mkdir(dir, { recursive: true });
};

export const storeFile = async (path: string, data: object | string, type: "json" | "text" = "json") => {
  await ensureDir(path);
  if (type === "json") {
    await writeFile(path, JSON.stringify(data), "utf-8");
  } else {
    await writeFile(path, data.toString(), "utf-8");
  }
};

export const loadFile = async <T>(path: string, type: "json" | "text" = "json") => {
  const data = await readFile(path, "utf-8");

  if (type === "json") {
    return JSON.parse(data) as T;
  } else {
    return data as T;
  }
};
