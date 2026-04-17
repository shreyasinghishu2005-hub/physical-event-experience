"use client";

import { useEffect, useState } from "react";
import AuthPanel from "@/components/AuthPanel";
import DashboardShell from "@/components/DashboardShell";
import { fetchDashboard } from "@/lib/api";
import { useOfflineCache } from "@/hooks/useOfflineCache";

export default function HomePage() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  useOfflineCache("event-dashboard", dashboard);

  useEffect(() => {
    const savedAuth = typeof window !== "undefined" ? window.localStorage.getItem("event-auth") : null;
    if (savedAuth) {
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      if (!authenticated) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const data = await fetchDashboard("demo-user-1");
        if (mounted) {
          setDashboard(data);
        }
      } catch (err) {
        const cached =
          typeof window !== "undefined"
            ? window.localStorage.getItem("event-dashboard")
            : null;

        if (mounted) {
          if (cached) {
            setDashboard(JSON.parse(cached));
          } else {
            setError(err.message || "Unable to load dashboard.");
          }
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => null);
    }

    return () => {
      mounted = false;
    };
  }, [authenticated]);

  function handleContinue(profile) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("event-auth", JSON.stringify(profile));
    }
    setAuthenticated(true);
  }

  if (!authenticated) {
    return <AuthPanel onContinue={handleContinue} />;
  }

  return <DashboardShell dashboard={dashboard} loading={loading} error={error} />;
}