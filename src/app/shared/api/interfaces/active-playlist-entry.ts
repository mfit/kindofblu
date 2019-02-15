import { PlaylistEntry } from "./playlist-entry";

export interface ActivePlaylistEntry extends PlaylistEntry {
  playing;
}