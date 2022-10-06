import React from "react";
import "./App.css";
import Boards from "./components/Board/Board";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Boards />
      <Footer />
    </div>
  );
}

export default App;
