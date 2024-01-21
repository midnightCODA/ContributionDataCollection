import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Button, Footer } from "../components";
import logo from '../assets/saving.png';
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


const SelectField = ({ label, options, onChange, value, required }) => {
  return (
    <div>
      <p className='font-semibold text-md justify-center ml-4 mr-4 mt-2 text-white'>{label}:</p>
      <select
        className='w-[90%] bg-main-dark-bg text-white dark:text-gray-200 dark:bg-input-gray rounded-2xl p-3 mt-1 ml-4 mr-4'
        onChange={onChange} required={required} value={value}>
        <option value=''></option>
        {options?.map((item) => (
          <option key={item.name} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

const SelectFieldContributors = ({ label, options, onChange, value, required }) => {
  return (
    <div>
      <p className='font-semibold text-md justify-center ml-4 mr-4 mt-2 text-white'>{label}:</p>
      <select
        className='w-[90%] bg-main-dark-bg text-white dark:text-gray-200 dark:bg-input-gray rounded-2xl p-3 mt-1 ml-4 mr-4'
        onChange={onChange} required={required} value={value}>
        <option value=''></option>
        {options?.map((item) => (
          <option key={item.name} value={item._id}>
            {item.full_name}
          </option>
        ))}
      </select>
    </div>
  );
};


const AddData = () => {

  const [name, setName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [Surname, setSurname] = useState('')
  const [gender, setGender] = useState('')
  const [title, setTitle] = useState('')
  const [contact, setContact] = useState('')
  const [amount, setAmount] = useState('')
  const [contributionType, setContributionType] = useState('');
  const [contributionTypeOptions, setContributionTypeOptions] = useState([]);
  const [contributors, setContributors] = useState([])
  const [contributor, setContributor] = useState('')
  const [loading, setLoading] = useState('True')


  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
  }, [])


  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch('https://churchisbackend.onrender.com/contributionTypes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          setContributionTypeOptions(responseData);
          console.log(responseData);
        } else {
          console.error('Failed to fetch contributors data');
        }
      } catch (error) {
        console.error('An error occurred', error);
      } finally {
        setLoading(false);      // use state is not defined for this 
      }
    };


    // get the contributors data

    const fetchContributors = async () => {
      try {
        const response = await fetch('http://churchisbackend.onrender.com/getcontributors', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const contributorsData = await response.json();
          setContributors(contributorsData);
          console.log(contributorsData);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('An error occurred', error);
      } finally {
        setLoading(false);  // use state is not defined for this
      }
    };


    fetchData();
    fetchContributors();
  }, []);


  const handlenameChange = (e) => {
    setName(e.target.value);
  };

  const handlefirstnameChange = (e) => {
    setFirstName(e.target.value);
  }

  const handlemiddlenameChange = (e) => {
    setMiddleName(e.target.value);
  }

  const handlesurnameChange = (e) => {
    setSurname(e.target.value);
  }

  const handlegenderChange = (e) => {
    setGender(e.target.value);
  };

  const handletitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlecontactChange = (e) => {
    setContact(e.target.value);
  };

  const handleAmountChange = (e) => {
    let inputValue = e.target.value;

    // Remove non-numeric characters
    inputValue = inputValue.replace(/\D/g, '');

    // Limit the input to 10 characters
    if (inputValue.length <= 10) {
      setAmount(inputValue);
    }
  };

  const handleContributionTypeChange = (e) => {
    setContributionType(e.target.value);
  };

  const handleContributorChange = (e) => {
    setContributor(e.target.value)
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    const body = {
      user_id: contributor,
      amount: amount,
      contributionType: contributionType,
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
        alert('contribution added successfully');
        // You can redirect the user here if needed
      } else {
        alert('contribution failed');
        // You can display an error message to the user
      }
    } catch (error) {
      console.error('An error occurred', error);
      alert('Request Failed');

      // Handle network or other errors here
    }
  };




  return (

    <main className='relative'>
      <div className=''>
        <Navbar />
      </div>
      <div>
        <div className='flex flex-wrap justify-center pt-12'>
          <div className='w-760 bg-secondary-dark-bg dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3 shadow-lg'>

            <div className='mt-5'>
              <div className='mt-8'>

                <p className='font-semibold text-lg text-white justify-center mb-8'>Andika Mchango Mpya</p>


                <form onSubmit={handleSubmit}>


                  <SelectField
                    label='Mchango'
                    options={contributionTypeOptions}
                    value={contributionType}
                    onChange={handleContributionTypeChange}
                  />

                  <SelectFieldContributors
                    label='Mchangaji'
                    options={contributors}
                    value={contributor}
                    onChange={handleContributorChange}
                  />

                  {/*
                  <InputField label="Jina la Kwanza" className='text-white' type="text" value={firstName} onChange={handlefirstnameChange} required />
                  <InputField label="Jina la Kati" className='text-white' type="text" value={middleName} onChange={handlemiddlenameChange} />
                  <InputField label="Jina la Mwisho" className='text-white' type="text" value={Surname} onChange={handlesurnameChange} required />
                  <SelectField
                    label='Jinsia'
                    options={[{ name: 'me' }, { name: 'ke' }]}
                    value={gender}
                    onChange={handlegenderChange}
                    required
                  />
                  <InputField label="Cheo" type="text" value={title} onChange={handletitleChange} required />
                  <InputField label="Namba ya simu" type="text" value={contact} onChange={handlecontactChange} required />

                  */}

                  <InputField
                    label="Kiasi"
                    type="text"  // Change type to text
                    value={amount ? parseInt(amount).toLocaleString() : ''}  // Format the value using toLocaleString
                    onChange={handleAmountChange}
                    required
                  />

                  <div className='mt-4 flex justify-center ' >

                    <input
                      value='Upload'
                      type="submit"
                      className="w-[70%] blue_bg_gradient text-white font-bold p-3 mt-4 rounded-lg hover:w-[73%]"
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

export default AddData