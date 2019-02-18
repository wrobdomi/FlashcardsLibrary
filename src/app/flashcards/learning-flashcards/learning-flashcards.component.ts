import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopLearningComponent } from './stop-learning.components';
import { FlashcardsService } from '../flashcards.service';
import { Flashcard } from '../flashcard.model';


@Component({
  selector: 'app-learning-flashcards',
  templateUrl: './learning-flashcards.component.html',
  styleUrls: ['./learning-flashcards.component.css']
})
export class LearningFlashcardsComponent implements OnInit {

  correctPercentage: number;
  wrongPercentage: number;
  allQuestionsPercentage: number;

  answeredAll: number;
  answeredCorrect: number;
  answeredWrong: number;

  allQuestionsNum: number;

  answered = false;

  flashcards: Flashcard [];

  @Input() collectionName = '';


  constructor(
    private dialog: MatDialog,
    private flashcardsService: FlashcardsService) { }

  ngOnInit() {
    this.flashcards = this.flashcardsService.getFlashcardsForCollection(this.collectionName);
    this.correctPercentage = 0;
    this.wrongPercentage = 0;
    this.allQuestionsPercentage = 0;
    this.answeredAll = 0;
    this.answeredCorrect = 0;
    this.answeredWrong = 0;
    this.allQuestionsNum = this.flashcards.length;
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
  }

  onWrongAnswer() {
    this.answered = false;
    this.answeredWrong = this.answeredWrong + 1;
    this.answeredAll = this.answeredAll + 1;
    this. wrongPercentage = this.wrongPercentage + 100 / this.flashcards.length;
    this.allQuestionsPercentage = this.allQuestionsPercentage + 100 / this.flashcards.length;
  }

  onCancelLearninig() {
    const dialogRef = this.dialog.open(StopLearningComponent, {data: {
      questionsNum: this.answeredAll
    }});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.flashcardsService.startLearning(null);
      }
    });
  }

}
