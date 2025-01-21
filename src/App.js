
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Pages/Home/home';
import { GeneralContext } from './Context/context';
import Menu from './Components/menu';
import { useState } from 'react';
import ModalContainer from './Modales/ModalContainer';
import { use } from "react";

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
