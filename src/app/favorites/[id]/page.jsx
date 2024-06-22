"use client"

import FavProducts from '@/app/component/Favorite Products/FavProducts';
import React, { useState, useEffect } from 'react';

const FavoritesPage = ({ params }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFavProducts = async (id) => {
      try {
        const res = await fetch(`/api/getFav/${id}`, {
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error('Failed to fetch favorite products');
        }

        const data = await res.json();
        setProducts(data.favProducts.posts); // Access the posts array within favProducts
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (params?.id) {
      getFavProducts(params.id);
    } else {
      setError('Invalid ID');
      setLoading(false);
    }
  }, [params]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <FavProducts items={products} />
  );
};

export default FavoritesPage;
