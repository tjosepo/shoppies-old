import React, { useState } from "react";
import { Title } from "../../interfaces";
import { saveNominationList } from "../../database";
import "./nomination-list.scss";
import { Button, List, ListItem, ListItemSecondaryAction, ListItemText, Snackbar, Portal, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons"
import { Preview } from "..";

export default function NominationList({ nominationList, setNominationList }: { nominationList: Title[], setNominationList: Function }) {
  const [preview, setPreview] = useState<Title>();
  const [notification, setNotification] = useState(false);

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
    setNotification(true)
  }




  if (nominationList.length < 1) return (
    <div className="nomination-list">
      <h2>Nominations</h2>
      <p>No movie has been nominated.</p>
    </div>
  
    );

  return (
    <div className="nomination-list">
      <h2>
        Nominations
        <Button
            style={{ marginLeft: 10}}
            color="secondary"
            onClick={getSharableLink}>
              Share
        </Button>
      </h2>
      <div className="grid">
        <List className="list">
          {nominationList.map((title: Title) =>
            <ListItem 
              key={title.imdbID} button className="list-item"
              onClick={() => setPreview(title)}
              selected={title.imdbID === preview?.imdbID}>
              <ListItemText primary={`${title.Title} (${title.Year})`} style={{ paddingRight: 60 }} />
              <ListItemSecondaryAction>
              <Button
                type="button"
                onClick={() => removeNomination(title.imdbID)}>Remove</Button>
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
          message="Link saved to clipboard"
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