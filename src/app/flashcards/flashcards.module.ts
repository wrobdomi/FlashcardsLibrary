import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FlashcardsComponent } from './flashcards.component';
import { CurrentFlashcardsComponent } from './current-flashcards/current-flashcards.component';
import { NewFlashcardsComponent } from './new-flashcards/new-flashcards.component';
import { SolvedFlashcardsComponent } from './solved-flashcards/solved-flashcards.component';
import { StopLearningComponent } from './learning-flashcards/stop-learning.component';
import { CompletedLearningComponent } from './learning-flashcards/completed-learning.component';
import { NewCollectionComponent } from './new-flashcards/new-collection/new-collection.component';
import { NewFlashcardContentComponent } from './new-flashcards/new-flashcard-content/new-flashcard-content.component';
import { LearningFlashcardsComponent } from './learning-flashcards/learning-flashcards.component';
import { SharedModule } from '../shared/shared.module';
import { FlashcardsRoutingModule } from './flashcards-routing.module';


@NgModule({
    declarations: [
      FlashcardsComponent,
      CurrentFlashcardsComponent,
      NewFlashcardsComponent,
      SolvedFlashcardsComponent,
      StopLearningComponent,
      CompletedLearningComponent,
      NewCollectionComponent,
      NewFlashcardContentComponent,
      LearningFlashcardsComponent,
      ],
    imports: [
      SharedModule,
      FlashcardsRoutingModule
    ],
    exports: [],
    entryComponents: [
      StopLearningComponent,
      CompletedLearningComponent]
})
export class FlashcardsModule {}
