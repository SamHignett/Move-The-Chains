export type PlayerInfo = {
  id: string;
  name: string;
  age: number;
  height: string;
  weight: number;
  school: string;
  currentTeam: string;
  position: string;
  headshotImageUrl: string;
};

export type PlayerSingleStat = {
  name: string;
  value: number;
  playerID: string;
};
