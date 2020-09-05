import React from "react"
import { Title } from "../../interfaces";
import "./preview.scss";
import { useQuery } from "@apollo/client";
import { GET_TITLE } from "../../queries";

export default function Preview({ title }: { title: Title}) {
  const { data } = useQuery(GET_TITLE, {variables: { id: title?.imdbID } });

  if (!title || !data) return (<></>);

  return (
    <div className="preview">
      {title.Poster !== "N/A" &&
        <img src={title.Poster} alt={`${title.Title} poster`} />
      }
      <h2>{title.Title}</h2>
      <p style={{color: "white", fontWeight: 200 }}>{title.Year}</p>
      {data.title.Plot !== "N/A" &&
        <p className="plot">{data.title.Plot}</p>
      }
    </div>
  )
}