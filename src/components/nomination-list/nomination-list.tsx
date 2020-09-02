import React from "react"
import { Title } from "../../interfaces"
import { saveNominationList } from "../../database"

export default function NominationList({ nominationList, setNominationList }: { nominationList: Title[], setNominationList: Function }) {
  const removeNomination = (imdbID: string) => {
    const newNominationList = nominationList.filter((nomination: Title) => nomination.imdbID !== imdbID);
    setNominationList(newNominationList);
    saveNominationList(newNominationList);
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
                onClick={() => removeNomination(title.imdbID)}>
                Remove
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}