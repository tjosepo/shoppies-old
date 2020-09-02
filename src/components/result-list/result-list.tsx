import React from "react"
import { SearchData, Title } from "../../interfaces";
import { saveNominationList } from "../../database"


export default function ResultList({ title, searchData, loading, nominationList, setNominationList }: { title: string, searchData: SearchData | undefined, loading: boolean, nominationList: Title[], setNominationList: Function }) {
  let titles: Title[];

  const addNomination = (imdbID: string) => {
    const newNominated = titles.find((title) => title.imdbID === imdbID);
    const newNominationList = [...nominationList, newNominated] as Title[];
    setNominationList(newNominationList);
    saveNominationList(newNominationList);
  }

  if (loading) {
    return (
      <div className="card mb-4">
        <div className="card-body">
          <p className="font-weight-bold">Results for "{title}"</p>
          <div className="text-center mt-4 mb-4">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (searchData === undefined) {
    return <></>
  }

  if (searchData.result.Search === null) {
    return (
      <div className="card mb-4">
        <div className="card-body">
          <p className="font-weight-bold">Results for "{title}"</p>
          <p>Sorry, the search didn't find anything.</p>
        </div>
      </div>
    )
  }

  titles = searchData.result.Search;
  return (
    <div className="card mb-4">
      <div className="card-body">
        <p className="font-weight-bold">Results for "{title}"</p>
        <ul>
          {titles.map((title: Title) =>
            <li key={title.imdbID} className="mb-1">
              {title.Title} ({title.Year})
                  <button
                type="button"
                className="btn btn-light ml-2"
                onClick={() => addNomination(title.imdbID)}
                disabled={nominationList.find((nominated) => nominated.imdbID === title.imdbID) !== undefined
                  || nominationList.length >= 5}>
                Nominate
                  </button>
            </li>
          )}
        </ul>
      </div>
    </div >
  )
}