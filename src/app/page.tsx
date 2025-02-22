import Header from "@/components/header";
import { StatsCard } from "@/components/stats-card";
import { ActivityCard } from "@/components/activity-card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto p-4 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <StatsCard />
          <ActivityCard />
        </div>
      </div>
    </div>
  );
}
