import { Learning } from './learning.model';
import { Flashcard } from './flashcard.model';

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

  getAvailableCollections() {
    return this.availableLearnings.slice(); // copy of the array
  }

  addFlashcard(flashcard: Flashcard) {
    console.log('Here i will add this flashcard to DB');
    console.log(flashcard);
  }

}
