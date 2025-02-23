import SettingsForm from "@/components/settings/settings-form";
import { SessionProvider } from "next-auth/react";
export default function SettingsPage() {
  return (
    <SessionProvider>
      <div className="container max-w-2xl py-10 mx-auto">
        <SettingsForm />
      </div>
    </SessionProvider>
  );
}
