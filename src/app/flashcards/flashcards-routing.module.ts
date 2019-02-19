import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlashcardsComponent } from './flashcards.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: FlashcardsComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class FlashcardsRoutingModule {}
