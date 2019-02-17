import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFlashcardContentComponent } from './new-flashcard-content.component';

describe('NewFlashcardContentComponent', () => {
  let component: NewFlashcardContentComponent;
  let fixture: ComponentFixture<NewFlashcardContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFlashcardContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFlashcardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
