import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import CreateTend from './pages/CreateTend';
import Bidtend from './pages/Bidtend';
import Evaluate from './pages/Evaluate';
import Winner from './pages/Winner';

const App = () => {
  return (
    <div>
      
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/createtend' element={<CreateTend/>}/>
          <Route path='/bidtend' element={<Bidtend/>}/>
          <Route path='/evaluate' element={<Evaluate/>}/>
          <Route path='/winner' element={<Winner/>}/>
        </Routes>
      </Router>

    </div>
  )
}

export default App