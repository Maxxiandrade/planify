import { Link, useLocation } from 'react-router-dom';
import blue from '/blue-cup.svg';
import gray from '../../public/gray-cup.svg';

const Navigation = () => {
  const location = useLocation();

  return (
    <div className='flex justify-center space-x-9'>
      <Link to='/'>
        <button className="flex flex-col items-center">
          <img src={location.pathname != '/reservations' ? blue : gray} alt="" className='h-8 mb-1' />
          <span className={`text-black ${location.pathname != '/reservations' ? 'text-violet-800 overline' : ''}`}>Reservar</span>
        </button>
      </Link>
      <Link to='/reservations'>
        <button className="flex flex-col items-center">
          <img src={location.pathname === '/reservations' ? blue : gray} alt="" className='h-8 mb-1' />
          <span className={`text-black ${location.pathname === '/reservations' ? 'text-violet-800 overline' : ''}`}>Mis Reservas</span>
        </button>
      </Link>
    </div>
  );
}

export default Navigation;
