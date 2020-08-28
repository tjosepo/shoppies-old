import { gql } from "@apollo/client";

export const GET_TITLE = gql`
  query GET_TITLE {
    title(t: $title, i: $id) @rest(path: "/?apikey=${process.env.REACT_APP_OMBD_KEY}&{args}") {
      Title
      Year
      imdbID
      Type
      Poster
    }
  }
`

export const SEARCH_TITLE = gql`
  query SEARCH {
    result(s: $search) @rest(path: "/?apikey=${process.env.REACT_APP_OMBD_KEY}&{args}") {
      Search {
        Title
        Year
        imdbID
        Type
        Poster
      }
    }
  }
`