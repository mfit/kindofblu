import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import * as parser from 'fast-xml-parser';
import * as he from 'he';
import { Observable } from 'rxjs';
import { PlayerStatus, Playlist, SearchResult, Album } from './api/interfaces';
import { ServiceDef } from './api/interfaces/service-def';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BsapiService {
  protocol = 'http';
  ip = '192.168.0.19';
  port = '11000';
  public baseurl = 'http://192.168.0.102:11000';

  parserOptions = {
    // attributeNamePrefix: "@_",
    attrNodeName: 'attr', //default is 'false'
    textNodeName: '#text',
    ignoreAttributes: false,
    // ignoreNameSpace: false,
    // allowBooleanAttributes: false,
    parseNodeValue: true,
    parseAttributeValue: true,
    // trimValues: true,
    cdataTagName: '__cdata', //default is 'false'
    // cdataPositionChar: "\\c",
    // localeRange: "", //To support non english character in tag/attribute values.
    parseTrueNumberOnly: true,
    attrValueProcessor: a => he.decode(a, { isAttributeValue: true }), //default is a=>a
    tagValueProcessor: a => he.decode(a) //default is a=>a
  };

  constructor(private http: HttpClient) {}

  // service discovery
  getServiceList() {
    return this._doGet('/Services');
  }

  // retrieve overview available services
  getServices(): Observable<{ items: ServiceDef[] }> {
    return this._doGet('/Browse?service=Capture').pipe(
      map(response => {
        return { items: response.browse.item.map(this._FixXmlParse) };
      })
    );
  }

  // Player status ! current track, seconds into track etc.
  getStatus(): Observable<PlayerStatus> {
    return this._doGet('/Status').pipe(map(response => <PlayerStatus>response.status));
  }

  getCurrentPlaylist(): Observable<Playlist> {
    return this._doGet('/Playlist').pipe(
      tap(v => console.log(v)),
      map(playlist => {
        return {
          songs: this._listItemHelper(playlist.playlist.song)
        };
      })
    );
  }

  setVolume(pctg: number): Observable<any> {
    return this._doGet('/Volume?level=' + pctg);
  }

  play() {
    return this._doGet('/Play');
  }

  pause() {
    return this._doGet('/Pause');
  }

  // play song (from current playlist)
  playSong(id: number) {
    return this._doGet('/Play?id=' + id);
  }

  clearSong(id: number) {
    return this._doGet('/Clear?id=' + id);
  }

  search(query, service = ''): Observable<SearchResult> {
    // http://192.168.0.19:11000/Search?service=Qobuz&expr=Coltrane
    query = encodeURI(query);
    const queryReqUrl = `/Search?service=${service}&expr=${query}`;
    return this._doGet(queryReqUrl).pipe(
      map(response => {
        const searchResult = this._FixXmlParse(response.search);
        // console.log(searchResult);

        try {
          return {
            service: searchResult.service,
            songs: response.search.songs ? this._listItemHelper(response.search.songs.song) : [],
            albums: response.search.albums
              ? this._listItemHelper(response.search.albums.album)
              : [],
            artists: response.search.artists
              ? this._listItemHelper(response.search.artists.artist)
              : []
          };
        } catch (e) {
          console.error('search result object error ... ');
          console.error(searchResult);
        }
      })
    );
  }

  /**
   * Helper for lists in response/results.
   * . check for null/undefined
   * - always produces a list (single objects are wrappe in a list)
   * - pipe the/all object(s) thru the xml attribute-fix parser
   */
  _listItemHelper(obj) {
    // for none, return empty list
    if (!obj) {
      return [];
    }

    // either map multiple objects, or put the one object in a list
    if (obj.map) {
      return obj.map(v => this._FixXmlParse(v));
    } else {
      return [this._FixXmlParse(obj)];
    }
  }

  // http://192.168.0.19:11000/Add?playnow=1&service=Qobuz&albumid=5014436905025
  // add an album to playlist, optionally start playing right now
  // Also available :
  //    where=next , where=last
  addAlbum(albumid, service, where = 'next', playnow = -1) {
    const queryReqUrl = `/Add?albumid=${albumid}&service=${service}&where=${where}&playnow=${playnow}`;
    return this._doGet(queryReqUrl).pipe(map(res => this._FixXmlParse(res.addsong)));
  }

  addSong(songid, service, where = 'next', playnow = -1) {
    const queryReqUrl = `/Add?songid=${songid}&service=${service}&where=${where}&playnow=${playnow}`;
    return this._doGet(queryReqUrl).pipe(map(res => this._FixXmlParse(res.addsong)));
  }

  playlistClear() {
    return this._doGet('/Clear').pipe(map(res => this._FixXmlParse(res.addsong)));
  }

  // Get songs of an album
  // http://192.168.0.19:11000/Songs?service=Qobuz&albumid=5014436905025
  getSongsOfAlbum(albumid, service): Observable<Album> {
    return this._doGet(`/Songs?albumid=${albumid}&service=${service}`).pipe(
      map(result => {
        const mapped = Object.assign(this._FixXmlParse(result.songs), {
          songs: result.songs.song.map(this._FixXmlParse)
        });
        delete mapped['song'];
        return mapped;
      })
    );
  }

  // Get albums of an artist
  // http://192.168.0.19:11000/Albums?service=Qobuz&artistid=384655
  getAlbumsOfArtist(artistid, service) {
    // Query albums for artist, get more at once  (up to 128)
    const requestUrl = `/Albums?artistid=${artistid}&service=${service}&start=0&end=128`;
    return this._doGet(requestUrl).pipe(
      map(result => {
        const mappedResult = this._FixXmlParse(result.albums);
        return {
          service: mappedResult.service,
          nextlink: mappedResult.nextlink || null, // in case of more data
          albums: this._listItemHelper(mappedResult.album) // parse result list
        };
      })
    );
  }

  getAlbumArt(albumid, service) {
    return this._url(`/Artwork?service=${service}&albumid=${albumid}`);
  }

  getArtistArt(artistid, service) {
    return this._url(`/Artwork?service=${service}&artistid=${artistid}`);
  }

  getSongArt(songid, service) {
    return this._url(`/Artwork?service=${service}&songid=${songid}`);
  }

  hostPrefix(url) {
    return this._url(url);
  }

  private _doGet(url) {
    return this.http
      .get(this._url(url), {
        responseType: 'text'
      })
      .pipe(map(response => this._parse(response)));
  }

  private _parse(response) {
    // const xml = response.text();
    const xml = response;
    const parsed = parser.parse(xml, this.parserOptions);
    if (!!parsed.error) {
      throw new Error(parsed.error.message + ': ' + parsed.error.detail);
    }
    return parsed;
  }

  private _url(qstr) {
    return this.baseurl + qstr;
    // return `${protocol}://${ip}:${port}/${qstr}`;
  }

  private _FixXmlParse(obj) {
    if (!obj) return {};
    if (obj.attr) {
      Object.keys(obj.attr).forEach(attrname => {
        const val = obj.attr[attrname];
        const key = attrname.replace('@_', '');
        obj[key] = val;
      });
      delete obj['attr'];
    }
    return obj;
  }

  // http://192.168.1.38:11000/Services
}
