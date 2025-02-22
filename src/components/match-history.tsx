import * as React from "react";
import { CalendarDays, Trophy } from "lucide-react";
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
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <ScrollArea className="h-[300px] pr-4">
      <div className="space-y-0.5">
        {matches.map((match, index) => (
          <div
            key={match.id}
            className={`p-2 transition-colors ${
              index % 2 === 0 ? "bg-muted/50" : ""
            } space-y-2`}
          >
            <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-2 text-sm">
              <div className="flex flex-col items-center col-span-3">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-lg font-bold text-primary">
                    {match.score.split("-")[0]}
                  </span>
                  <span className="text-lg text-muted-foreground">-</span>
                  <span className="text-lg text-muted-foreground">
                    {match.score.split("-")[1]}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <span className="inline-flex items-center gap-1 font-medium text-primary">
                    {match.winner}
                    <Trophy className="h-3 w-3 text-yellow-500" />
                  </span>
                  <span className="text-muted-foreground text-xs">vs</span>
                  <span className="text-muted-foreground">{match.loser}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-1 mt-2">
              <CalendarDays className="h-3 w-3 text-muted-foreground" />
              <time className="text-[10px] text-muted-foreground">
                {formatDate(match.date)}
              </time>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
