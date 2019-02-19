import { Learning } from './learning.model';
import { Flashcard } from './flashcard.model';
import { Subject, Subscription } from 'rxjs';
import { SolvedFlashcard } from './solved-flashcard.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { UIService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as fromRoot from '../app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class FlashcardsService {

  // manage available collections
  private availableLearnings: Learning[] =  [];
  learningsChanged = new Subject<Learning[]>();

  private fbSubs: Subscription[] = [];

  // manage flashcards
  private flashcards: Flashcard[] = [];
  flashcardsChanged = new Subject<Flashcard[]>();

  // manage solved flashcards
  solvedFlashcardsChanged = new Subject<SolvedFlashcard[]>();

  collectionChanged = new Subject<string>();
  learningNowCollection: string;


  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromRoot.State>) {
    this.learningNowCollection = '';
  }

  startLearning(collectionToLearn) {
    this.learningNowCollection = collectionToLearn;
    this.collectionChanged.next(this.learningNowCollection);
  }


  fetchAvailableCollections() {
    this.fbSubs.push(
    this.db
      .collection('availableLearnings')
      .snapshotChanges()
      .pipe( map(docArray => {
        return docArray.map(doc => {
          return {
            collection: doc.payload.doc.data()['collection'],
            all: doc.payload.doc.data()['all']
          };
        });
      }))
      .subscribe(
        ( learnings: Learning[]) => {
        this.availableLearnings = learnings;
        this.learningsChanged.next([...this.availableLearnings]);
      }, error => {
        this.uiService.showSnackbar('Database unavailable. Plase, try later.', null, 3000);
      }));

  }


  fetchFlashcardsForCollection(collectionName: string) {
    this.fbSubs.push(
    this.db
      .collection(collectionName)
      .snapshotChanges()
      .pipe( map(docArray => {
        return docArray.map(doc => {
          return {
            collection: doc.payload.doc.data()['collection'],
            front: doc.payload.doc.data()['front'],
            back: doc.payload.doc.data()['back']
          };
        });
      }))
      .subscribe(
        ( flashcards: Flashcard[]) => {
        this.flashcards = flashcards;
        this.flashcardsChanged.next([...this.flashcards]);
      }, error => {
        this.uiService.showSnackbar('Database unavailable. Plase, try later.', null, 3000);
      }));

  }


  fetchCompletedOrCancelledFlashcards() {
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(
    this.db
      .collection('solvedFlashcards')
      .valueChanges()
      .subscribe( (solved: SolvedFlashcard[]) => {
        this.solvedFlashcardsChanged.next(solved);
        this.store.dispatch(new UI.StopLoading());
      }, error => {
        this.uiService.showSnackbar('Database unavailable. Plase, try later.', null, 3000);
      }));
  }

  addSolvedFlashcards(solved: SolvedFlashcard) {
    this.addCompletedOrClosedFlashcardsToDB(solved);
  }

  addFlashcard(flashcard: Flashcard) {
    this.addNewFlashcardToBD(flashcard);
  }

  private addCompletedOrClosedFlashcardsToDB(solved: SolvedFlashcard) {
    this.db.collection('solvedFlashcards').add(solved);
  }

  private addNewFlashcardToBD(flashcard: Flashcard) {
    // add flashcard
    this.db.collection(flashcard.collection).add(flashcard);

    // update number of flashcards
    const addedAlready = this.availableLearnings.filter(x => x.collection === flashcard.collection);

    let qNum = 1;
    // case: collection already exists
    if (addedAlready.length !== 0) {
      qNum = addedAlready[0].all;
      qNum = qNum + 1;
    }

    const learning = {
      collection: flashcard.collection,
      all: qNum
    };

    if (addedAlready.length !== 0) {
      this.db.doc( 'availableLearnings/' + flashcard.collection).update(learning);
    } else {  // case: collection does not exist
      this.db.doc('availableLearnings/' + flashcard.collection).set(learning);
    }

  }


  cancelSubscriptions()  {
    this.fbSubs.forEach( sub => sub.unsubscribe());
  }

}
