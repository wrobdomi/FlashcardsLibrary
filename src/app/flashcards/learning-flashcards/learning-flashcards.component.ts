import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopLearningComponent } from './stop-learning.component';
import { CompletedLearningComponent } from './completed-learning.component';
import { FlashcardsService } from '../flashcards.service';
import { Flashcard } from '../flashcard.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-learning-flashcards',
  templateUrl: './learning-flashcards.component.html',
  styleUrls: ['./learning-flashcards.component.css']
})
export class LearningFlashcardsComponent implements OnInit, OnDestroy {

  learningStarted = false;

  correctPercentage: number;
  wrongPercentage: number;
  allQuestionsPercentage: number;

  answeredAll: number;
  answeredCorrect: number;
  answeredWrong: number;

  allQuestionsNum: number;

  answered = false;

  flashcards: Flashcard [] = [];
  flashcardsSubscription: Subscription;

  currentFlashcardFront: string;
  currentFlashcardBack: string;

  @Input() collectionName = '';


  constructor(
    private dialogCancelled: MatDialog,
    private dialogCompleted: MatDialog,
    private flashcardsService: FlashcardsService) {}

  ngOnInit() {

    this.flashcardsSubscription = this.flashcardsService.flashcardsChanged.subscribe(
      flashcards =>  {
        this.flashcards = flashcards;
        console.log('aaaaaaaaaaaaaaaaaaa');
        console.log(flashcards[0].front);
        console.log(flashcards[0].back);

    }
    );
    this.flashcardsService.fetchFlashcardsForCollection(this.collectionName);

    console.log('bbbbbbbbbbbbbbbbbbbbbbbb');
    this.correctPercentage = 0;
    this.wrongPercentage = 0;
    this.allQuestionsPercentage = 0;
    this.answeredAll = 0;
    this.answeredCorrect = 0;
    this.answeredWrong = 0;

  }

  onAnswered() {
    this.answered = true;
  }

  onCorrectAnswer() {
    this.answered = false;
    this.answeredCorrect = this.answeredCorrect + 1;
    this.answeredAll = this.answeredAll + 1;
    this.correctPercentage = this.correctPercentage + 100 / this.flashcards.length;
    this.allQuestionsPercentage = this.allQuestionsPercentage + 100 / this.flashcards.length;
    if (this.answeredAll === this.allQuestionsNum) {

      this.onCompletedLearning();
    } else {
      this.currentFlashcardFront = this.flashcards[this.answeredAll].front;
      this.currentFlashcardBack = this.flashcards[this.answeredAll].back;
    }

  }

  onWrongAnswer() {
    this.answered = false;
    this.answeredWrong = this.answeredWrong + 1;
    this.answeredAll = this.answeredAll + 1;
    this. wrongPercentage = this.wrongPercentage + 100 / this.flashcards.length;
    this.allQuestionsPercentage = this.allQuestionsPercentage + 100 / this.flashcards.length;
    if (this.answeredAll === this.allQuestionsNum) {
      this.onCompletedLearning();
    } else {
      this.currentFlashcardFront = this.flashcards[this.answeredAll].front;
      this.currentFlashcardBack = this.flashcards[this.answeredAll].back;
    }
  }

  startLearning() {
    this.learningStarted = true;
    this.allQuestionsNum = this.flashcards.length;
    this.currentFlashcardFront = this.flashcards[0].front;
    this.currentFlashcardBack = this.flashcards[0].back;

  }

  onCompletedLearning() {

    this.flashcardsService.addSolvedFlashcards({
      collection: this.collectionName,
      all: this.allQuestionsNum,
      correct: this.answeredCorrect,
      wrong: this.answeredWrong,
      date: new Date(),
      state: 'completed'
    });

    const dialogRef = this.dialogCompleted.open(CompletedLearningComponent, {data: {
      questionsCorrect: this.answeredCorrect,
      questionsAll: this.answeredAll
    }});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.flashcardsService.startLearning(null);
      }
    });
  }

  onCancelLearninig() {

    this.flashcardsService.addSolvedFlashcards({
      collection: this.collectionName,
      all: this.allQuestionsNum,
      correct: this.answeredCorrect,
      wrong: this.answeredWrong,
      date: new Date(),
      state: 'cancelled'
    });

    const dialogRef = this.dialogCancelled.open(StopLearningComponent, {data: {
      questionsNum: this.answeredAll
    }});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.flashcardsService.startLearning(null);
      }
    });
  }

  ngOnDestroy() {
    this.flashcardsSubscription.unsubscribe();
  }



}
