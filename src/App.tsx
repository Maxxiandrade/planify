
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Categorias from './components/Categorias';
import Progress from './components/Progress';
import Schedule from './components/Schedule';
import Confirmation from './components/Confirmation';
import MisReservas from './components/MisReservas';
import Navigation from './components/Navigation';


function App() {
  const location = useLocation()
  console.log(location);
  
  return (
    <>
    {
      location.pathname != '/reservations' ?
      <Progress />
      : 
      null
    }
      <Routes>
        <Route path='/' element={<Categorias/>}/>
        <Route path='/schedule' element={<Schedule/>}/>
        <Route path='/confirmation' element={<Confirmation/>}/>
        <Route path='/reservations' element={<MisReservas/>}/>
      </Routes>
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <Navigation/>
      </div>
    </>
  );
}

export default App;
