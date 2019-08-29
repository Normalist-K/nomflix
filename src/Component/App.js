import React, { Component } from 'react';
import Router from 'Component/Router';
import GlobalStyles from 'Component/GlobalStyles';

class App extends Component {
  render() {
    return (
      <>
        <Router />
        <GlobalStyles />
      </>
    );
  }
}

export default App;
