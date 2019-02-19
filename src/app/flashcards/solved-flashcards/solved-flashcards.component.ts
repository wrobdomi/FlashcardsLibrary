import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SolvedFlashcard } from '../solved-flashcard.model';
import { FlashcardsService } from '../flashcards.service';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-solved-flashcards',
  templateUrl: './solved-flashcards.component.html',
  styleUrls: ['./solved-flashcards.component.css']
})
export class SolvedFlashcardsComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['date', 'collection', 'correct', 'wrong', 'state' ];
  dataSource = new MatTableDataSource<SolvedFlashcard>();

  isLoading = true;
  private solvedReadySubscription: Subscription;

  private flashChangedSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private flshcardsService: FlashcardsService,
    private uiService: UIService) { }

  ngOnInit() {
    this.solvedReadySubscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });

    this.flashChangedSubscription = this.flshcardsService.solvedFlashcardsChanged.subscribe( (solved: SolvedFlashcard[]) => {
      this.dataSource.data = solved;
    });
    this.flshcardsService.fetchCompletedOrCancelledFlashcards();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {

    if (this.flashChangedSubscription) {
      this.flashChangedSubscription.unsubscribe();
    }
    if (this.solvedReadySubscription) {
      this.solvedReadySubscription.unsubscribe();
    }

  }

}
