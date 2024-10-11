import React from 'react';
import Items from './Items';
import { PRODUCTS, RESOURCES, COMPANY, SUPPORT } from './Menus';

const ItemsContainer = () => {
  return (
    <div className='flex justify-center items-center h-full'>
      <div className='sm:grid-cols-3 gap-1 sm:px-8 py-10 text-center'>
        <Items Links={PRODUCTS} />
        <Items Links={RESOURCES} />
        <Items Links={COMPANY} />
        <Items Links={SUPPORT} />
      </div>
    </div>
  );
};

export default ItemsContainer;
