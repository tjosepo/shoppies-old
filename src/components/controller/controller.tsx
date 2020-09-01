import React, { useState, useEffect } from "react";
import { SearchBar, ResultList, NominationList, Banner } from "../";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_TITLE } from "../../queries";
import { Title } from "../../interfaces";
import { loadNominationList } from "../../database"

export default function Controller() {
  const [title, setTitle] = useState("...");
  const [nominationList, setNominationList] = useState<Title[]>([])
  const [searchTitle, { loading, data: searchData }] = useLazyQuery(SEARCH_TITLE);

  useEffect(() => {
    loadNominationList((nominationList: Title[]) => setNominationList(nominationList));
  }, [])

  return (
    <div className="controller">
      <Banner nominationList={nominationList} />
      <SearchBar setTitle={setTitle} searchTitle={searchTitle} />
      <ResultList title={title} searchData={searchData} loading={loading} nominationList={nominationList} setNominationList={setNominationList} />
      <NominationList nominationList={nominationList} setNominationList={setNominationList} />
    </div>
  )
}