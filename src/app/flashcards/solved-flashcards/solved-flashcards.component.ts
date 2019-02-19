import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SolvedFlashcard } from '../solved-flashcard.model';
import { FlashcardsService } from '../flashcards.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-solved-flashcards',
  templateUrl: './solved-flashcards.component.html',
  styleUrls: ['./solved-flashcards.component.css']
})
export class SolvedFlashcardsComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['date', 'collection', 'correct', 'wrong', 'state' ];
  dataSource = new MatTableDataSource<SolvedFlashcard>();

  private flashChangedSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private flshcardsService: FlashcardsService) { }

  ngOnInit() {
    this.flashChangedSubscription = this.flshcardsService.solvedFlashcardsChanged.subscribe( (solved: SolvedFlashcard[]) => {
      this.dataSource.data = solved;
    })
    this.flshcardsService.fetchCompletedOrCancellefFlashcards();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.flashChangedSubscription.unsubscribe();
  }

}
