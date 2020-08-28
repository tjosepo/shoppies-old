import React, { useCallback } from "react";
import { debounce } from "lodash";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_TITLE } from "../../queries";

export default function SearchBar() {
  const [getTitles, { data }] = useLazyQuery(SEARCH_TITLE);

  const searchFor = useCallback(debounce((title: string) => {
    if (title.length < 1) return;
    getTitles({variables: {search: title}})
  }, 500), []);

  if (data) {
    console.log(data);
  }

  return (
    <div className="card">
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