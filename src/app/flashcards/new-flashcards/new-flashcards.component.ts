import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-new-flashcards',
  templateUrl: './new-flashcards.component.html',
  styleUrls: ['./new-flashcards.component.css']
})
export class NewFlashcardsComponent implements OnInit {

  collectionChosen = '';
  flashcardFront = '';
  flashcardBack = '';

  formStage: Number;

  constructor(
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.formStage = 1;
  }


  onCollectionSelected(event) {
    console.log('Receiving event from new-collection');
    console.log(event);
    if (event[2]) {
      this.collectionChosen = event[0];
    } else {
      this.collectionChosen = event[1];
    }
    this.formStage = 2;
  }

  onGoBack() {
    this.collectionChosen = '';
    this.flashcardFront = '';
    this.flashcardBack = '';
    this.formStage = 1;
  }

  onContentAdded(event) {
    console.log('aaaaaaaaaaa');
    this.flashcardFront = event[0];
    this.flashcardBack = event[1];
    this.openSnackBar('Flashcard Added', 'OK');
    console.log(this.collectionChosen);
    console.log(this.flashcardBack);
    console.log(this.flashcardFront);

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }



}
