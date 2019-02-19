import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlashcardsService } from '../flashcards.service';
import { Learning } from '../learning.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-current-flashcards',
  templateUrl: './current-flashcards.component.html',
  styleUrls: ['./current-flashcards.component.css']
})
export class CurrentFlashcardsComponent implements OnInit, OnDestroy {

  availableCollections: Learning[] = [];
  availableCollectionsSubscription: Subscription;

  constructor(private flashcardsService: FlashcardsService) { }

  ngOnInit() {
    //  this.availableCollections = this.flashcardsService.getAvailableCollections();
    this.availableCollectionsSubscription = this.flashcardsService.learningsChanged.subscribe(
      learnings => this.availableCollections = learnings
    );
    this.flashcardsService.fetchAvailableCollections();
  }

  startLearning(collection) {
    this.flashcardsService.startLearning(collection);
  }

  ngOnDestroy() {
    this.availableCollectionsSubscription.unsubscribe();
  }




}
