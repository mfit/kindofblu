import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerViewComponent } from './player-view/player-view.component';
import { PlayerRoutingModule } from './player-routing/player-routing.module';
import { PlayerStatusComponent } from './player-status/player-status.component';
import { SharedModule } from '../shared/shared.module';
import { ServicesViewComponent } from './services-view/services-view.component';
import { PlaylistentryComponent } from './playlistentry/playlistentry.component';
import { SearchViewComponent } from './search-view/search-view.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlbumViewComponent } from './album-view/album-view.component';
import { AlbumsongComponent } from './albumsong/albumsong.component';
import { ArtistViewComponent } from './artist-view/artist-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    PlayerRoutingModule,
    SharedModule,

  ],
  declarations: [
    PlayerViewComponent,
    PlayerStatusComponent,
    ServicesViewComponent,
    PlaylistentryComponent,
    SearchViewComponent,
    AlbumViewComponent,
    AlbumsongComponent,
    ArtistViewComponent
  ]
})
export class PlayerModule {
}
