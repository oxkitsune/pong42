import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ModalClose } from "@/components/login/modal-close";
import { SignInButton } from "@/components/login/sign-in-button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function LoginModal() {
  const session = await auth();
  if (session) {
    redirect("/");
  }

  return (
    <ModalClose>
      <DialogHeader>
        <DialogTitle>Welcome to pong42 🏓</DialogTitle>
        <DialogDescription>
          Choose your preferred sign in method
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-4 py-4">
        <SignInButton provider="github">
          <FaGithub className="h-5 w-5" />
          Continue with GitHub
        </SignInButton>
        <SignInButton provider="google" disabled>
          <FcGoogle className="h-5 w-5" />
          Continue with Google (coming soon)
        </SignInButton>
      </div>
    </ModalClose>
  );
}
