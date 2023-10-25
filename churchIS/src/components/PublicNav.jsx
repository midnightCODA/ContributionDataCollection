import React from 'react'
import { hamburger } from '../assets/icons'
import { navLinks, publicnavLinks } from '../constants'
import  logo  from '../assets/saving.png'

const PublicNav = () => {
  return (
    <div>
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
        <ul className='flex-1 flex gap-8 '>
          {publicnavLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className='font-montserrat leading-normal text-lg text-slate-gray'
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

       
      </nav>
      </div>
    </div>
  )
}

export default PublicNav