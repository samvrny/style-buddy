
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Signup from './pages/Signup';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
<<<<<<< HEAD
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
=======
        <div>
          <Header />
          <div className="">
>>>>>>> 2f855a55ba0b3010585e49baa818076294ed60b4
            <Switch>
              <Route 
                exact path="/" 
                component={Home} 
              />
              <Route 
                exact path="/login" 
                component={Login} 
              />
              <Route 
                exact path="/signup" 
                component={Signup} 
              />
              <Route 
                exact path="/favorites" 
                component={Favorites} 
              />
            </Switch>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
