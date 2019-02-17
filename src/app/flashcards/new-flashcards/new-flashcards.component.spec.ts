import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFlashcardsComponent } from './new-flashcards.component';

describe('NewFlashcardsComponent', () => {
  let component: NewFlashcardsComponent;
  let fixture: ComponentFixture<NewFlashcardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFlashcardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFlashcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
