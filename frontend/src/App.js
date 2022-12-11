import Home from "./Home.js"
import Play from "./Play.js"
import React, { Component } from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'




class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
      <div className="h-100 w-100 cover-container position-absolute overflow-hidden">
        <div className="row h-100 align-items-center">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card main-card">
              <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/play" element={<Play/>}/>
              </Routes>
            </div>
          </div>
        </div>
      </div>
      </Router>
      
    );
  }
}

export default App;
