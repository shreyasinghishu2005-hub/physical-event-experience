"use client";

import TopBar from "@/components/TopBar";
import HeroOverview from "@/components/HeroOverview";
import RoleTabs from "@/components/RoleTabs";
import SessionBoard from "@/components/SessionBoard";
import RecommendationPanel from "@/components/RecommendationPanel";
import NavigationPanel from "@/components/NavigationPanel";
import ChatAssistant from "@/components/ChatAssistant";
import CrowdPanel from "@/components/CrowdPanel";
import QRPanel from "@/components/QRPanel";
import NetworkingPanel from "@/components/NetworkingPanel";
import SafetyPanel from "@/components/SafetyPanel";
import FeedbackPanel from "@/components/FeedbackPanel";
import GamificationPanel from "@/components/GamificationPanel";
import VolunteerPanel from "@/components/VolunteerPanel";
import AnnouncementPanel from "@/components/AnnouncementPanel";
import VoiceAssistantPanel from "@/components/VoiceAssistantPanel";
import NotificationsPanel from "@/components/NotificationsPanel";

export default function DashboardShell({ dashboard, loading, error }) {
  if (loading) {
    return <main className="page-shell loading-state" aria-live="polite">Loading event intelligence...</main>;
  }

  if (error) {
    return <main className="page-shell error-state" role="alert">{error}</main>;
  }

  if (!dashboard) {
    return <main className="page-shell error-state" role="alert">No dashboard data available.</main>;
  }

  const {
    user,
    schedule,
    recommendations,
    announcements,
    density,
    smartAlerts,
    navigation,
    networking,
    leaderboard,
    volunteerTasks,
    notifications,
    feedbackSummary
  } = dashboard;

  return (
    <main className="page-shell">
      <TopBar user={user} />
      <HeroOverview user={user} announcements={announcements} smartAlerts={smartAlerts} />
      <RoleTabs />
      <section className="dashboard-grid">
        <SessionBoard schedule={schedule} />
        <RecommendationPanel recommendations={recommendations} />
        <NavigationPanel navigation={navigation} />
        <CrowdPanel density={density} />
        <NotificationsPanel notifications={notifications} />
        <QRPanel user={user} />
        <NetworkingPanel networking={networking} />
        <SafetyPanel />
        <FeedbackPanel feedbackSummary={feedbackSummary} />
        <GamificationPanel leaderboard={leaderboard} />
        <VolunteerPanel volunteerTasks={volunteerTasks} />
        <AnnouncementPanel announcements={announcements} />
        <VoiceAssistantPanel />
        <ChatAssistant user={user} />
      </section>
    </main>
  );
}
