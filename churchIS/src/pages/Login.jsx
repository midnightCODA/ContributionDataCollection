import { useState, useEffect } from "react"
import React from 'react'
import { Button } from "../components"
import { Link } from 'react-router-dom';
import logo from '../assets/saving.png'


const Login = () => {

  const [scisuserid, setScisuserid] = useState('')
  const [password, setPassword] = useState('');
  const currentColor = '#000';


  const handleUsernameChange = (e) => {
    setScisuserid(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform login logic here using the scisuserid and password values
    console.log('userid:', scisuserid);
    console.log('Password:', password);

    const body = {
      email: scisuserid,
      password: password,
      
    }

    console.log(body);

    try {
      const response = await fetch('https://churchisbackend.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.status === 'ok') {

        localStorage.setItem('token', data.user);
        localStorage.setItem('userdata', JSON.stringify(data.userdata));
        window.location.href = '/dashboard'

      } else {
        alert(`Failed to login: ${data.message}`);
      }
    } catch (error) {
      console.error('An error occurred', error);
      // Handle network or other errors here
    }

  };



  return (
    <div className='flex flex-wrap justify-center bg-main-dark-bg'>
      <div className='w-400 bg-secondary-dark-bg dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3 mt-20 shadow-lg'>
        <div className='flex w-full m-auto text-center justify-center'>
          <p className='text-xl text-white font-semibold w-full justify-center'>Kanisa la Moravian - Ushirika wa Ukonga, <br/> Jumuiya ya Stakishari </p>
        </div>
        <div className='mt-5'>

          <div className='mt-8'>
            <div className="flex w-full justify-center flex-col p-3">
              <img className='md:w-48 h-48 m-auto' src={logo} alt='' />
              <p className='font-semibold pt-3 text-lg w-full text-white justify-center'>Login:</p>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                className='w-[90%] bg-main-dark-bg text-white  dark:text-gray-200 dark:bg-input-gray  rounded-2xl p-3 mt-4 mb-1 ml-4 mr-4'
                placeholder='Email'
                value={scisuserid}
                onChange={handleUsernameChange}
              />

              <input
                className='w-[90%] bg-main-dark-bg text-white  dark:text-gray-200 dark:bg-input-gray rounded-2xl p-3 mt-1 ml-4 mr-4'
                placeholder='Password'
                type='password'
                value={password}
                onChange={handlePasswordChange}
              />

              <div className='mt-4 ' >


                <input
                  value='Login'
                  type="submit"
                  className="w-full blue_bg_gradient font-bold  text-white p-3 rounded-lg"
                />





                {/* <Button /> is the og component   */}


              </div>
            </form>

            <div className='flex w-full justify-center '>
              <p className='text-gray-400 text-sm m-auto p-3 justify-center w-full'>
                if you have forgotten password, please contact the System Administrator
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login