
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Pages/Materias/home';
import { GeneralContext } from './Context/Context';
import Menu from './Components/menu';
import { useState } from 'react';
import ModalContainer from './Modales/ModalContainer';
import { use } from "react";
import Cursados from "./Pages/Cursados/cursados";
import Inscripciones from "./Pages/Inscripciones/inscripciones";

function App() {

  const [modal, setModal] = useState(undefined)

  const [materias, setMaterias] = useState([])

  const [materiasFilter, setMateriasFilter] = useState() // referencia al search de Materias, por ahora esta forma se me ocurrio de hacerlo, no es un Ref posta, es el texto
                                                   // que tiene el input del searchbar
  const [materiaSelected, setMateriaSelected] = useState()

  const [archivo, setArchivo] = useState()

  return (
    <div className="App">
      <GeneralContext.Provider value={{
        materias, 
        setMaterias, 
        materiasFilter, 
        setMateriasFilter, 
        materiaSelected, 
        archivo,
        setArchivo,
        setMateriaSelected, 
        setModal,
        modal, 
      }}>


        <BrowserRouter>
          {modal === undefined ? null : <ModalContainer></ModalContainer>}


          <Menu></Menu>
          <Routes>
            <Route path='/' element={<Inscripciones />} />
            <Route path='/cursados' element={<Cursados />} />
            <Route path='/inscripciones' element={<Inscripciones />} />
          </Routes>
        </BrowserRouter>
      </GeneralContext.Provider>
    </div>
  );
}

export default App;

/* TODO:

- ULTRA IMPORTANTE REMODELACION DE INTERFAZ

- BUSCAR FORMA DE MAPEAR LAS LISTAS EN MAPAS O TABLAS HASH PARA LA SELECCION RAPIDA

- exportar excel con cursados

- LA FILTROS UPDATE : agregar filtros y opciones de seleccion para recorrer y hacer mas rapido el trabajo
                      ejemplo: seleccionar todo, filtrar por año cursados

-deshabilitar los botones con inputs vacios o incorrectos en modales

-terminar modal de materia seleccionada

-subir excel cuando el endpoint funcione

- could be nice poder editar el JSON en el visualizador


*/
