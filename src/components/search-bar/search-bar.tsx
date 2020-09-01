import React, { useCallback } from "react";
import { debounce } from "lodash";

export default function SearchBar({ setTitle, searchTitle }: { setTitle: Function, searchTitle: Function }) {

  const searchFor = useCallback(debounce((title: string) => {
    title = title.trim();
    if (title.length < 1) return;
    searchTitle({ variables: { search: title } })
    setTitle(title);
  }, 300), []);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <label className="font-weight-bold" htmlFor="SearchBar">Movie Title</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <img className="input-group-text" src="search.svg" alt="Seach Icon" aria-hidden />
          </div>
          <input type="text" className="form-control" id="SearchBar" onKeyUp={(e) => searchFor(e.currentTarget.value)} />
        </div>
      </div>
    </div>
  )
}