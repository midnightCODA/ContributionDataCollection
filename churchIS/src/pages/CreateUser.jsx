import React, { useState, useEffect } from "react";
import { Button, Footer } from "../components";
import { Link } from 'react-router-dom';
import logo from '../assets/saving.png';
import { Navbar } from "../components";

const SelectField = ({ label, options, onChange, value, required }) => {
  return (
    <div>
      <p className='font-semibold text-md justify-center ml-4 mr-4 mt-2 text-white'>{label}:</p>
      <select
        className='w-[90%] bg-main-dark-bg text-white dark:text-gray-200 dark:bg-input-gray rounded-2xl p-3 mt-1 ml-4 mr-4'
        onChange={onChange} required={required} value={value}>
        <option value=''></option>
        {options?.map((item) => (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

const CreateUser = () => {

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
  }, [])

  const [scisuserid, setScisuserid] = useState('');
  const [password, setPassword] = useState('moravian');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [surname, setSurname] = useState('');
  const [rank, setRank] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [Role, setRole] = useState('');

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      email: scisuserid,
      password: password,
      full_name: `${firstName} ${secondName} ${surname}`,
      // firstName: firstName,
      // secondName: secondName,
      // surname: surname,
      role: Role,
      gender: gender,
      rank: rank,
      phone: phone
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

      <div className=''>
        <Navbar />
      </div>

      <div>
        <div className='flex flex-wrap justify-center  pt-12'>
          <div className='w-760 bg-secondary-dark-bg dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3 shadow-lg'>
            <div className='mt-5'>
              <div className='mt-8'>

                <p className='font-semibold text-white text-xl justify-center mb-8'>Tengeneza User Mpya:</p>

                <form onSubmit={handleSubmit}>
                  <p className='font-semibold text-md justify-center ml-4 mr-4 text-white'>Jina la Kwanza:</p>
                  <input
                    className='w-[90%] text-white bg-main-dark-bg dark:text-gray-200 dark:bg-input-gray rounded-2xl p-3 mt-1 ml-4 mr-4'
                    type='text'
                    required
                    value={firstName}
                    onChange={(e) => handleInputChange(e, setFirstName)}
                  />

                  <p className='font-semibold text-md justify-center ml-4 mr-4 text-white'>Jina la Kati:</p>
                  <input
                    className='w-[90%] text-white bg-main-dark-bg dark:text-gray-200 dark:bg-input-gray rounded-2xl p-3 mt-1 ml-4 mr-4'
                    type='text'
                    value={secondName}
                    onChange={(e) => handleInputChange(e, setSecondName)}
                  />

                  <p className='font-semibold text-md justify-center ml-4 mr-4 text-white'>Jina la Mwisho:</p>
                  <input
                    className='w-[90%] text-white bg-main-dark-bg dark:text-gray-200 dark:bg-input-gray rounded-2xl p-3 mt-1 ml-4 mr-4'
                    type='text'
                    required
                    value={surname}
                    onChange={(e) => handleInputChange(e, setSurname)}
                  />

                  <p className='font-semibold text-md justify-center ml-4 mr-4 mt-2 text-white'>Email:</p>
                  <input
                    className='w-[90%] text-white bg-main-dark-bg dark:text-gray-200 dark:bg-input-gray rounded-2xl p-3 mt-1 mb-1 ml-4 mr-4'
                    value={scisuserid}
                    required
                    onChange={(e) => handleInputChange(e, setScisuserid)}
                  />

                  <SelectField
                    label='Jukumu'
                    options={[{ name: 'admin' }, { name: 'user' }, { name: 'viewer' }]}
                    required
                    onChange={(e) => handleInputChange(e, setRole)}
                    value={Role}
                  />

                  <SelectField
                    label='Jinsia'
                    options={[{ name: 'Me' }, { name: 'Ke' }]}
                    required
                    onChange={(e) => handleInputChange(e, setGender)}
                    value={gender}
                  />

                  <p className='font-semibold text-md justify-center ml-4 mr-4 text-white'>Cheo:</p>
                  <input
                    className='w-[90%] text-white bg-main-dark-bg dark:text-gray-200 dark:bg-input-gray rounded-2xl p-3 mt-1 ml-4 mr-4'
                    type='text'
                    required
                    value={rank}
                    onChange={(e) => handleInputChange(e, setRank)}
                  />

                  <p className='font-semibold text-md justify-center ml-4 mr-4 text-white'>Namba ya simu:</p>
                  <input
                    className='w-[90%] text-white bg-main-dark-bg dark:text-gray-200 dark:bg-input-gray rounded-2xl p-3 mt-1 ml-4 mr-4'
                    type='number'  // Use type='tel' for phone numbers
                    placeholder="07XXXXXXXX"
                    required
                    value={phone}
                    onChange={(e) => handleInputChange(e, setPhone)}
                  />


                  <p className='font-semibold text-md justify-center ml-4 mr-4 mt-2 text-white'>Password:</p>
                  <input
                    className='w-[90%] text-white bg-main-dark-bg dark:text-gray-200 dark:bg-input-gray rounded-2xl p-3 mt-1 ml-4 mr-4'

                    type='text'
                    value={password}
                    disabled
                    onChange={(e) => handleInputChange(e, setPassword)}
                  />

                  <div className=' mt-4 flex justify-center'>
                    <input
                      value='Upload'
                      type="submit"
                      className="w-[50%] blue_bg_gradient  text-white font-bold  p-3 mt-4 rounded-lg hover:w-[55%]"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default CreateUser;
