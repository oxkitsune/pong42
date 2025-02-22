import Link from "next/link";
import { Button } from "@/components/ui/button";
import TableTennisPaddle from "./table-tennis-paddle";

export default function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8 max-w-screen-2xl mx-auto">
        <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2 flex-shrink-0">
          <TableTennisPaddle className="h-6 w-6 md:h-8 md:w-8" />
          <span className="whitespace-nowrap">pong42</span>
        </h1>
        <div className="flex-shrink-0">
          <Link href="/login">
            <Button variant="outline" className="whitespace-nowrap">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
