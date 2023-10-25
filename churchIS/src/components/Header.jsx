import React from 'react';


const Header = ({category, title}) => {
  return (
    <div className='mb-10'>
      <p className='text-gray-400'>
        {category}
      </p>

    <p className='text-xl font-bold tracking-tight text-slate-900 dark:text-gray-200'>{title}</p>
    </div>
  )
}

export default Header