import React from 'react';
import { render } from 'react-dom';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

import { Controller } from './components';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';


function App() {
  const restLink = new RestLink({ uri: "https://omdbapi.com" });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: restLink
  });

  return (
    <ApolloProvider client={client}>
      <div className="container" style={{ marginTop: "60px", marginBottom: "60px" }}>
        <h1>The Shoppies</h1>
        <Controller />
      </div>
      <div className="legal">Made by <a href="https://github.com/tommy-josepovic">Tommy Josépovic</a> | <a href="https://github.com/tommy-josepovic/shopify-intern-challenge-w2021">View the code</a> | <a href="https://tommy-josepovic.github.io/projects/shopify-intern-challenge-w2021">Read my blog post</a></div>
    </ApolloProvider>
  );
}

render(<App />, document.getElementById('root'));