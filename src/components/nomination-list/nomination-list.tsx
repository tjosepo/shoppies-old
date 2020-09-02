import React, { useState } from "react"
import { Title } from "../../interfaces"
import { saveNominationList } from "../../database"

export default function NominationList({ nominationList, setNominationList }: { nominationList: Title[], setNominationList: Function }) {

  const [shareBtnText, setShareBtnText] = useState("Get shareable link");

  const removeNomination = (imdbID: string) => {
    const newNominationList = nominationList.filter((nomination: Title) => nomination.imdbID !== imdbID);
    setNominationList(newNominationList);
    saveNominationList(newNominationList);
  }

  const getSharableLink = () => {
    const IDs = nominationList.map(nomination => nomination.imdbID);
    const baseurl = window.location.protocol + '//' + window.location.host + window.location.pathname;
    const query = `?nominations=${IDs.join(',')}`;
    navigator.clipboard.writeText(`${baseurl}${query}`);
    setShareBtnText("Link saved to clipboard!");
  }

  if (nominationList.length < 1) return <></>;

  return (
    <div className="card">
      <div className="card-body">
        <p className="font-weight-bold">Nominations</p>
        <ul>
          {nominationList.map((title: Title) =>
            <li key={title.imdbID} className="mb-1">
              {title.Title} ({title.Year})
              <button
                type="button"
                className="btn btn-light ml-2"
                onClick={() => removeNomination(title.imdbID)}>Remove</button>
            </li>
          )}
        </ul>
        <button
          className="btn btn-outline-primary"
          onClick={getSharableLink}
          onMouseLeave={() => setShareBtnText("Get shareable link")}>{shareBtnText}</button>
      </div>
    </div>
  )
}