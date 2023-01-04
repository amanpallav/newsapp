import React from 'react'
import './App.css';
import News from './components/News.js'
import Navbar from './components/Navbar.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<News key='general' pageSize={4} country='in' category='general' />}> </Route>
            <Route exact path='/business' element={<News key='business' pageSize={4} country='in' category='business' />}> </Route>
            <Route exact path='/entertainment' element={<News key='entertainment' pageSize={4} country='in' category='entertainment' />}> </Route>
            <Route exact path='/general' element={<News key='general2' pageSize={4} country='in' category='general' />}> </Route>
            <Route exact path='/health' element={<News key='health' pageSize={4} country='in' category='health' />}> </Route>
            <Route exact path='/science' element={<News key='science' pageSize={4} country='in' category='science' />}> </Route>
            <Route exact path='/sports' element={<News key='sports' pageSize={4} country='in' category='sports' />}> </Route>
            <Route exact path='/technology' element={<News key='technology' pageSize={4} country='in' category='technology' />}> </Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
}

export default App
