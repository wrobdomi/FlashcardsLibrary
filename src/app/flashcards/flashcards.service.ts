import { Learning } from './learning.model';
import { Flashcard } from './flashcard.model';
import { Subject, Subscription } from 'rxjs';
import { SolvedFlashcard } from './solved-flashcard.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { UIService } from '../shared/ui.service';


@Injectable()
export class FlashcardsService {

  // manage available collections
  private availableLearnings: Learning[] =  [];
  learningsChanged = new Subject<Learning[]>();

  private fbSubs: Subscription[] = [];

  // manage flashcards
  private flashcards: Flashcard[] = [];
  flashcardsChanged = new Subject<Flashcard[]>();
  //   { collection: 'German', front: 'a dog', back: 'der Hund'},
  //   { collection: 'German', front: 'a cat', back: 'die Katze'},
  //   { collection: 'German', front: 'a fish', back: 'der Fisch'},
  //   { collection: 'German', front: 'a hamster', back: 'der Hamster'},
  //   { collection: 'German', front: 'a bird', back: 'der Vogel'},
  //   { collection: 'German', front: 'a mouse', back: 'die Maus'},
  //   { collection: 'French', front: 'a dog', back: 'un chien'},
  //   { collection: 'French', front: 'a cat', back: 'un chat'},
  //   { collection: 'French', front: 'a cow', back: 'une vache'},
  //   { collection: 'French', front: 'a horse', back: 'un cheval'},
  //   { collection: 'French', front: 'a goose', back: 'une oie'},
  //   { collection: 'French', front: 'a donkey', back: 'un ane'},
  //   { collection: 'French', front: 'a calt', back: 'un veau'},
  //   { collection: 'French', front: 'a sheep', back: 'un mouton'},
  // ];

  // manage solved flashcards
  solvedFlashcardsChanged = new Subject<SolvedFlashcard[]>();



  collectionChanged = new Subject<string>();
  learningNowCollection: string;


  constructor(
    private db: AngularFirestore,
    private uiService: UIService) {
    this.learningNowCollection = '';
  }

  startLearning(collectionToLearn) {
    this.learningNowCollection = collectionToLearn;
    this.collectionChanged.next(this.learningNowCollection);
  }



  fetchAvailableCollections() {
    // return this.availableLearnings.slice(); // copy of the array
    this.uiService.loadingStateChanged.next(true);
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
        this.uiService.loadingStateChanged.next(false);
        this.availableLearnings = learnings;
        this.learningsChanged.next([...this.availableLearnings]);
      }, error => {
        this.uiService.showSnackbar('Database unavailable. Plase, try later.', null, 3000);
      }));

  }


  fetchFlashcardsForCollection(collectionName: string) {
    // const filteredFlashcards = this.flashcards.filter(
    //   flashcard => flashcard.collection === collectionName);
    // return filteredFlashcards.slice();
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
        console.log('ooo ' + flashcards);
        this.flashcardsChanged.next([...this.flashcards]);
      }, error => {
        this.uiService.showSnackbar('Database unavailable. Plase, try later.', null, 3000);
      }));

  }


  fetchCompletedOrCancelledFlashcards() {
    this.fbSubs.push(
    this.db
      .collection('solvedFlashcards')
      .valueChanges()
      .subscribe( (solved: SolvedFlashcard[]) => {
        this.solvedFlashcardsChanged.next(solved);
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

    console.log('abc' + addedAlready);

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
