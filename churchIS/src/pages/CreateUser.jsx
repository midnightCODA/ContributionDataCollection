import React, { useState, useEffect } from "react";
import { Button } from "../components";
import { Link } from 'react-router-dom';
import logo from '../assets/saving.png';
import {Navbar} from "../components";

const CreateUser = () => {

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token){
          localStorage.removeItem('token')
          window.location.href = '/'
    }
  }, [])


  const [scisuserid, setScisuserid] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      email: scisuserid,
      password: password,
      full_name: username
    };

    console.log(body);

    try {
      const response = await fetch('https://churchisbackend.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        alert('User creation successful');
        // Redirect the user if needed
      } else {
        alert('User creation failed');
        // Display an error message to the user
      }
    } catch (error) {
      console.error('An error occurred', error);
      // Handle network or other errors here
    }
  };

  return (

    <main className='relative'>
    <div className='flex py-5'>
        <Navbar />
      </div>


    <div>
      <div className='flex flex-wrap justify-center  mt-5'>
        <div className='w-760 bg-secondary-dark-bg dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3 shadow-lg'>
          <div className='mt-5'>
            <div className='mt-8'>
              <div className="flex w-full justify-center flex-col p-3">
                <p className='font-semibold text-white text-xl justify-center mb-8'>Add user data to create a user</p>
                <p className='text-gray-400 text-sm justify-center'></p>
              </div>

              <form onSubmit={handleSubmit}>
                <p className='font-semibold text-md justify-center ml-4 mr-4 text-white'>Full name:</p>
                <input
                  className='w-[90%] bg-main-dark-bg dark:text-gray-200 dark:bg-input-gray rounded-2xl p-3 mt-1 ml-4 mr-4'
                 
                  type='text'
                  required
                  value={username}
                  onChange={(e) => handleInputChange(e, setUsername)}
                />

                <p className='font-semibold text-md justify-center ml-4 mr-4 mt-2 text-white'>Email:</p>
                <input
                  className='w-[90%] bg-main-dark-bg dark:text-gray-200 dark:bg-input-gray rounded-2xl p-3 mt-1 mb-1 ml-4 mr-4'
                 
                  value={scisuserid}
                  required
                  onChange={(e) => handleInputChange(e, setScisuserid)}
                />

                <p className='font-semibold text-md justify-center ml-4 mr-4 mt-2 text-white'>Password:</p>
                <input
                  className='w-[90%] bg-main-dark-bg dark:text-gray-200 dark:bg-input-gray rounded-2xl p-3 mt-1 ml-4 mr-4'
                
                  type='password'
                  value={password}
                  required
                  onChange={(e) => handleInputChange(e, setPassword)}
                />

                <div className=' mt-4 flex justify-center'>
                  <input
                    value='Create User'
                    type="submit"
                    className="w-[50%] blue_bg_gradient  text-white font-bold  p-3 mt-4 rounded-lg"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </main>
  );
};

export default CreateUser;
