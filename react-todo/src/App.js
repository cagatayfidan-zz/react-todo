import './App.css';
import React from 'react'
import TodoIndex from './components/TodoIndex'
export default class App extends React.Component {
  render() {
    return (
      <div className="App" >
        <TodoIndex />
      </div>
    );
  }
}


