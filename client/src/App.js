import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import Header from './components/Header';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Signup from './pages/Signup';



function App() {
  return (
    //<ApolloProvider client={client}>
            <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Switch>
              <Route 
                path="/" 
                element={<Home />} 
              />
              <Route 
                path="/login" 
                element={<Login />} 
              />
              <Route 
                path="/signup" 
                element={<Signup />} 
              />
              <Route 
                path="/favorites" 
                element={<Favorites />} 
              />
            </Switch>
          </div>
        </div>
      </Router>
    //</ApolloProvider>
  );
}

export default App;
