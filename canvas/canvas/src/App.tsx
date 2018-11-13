import * as React from 'react';
import './App.css';

import {ComponentTips} from "./components/DrawComponent"

class App extends React.Component {

  public render() {
    return (
      <div className="App">
        <ComponentTips />
      </div>
    );
  }
}

export default App;
