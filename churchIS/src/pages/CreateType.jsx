import React, { useState, useEffect } from "react";
import {Navbar, Footer} from "../components";

export const CreateType = () => {

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token){
              localStorage.removeItem('token')
              window.location.href = '/login'
        }
      }, [])

      const [name, setname] = useState('');
      const [description, setdescription] = useState('');
      const [startDate, setstartDate] = useState('');
      const [endDate, setendDate] = useState('');
    
      const handleInputChange = (e, setter) => {
        setter(e.target.value);
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const body = {
          name: name,
          description: description,
          startDate: startDate,
          endDate: endDate
        };
    
        console.log(body);
    
        try {
          const response = await fetch('https://churchisbackend.onrender.com/contributionTypes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          });
    
          if (response.ok) {
            alert('type created successful');
            alert('Created successfully Failed');

            // Redirect the user if needed
          } else {
            alert('type creation failed');
            alert('Creation Failed');

            // Display an error message to the user
          }
        } catch (error) {
          console.error('An error occurred', error);
          alert('Creating Failed');
          // Handle network or other errors here
        }
      };
    
      

  return (
    <main className='relative'>
    <div className=''>
        <Navbar />
      </div>


    <div>
      <div className='flex flex-wrap justify-center  mt-5'>
        <div className='w-760 bg-secondary-dark-bg dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3 shadow-lg'>
          <div className='mt-5'>
            <div className='mt-8'>
            
              <p className='font-semibold text-white text-xl justify-center mb-8'>Andaa Mchango Mpya</p>

              <form onSubmit={handleSubmit}>
                <p className='font-semibold text-md justify-center ml-4 mr-4 text-white'>Jina la Mchango:</p>
                <input
                  className='w-[90%] bg-main-dark-bg text-white dark:text-gray-200 dark:bg-input-gray rounded-2xl p-3 mt-1 ml-4 mr-4'
                 
                  type='text'
                  required
                  value={name}
                  onChange={(e) => handleInputChange(e, setname)}
                />

                <p className='font-semibold text-md justify-center ml-4 mr-4 mt-2 text-white'>Maelezo kuhusu Mchango:</p>
                <textarea
                  className='w-[90%] bg-main-dark-bg text-white dark:text-gray-200 dark:bg-input-gray rounded-2xl p-3 mt-1 mb-1 ml-4 mr-4'
                  rows="4"
                  value={description}
                  required
                  onChange={(e) => handleInputChange(e, setdescription)}
                />

                <p className='font-semibold text-md justify-center ml-4 mr-4 mt-2 text-white'>Tarehe Ya kuanza</p>
                <input
                  className='w-[90%] bg-main-dark-bg text-white dark:text-gray-200 dark:bg-input-gray rounded-2xl p-3 mt-1 ml-4 mr-4'
                  type='date'
                  
                  value={startDate}
                  
                  onChange={(e) => handleInputChange(e, setstartDate)}
                />

                <p className='font-semibold text-md justify-center ml-4 mr-4 mt-2 text-white'>Tarehe Ya Mwisho</p>
                <input
                  className='w-[90%] bg-main-dark-bg text-white dark:text-gray-200 dark:bg-input-gray rounded-2xl p-3 mt-1 ml-4 mr-4'
                  type='date'
                  
                  value={endDate}
                 
                  onChange={(e) => handleInputChange(e, setendDate)}
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

    <Footer />

    </main>
  )
}


export default CreateType;