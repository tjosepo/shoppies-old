import React, { useState, useEffect } from "react";
import { SearchBar, ResultList, NominationList, Banner } from "../";
import { useLazyQuery, useApolloClient } from "@apollo/client";
import { SEARCH_TITLE, GET_TITLE } from "../../queries";
import { Title } from "../../interfaces";
import { loadNominationList, saveNominationList, findNominationById } from "../../database"

export default function Controller() {
  const [title, setTitle] = useState("...");
  const [nominationList, setNominationList] = useState<Title[]>([])
  const [searchTitle, { loading, data: searchData }] = useLazyQuery(SEARCH_TITLE);
  const client = useApolloClient();


  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has("nominations")) {
      let newNominationList: Title[] = [];
      const param = urlParams.get("nominations") as string;
      const IDs = param.split(",");

      /* This is callback hell. Coudln't find a way to make IndexedDB look good */
      IDs.forEach((ID) => {
        findNominationById(ID, (response: Title | null) => {
          if (response) {     /* Try to find it in indexedDB first */
            newNominationList.push(response);

            if (newNominationList.length === IDs.length) {
              saveNominationList(newNominationList);
              setNominationList(newNominationList);
              const baseurl = window.location.protocol + '//' + window.location.host + window.location.pathname;
              window.history.replaceState({}, document.title, baseurl);
            }
          } else {    /* Else, fetch it */
            client.query({ query: GET_TITLE, variables: { id: ID } }).then(response => {
              const title = response.data.title as Title;
              newNominationList.push(title);

              if (newNominationList.length === IDs.length) {
                saveNominationList(newNominationList);
                setNominationList(newNominationList);
                const baseurl = window.location.protocol + '//' + window.location.host + window.location.pathname;
                window.history.replaceState({}, document.title, baseurl);
              }
            });
          }
        });
      });
    } else {    /* If no url parameters, read from IndexedDB */
      loadNominationList((nominationList: Title[]) => setNominationList(nominationList));
    }
  }, [client])

  return (
    <div className="controller">
      <Banner nominationList={nominationList} />
      <SearchBar setTitle={setTitle} searchTitle={searchTitle} />
      <ResultList title={title} searchData={searchData} loading={loading} nominationList={nominationList} setNominationList={setNominationList} />
      <NominationList nominationList={nominationList} setNominationList={setNominationList} />
    </div>
  )
}