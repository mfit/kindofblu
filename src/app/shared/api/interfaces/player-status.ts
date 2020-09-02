
export interface PlayerStatus {
  album: string;
  artist: string;
  // canMovePlayback: true
  canSeek: number;
  // cursor: 1097
  db: string;
  fn: string; // "Qobuz:16148445"
  image: string; // "/Artwork?service=Qobuz&amp;songid=Qobuz%3A16148445"
  // indexing: 0
  // mid: 0
  // mode: 1
  name: string;
  pid: number;
  // prid: 0
  quality: string; // "cd"
  repeat: number;
  shuffle: number;
  secs: number;
  service: string; // "Qobuz"
  serviceIcon: string; // "/Sources/images/QobuzIcon.png"

  // sid: 3
  // sleep: ""

  song: number; // 1095 (playlist-entry id)
  state: string; // "play"
  streamFormat: string; // "FLAC 44100/16/2"
  // syncStat: 6
  title1: string; // "The Maze"
  title2: string; // "Herbie Hancock"
  title3: string; // "Takin' Off"
  totlen: number; // 407
  volume: number; // 52

  // added
  serviceIconUrl?: string;
}
