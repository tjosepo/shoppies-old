import React from "react"
import { SearchData, Title } from "../../interfaces";


export default function ResultList({ title, searchData }: {title: string, searchData: SearchData | undefined}) {
  return (
    <div className="card">
      <div className="card-body">
        <label className="font-weight-bold" htmlFor="SearchBar">Results for "{title}"</label>
        {searchData?.result?.Search === null
          ? <p className="mb-0">Sorry, no movie matches this title.</p>
          : <ul>
              {searchData?.result?.Search.map((title: Title) =>
                <li key={title.imdbID} className="mb-1">
                  {title.Title} ({title.Year}) <button type="button" className="btn btn-light">Nominate</button>
                  </li>
              )}
            </ul>
        }
      </div>
    </div>
  )
}