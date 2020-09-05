import React, { useCallback } from 'react';
import { debounce } from 'lodash';
import { Input, FormControl, InputAdornment } from '@material-ui/core/';
import { Search } from '@material-ui/icons';

export default function SearchBar({ setTitle, searchTitle, setPage }: { setTitle: Function, searchTitle: Function, setPage: Function }) {

  const searchFor = useCallback(debounce((title: string) => {
    title = title.trim();
    if (title.length < 1) return;
    searchTitle({ variables: { search: title } })
    setTitle(title);
    setPage("search");
  }, 300), []);

  return (
    <FormControl>
      <Input
        id="SearchBar"
        onKeyUp={(e) => searchFor(e.currentTarget.value)}
        startAdornment={
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        }
        placeholder="Search"
      />
    </FormControl>
  )
}