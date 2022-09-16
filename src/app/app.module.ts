import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { FilterComponent } from './components/note-filter/note-filter.component';
import { NotePageComponent } from './pages/note-page/note-page.component';
import { NoteModalComponent } from './components/note-modal/note-modal.component';
import { HomePageButtonsComponent } from './components/home-page-buttons/home-page-buttons.component';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { PipesModule } from './pipes/pipes.module';
import { MobileViewUpdateNoteComponent } from './components/mobile-view-update-note/mobile-view-update-note.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    NoteCardComponent,
    FilterComponent,
    NotePageComponent,
    NoteModalComponent,
    HomePageButtonsComponent,
    MobileViewUpdateNoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    HttpClientModule,
    Ng2FilterPipeModule,
    PipesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
