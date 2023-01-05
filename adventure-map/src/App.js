import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Register from './components/Register';
import ExploreWorld from './components/ExploreWorld';
import ExploreContinent from './components/ExploreContinent';
import Login from './components/Login';
import Navbar from './components/Navbar'

import './App.css';

window.Buffer = window.Buffer || require('buffer').Buffer;

function App() {
  fetch('http://localhost:8080/api/countries')
    .then((res) => res.json())
    .then((data) => console.log(data));

  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          {/* <Route path="/explorecontinent/:id" element={<ExploreWorld />} /> */}
          <Route path='/explorecontinent/:id' element={<ExploreContinent />} />
          <Route path='/exploreworld' element={<ExploreWorld />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
