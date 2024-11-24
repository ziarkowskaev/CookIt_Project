// import React from "react";
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  // gql,
} from '@apollo/client';
import App from './App';
import './index.css';

// Set up Apollo Client
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('user-auth-token');
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : null,
    },
  };
});

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
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
