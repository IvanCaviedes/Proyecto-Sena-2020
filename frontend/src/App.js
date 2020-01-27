<<<<<<< HEAD
import React, { Component } from 'react'
import Top from './components/docs/TopEle'
import Header from './components/docs/header'
import Selection from './components/docs/selectionpage'
import Buscar from './components/docs/buscar'
export default class app extends Component {
    render() {
        return (
            <div>
            <h1>hola</h1>
            </div>
        )
    }
}
=======
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navigation from './components/Navigation'
import NotesList from './components/NotesList'
import CreateNote from './components/CreateNote'
import CreateUser from './components/CreateUser'

import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container p-4">
        <Route path="/" exact component={NotesList} />
        <Route path="/edit/:id" component={CreateNote} />
        <Route path="/create" component={CreateNote} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
>>>>>>> 151ec62d068e24c1788ddfb2f33551e829492f9b
