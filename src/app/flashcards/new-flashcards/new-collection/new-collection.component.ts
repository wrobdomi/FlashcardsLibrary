import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-collection',
  templateUrl: './new-collection.component.html',
  styleUrls: ['./new-collection.component.css']
})
export class NewCollectionComponent implements OnInit {

  addToExistingCollection = false;
  newCollection: string;
  oldCollection: string;
  myChip: string;

  @Output() collectionChanged = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit() {
  }

  onCollectionChosen() {

    console.log(this.addToExistingCollection);
    console.log(this.oldCollection);
    console.log(this.newCollection);
    this.collectionChanged.emit([this.oldCollection, this.newCollection, this.addToExistingCollection.toString()]);

  }

  chipSelected(chip) {
    console.log(chip.selected);
  }




}
