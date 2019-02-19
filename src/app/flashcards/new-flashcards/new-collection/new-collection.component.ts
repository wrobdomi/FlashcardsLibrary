import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FlashcardsService } from '../../flashcards.service';
import { Learning } from '../../learning.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-collection',
  templateUrl: './new-collection.component.html',
  styleUrls: ['./new-collection.component.css']
})
export class NewCollectionComponent implements OnInit, OnDestroy {

  addToExistingCollection = false;
  newCollection: string;
  oldCollection: string;
  collectionToAdd: string;

  availableCollections: Learning[] = [];
  // availableCollections: Observable<any>;
  availableCollectionsSubscription: Subscription;

  @Output() collectionSelected = new EventEmitter<string>();

  constructor(
    private flashcardsService: FlashcardsService) { }

  ngOnInit() {
    // this.availableCollections = this.flashcardsService.getAvailableCollections();
    this.availableCollectionsSubscription = this.flashcardsService.learningsChanged.subscribe(
      learnings => this.availableCollections = learnings
    );
    this.flashcardsService.fetchAvailableCollections();
  }

  onCollectionChosen() {
    if (this.addToExistingCollection) {
      this.collectionToAdd = this.oldCollection;
    } else {
      this.collectionToAdd = this.newCollection;
    }
    this.collectionSelected.emit(this.collectionToAdd);
  }

  onClickedFab(exColl) {
    this.collectionSelected.emit(exColl);
  }

  ngOnDestroy() {
    if ( this.availableCollectionsSubscription ) {
      this.availableCollectionsSubscription.unsubscribe();
    }

  }

}
