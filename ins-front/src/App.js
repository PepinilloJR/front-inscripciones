import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Pages/home/home';
import { GeneralContext } from './Context/Context';
import Carga from './Pages/cargarExcel/carga';


function App() {

  return (
    <div className="App">
      <GeneralContext.Provider value={null}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/ins' element={<Carga />} />
          </Routes>
        </BrowserRouter>
      </GeneralContext.Provider>
    </div>
  );
}

export default App;
