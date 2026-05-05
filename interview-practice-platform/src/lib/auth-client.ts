import { AUTH_COOKIE_NAME } from "@/lib/auth";

export function setMockAuthCookie(days = 7) {
  const maxAgeSeconds = Math.floor(days * 24 * 60 * 60);
  document.cookie = `${AUTH_COOKIE_NAME}=1; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax`;
}

export function clearMockAuthCookie() {
  document.cookie = `${AUTH_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
}
