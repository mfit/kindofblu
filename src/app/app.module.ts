import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PlayerModule } from './player/player.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { BsArtworkDirective } from './shared/bs-artwork.directive';
import { SettingsModule } from './settings/settings.module';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from './core/core.module';
import { SearchModule } from './search/search.module';

@NgModule({
  declarations: [AppComponent, BsArtworkDirective],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(
      []
      // { enableTracing: true } // <-- debugging purposes only)],
    ),

    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),

    CoreModule,
    PlayerModule,
    SearchModule,
    SettingsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
