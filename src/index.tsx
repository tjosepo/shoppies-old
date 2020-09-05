import React from 'react';
import { render } from 'react-dom';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

import { Controller } from './components';

import { theme } from './theme'
import './styles.scss';
import { ThemeProvider } from '@material-ui/core';


function App() {
  const restLink = new RestLink({ uri: "https://omdbapi.com" });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: restLink
  });

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Controller />
      </ApolloProvider>
    </ThemeProvider>
  );
}

render(<App />, document.getElementById('root'));