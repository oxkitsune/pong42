"use client";

import { useState } from "react";

import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

interface Player {
  id: number;
  name: string;
  elo: number;
  wins: number;
  losses: number;
}

interface AddMatchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  players: Player[];
  onAddMatch: (winner: string, loser: string, score: string) => void;
}

export function AddMatchDialog({
  open,
  onOpenChange,
  players,
  onAddMatch,
}: AddMatchDialogProps) {
  const [winner, setWinner] = useState("");
  const [loser, setLoser] = useState("");
  const [score, setScore] = useState("");

  const handleSubmit = () => {
    if (winner && loser && winner !== loser) {
      onAddMatch(winner, loser, score || "21-0");
      setWinner("");
      setLoser("");
      setScore("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Match</DialogTitle>
          <DialogDescription>
            Record a new table tennis match result.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Winner</label>
            <Select value={winner} onValueChange={setWinner}>
              <SelectTrigger>
                <SelectValue placeholder="Select winner" />
              </SelectTrigger>
              <SelectContent>
                {players.map((player) => (
                  <SelectItem key={player.id} value={player.name}>
                    {player.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Loser</label>
            <Select value={loser} onValueChange={setLoser}>
              <SelectTrigger>
                <SelectValue placeholder="Select loser" />
              </SelectTrigger>
              <SelectContent>
                {players.map((player) => (
                  <SelectItem key={player.id} value={player.name}>
                    {player.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Score (optional)</label>
            <input
              type="text"
              placeholder="e.g. 21-18, 21-15"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!winner || !loser || winner === loser}
          >
            Add Match
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
