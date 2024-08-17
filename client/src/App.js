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
        <Route path="/questions" element={<Questions />} />
        <Route path="/energy" element={<Questions questionId="66b4cc228596df14d43fa053" />} />
        <Route path="/sport" element={<Questions questionId="66b4ce548596df14d43fa05e" />} />
        <Route path="/brain" element={<Questions questionId="66b4e0b18596df14d43fa0c0" />} />
        <Route path="/relaxation" element={<Questions questionId="66b4e13d8596df14d43fa110" />} />
        <Route path="/gender" element={<Questions questionId="66b4e2a28596df14d43fa118" />} />
        <Route path="/beauty" element={<Questions questionId="66b4f6ef8596df14d43fa174" />} />
        <Route path="/stomach" element={<Questions questionId="66b4f76d8596df14d43fa204" />} />
        <Route path="/heart" element={<Questions questionId="66b4f7e88596df14d43fa27f" />} />
        <Route path="/bones" element={<Questions questionId="66b4f8308596df14d43fa300" />} />
        <Route path="/weight" element={<Questions questionId="66b4fa598596df14d43fa381" />} />
        {/*<Route path="/questions/:id" element={<Questions />} />*/}
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
