import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { TimedisplayPipe } from './timedisplay.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsArtworkComponent } from './bs-artwork/bs-artwork.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { AlbumComponent } from './album/album.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatSliderModule,
    MatExpansionModule,
    MatListModule,
    MatSnackBarModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [TimedisplayPipe, BsArtworkComponent, ContextMenuComponent, AlbumComponent],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatListModule,
    MatIconModule,

    ReactiveFormsModule,
    FormsModule,

    ContextMenuComponent,
    BsArtworkComponent,
    TimedisplayPipe,
    AlbumComponent
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500, position: 'top' } }
  ]
})
export class SharedModule {}
