import React, { useState, useEffect } from 'react'
import { Header, Navbar, Footer, PublicNav } from '../components'
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Selection, ExcelExport, Sort, ContextMenu, Filter, Toolbar, Page, Search, Edit, Inject } from '@syncfusion/ej2-react-grids'
import '../App.css'
import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key
registerLicense('Ngo9BigBOggjHTQxAR8/V1NHaF5cXmVCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdgWH9cc3VcQmhYWUJwVkc=');

const ViewData = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const screenWidth = window.innerWidth; // Get the width of the device screen

  let variableValue;

  if (screenWidth < 768) {
    // If the screen width is less than 768px, subtract 40px from it
    variableValue = `${screenWidth - 40}px`;
  } else {
    // If the screen width is greater than or equal to 768px, set the variable to 'auto'
    variableValue = 'auto';
  }

  let grid;
  const toolbarClick = (args) => {
    if (grid && args.item.id === 'grid_excelexport') {
      grid.excelExport();
    }
  };

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
        const response = await fetch('https://churchisbackend.onrender.com/allcontributions', {
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

    <main className='relative bg-main-dark-bg '>


      <div className=''>
        <Navbar />
      </div>
      


      <div className=' w-full flex justify-center items-center flex-col pt-10'>

        <h1 className='head_text p-3'>
          Kanisa la Moravian - Ushirika wa Ukonga <br className='max-md:hidden' />
          <span className='blue_gradient '>Jumuiya ya Stakishari</span>
        </h1>




      </div>

      <div className='flex justify-center w-200 m-auto md:w-full '>

        <div className='m-2 md:m-10 md:p-10 bg-secondary-dark-bg rounded-3xl z-1000 shadow-lg'>

          <GridComponent
            id='grid'
            dataSource={data}
            allowSorting
            allowPaging
            toolbar={['Search', 'ExcelExport']}
            allowExcelExport={true}
            allowResizing={true}
            width={`${variableValue}`}
            toolbarClick={toolbarClick}
            ref={g => grid = g}
          >
            <ColumnsDirective
            >
              <ColumnDirective field='full_name' headerText='Jina kamili' minWidth='80' width='100' maxWidth='150' />
              <ColumnDirective field='amount' headerText='Kiasi' minWidth='80' width='100' maxWidth='150' />
              <ColumnDirective field='contact' headerText='Mawasiliano' minWidth='80' width='100' maxWidth='150' />
              <ColumnDirective field='gender' headerText='Jinsia' minWidth='80' width='100' maxWidth='150' />
              <ColumnDirective field='title' headerText='Cheo' minWidth='80' width='100' maxWidth='150' />
              <ColumnDirective field='contributionOf.name' headerText='Mchango' minWidth='80' width='100' maxWidth='150' />
            </ColumnsDirective>
            <Inject services={[Page, Search, Toolbar, Edit, Sort, Filter, ExcelExport, Resize]} />
          </GridComponent>
        </div>

      </div>

      <Footer />

    </main>
  )
}

export default ViewData