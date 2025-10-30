export interface Entry {
  id: number;
  title: string;
  type: "Movie" | "TV Show";
  director: string;
  budget: string;
  location: string;
  duration: string;
  yearTime: string;
  imageUrl?: string;
}
