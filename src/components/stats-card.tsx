import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { LineChart } from "lucide-react";

export function StatsCard() {
  const exampleUser = {
    stats: {
      winRate: 0.6,
      wins: 10,
      losses: 5,
      rank: 1,
      elo: 1500,
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <LineChart className="h-5 w-5" />
          your stats
        </CardTitle>
        <CardDescription>your performance in pong42 matches</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Win Rate</p>
          <p className="font-semibold">{exampleUser.stats.winRate}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Wins</p>
          <p className="font-semibold">{exampleUser.stats.wins}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Losses</p>
          <p className="font-semibold">{exampleUser.stats.losses}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Rank</p>
          <p className="font-semibold">#{exampleUser.stats.rank}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">ELO Rating</p>
          <p className="font-semibold">{exampleUser.stats.elo}</p>
        </div>
      </CardContent>
    </Card>
  );
}
