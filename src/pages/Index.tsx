import { useState } from "react";
import SidePanel from "@/components/SidePanel";
import DashboardView from "@/components/DashboardView";
import CollectorsList from "@/components/CollectorsList";
import SettingsView from "@/components/settings/SettingsView";
import { useRoleAccess } from "@/hooks/useRoleAccess";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { userRole } = useRoleAccess();

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardView />;
      case "collectors":
        return <CollectorsList />;
      case "settings":
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <SidePanel onTabChange={setActiveTab} userRole={userRole} />
      <main className="flex-1 ml-64">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;