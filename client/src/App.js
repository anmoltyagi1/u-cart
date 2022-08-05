import "./App.css";
import InputItem from "./components/InputItem";
import Nav from "./components/Navbar";
import ViewItems from "./components/ViewItems";
// import ListItem from "./components/ViewItems";
import Main from "./components/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hero from "./components/Hero";

function App() {
  return (
    <div className="App">
      <Hero />
    </div>
  );
}

export default App;
