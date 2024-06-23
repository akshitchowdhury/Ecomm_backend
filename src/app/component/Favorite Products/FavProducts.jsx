import React from 'react';

const FavProducts = ({ items }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map(product => (
          <div key={product._id} className="bg-white rounded-lg overflow-hidden shadow-lg">
            <img className="w-full h-48 object-cover" src={product.image} alt={product.title} />
            <div className="p-6">
              <h2 className="font-bold text-xl mb-2">{product.title}</h2>
              <p className="text-gray-700 text-base">{product.description}</p>
            </div>
            <div className="px-6 pb-4">
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{product.category}</span>
                {product.brand && (
                  <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{product.brand}</span>
                )}
                <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">${product.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavProducts;
