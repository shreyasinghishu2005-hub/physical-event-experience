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
  const [profile, setProfile] = useState(null);

  useOfflineCache("event-dashboard", dashboard);

  useEffect(() => {
    const savedAuth = typeof window !== "undefined" ? window.localStorage.getItem("event-auth") : null;
    if (savedAuth) {
      try {
        setProfile(JSON.parse(savedAuth));
        setAuthenticated(true);
      } catch {
        window.localStorage.removeItem("event-auth");
      }
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
        const data = await fetchDashboard(profile);
        if (mounted) {
          setDashboard(data);
          setError("");
        }
      } catch (err) {
        const cached =
          typeof window !== "undefined"
            ? window.localStorage.getItem("event-dashboard")
            : null;

        if (mounted) {
          if (cached) {
            try {
              setDashboard(JSON.parse(cached));
            } catch {
              window.localStorage.removeItem("event-dashboard");
              setError(err.message || "Unable to load dashboard.");
            }
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
  }, [authenticated, profile]);

  function handleContinue(profile) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("event-auth", JSON.stringify(profile));
    }
    setProfile(profile);
    setAuthenticated(true);
  }

  if (!authenticated) {
    return <AuthPanel onContinue={handleContinue} />;
  }

  return <DashboardShell dashboard={dashboard} loading={loading} error={error} />;
}
