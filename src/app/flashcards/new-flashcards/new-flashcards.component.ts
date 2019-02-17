import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-flashcards',
  templateUrl: './new-flashcards.component.html',
  styleUrls: ['./new-flashcards.component.css']
})
export class NewFlashcardsComponent implements OnInit {

  addToExistingCollection = false;

  collectionChosen = '';
  flashcardFront = '';
  flashcardBack = '';

  choiceStage = 0;

  constructor() { }

  ngOnInit() {
  }

}
