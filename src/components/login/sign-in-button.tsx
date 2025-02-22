import type React from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export function SignInButton({
  provider,
  disabled,
  children,
}: {
  provider: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
        redirect("/");
      }}
      className="w-full"
    >
      <Button
        variant="outline"
        className="flex items-center gap-2 w-full"
        disabled={disabled}
        type="submit"
      >
        {children}
      </Button>
    </form>
  );
}
