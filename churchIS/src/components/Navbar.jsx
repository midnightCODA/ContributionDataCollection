import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { hamburger } from '../assets/icons';
import { navLinks, normalUserLinks } from '../constants';
import logo from '../assets/saving.png';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [style, setStyle] = useState('');
  const [hidden, setHidden] = useState('hidden');
  const [links, setLinks] = useState([])

  function toggleDash() {
    // Check the current style and toggle it on each click
    if (style === '') {
      setStyle('flex-col shadow-lg p-3 -ml-6 mr-2');
      setHidden('');
    } else {
      setStyle('');
      setHidden('hidden');
    }
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userdata');
    window.location.href = '/login';
  }

  const userData = JSON.parse(localStorage.getItem('userdata'));

  useEffect(() => {
    if (userData && userData.role === 'admin') {
      setLinks(navLinks);
    } else {
      setLinks(normalUserLinks);
    }
  }, [userData]);

  return (
    <div className="fixed md:static bg-main-dark-bg dark:bg-main-dark-bg text-white navbar w-full">
      <nav className="flex flex-row justify-between max-container pt-4 pb-4">
        <Link to="/"> {/* Use Link component to navigate */}
          <img
            src={logo}
            alt="logo"
            width={29}
            height={29}
            className="m-0 mr-8 ml-4 w-[29px] h-[29px]"
          />
        </Link>
        <ul className={`flex flex-auto gap-5 ${style}  max-md:${hidden}`}>
          {links.map((item) => (
            <li key={item.label}>
              <Link to={item.href} className="font-montserrat leading-normal w-full text-md text-slate-gray">
                {item.label}
              </Link>
            </li>
          ))}
          <button className="text-red-500" onClick={logout}>
            Log out
          </button>
        </ul>

        <div className="hidden text-white max-lg:block mr-4">
          <img onClick={toggleDash} src={hamburger} alt="hamburger icon" width={25} height={25} />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
