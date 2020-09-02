import React from "react";
import { Title } from "../../interfaces";

export default function Banner({ nominationList }: { nominationList: Title[] }) {
  if (nominationList.length < 5) return <></>

  return (
    <div className="alert alert-primary" role="alert">
      You've nominated {nominationList.length} movies!
    </div>
  )
}