import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolvedFlashcardsComponent } from './solved-flashcards.component';

describe('SolvedFlashcardsComponent', () => {
  let component: SolvedFlashcardsComponent;
  let fixture: ComponentFixture<SolvedFlashcardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolvedFlashcardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolvedFlashcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
