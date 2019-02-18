import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FlashcardsService } from '../flashcards.service';
import { Learning } from '../learning.model';

@Component({
  selector: 'app-current-flashcards',
  templateUrl: './current-flashcards.component.html',
  styleUrls: ['./current-flashcards.component.css']
})
export class CurrentFlashcardsComponent implements OnInit {

  @Output() startLearningCollection = new EventEmitter<string>();

  availableCollections: Learning[] = [];

  constructor(private flashcardsService: FlashcardsService) { }

  ngOnInit() {
    this.availableCollections = this.flashcardsService.getAvailableCollections();
  }

  startLearning(collection) {
    console.log(collection);
    this.startLearningCollection.emit(collection);
  }

}
