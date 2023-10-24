import React from 'react'
import { Header, Navbar } from '../components'



const AdminDashboard = () => {
  return (

    <main className='relative'>
          <div className='flex py-5'>
              <Navbar />
            </div>
    
    <div>


      <div className='mt-12'>


        <div className='flex flex-wrap justify-center '>

          {/* small inormation cards */}

          <div className="bg-white shadow-lg dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-200 p-8 m-3 flex justify-center items-center gap-10">
            <div>
              <p className="text-2xl font-semibold ">6</p>
              <p className="text-gray-400">Students</p>
            </div>
          </div>

          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-200 p-8 m-3 flex justify-center items-center gap-10 shadow-lg">
            <div>
              <p className="text-2xl font-semibold ">6</p>
              <p className="text-gray-400">Teachers</p>
            </div>
          </div>

          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-200 p-8 m-3 flex justify-center items-center gap-10 shadow-lg">
            <div>
              <p className="text-2xl font-semibold ">3</p>
              <p className="text-gray-400">Notices</p>
            </div>
          </div>

          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-200 p-8 m-3 flex justify-center items-center gap-10 shadow-lg">
            <div>
              <p className="text-2xl font-semibold ">24/24</p>
              <p className="text-gray-400">Attendance
                <br />
                this month</p>
            </div>
          </div>
        </div>
      </div>



      </div>
      </main>
  )
}

export default AdminDashboard