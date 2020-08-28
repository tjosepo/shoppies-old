export interface Title {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface SearchData {
  result: {
    Search: Title[];
  }
}
