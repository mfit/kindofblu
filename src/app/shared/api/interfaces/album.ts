import { AlbumSong } from './album-song';

export interface Album {
  albumid: string;
  service: string;
  songs: AlbumSong[];
}
