import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Pages/home/home';
import { GeneralContext } from './Context/Context';
import Inscripciones from './Pages/cargarExcel/inscripciones';
import Menu from './Components/menu';
import { useState } from 'react';
import CargarExcel from './Pages/cargarExcel/cargarExcel';

function App() {

  const [inscripciones, setInscripciones] = useState();
  const [subirOpen, setSubirOpen] = useState(false);

  return (
    <div className="App">
      <GeneralContext.Provider value={{inscripciones, setInscripciones, subirOpen, setSubirOpen}}>
        {subirOpen ? <CargarExcel/> : <div/> }
        <BrowserRouter>

          <Menu></Menu>


          <Routes>

      
            <Route path='/' element={<Home />} />
            <Route path='/ins' element={<Inscripciones />} />


          </Routes>
        </BrowserRouter>
      </GeneralContext.Provider>
    </div>
  );
}

export default App;
