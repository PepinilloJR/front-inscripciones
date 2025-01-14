
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Pages/home/home';
import { GeneralContext } from './Context/Context';
import Menu from './Components/menu';
import { useState } from 'react';
import Modal from './Modales/Modal';

function App() {


  const [modal, setModal] = useState(undefined)

  const [materias, setMaterias] = useState()

  const [materiasFilter, setMateriasFilter] = useState() // referencia al search de Materias, por ahora esta forma se me ocurrio de hacerlo, no es un Ref posta, es el texto
                                                   // que tiene el input del searchbar
  const [materiaSelected, setMateriaSelected] = useState()

  return (
    <div className="App">
      <GeneralContext.Provider value={{
        materias, 
        setMaterias, 
        materiasFilter, 
        setMateriasFilter, 
        materiaSelected, 
        setMateriaSelected, 
        setModal,
        modal
      }}>


        <BrowserRouter>
          {modal === undefined ? null : <Modal></Modal>}


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