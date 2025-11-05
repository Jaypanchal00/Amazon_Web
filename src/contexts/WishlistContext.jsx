import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    setWishlistItems(prevItems => {
      const exists = prevItems.find(item => item.id === product.id);
      if (exists) return prevItems;
      return [...prevItems, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    wishlistCount: wishlistItems.length
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};
