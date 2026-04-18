"use client";

import { useEffect } from "react";

export function useOfflineCache(key, value) {
  useEffect(() => {
    if (!value || typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore storage write failures in private mode or restricted environments.
    }
  }, [key, value]);
}
