import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Player {
  id: number;
  name: string;
  elo: number;
  wins: number;
  losses: number;
}

interface PlayerRankingsProps {
  players: Player[];
}

export function PlayerRankings({ players }: PlayerRankingsProps) {
  const sortedPlayers = [...players].sort((a, b) => b.elo - a.elo);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">Rank</TableHead>
          <TableHead>Player</TableHead>
          <TableHead className="text-right">ELO</TableHead>
          <TableHead className="text-right">W/L</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedPlayers.map((player, index) => (
          <TableRow key={player.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{player.name}</TableCell>
            <TableCell className="text-right">{player.elo}</TableCell>
            <TableCell className="text-right">
              {player.wins}/{player.losses}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
