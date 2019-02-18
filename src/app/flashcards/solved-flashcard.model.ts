export interface SolvedFlashcard {
  collection: string;
  all: number;
  correct: number;
  wrong: number;
  date?: Date;
  state?: 'completed' | 'cancelled' | null;
}
