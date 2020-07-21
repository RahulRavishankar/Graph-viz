import React from 'react';
import Header from './components/Header'
import SideNavBar from './components/NavBar'
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Header />
      <SideNavBar />
    </div>
  );
}

export default App;
