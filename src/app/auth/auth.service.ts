import { User } from './user.model';
import { AuthData } from './auth-data.module';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FlashcardsService } from '../flashcards/flashcards.service';

@Injectable()
export class AuthService {

  private isAuthenticated = false;
  authChange = new Subject<boolean>();

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private flashcardsService: FlashcardsService ) {}


  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/flashcards']);
      } else {
        this.flashcardsService.cancelSubscriptions();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
      ).then( result => {
        console.log(result);
      })
      .catch( error => {
        console.log(error);
      });
  }


  login(authData: AuthData) {
    this.afAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    ).then( result => {
      console.log(result);
    })
    .catch( error => {
      console.log(error);
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }


  isAuth() {
    return this.isAuthenticated;
  }


}
