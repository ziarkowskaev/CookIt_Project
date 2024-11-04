import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';
import App from './App';
import "./index.css"

// Set up Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Your GraphQL server URL
  cache: new InMemoryCache(),
});

// Main App component
function Root() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById('root'));
