import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerViewComponent } from '../player-view/player-view.component';
import { ServicesViewComponent } from '../services-view/services-view.component';
import { SearchViewComponent } from '../search-view/search-view.component';
import { AlbumViewComponent } from '../album-view/album-view.component';
import { ArtistViewComponent } from '../artist-view/artist-view.component';

const routes: Routes = [
  {
    path: 'player',
    component: PlayerViewComponent,
  },
  {
    path: 'services',
    component: ServicesViewComponent,
  },
  {
    path: 'search',
    component: SearchViewComponent,
  },
  {
    path: 'album/:albumid',
    component: AlbumViewComponent,
  },
  {
    path: 'artist/:artistid',
    component: ArtistViewComponent,
  },
  {
    path: '',
    redirectTo: '/player',
    pathMatch: 'full'
  },
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PlayerRoutingModule {
}
