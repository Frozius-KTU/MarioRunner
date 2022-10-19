export type Lobby = {
  id?: string;
  name: string;
  level: number;
  player1?: string;
  player2?: string;
};

export type Client = {
  id?: string;
  name: string;
  lobbyId?: string;
  created?: string;
};

