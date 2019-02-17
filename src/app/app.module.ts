import { NgModule } from '@angular/core';

/** Import components */
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { FlashcardsComponent } from './flashcards/flashcards.component';
import { CurrentFlashcardsComponent } from './flashcards/current-flashcards/current-flashcards.component';
import { NewFlashcardsComponent } from './flashcards/new-flashcards/new-flashcards.component';
import { SolvedFlashcardsComponent } from './flashcards/solved-flashcards/solved-flashcards.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';

/** Import modules */
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { NewCollectionComponent } from './flashcards/new-flashcards/new-collection/new-collection.component';
import { NewFlashcardContentComponent } from './flashcards/new-flashcards/new-flashcard-content/new-flashcard-content.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    FlashcardsComponent,
    CurrentFlashcardsComponent,
    NewFlashcardsComponent,
    SolvedFlashcardsComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent,
    NewCollectionComponent,
    NewFlashcardContentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
