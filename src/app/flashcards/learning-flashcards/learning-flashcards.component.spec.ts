import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningFlashcardsComponent } from './learning-flashcards.component';

describe('LearningFlashcardsComponent', () => {
  let component: LearningFlashcardsComponent;
  let fixture: ComponentFixture<LearningFlashcardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningFlashcardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningFlashcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
