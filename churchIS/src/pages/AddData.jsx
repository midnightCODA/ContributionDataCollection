import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Button } from "../components";
import logo from '../assets/saving.png';
import {Navbar} from "../components";



const InputField = ({ label, type, value, onChange, required }) => (
  <div>
    <p className='font-semibold text-md justify-center ml-4 mr-4'>{label}:</p>
    <input
      className='w-[90%] bg-slate-200 dark:text-gray-200 dark:bg-input-gray rounded-2xl p-3 mt-1 ml-4 mr-4'
      type={type}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

const AddData = () => {


  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token){
          localStorage.removeItem('token')
          window.location.href = '/'
    }
  }, [])


  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [title, setTitle] = useState('')
  const [contact, setContact] = useState('')
  const [amount, setAmount] = useState('')


  const handlenameChange = (e) => {
    setName(e.target.value);
  };

  const handlegenderChange = (e) => {
    setGender(e.target.value);
  };

  const handletitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlecontactChange = (e) => {
    setContact(e.target.value);
  };

  const handleamountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      full_name: name,
      gender: gender,
      title: title,
      contact: contact,
      amount: amount
    };

    console.log(body);
  
    try {
      const response = await fetch('https://churchisbackend.onrender.com/createcontribution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      if (response.ok) {
        console.log('contribution added successfully');
        // You can redirect the user here if needed
      } else {
        console.error('contribution failed');
        // You can display an error message to the user
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
      <div className='flex flex-wrap justify-center mt-5'>
        <div className='w-760 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3 shadow-lg'>

          <div className='mt-5'>
            <div className='mt-8'>
              <div className="flex w-full justify-center flex-col p-3">
                <p className='font-semibold text-lg justify-center mb-8'>Add contribution</p>
                <p className='text-gray-400 text-sm justify-center'>contact Administrator to get access to restricetd features</p>
              </div>

              <form onSubmit={handleSubmit}>



              <InputField label="Full name" type="text" value={name} onChange={handlenameChange} required />
              <InputField label="Gender" type="text" value={gender} onChange={handlegenderChange} required />
              <InputField label="Title" type="text" value={title} onChange={handletitleChange} required />
              <InputField label="Contact" type="text" value={contact} onChange={handlecontactChange} required />
              <InputField label="Amount" type="text" value={amount} onChange={handleamountChange} required />

                <div className='mt-4 flex justify-center ' >


                  <input
                    value='Add contribution'
                    type="submit"
                    className="w-[50%] orange_bg_gradient  text-white font-bold  p-3 mt-4 rounded-lg"
                  />


                </div>
              </form>


            </div>
          </div>
        </div>
      </div>
    </div>
    </main>
  )
}

export default AddData