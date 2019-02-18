import { Learning } from './learning.model';
import { Flashcard } from './flashcard.model';
import { Subject } from 'rxjs';

export class FlashcardsService {

  private availableLearnings: Learning[] = [
    { id: 'german', collection: 'German', all: 30,  },
    { id: 'french', collection: 'French', all: 35,  },
    { id: 'capitals', collection: 'Capitals', all: 50,  },
    { id: 'spanish', collection: 'Spanish', all: 40,  },
    { id: 'art', collection: 'Art', all: 40,  },
    { id: 'italian', collection: 'Italian', all: 40,  },
    { id: 'music', collection: 'Music', all: 40,  }
  ];

  private flashcards: Flashcard[] = [
    { collection: 'German', front: 'a dog', back: 'der Hund'},
    { collection: 'German', front: 'a cat', back: 'die Katze'},
    { collection: 'German', front: 'a fish', back: 'der Fisch'},
    { collection: 'German', front: 'a hamster', back: 'der Hamster'},
    { collection: 'German', front: 'a bird', back: 'der Vogel'},
    { collection: 'German', front: 'a mouse', back: 'die Maus'},
    { collection: 'French', front: 'a dog', back: 'un chien'},
    { collection: 'French', front: 'a cat', back: 'un chat'},
    { collection: 'French', front: 'a cow', back: 'une vache'},
    { collection: 'French', front: 'a horse', back: 'un cheval'},
    { collection: 'French', front: 'a goose', back: 'une oie'},
    { collection: 'French', front: 'a donkey', back: 'un ane'},
    { collection: 'French', front: 'a calt', back: 'un veau'},
    { collection: 'French', front: 'a sheep', back: 'un mouton'},
  ];

  collectionChanged = new Subject<string>();

  learningNowCollection: string;

  constructor() {
    this.learningNowCollection = '';
  }

  startLearning(collectionToLearn) {
    this.learningNowCollection = collectionToLearn;
    this.collectionChanged.next(this.learningNowCollection);
  }

  getAvailableCollections() {
    return this.availableLearnings.slice(); // copy of the array
  }


  getFlashcardsForCollection(collectionName: string) {
    const filteredFlashcards = this.flashcards.filter(
      flashcard => flashcard.collection === collectionName);
    return filteredFlashcards.slice();
  }

  addFlashcard(flashcard: Flashcard) {
    console.log('Here i will add this flashcard to DB');
    console.log(flashcard);
  }

}
