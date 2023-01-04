import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Register from "./components/Register";
import ExploreWorld from "./components/ExploreWorld";
import ExploreContinent from "./components/ExploreContinent";

import "./App.css";

window.Buffer = window.Buffer || require("buffer").Buffer;

function App() {
  return (
    <div className="App">
      <Router>
        //navbar??
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/explorecontinent/:id" element={<ExploreWorld />} /> */}
          <Route path="/explorecontinent/:id" element={<ExploreContinent />} />
          <Route path="/exploreworld" element={<ExploreWorld />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
