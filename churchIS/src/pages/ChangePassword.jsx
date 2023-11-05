import React, { useState, useEffect } from "react";
import { Navbar } from "../components";

const InputField = ({ label, type, value, onChange, required }) => (
  <div>
    <p className='font-semibold text-md justify-center ml-4 mr-4 mt-2 text-white'>{label}:</p>
    <input
      className='w-[90%] bg-main-dark-bg text-white dark:text-gray-200 dark:bg-input-gray rounded-2xl p-3 mt-1 ml-4 mr-4'
      type={type}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

const ChangePassword = () => {

  const userData = JSON.parse(localStorage.getItem('userdata'));

  const [currentPassword, setcurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setconfirmNewPassword] = useState('');

  const handlecurrentpassChange = (e) => {
    setcurrentPassword(e.target.value);
  };

  const handlenewpassChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleconfirmnewpassChange = (e) => {
    setconfirmNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword === confirmNewPassword) {

      const body = {
        email: userData.email,
        currentPassword: currentPassword,
        newPassword: newPassword
      };

      console.log(body);

    } else {
      alert('new passwords do not match please check them')
    }

    // try {
    //   const response = await fetch('https://churchisbackend.onrender.com/createcontribution', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(body),
    //   });

    //   if (response.ok) {
    //     alert('contribution added successfully');
    //     // You can redirect the user here if needed
    //   } else {
    //     alert('contribution failed');
    //     // You can display an error message to the user
    //   }
    // } catch (error) {
    //   console.error('An error occurred', error);
    //   alert('Request Failed');

    // Handle network or other errors here
  }

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

                <p className='font-semibold text-white text-xl justify-center mb-8'>Badili Password</p>

                <form onSubmit={handleSubmit}>

                  <InputField label="Password ya Sasa" type="password" value={currentPassword} onChange={handlecurrentpassChange} required />
                  <InputField label="Password Mpya" type="password" value={newPassword} onChange={handlenewpassChange} required />
                  <InputField label="Password Mpya" type="password" value={confirmNewPassword} onChange={handleconfirmnewpassChange} required />

                  <div className=' mt-4 flex justify-center'>
                    <input
                      value='Change password'
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
  )
}

export default ChangePassword