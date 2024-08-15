import { Routes, Route } from 'react-router-dom';
import NavBar from "./Components/Navbar";
import Home from './Pages/Home';
import About from './Pages/About';
import Questions from './Pages/Questions';
import './App.css';

function App() {

  return (
    <div className="App">
      {/*<NavBar />*/}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questions/:id" element={<Questions />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
