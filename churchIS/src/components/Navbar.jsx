import React, {useState} from 'react'
import { hamburger } from '../assets/icons'
import { navLinks } from '../constants'
import  logo  from '../assets/saving.png'


const Navbar = () => {

  const [style, setStyle] = useState('');
  const [hidden, setHidden] = useState('hidden')

  function toggleDash() {
    // Check the current style and toggle it on each click
    if (style === '') {
      setStyle('flex-col shadow-lg p-3 -ml-6 mr-2');
      setHidden('')
    } else {
      setStyle('');
      setHidden('hidden')
    }
  }


  function logout() {

    localStorage.removeItem('token')
    window.location.href = '/'
    
  }

  return (
      <div className='fixed  md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
      <nav className='flex flex-row justify-between max-container'>
        <a href='/'>
          <img
            src={logo}
            alt='logo'
            width={29}
            height={29}
            className='m-0 mr-8 ml-4 w-[29px] h-[29px]'
          />
        </a>
        <ul className={`flex flex-auto gap-5 ${style} max-lg:${hidden}`}>
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className='font-montserrat leading-normal text-lg text-slate-gray'
              >
                {item.label}
              </a>
            </li>
          ))}
          <input
            value='Log out'
            type='button'
            className='text-red-500'
            onClick={logout}
          />
        </ul>

        

       
        <div className='hidden max-lg:block  mr-4'>
          <img onClick={toggleDash} src={hamburger} alt='hamburger icon' width={25} height={25} />
        </div>

      </nav>
      </div>
  
  )
}

export default Navbar