import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Drill from "./views/Drill";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Drill />} />
        <Route path="/drill" element={<Drill />} />
      </Routes>
    </Router>
  );
}

export default App;
