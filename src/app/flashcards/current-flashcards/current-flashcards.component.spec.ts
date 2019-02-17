import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentFlashcardsComponent } from './current-flashcards.component';

describe('CurrentFlashcardsComponent', () => {
  let component: CurrentFlashcardsComponent;
  let fixture: ComponentFixture<CurrentFlashcardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentFlashcardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentFlashcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
