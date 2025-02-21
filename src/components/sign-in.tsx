import { signIn } from "@/auth";
import { Button } from "./ui/button";
import { FaGithub } from "react-icons/fa";

export default function SignIn() {
  return (
    <form
      action={async () => {
        await signIn("github");
      }}
    >
      <Button type="submit">
        <FaGithub className="mr-2 h-4 w-4" />
        Signin with GitHub
      </Button>
    </form>
  );
}
