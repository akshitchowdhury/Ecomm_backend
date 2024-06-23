
import React from 'react';
const FavProducts = ({ items }) => {
  
  return (
    <>
    
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(product => (
        <div key={product._id} className="max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full" src={product.image} alt={product.title} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{product.title}</div>
            <p className="text-gray-700 text-base">{product.description}</p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{product.category}</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{product.brand}</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${product.price}</span>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default FavProducts;
