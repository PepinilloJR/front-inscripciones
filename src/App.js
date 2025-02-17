
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

  const [archivo, setArchivo] = useState()

  return (
    <div className="App">
      <GeneralContext.Provider value={{
        archivo,
        setArchivo,
        setModal,
        modal
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

- could be nice poder editar el JSON en el visualizador

- remanejar todos los posibles errores en las subidas y etc

-mostrar cantidad restante de solicitudes en cada carta de materia

*/
