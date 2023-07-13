export function urlEncoded(payload: any) {
  return new URLSearchParams(payload);
}

export function showLoading(obj: any) {
  return obj ?? "loading";
}
