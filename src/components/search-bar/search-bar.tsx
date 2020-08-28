import React, { useCallback } from "react";
import { debounce } from "lodash";

export default function SearchBar({ setTitle, searchTitle}: { setTitle: Function, searchTitle: Function }) {

  const searchFor = useCallback(debounce(async (title: string) => {
    if (title.length < 1) return;
    await searchTitle({variables: {search: title}})
    setTitle(title);
  }, 800), []);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <label className="font-weight-bold" htmlFor="SearchBar">Movie Title</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <img className="input-group-text" src="search.svg" alt="Seach Icon" aria-hidden />
          </div>
          <input type="text" className="form-control" id="SearchBar" onChange={(e) => searchFor(e.target.value)}/>
        </div>
      </div>
    </div>
  )
}