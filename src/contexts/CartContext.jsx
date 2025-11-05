import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateCartTax } from '../utils/helpers';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [savedForLater, setSavedForLater] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [couponAmount, setCouponAmount] = useState(0);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    const savedLater = localStorage.getItem('savedForLater');
    const savedCoupon = localStorage.getItem('coupon');
    
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    if (savedLater) {
      setSavedForLater(JSON.parse(savedLater));
    }
    if (savedCoupon) {
      const parsed = JSON.parse(savedCoupon);
      setCouponCode(parsed.code || '');
      setCouponAmount(parsed.amount || 0);
    }

    // Sync cart across tabs
    const handleStorageChange = (e) => {
      if (e.key === 'cart') {
        setCartItems(JSON.parse(e.newValue || '[]'));
      }
      if (e.key === 'savedForLater') {
        setSavedForLater(JSON.parse(e.newValue || '[]'));
      }
      if (e.key === 'coupon') {
        const parsed = JSON.parse(e.newValue || '{}');
        setCouponCode(parsed.code || '');
        setCouponAmount(parsed.amount || 0);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('savedForLater', JSON.stringify(savedForLater));
  }, [savedForLater]);

  useEffect(() => {
    localStorage.setItem('coupon', JSON.stringify({ code: couponCode, amount: couponAmount }));
  }, [couponCode, couponAmount]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prevItems, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const moveToSavedForLater = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
      setSavedForLater(prev => [...prev, item]);
      removeFromCart(productId);
    }
  };

  const moveToCart = (productId) => {
    const item = savedForLater.find(item => item.id === productId);
    if (item) {
      addToCart(item, item.quantity);
      setSavedForLater(prev => prev.filter(i => i.id !== productId));
    }
  };

  const removeSavedForLater = (productId) => {
    setSavedForLater(prev => prev.filter(item => item.id !== productId));
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.discountPrice || item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const getTaxAmount = () => {
    // Calculate per-item GST based on category or item override
    return calculateCartTax(cartItems);
  };

  const getDeliveryCharge = () => {
    const total = getCartTotal();
    if (total >= 500) return 0; // Free delivery above ₹500
    return 40;
  };

  const getFinalTotal = () => {
    const total = getCartTotal() + getTaxAmount() + getDeliveryCharge();
    return Math.max(0, total - couponAmount);
  };

  const applyCoupon = (code) => {
    if (!code) return { ok: false, message: 'Enter a coupon code' };
    const normalized = String(code).trim().toLowerCase();
    if (normalized === 'jay0101') {
      // 10% off on subtotal, capped at ₹1000
      const subtotal = getCartTotal();
      const discount = Math.min(Math.round(subtotal * 0.10), 1000);
      if (discount <= 0) {
        setCouponCode('');
        setCouponAmount(0);
        return { ok: false, message: 'Cart is empty' };
      }
      setCouponCode('JAY0101');
      setCouponAmount(discount);
      return { ok: true, message: `Coupon applied: ₹${discount} off` };
    }
    return { ok: false, message: 'Invalid coupon code' };
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponAmount(0);
  };

  const value = {
    cartItems,
    savedForLater,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    moveToSavedForLater,
    moveToCart,
    removeSavedForLater,
    getCartTotal,
    getCartCount,
    getTaxAmount,
    getDeliveryCharge,
    getFinalTotal,
    couponCode,
    couponAmount,
    applyCoupon,
    removeCoupon
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
