import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Pages/home/home';
import { GeneralContext } from './Context/Context';
import Inscripciones from './Pages/cargarExcel/inscripciones';
import Menu from './Components/menu';
import { useRef, useState } from 'react';
import CargarExcel from './Modales/cargarExcel/cargarExcel';
import MateriaModal from './Pages/home/materiaModal';

function App() {

  const [materias, setMaterias] = useState();
  const [subirOpen, setSubirOpen] = useState(false);

  const [materiasFilter, setMateriasFilter] = useState() // referencia al search de Materias, por ahora esta forma se me ocurrio de hacerlo, no es un Ref posta, es el texto
                                                   // que tiene el input del searchbar
  const [materiaSelected, setMateriaSelected] = useState()

  return (
    <div className="App">
      <GeneralContext.Provider value={{materias, setMaterias, subirOpen, setSubirOpen, materiasFilter, setMateriasFilter, materiaSelected, setMateriaSelected}}>
        {subirOpen ? <CargarExcel/> : <div/> }
        {materiaSelected ? <MateriaModal></MateriaModal> : null}

        <BrowserRouter>
          <Menu></Menu>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </GeneralContext.Provider>
    </div>
  );
}

export default App;
