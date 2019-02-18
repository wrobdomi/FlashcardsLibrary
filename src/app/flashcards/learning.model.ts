export interface Learning {
  id: string;
  collection: string;
  all?: number; // optional
  date?: Date;
  state?: 'completed' | 'cancelled' | null;
}
