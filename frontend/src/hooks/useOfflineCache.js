"use client";

import { useEffect } from "react";

export function useOfflineCache(key, value) {
  useEffect(() => {
    if (!value || typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
}
