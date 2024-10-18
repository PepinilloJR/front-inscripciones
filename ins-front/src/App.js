import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Pages/home/home';

import { GeneralContext } from './Context/Context';
import { useContext } from 'react';

function App() {

  const Gcontext = useContext(GeneralContext)



  return (
    <div className="App">
      <Gcontext.Provider value={null}>
        <BrowserRouter>
          <Routes>
            <Route path='\' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Gcontext.Provider>
    </div>
  );
}

export default App;
