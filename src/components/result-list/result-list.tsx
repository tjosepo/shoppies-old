import React from "react"
import { SearchData, Title } from "../../interfaces";


export default function ResultList({ title, searchData, loading, nominationList, setNominationList }: {title: string, searchData: SearchData | undefined, loading: boolean, nominationList: Title[], setNominationList: Function}) {
  let titles: Title[];

  const addNomination = (imdbID: string) => {
    const newNominated = titles.find((title) => title.imdbID === imdbID);
    setNominationList([...nominationList, newNominated])
  }

  if (loading) {
    return (
      <div className="card mb-4">
        <div className="card-body">
          <p className="font-weight-bold">Results for "{title}"</p>
          <p>Loading...</p>
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
                  className="btn btn-light" 
                  onClick={() => addNomination(title.imdbID)}
                  disabled={nominationList.find((nominated) => nominated.imdbID === title.imdbID) !== undefined}>
                    Nominate
                </button>
              </li>
            )}
          </ul>
      </div>
    </div>
  )
}