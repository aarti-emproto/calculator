import React, { Component } from 'react';
import Counter from './components/counter';
import './App.css';

class App extends Component {
  state = {  }
  render() { 
    return ( 
      <main className="container">
        <Counter />
      </main>
    );
  }
}
 
export default App;