import React from 'react';
import { render } from 'react-dom';
import { Controller } from './components'
import './styles.scss';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import { GET_TITLE, SEARCH_TITLE } from './queries';


function App() {
  const restLink = new RestLink({ uri: "http://omdbapi.com" });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: restLink
  });


  client.query({ query: GET_TITLE, variables: { id: "tt5084170" } }).then(response => {
    console.log(response.data);
  });

  client.query({ query: GET_TITLE, variables: { title: "Blade Runner" } }).then(response => {
    console.log(response.data);
  });

  client.query({ query: SEARCH_TITLE, variables: { search: "Blade" } }).then(response => {
    console.log(response.data);
  });


  return (
    <ApolloProvider client={client}>
      <div>
        <h2>My first Apollo app</h2>
        <Controller />
      </div>
    </ApolloProvider>
  );
}

render(<App />, document.getElementById('root'));