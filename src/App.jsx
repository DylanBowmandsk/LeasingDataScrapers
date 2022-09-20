import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPage from "./AdminPage";
import HomePage from "./HomePage";

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<HomePage />}>
          </Route>
          <Route path="/admin" element={<AdminPage />}>
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
