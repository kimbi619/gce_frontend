
import './App.css';
import FloatingButton from './components/app/FloatingButton';
import { useState } from 'react';
import AppUser from './components/application/AppUser';
import AppN from './components/application/AppN';
import { Route, Routes } from 'react-router-dom';
import About from './components/home/About';
import useLocalStorage from './UseLocalStorage';

function App() {
  const [user, setUser] = useLocalStorage('user')

  return (
    <div className="App">
      <div className='container'>
      {
        user?.user 
        ? (
          <AppUser user={user} />
        ) : (
          
          <AppN />
        )
      }
        
      </div>
      <Routes>
            <Route path='/about' element={ <About /> } />
      </Routes>
      <FloatingButton />
    </div>
  );
}

export default App;
