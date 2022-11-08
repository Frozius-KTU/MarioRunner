export type Lobby = {
  id?: string;
  name: string;
  level: number;
  mapId: string;
  player1?: string;
  player2?: string;
};

export type Map = {
  id?: string;
  name: string;
  map: string;
};

export type Client = {
  id?: string;
  name?: string;
  lobbyId?: string;
  created?: string;
};

