/* First we'll start with the app the app component and like we mentioned before 
    it's a header with not much going on in the country game inside of that.
    So let's look at the country. */
import React, { Component } from 'react';
import CountryGame from './CountryGame';
import worldImg from './world.jpg';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="flag-app">
        <header
          className="title-header"
          style={{ backgroundImage: `url(${worldImg})` }}>
          <h1 className="title-text">Guess The Flag</h1>
        </header>
        <CountryGame />
      </div>
    );
  }
}

export default App;
