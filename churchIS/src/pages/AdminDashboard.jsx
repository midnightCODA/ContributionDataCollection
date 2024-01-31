import React, { useEffect, useState } from 'react'
import { Footer, Header, Navbar } from '../components'
import { Link  } from 'react-router-dom';
import { dataSourceChanged } from '@syncfusion/ej2-react-grids';



const AdminDashboard = () => {


  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      localStorage.removeItem('token')
      window.location.href = '/login'
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

      <div className=''>
        <Navbar />
      </div>

      <div>

        <div class="bg-main-dark-bg  px-6 py-12 text-center dark:bg-neutral-900 md:px-12 lg:text-left">
          <div class="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
            <div class="grid items-center gap-12 lg:grid-cols-2">
              <div class="mt-12 lg:mt-0">
                <h3 class="mt-1 mb-5 text-4xl text-white font-bold tracking-tight md:text-6xl xl:text-6xl">
                  Kanisa la Moravian, <br /><span class="text-primary">Ushirika wa Ukonga</span> <br />
                  <span className='blue_gradient '> Jumuiya ya Stakishari</span>
                </h3>
                <p className='text-white font-semibold mb-5'>
                  Kwa furaha kubwa, tunapenda kukuletea mfumo wa kisasa wa kukusanya taarifa za michango.
                  Mfumo huu umeundwa kwa lengo la kuwawezesha waumini na washirika wetu kufuatilia michango yao kwa urahisi na ufanisi
                  zaidi.
                  Tunaamini kuwa hii itaboresha mchakato wa kuchangia na kusaidia shughuli za kanisa na jumuiya yetu.

                </p>
                <Link to='/'>
                <input
                value='Angalia michango'
                type="submit"
                className="w-[40%] max-md:w-[60%] blue_bg_gradient text-white font-bold p-3 mt-4 rounded-lg hover:w-[42%]"
                />
                </Link>
               
              </div>
              <div class="mb-12 lg:mb-0">
                <img src="https://plus.unsplash.com/premium_photo-1663100078216-2ff58616cf54?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWZyaWNhbiUyMHNtYXJ0cGhvbmV8ZW58MHx8MHx8fDA%3D"
                  class="w-full rounded-lg shadow-lg dark:shadow-black/20" alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className='w-full flex justify-center p-5 flex-col mt-8'>

          <h1 className='text-3xl text-white font-bold p-3 ml-3'>
            Taarifa kuhusu Mfumo wetu
          </h1>

        </div>


        <div className='mt-8 mb-12'>

          <div className='flex flex-wrap justify-center '>

            {/* small inormation cards */}

            <div className="bg-secondary-dark-bg text-white shadow-lg dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-200 p-8 m-3 flex justify-center items-center gap-10">
              <div>
                <p className="text-2xl font-semibold ">{new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'TZS', // Currency code for Tanzanian Shillings
                  minimumFractionDigits: 0, // You can change this based on your preference
                }).format(data?.totalAmount)} </p>
                <p className="text-gray-400">Jumla ya <br /> Makusanyo</p>
              </div>
            </div>

            <div className="bg-secondary-dark-bg dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-200 p-8 m-3 flex justify-center items-center gap-10 shadow-lg">
              <div>
                <p className="text-2xl text-white font-semibold ">{data?.contributionCount}</p>
                <p className="text-gray-400">Idadi ya<br /> Makusanyo</p>
              </div>
            </div>

            <div className="bg-secondary-dark-bg dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-200 p-8 m-3 flex justify-center items-center gap-10 shadow-lg">
              <div>
                <p className="text-2xl text-white font-semibold ">{data?.userCount}</p>
                <p className="text-gray-400">Idadi ya<br />  Watumiaji</p>
              </div>
            </div>


          </div>
        </div>


        <Footer />



      </div>
    </main>
  )
}

export default AdminDashboard