import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerViewComponent } from './player-view/player-view.component';
import { PlayerRoutingModule } from './player-routing.module';
import { PlayerStatusComponent } from './player-status/player-status.component';
import { SharedModule } from '../shared/shared.module';
import { ServicesViewComponent } from '../settings/services-view/services-view.component';
import { PlaylistentryComponent } from './playlistentry/playlistentry.component';
import { SearchViewComponent } from '../search/search-view/search-view.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlbumViewComponent } from './album-view/album-view.component';
import { AlbumsongComponent } from './albumsong/albumsong.component';
import { ArtistViewComponent } from './artist-view/artist-view.component';
import { PlayerControlsComponent } from './player-controls/player-controls.component';

import * as fromPlayer from './player.reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PlayerEffects } from './player.effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PlayerRoutingModule,
    SharedModule,
    StoreModule.forFeature(fromPlayer.PlayerFeatureKey, fromPlayer.reducer),
    EffectsModule.forFeature([PlayerEffects])
  ],
  declarations: [
    PlayerViewComponent,
    PlayerStatusComponent,
    ServicesViewComponent,
    PlaylistentryComponent,
    SearchViewComponent,
    AlbumViewComponent,
    AlbumsongComponent,
    ArtistViewComponent,
    PlayerControlsComponent
  ]
})
export class PlayerModule {}
