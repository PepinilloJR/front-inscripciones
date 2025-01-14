import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Pages/home/home';
import { GeneralContext } from './Context/Context';
import Menu from './Components/menu';
import { useState } from 'react';
import CargarExcelModal from './Modales/cargarExcel/cargarExcel';
import MateriaModal from './Modales/materiaModal/materiaModal';
import CrearMateriaModal from './Modales/crearMateria/crearMateria'
import CrearCursoModal from './Modales/crearCurso/crearCurso';
import CrearAlumnoModal from './Modales/crearAlumno/crearAlumno';

function App() {

  const [materias, setMaterias] = useState()
  const [subirOpen, setSubirOpen] = useState(false)
  const [crearMateriaOpen, setCrearMateriaOpen ] = useState(false)
  const [crearCursoOpen, setCrearCursoOpen ] = useState(false)
  const [crearAlumnoOpen,setCrearAlumnoOpen] = useState(false)

  const [materiasFilter, setMateriasFilter] = useState() // referencia al search de Materias, por ahora esta forma se me ocurrio de hacerlo, no es un Ref posta, es el texto
                                                   // que tiene el input del searchbar
  const [materiaSelected, setMateriaSelected] = useState()

  return (
    <div className="App">
      <GeneralContext.Provider value={{
        materias, 
        setMaterias, 
        subirOpen, 
        setSubirOpen, 
        materiasFilter, 
        setMateriasFilter, 
        materiaSelected, 
        setMateriaSelected, 
        crearMateriaOpen,
        setCrearMateriaOpen,
        crearCursoOpen,
        setCrearCursoOpen,
        crearAlumnoOpen,
        setCrearAlumnoOpen
      }}>


        <BrowserRouter>
          
          {subirOpen ? <CargarExcelModal/> : <div/> }
          {materiaSelected ? <MateriaModal></MateriaModal> : null}
          {crearMateriaOpen ? <CrearMateriaModal></CrearMateriaModal> : null}
          {crearCursoOpen ? <CrearCursoModal></CrearCursoModal> : null}
          {crearAlumnoOpen ? <CrearAlumnoModal></CrearAlumnoModal> : null}

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




/* TODO:

-deshabilitar los botones con inputs vacios o incorrectos en modales

-terminar modal de materia seleccionada

-subir excel cuando el endpoint funcione

- could be nice poder editar el JSON en el visualizador

*/