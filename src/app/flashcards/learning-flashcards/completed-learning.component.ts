import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-completed-learning',
  template: `<h1 mat-dialog-title> Learning finished! </h1>
             <mat-dialog-content>
              <p> Your score: {{ passedData.questionsCorrect }} / {{ passedData.questionsAll }}. </p>
             </mat-dialog-content>
             <mat-dialog-actions>
              <button mat-button [mat-dialog-close]="true">Ok</button>
             </mat-dialog-actions>
             `
})
export class CompletedLearningComponent {

  constructor( @Inject(MAT_DIALOG_DATA) public passedData: any ) {}

}
