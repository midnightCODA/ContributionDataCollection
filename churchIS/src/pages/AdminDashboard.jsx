import React, {useEffect, useState} from 'react'
import { Header, Navbar } from '../components'
import { dataSourceChanged } from '@syncfusion/ej2-react-grids';



const AdminDashboard = () => {


  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token){
          localStorage.removeItem('token')
          window.location.href = '/'
    }
  }, [])
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://churchisbackend.onrender.com/analytics', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          setData(responseData);
          console.log(responseData);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('An error occurred', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (

    <main className='relative'>

          <div className='flex py-5'>
              <Navbar />
            </div>
    
    <div>

    <div className='w-full flex justify-center items-center flex-col mt-8'>
    
    <h1 className='head_text p-3'>
        Kanisa la Moraivan - Ushirika wa Ukonga <br className='max-md:hidden' />
        <span className='blue_gradient '>Jumuiya ya Stakishari</span>
      </h1>
      
      <br/>

    
    
    </div>


      <div className='mt-12'>

        <div className='flex flex-wrap justify-center '>

          {/* small inormation cards */}

          <div className="bg-secondary-dark-bg text-white shadow-lg dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-200 p-8 m-3 flex justify-center items-center gap-10">
            <div>
              <p className="text-2xl font-semibold ">{new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'TZS', // Currency code for Tanzanian Shillings
                minimumFractionDigits: 0, // You can change this based on your preference
              }).format(data?.totalAmount)} </p>
              <p className="text-gray-400">Jumla ya <br/> Makusanyo</p>
            </div>
          </div>

          <div className="bg-secondary-dark-bg dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-200 p-8 m-3 flex justify-center items-center gap-10 shadow-lg">
            <div>
              <p className="text-2xl text-white font-semibold ">{data?.contributionCount}</p>
              <p className="text-gray-400">Idadi ya<br/> Makusanyo</p>
            </div>
          </div>

          <div className="bg-secondary-dark-bg dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-200 p-8 m-3 flex justify-center items-center gap-10 shadow-lg">
            <div>
              <p className="text-2xl text-white font-semibold ">{data?.userCount}</p>
              <p className="text-gray-400">Idadi ya<br/>  Watumiaji</p>
            </div>
          </div>

          
        </div>
      </div>



      </div>
      </main>
  )
}

export default AdminDashboard