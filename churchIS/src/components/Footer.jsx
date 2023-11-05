import React from 'react';
import logo from '../assets/saving.png'
import { Link } from 'react-router-dom';

const Footer = () => (

  <div className='mt-8'>
   <hr class="h-px my-8 bg-secondary-dark-bg border-0 dark:bg-gray-700"></hr>
    <footer className="footer p-10 bg-neutral text-neutral-content">
      <div className='flex w-full max-md:flex-col-reverse'>
        <div className='w-full xl:w-[80%]'>
          <aside>
            <img src={logo} className='md:w-16 h-16 mb-4 ' />
            <p className='text-white font-semibold'>Jumuiya ya Stakishari.
            <br />Kanisa la Moraivan,
            Ushirika wa Ukonga
            <br />
            </p>
            <p className='text-white mt-4'>© 2023 Contributions™. All Rights Reserved.</p>
          </aside>
        </div>
        <div className='flex '>
          <nav>
            <header className="footer-title font-bold text-white">ACTIONS</header>
            <div className="grid grid-flow-col gap-4 mt-3 max-md:mb-5 ">
            <Link to={'/forgotpassword'} className='font-semibold text-white hover:underline'>Change Password</Link>
             </div>
          </nav></div>
      </div>


    </footer>

  </div>
);

export default Footer;