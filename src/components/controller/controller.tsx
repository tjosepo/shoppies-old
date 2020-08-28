import React, { useState } from "react";
import { SearchBar } from "../";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_TITLE } from "../../queries";
import ResultList from "../result-list/result-list";

export default function Controller() {
  const [title, setTitle] = useState("...");
  const [searchTitle, { data: searchData }] = useLazyQuery(SEARCH_TITLE);
  return (
      <div className="controller">
        <SearchBar setTitle={setTitle} searchTitle={searchTitle}/>
        <ResultList title={title} searchData={searchData}/>
      </div>
    )
}