import React from "react"
import { SearchData, Title } from "../../interfaces";


export default function ResultList({ title, searchData }: {title: string, searchData: SearchData}) {
  console.log(searchData);
  return (
    <div className="card">
      <div className="card-body">
        <label className="font-weight-bold" htmlFor="SearchBar">Results for "{title}"</label>
        <ul>
          {searchData?.result?.Search?.map((title: Title) =>
            <li key={title.imdbID}>{title.Title} ({title.Year})</li>
          )}
        </ul>
      </div>
    </div>
  )
}