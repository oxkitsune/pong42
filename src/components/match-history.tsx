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
    });
  };

  const parseGames = (score: string, isReversed: boolean) => {
    return score.split(", ").map((game) => {
      const [score1, score2] = game.split("-").map(Number);
      // If players are reversed, we need to reverse the scores too
      const [leftScore, rightScore] = isReversed
        ? [score2, score1]
        : [score1, score2];
      const isLeftWinner = isReversed
        ? rightScore > leftScore
        : leftScore > rightScore;
      return { leftScore, rightScore, isLeftWinner };
    });
  };

  return (
    <ScrollArea className="h-[300px] pr-4">
      <div className="space-y-0.5">
        {matches.map((match, index) => {
          // Randomly decide if we should reverse the player positions
          const isReversed = index % 2 === 0;
          const [leftPlayer, rightPlayer] = isReversed
            ? [match.loser, match.winner]
            : [match.winner, match.loser];

          return (
            <div
              key={match.id}
              className={`p-3 transition-colors ${
                index % 2 === 0 ? "bg-muted/50" : ""
              } space-y-3`}
            >
              <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-2 text-sm">
                <div className="flex justify-center">
                  <span
                    className={`inline-flex items-center gap-1 ${
                      leftPlayer === match.winner
                        ? "font-medium text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {leftPlayer}
                    {leftPlayer === match.winner && (
                      <Trophy className="h-3 w-3 text-yellow-500" />
                    )}
                  </span>
                </div>
                <span className="text-muted-foreground text-xs">vs</span>
                <div className="flex justify-center">
                  <span
                    className={`inline-flex items-center gap-1 ${
                      rightPlayer === match.winner
                        ? "font-medium text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {rightPlayer}
                    {rightPlayer === match.winner && (
                      <Trophy className="h-3 w-3 text-yellow-500" />
                    )}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-[1fr,auto,1fr] gap-2">
                {parseGames(match.score, isReversed).map((game, index) => (
                  <React.Fragment key={index}>
                    <span
                      className={
                        game.isLeftWinner
                          ? "font-medium text-primary text-xs text-center"
                          : "text-muted-foreground text-xs text-center"
                      }
                    >
                      {game.leftScore}
                    </span>
                    <span className="text-[10px] text-muted-foreground/50 text-center">
                      Game {index + 1}
                    </span>
                    <span
                      className={
                        !game.isLeftWinner
                          ? "font-medium text-primary text-xs text-center"
                          : "text-muted-foreground text-xs text-center"
                      }
                    >
                      {game.rightScore}
                    </span>
                  </React.Fragment>
                ))}
              </div>
              <div className="flex justify-end items-center gap-1">
                <CalendarDays className="h-3 w-3 text-muted-foreground/50" />
                <time className="text-[10px] text-muted-foreground/50">
                  {formatDate(match.date)}
                </time>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
