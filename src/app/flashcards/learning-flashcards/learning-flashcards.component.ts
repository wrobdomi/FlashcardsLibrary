import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopLearningComponent } from './stop-learning.components';


@Component({
  selector: 'app-learning-flashcards',
  templateUrl: './learning-flashcards.component.html',
  styleUrls: ['./learning-flashcards.component.css']
})
export class LearningFlashcardsComponent implements OnInit {

  @Input() collectionName = '';

  @Output() learningCancelled = new EventEmitter<void>();


  correct = 20;
  wrong = 20;
  all = 40;


  answered = false;

  constructor( private dialog: MatDialog) { }

  ngOnInit() {
  }

  onAnswered() {
    this.answered = true;
  }

  onCorrectAnswer() {
    this.answered = false;
    this.correct = this.correct + 4;
    this.all = this.all + 4;
  }

  onWrongAnswer() {
    this.answered = false;
    this.wrong = this.wrong + 4;
    this.all = this.all + 4;
  }

  onCancelLearninig() {
    console.log('cancelling learning');
    const dialogRef = this.dialog.open(StopLearningComponent, {data: {
      questionsNum: this.all
    }});

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.all = 0;
        this.correct = 0;
        this.wrong = 0;
        this.learningCancelled.emit();
      }
    });
  }

}
