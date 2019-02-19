import { NgModule } from '@angular/core';

/** Import components */
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

/** Import modules */
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthModule } from './auth/auth.module';
import { StoreModule} from '@ngrx/store';

/** Import services */
import { AuthService } from './auth/auth.service';
import { FlashcardsService } from './flashcards/flashcards.service';
import { UIService } from './shared/ui.service';

import { environment } from '../environments/environment';
import { reducers } from './app.reducer';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AuthModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [
    AuthService,
    FlashcardsService,
    UIService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
