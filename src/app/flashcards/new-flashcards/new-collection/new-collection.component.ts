import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FlashcardsService } from '../../flashcards.service';
import { Learning } from '../../learning.model';

@Component({
  selector: 'app-new-collection',
  templateUrl: './new-collection.component.html',
  styleUrls: ['./new-collection.component.css']
})
export class NewCollectionComponent implements OnInit {

  addToExistingCollection = false;
  newCollection: string;
  oldCollection: string;
  collectionToAdd: string;

  availableCollections: Learning[] = [];


  @Output() collectionSelected = new EventEmitter<string>();

  constructor(private flashcardsService: FlashcardsService) { }

  ngOnInit() {
    this.availableCollections = this.flashcardsService.getAvailableCollections();
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


}
