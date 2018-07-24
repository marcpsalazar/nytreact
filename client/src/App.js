import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Home from "./components/Home";

const App = () =>
  <Router>
    <div>
      <Route path="/" component={Home} />
    </div>
  </Router>;

export default App;
