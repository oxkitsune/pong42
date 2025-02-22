import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MatchHistory } from "@/components/match-history";
import { ListChecks, Users, Activity, TrendingUp } from "lucide-react";

// Initial sample data
const initialPlayers = [
  { id: 1, name: "John Doe", elo: 1500, wins: 10, losses: 5 },
  { id: 2, name: "Jane Smith", elo: 1600, wins: 12, losses: 3 },
  { id: 3, name: "Mike Johnson", elo: 1450, wins: 8, losses: 7 },
  { id: 4, name: "Sarah Wilson", elo: 1550, wins: 11, losses: 4 },
  { id: 5, name: "Alex Chen", elo: 1525, wins: 9, losses: 6 },
  { id: 6, name: "Emma Davis", elo: 1575, wins: 13, losses: 5 },
];

const initialMatches = [
  {
    id: 1,
    winner: "Alex Chen",
    loser: "Emma Davis",
    score: "21-19",
    date: "2024-03-15T14:30:00",
  },
  {
    id: 2,
    winner: "Sarah Wilson",
    loser: "Jane Smith",
    score: "21-18",
    date: "2024-03-14T16:45:00",
  },
  {
    id: 3,
    winner: "Mike Johnson",
    loser: "John Doe",
    score: "21-19",
    date: "2024-03-14T11:20:00",
  },
  {
    id: 4,
    winner: "Emma Davis",
    loser: "Sarah Wilson",
    score: "21-17",
    date: "2024-03-13T15:15:00",
  },
  {
    id: 5,
    winner: "John Doe",
    loser: "Alex Chen",
    score: "21-18",
    date: "2024-03-13T09:30:00",
  },
  {
    id: 6,
    winner: "Mike Johnson",
    loser: "Emma Davis",
    score: "21-15",
    date: "2024-02-21T13:45:00",
  },
  {
    id: 7,
    winner: "Jane Smith",
    loser: "Alex Chen",
    score: "21-19",
    date: "2024-02-21T10:20:00",
  },
];

export function ActivityCard() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-primary">
          <Activity className="h-5 w-5" />
          recent activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="matches">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger
              value="matches"
              className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-medium"
            >
              matches
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-medium"
            >
              stats
            </TabsTrigger>
          </TabsList>
          <div className="min-h-[300px]">
            <TabsContent value="matches" className="mt-0">
              <MatchHistory matches={initialMatches} />
            </TabsContent>
            <TabsContent value="stats" className="mt-0">
              <div className="space-y-6">
                <div className="flex items-center justify-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-2xl font-bold text-primary mb-1">
                      <ListChecks className="h-5 w-5" />
                      {initialMatches.length}
                    </div>
                    <p className="text-muted-foreground">Total Matches</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary/10 rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-xl font-bold text-secondary-foreground mb-1">
                      <Users className="h-5 w-5" />
                      {initialPlayers.length}
                    </div>
                    <p className="text-center text-muted-foreground">
                      Active Players
                    </p>
                  </div>
                  <div className="p-4 bg-secondary/10 rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-xl font-bold text-secondary-foreground mb-1">
                      <TrendingUp className="h-5 w-5" />
                      {Math.max(
                        ...initialPlayers.map((p) => p.elo)
                      ).toLocaleString()}
                    </div>
                    <p className="text-center text-muted-foreground">
                      Highest ELO
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
