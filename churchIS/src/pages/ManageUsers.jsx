import React, {useEffect, useState} from 'react'
import { Header, Navbar } from '../components'
import { ColumnDirective, ColumnsDirective, Filter, GridComponent, Group, Toolbar, Edit, ExcelExport, Search, Inject, Page, Sort } from '@syncfusion/ej2-react-grids';


const ManageUsers = () => {

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
        const user = jwt.decode(token)
        if(!user){
          localStorage.removeItem('token')
          window.location.href = '/'
        } else {
          
        }
    }
  }, [])

  

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


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

            <div className='flex justify-center w-200 m-auto md:w-full'>

                <div className='m-2 md:m-10 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl z-1000 shadow-lg'>
                    <Header title="Edit your users" />
                    <GridComponent
                        dataSource={data}
                        allowSorting
                        allowPaging
                        toolbar={['Add', 'Search', 'Delete', 'ExcelExport']}
                        allowExcelExport={true}
                        editSettings={{ allowEditing: true, allowDeleting: false, allowAdding: true, mode: 'Dialog' }}
                        width="auto"
                        toolbarClick={toolbarClick}
                        ref={g => grid = g}
                    >
                        <ColumnsDirective
                        >
                            <ColumnDirective field='full_name' width='100' />
                            <ColumnDirective field='email' width='100' />
                            <ColumnDirective field='password' width='100' />
                            <ColumnDirective field='role' width='100'  />
                        </ColumnsDirective>
                        
                        <Inject services={[Page, Search, Toolbar, Edit, Sort, Filter, ExcelExport]} />
                    </GridComponent>
                </div>

            </div>
        </main>
    )
}

export default ManageUsers