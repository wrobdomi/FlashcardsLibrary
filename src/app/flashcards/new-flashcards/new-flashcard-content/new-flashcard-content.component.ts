import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-new-flashcard-content',
  templateUrl: './new-flashcard-content.component.html',
  styleUrls: ['./new-flashcard-content.component.css']
})
export class NewFlashcardContentComponent implements OnInit {

  front: string;
  back: string;
  @Input() collectionToAdd: string;

  @Output() goBack = new EventEmitter<void>();
  @Output() contentAdded = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit() {
  }

  onContentAdded() {
    console.log('Inside onContentAdded = NewFlashCardComponent');
    this.contentAdded.emit([this.front, this.back]);
  }

  onGoBack() {
    this.goBack.emit();
  }


}
