import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Materiais from "./pages/Materiais";
import Medicamentos from "./pages/Medicamentos";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Materiais />} />
        <Route path='/medicamentos' element={<Medicamentos />} />
      </Routes>
    </Router>
  );
};


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
