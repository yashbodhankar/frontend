"use client";

import { useRouter } from "next/navigation";

import { clearMockAuthCookie } from "@/lib/auth-client";

export function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        clearMockAuthCookie();
        router.replace("/");
      }}
      className={
        className ??
        "inline-flex h-9 items-center justify-center rounded-md border border-black/[.10] px-3 text-sm font-medium hover:bg-black/[.04] dark:border-white/[.16] dark:hover:bg-white/[.06]"
      }
    >
      Log out
    </button>
  );
}
