import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.css']
})
export class FlashcardsComponent implements OnInit {

  learningStatus = false;
  nowLearning = '';

  constructor() { }

  ngOnInit() {
  }

  startLearning(collection) {
    this.learningStatus = true;
    this.nowLearning = collection;
    console.log('Now learning ' + collection);
  }


  onLearningCancelled() {
    this.learningStatus = false;
  }


}
