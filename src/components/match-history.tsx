import { CalendarDays } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";

interface Match {
  id: number;
  winner: string;
  loser: string;
  score: string;
  date: string;
}

interface MatchHistoryProps {
  matches: Match[];
}

export function MatchHistory({ matches }: MatchHistoryProps) {
  return (
    <ScrollArea className="h-[300px] pr-4">
      <div className="space-y-4">
        {matches.map((match) => (
          <div key={match.id} className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <CalendarDays className="h-5 w-5 mt-0.5 text-muted-foreground" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                <span className="font-semibold text-primary">
                  {match.winner}
                </span>{" "}
                defeated{" "}
                <span className="text-muted-foreground">{match.loser}</span>
              </p>
              <p className="text-sm text-muted-foreground">{match.score}</p>
              <p className="text-xs text-muted-foreground">{match.date}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
