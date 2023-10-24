import React, {useState, useEffect} from 'react'
import { Header, Navbar } from '../components'
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Selection, ExcelExport, Sort, ContextMenu, Filter, Toolbar, Page, Search, Edit, Inject } from '@syncfusion/ej2-react-grids'
import '../App.css'
import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key
registerLicense('Ngo9BigBOggjHTQxAR8/V1NHaF5cXmVCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdgWH9cc3VcQmhYWUJwVkc=');

const ViewData = () => {

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
            const response = await fetch('http://localhost:3300/allcontributions', {
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

            <div className='flex justify-center w-full'>

                <div className='m-2 md:m-10 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl z-1000 shadow-lg'>
                    <Header category="Public" title="View Contributions" />
                    <GridComponent
                        dataSource={data}
                        allowSorting
                        allowPaging
                        toolbar={['Search', 'ExcelExport']}
                        allowExcelExport={true}
                        width="auto"
                        toolbarClick={toolbarClick}
                        ref={g => grid = g}
                    >
                        <ColumnsDirective
                        >
                            <ColumnDirective field='full_name' width='100'  />
                            <ColumnDirective field='amount' width='100'  />
                            <ColumnDirective field='contact' width='100' />
                            <ColumnDirective field='gender' width='100' />
                            <ColumnDirective field='title' width='100' />
                        </ColumnsDirective>
                        <Inject services={[Page, Search, Toolbar, Edit, Sort, Filter, ExcelExport]} />
                    </GridComponent>
                </div>

            </div>
        </main>
    )
}

export default ViewData