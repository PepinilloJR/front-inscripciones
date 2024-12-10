import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Pages/home/home';
import { GeneralContext } from './Context/Context';
import Inscripciones from './Pages/cargarExcel/inscripciones';
import Menu from './Components/menu';
import { useRef, useState } from 'react';
import CargarExcel from './Pages/cargarExcel/cargarExcel';

function App() {

  const [materias, setMaterias] = useState();
  const [subirOpen, setSubirOpen] = useState(false);

  const [materiasFilter, setMateriasFilter] = useState() // referencia al search de Materias, por ahora esta forma se me ocurrio de hacerlo, no es un Ref posta, es el texto
                                                   // que tiene el input del searchbar

  return (
    <div className="App">
      <GeneralContext.Provider value={{materias, setMaterias, subirOpen, setSubirOpen, materiasFilter, setMateriasFilter}}>
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
