import React, { useEffect, useState, useCallback  } from 'react'
import { Header, Navbar } from '../components'
import { ColumnDirective, ColumnsDirective, Filter, GridComponent, Group, Toolbar, Edit, ExcelExport, Search, Inject, Page, Sort } from '@syncfusion/ej2-react-grids';



const ManageUsers = () => {

  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [variableValue, setVariableValue] = useState('');


const updateVariableValue = useCallback(() => {
  const screenWidth = window.innerWidth;

  if (screenWidth < 768) {
    setVariableValue(`${screenWidth - 40}px`);
  } else {
    setVariableValue('auto');
  }
}, []);

useEffect(() => {
  updateVariableValue(); // Initialize variableValue based on screen size
  window.addEventListener('resize', updateVariableValue); // Update variableValue on window resize

  return () => {
    window.removeEventListener('resize', updateVariableValue); // Clean up the event listener
  };
}, [updateVariableValue]);




  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token){
          localStorage.removeItem('token')
          window.location.href = '/'
    }
  }, [])





  let grid;
  const toolbarClick = (args) => {
    if (grid && args.item.id === 'grid_excelexport') {
      grid.excelExport();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://churchisbackend.onrender.com/allusers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
          setData(responseData);
        } else {
          console.error('Failed to fetch data. Response status:', response.status);
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

      <div className='flex justify-center w-200 m-auto md:w-full'>

        <div className='m-2 md:m-10 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl z-1000 shadow-lg'>
          <Header title="Edit your users" />
          <GridComponent
            dataSource={data}
            allowSorting
            allowPaging
            toolbar={[ 'Search', 'Delete', 'ExcelExport']}
            allowExcelExport={true}
            editSettings={{ allowEditing: true, allowDeleting: false, allowAdding: true, mode: 'Dialog' }}
            width={variableValue}
            toolbarClick={toolbarClick}
            ref={g => grid = g}
          >
            <ColumnsDirective
            >
              <ColumnDirective field='full_name' minWidth='80' width='100' maxWidth='150' />
              <ColumnDirective field='email' minWidth='80' width='100' maxWidth='150' />
              <ColumnDirective field='password' minWidth='80' width='100' maxWidth='150' />
              <ColumnDirective field='role' minWidth='80' width='100' maxWidth='150' />
            </ColumnsDirective>

            <Inject services={[Page, Search, Toolbar, Edit, Sort, Filter, ExcelExport]} />
          </GridComponent>
        </div>

      </div>
    </main>
  )
}

export default ManageUsers