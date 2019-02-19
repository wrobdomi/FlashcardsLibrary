import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { FlashcardsService } from '../flashcards.service';
import { Flashcard } from '../flashcard.model';

@Component({
  selector: 'app-new-flashcards',
  templateUrl: './new-flashcards.component.html',
  styleUrls: ['./new-flashcards.component.css']
})
export class NewFlashcardsComponent implements OnInit {

  collectionChosen: string;
  flashcardFront: string;
  flashcardBack: string;
  formStage: number;

  constructor(
    private snackBar: MatSnackBar,
    private flashcardsService: FlashcardsService
  ) { }

  ngOnInit() {
    this.formStage = 1;
    this.collectionChosen = '';
    this.flashcardFront = '';
    this.flashcardBack = '';
  }


  onCollectionSelected(selectedCollection) {
    this.collectionChosen = selectedCollection;
    this.formStage = 2;
  }

  onGoBack() {
    this.formStage = 1;
    this.collectionChosen = '';
    this.flashcardFront = '';
    this.flashcardBack = '';
  }

  onContentAdded(flashcardSelected) {

    this.flashcardFront = flashcardSelected[0];
    this.flashcardBack = flashcardSelected[1];
    const flashcard: Flashcard = {
      collection: this.collectionChosen,
      front: this.flashcardFront,
      back: this.flashcardBack
    };
    this.flashcardsService.addFlashcard(flashcard);
    this.openSnackBar('Flashcard Added', 'OK');
    this.formStage = 1;

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

}
