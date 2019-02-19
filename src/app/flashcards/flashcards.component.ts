import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlashcardsService } from './flashcards.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.css']
})
export class FlashcardsComponent implements OnInit, OnDestroy {

  learningStatus = false;
  nowLearning = '';

  nowLearningCollection: Subscription;

  constructor(private flashcardsService: FlashcardsService) { }

  ngOnInit() {
    this.nowLearningCollection = this.flashcardsService.collectionChanged.subscribe(collectionName => {
      if ( collectionName ) {
        this.nowLearning = collectionName;
        this.learningStatus = true;
        console.log('Now learning ' + this.nowLearning);
      } else {
        this.nowLearning = '';
        this.learningStatus = false;
      }
    });

  }

  ngOnDestroy() {
    if (this.nowLearningCollection) {
      this.nowLearningCollection.unsubscribe();
    }
  }


}
