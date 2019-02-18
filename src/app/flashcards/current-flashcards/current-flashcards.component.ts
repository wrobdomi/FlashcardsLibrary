import { Component, OnInit } from '@angular/core';
import { FlashcardsService } from '../flashcards.service';
import { Learning } from '../learning.model';

@Component({
  selector: 'app-current-flashcards',
  templateUrl: './current-flashcards.component.html',
  styleUrls: ['./current-flashcards.component.css']
})
export class CurrentFlashcardsComponent implements OnInit {

  availableCollections: Learning[] = [];

  constructor(private flashcardsService: FlashcardsService) { }

  ngOnInit() {
    this.availableCollections = this.flashcardsService.getAvailableCollections();
  }

  startLearning(collection) {
    this.flashcardsService.startLearning(collection);
  }

}
