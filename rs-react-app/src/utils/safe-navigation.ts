import { ReadonlyURLSearchParams } from 'next/navigation';

export function ensureParams<T extends Record<string, string | string[]>>(
  params: T | null
): T {
  if (!params) {
    return {} as T;
  }
  return params;
}

export function ensureSearchParams(
  searchParams: ReadonlyURLSearchParams | null
): ReadonlyURLSearchParams {
  if (!searchParams) {
    return new URLSearchParams() as unknown as ReadonlyURLSearchParams;
  }
  return searchParams;
}
