"use client";

import { useState } from "react";

import { AddMatchDialog } from "@/components/add-match-dialog";
import { MatchHistory } from "@/components/match-history";
import { PlayerRankings } from "@/components/player-rankings";
import TableTennisPaddle from "@/components/table-tennis-paddle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { FaTableTennis } from "react-icons/fa";
import SignIn from "@/components/sign-in";

// Initial sample data
const initialPlayers = [
  { id: 1, name: "John Doe", elo: 1500, wins: 10, losses: 5 },
  { id: 2, name: "Jane Smith", elo: 1600, wins: 12, losses: 3 },
  { id: 3, name: "Mike Johnson", elo: 1450, wins: 8, losses: 7 },
  { id: 4, name: "Sarah Wilson", elo: 1550, wins: 11, losses: 4 },
];

const initialMatches = [
  {
    id: 1,
    winner: "Jane Smith",
    loser: "John Doe",
    score: "21-18, 21-15",
    date: "2024-02-21",
  },
  {
    id: 2,
    winner: "Sarah Wilson",
    loser: "Mike Johnson",
    score: "21-19, 18-21, 21-15",
    date: "2024-02-21",
  },
];

export default function HomePage() {
  const [players, setPlayers] = useState(initialPlayers);
  const [matches, setMatches] = useState(initialMatches);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const calculateNewElo = (winnerElo: number, loserElo: number) => {
    const K = 32;
    const expectedScore = 1 / (1 + Math.pow(10, (loserElo - winnerElo) / 400));
    const change = Math.round(K * (1 - expectedScore));
    return { winnerChange: change, loserChange: -change };
  };

  const addMatch = (winner: string, loser: string, score: string) => {
    // Update matches
    const newMatch = {
      id: matches.length + 1,
      winner,
      loser,
      score,
      date: new Date().toISOString().split("T")[0],
    };
    setMatches([newMatch, ...matches]);

    // Update player stats and ELO
    const winnerPlayer = players.find((p) => p.name === winner);
    const loserPlayer = players.find((p) => p.name === loser);

    if (winnerPlayer && loserPlayer) {
      const { winnerChange, loserChange } = calculateNewElo(
        winnerPlayer.elo,
        loserPlayer.elo
      );

      setPlayers(
        players.map((player) => {
          if (player.name === winner) {
            return {
              ...player,
              elo: player.elo + winnerChange,
              wins: player.wins + 1,
            };
          }
          if (player.name === loser) {
            return {
              ...player,
              elo: player.elo + loserChange,
              losses: player.losses + 1,
            };
          }
          return player;
        })
      );
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <TableTennisPaddle className="h-8 w-8" />
          Pong42 League
        </h1>
        <SignIn />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Player Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <PlayerRankings players={players} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="matches">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="matches">Matches</TabsTrigger>
                <TabsTrigger value="stats">Stats</TabsTrigger>
              </TabsList>
              <TabsContent value="matches">
                <MatchHistory matches={matches} />
              </TabsContent>
              <TabsContent value="stats">
                <div className="text-center py-4">
                  <p className="text-2xl font-bold">{matches.length}</p>
                  <p className="text-muted-foreground">Total Matches</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-xl font-bold">{players.length}</p>
                    <p className="text-muted-foreground">Active Players</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold">
                      {Math.max(...players.map((p) => p.elo)).toLocaleString()}
                    </p>
                    <p className="text-muted-foreground">Highest ELO</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <AddMatchDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        players={players}
        onAddMatch={addMatch}
      />
    </div>
  );
}
