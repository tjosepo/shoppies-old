import React, { useState } from "react"
import { SearchData, Title } from "../../interfaces";
import { saveNominationList } from "../../database"
import { List, ListItem, ListItemText, Button, ListItemSecondaryAction, CircularProgress, Portal, Snackbar, IconButton } from "@material-ui/core";
import { Preview } from "..";
import "./result-list.scss";
import { Close } from "@material-ui/icons";


export default function ResultList({ title, searchData, loading, nominationList, setNominationList }: { title: string, searchData: SearchData | undefined, loading: boolean, nominationList: Title[], setNominationList: Function }) {
  const [preview, setPreview] = useState<Title>();
  const [notification, setNotification] = useState(false);
  let titles: Title[];

  const addNomination = (imdbID: string) => {
    const newNominated = titles.find((title) => title.imdbID === imdbID);
    const newNominationList = [...nominationList, newNominated] as Title[];
    setNominationList(newNominationList);
    saveNominationList(newNominationList);
    if (newNominationList.length >= 5) {
      setNotification(true);
    }
  }

  if (loading) {
    return (
      <div className="result-list">
        <h2>Results for "{title}"</h2>
        <div className="loading">
          <CircularProgress />
        </div>
      </div>
    )
  }

  if (searchData === undefined) {
    return (
      <div className="result-list">
        <h2>Search</h2>
        <p>Please, enter the title of a movie.</p>
      </div>
    )
  }

  if (searchData.result.Search === null) {
    return (
      <div className="result-list">
        <h2>Results for "{title}"</h2>
        <p>Sorry, the search didn't find anything.</p>
      </div>
    )
  }

  titles = searchData.result.Search;
  return (
    <div className="result-list">
      <h2>Results for "{title}"</h2>
      <div className="grid">
        <List className="list">
          {titles.map((title: Title) =>
            <ListItem 
              key={title.imdbID} button className="list-item"
              onClick={() => setPreview(title)}
              selected={title.imdbID === preview?.imdbID}>
              <ListItemText primary={`${title.Title} (${title.Year})`} style={{ paddingRight: 60 }} />
              <ListItemSecondaryAction>
                <Button
                  onClick={() => addNomination(title.imdbID)}
                  disabled={nominationList.find((nominated) => nominated.imdbID === title.imdbID) !== undefined
                    || nominationList.length >= 5}>Nominate</Button>
              </ListItemSecondaryAction>
            </ListItem>
          )}
        </List>
        {preview &&
          <>
            <Preview title={preview} />
            <img className="preview-image" src={preview.Poster} alt=""/>
          </>
        }
      </div>

      <Portal>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={notification}
          autoHideDuration={6000}
          onClose={() => setNotification(false)}
          message={`You've nominated ${nominationList.length} movies!`}
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => setNotification(false)}>
              <Close fontSize="small" />
            </IconButton>
          }
        />
    </Portal>
    </div>
  )
}