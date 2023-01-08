import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

<<<<<<< HEAD
import Home from "./components/Home";
import Register from "./components/Register";
import ExploreWorld from "./components/ExploreWorld";
import ExploreContinent from "./components/ExploreContinent";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import UserPage from "./components/UserPage";
import UserIndex from "./components/UserIndex";
import CountryPage from "./components/CountryPage";
// import Explore from "./components/Explore";
=======
import Home from './components/Home';
import Register from './components/Register';
import ExploreWorld from './components/ExploreWorld';
import ExploreContinent from './components/ExploreContinent';
import Login from './components/Login';
import Navbar from './components/Navbar';
import UserPage from './components/UserPage';
import UserIndex from './components/UserIndex';
import CountryPage from './components/CountryPage';
>>>>>>> development

import './App.css';

window.Buffer = window.Buffer || require('buffer').Buffer;

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/explorecontinent/:id" element={<ExploreContinent />} />
          <Route path="/exploreworld" element={<ExploreWorld />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<UserIndex />} />
          <Route path="/users/:id" element={<UserPage />} />
          <Route path="/countries/:id" element={<CountryPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
