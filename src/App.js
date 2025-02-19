
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { GeneralContext } from './Context/Context';
import Menu from './Components/menu';
import { useState } from 'react';
import ModalContainer from './Modales/ModalContainer';
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