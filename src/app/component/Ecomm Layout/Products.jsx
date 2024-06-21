"use client"

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

const Products = ({ userId }) => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [prodName, setProdName] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const totalLimit = 50; // Set the limit to the total number of products to fetch

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://dummyjson.com/products?limit=8&skip=${(page - 1) * 8}`, { method: "GET" });
      const data = await response.json();
      setProducts(prevProducts => [...prevProducts, ...data.products]);
      setDisplayedProducts(prevDisplayed => [...prevDisplayed, ...data.products]);
      setLoading(false);

      // Check if the total fetched products exceed the limit
      if (data.products.length < 8 || products.length + data.products.length >= totalLimit) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasMore) {
      fetchProducts();
    }
  }, [page, hasMore]);

  useEffect(() => {
    if (inView && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  }, [inView, hasMore]);

  useEffect(() => {
    if (prodName === "") {
      setDisplayedProducts(products.slice(0, page * 8));
    } else {
      setDisplayedProducts(
        products.filter(product =>
          product.title.toLowerCase().includes(prodName.toLowerCase())
        )
      );
    }
  }, [prodName, products, page]);

  const toggleFavorite = async (product) => {
    const isFavorited = favorites.includes(product.id);

    if (isFavorited) {
      setFavorites(favorites.filter(fav => fav !== product.id));
    } else {
      setFavorites([...favorites, product.id]);

      console.log({
        userId,
        
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        brand: product.brand,
        images: product.images,
      });
      // Post favorite product details to the database
      try {
        const response = await fetch('http://localhost:3000/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            
            title: product.title,
            description: product.description,
            category: product.category,
            price: product.price,
            brand: product.brand,
            images: product.images,
          }),
        });

        const result = await response.json();
        if (!result.success) {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Error favoriting product:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search product name"
          value={prodName}
          onChange={(e) => setProdName(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {displayedProducts.map((item, index) => (
          <div key={index} className="border rounded shadow p-4 flex flex-col items-center">
            
              <a className="w-full">
                <img src={item.images[0]} alt={item.title} className="h-48 w-full object-contain mb-4" />
                <h1 className="text-lg font-semibold mb-2">{item.title}</h1>
                <p className="text-green-600 font-bold">${item.price}</p>
                <p className="text-black font-bold">{item.category}</p>
                <p className="text-black font-semibold">{item.description}</p>
                <p className="text-zinc-800 font-bold">{item.brand}</p>
                <p className="text-black font-bold">{item.id}</p>
              </a>
            
            <button
              onClick={() => toggleFavorite(item)}
              className={`mt-2 px-4 py-2 rounded ${
                favorites.includes(item.id) ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {favorites.includes(item.id) ? 'Favorited' : 'Add to Favorites'}
            </button>
          </div>
        ))}
      </div>
      {loading && <h1>Loading....</h1>}
      {!loading && hasMore && <div ref={ref}></div>}
    </div>
  );
};

export default Products;
