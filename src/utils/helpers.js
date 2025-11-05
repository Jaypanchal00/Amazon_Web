export const formatPrice = (price, currency = 'INR') => {
  const symbols = {
    INR: '₹',
    USD: '$',
    EUR: '€'
  };
  
  return `${symbols[currency]}${price.toLocaleString('en-IN')}`;
};

export const calculateDiscount = (price, discountPrice) => {
  return Math.round(((price - discountPrice) / price) * 100);
};

export const formatDate = (date) => {
  const d = new Date(date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return d.toLocaleDateString('en-IN', options);
};

export const getDeliveryDate = (days = 2) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-IN', options);
};

export const generateOrderId = () => {
  return `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;
};

export const truncateText = (text, length = 100) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const fuzzySearch = (query, text) => {
  const pattern = query.toLowerCase().split('').join('.*');
  const regex = new RegExp(pattern);
  return regex.test(text.toLowerCase());
};

export const scrollToTop = (smooth = true) => {
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto'
  });
};

export const shareProduct = (product) => {
  if (navigator.share) {
    navigator.share({
      title: product.name,
      text: `Check out ${product.name} on Amazon Clone`,
      url: window.location.href
    });
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(window.location.href);
    return 'Link copied to clipboard!';
  }
};

export const downloadInvoice = (order) => {
  // Mock invoice download
  const invoiceData = `
    INVOICE
    Order ID: ${order.id}
    Date: ${formatDate(order.date)}
    
    Items:
    ${order.items.map(item => `${item.name} x ${item.quantity} - ${formatPrice(item.price)}`).join('\n')}
    
    Subtotal: ${formatPrice(order.subtotal)}
    Tax: ${formatPrice(order.tax)}
    Delivery: ${formatPrice(order.delivery)}
    Total: ${formatPrice(order.total)}
  `;
  
  const blob = new Blob([invoiceData], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `invoice-${order.id}.txt`;
  a.click();
};

export const getStockStatus = (stock) => {
  if (stock === 0) return { text: 'Out of Stock', color: '#B12704' };
  if (stock < 10) return { text: `Only ${stock} left`, color: '#B12704' };
  if (stock < 50) return { text: 'Limited Stock', color: '#FF9900' };
  return { text: 'In Stock', color: '#007600' };
};

export const calculateEMI = (price, months = 6) => {
  const interestRate = 0.12; // 12% annual
  const monthlyRate = interestRate / 12;
  const emi = (price * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
               (Math.pow(1 + monthlyRate, months) - 1);
  return Math.round(emi);
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[6-9]\d{9}$/;
  return re.test(phone);
};

export const validatePincode = (pincode) => {
  const re = /^[1-9][0-9]{5}$/;
  return re.test(pincode);
};

export const getRandomProducts = (products, count = 10) => {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const filterProducts = (products, filters) => {
  let filtered = [...products];

  if (filters.category) {
    filtered = filtered.filter(p => p.category === filters.category);
  }

  if (filters.priceRange) {
    filtered = filtered.filter(p => 
      p.discountPrice >= filters.priceRange[0] && 
      p.discountPrice <= filters.priceRange[1]
    );
  }

  if (filters.rating) {
    filtered = filtered.filter(p => p.rating >= filters.rating);
  }

  if (filters.brand && filters.brand.length > 0) {
    filtered = filtered.filter(p => filters.brand.includes(p.brand));
  }

  if (filters.isPrime) {
    filtered = filtered.filter(p => p.isPrime);
  }

  return filtered;
};

export const sortProducts = (products, sortBy) => {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.discountPrice - b.discountPrice);
    case 'price-high':
      return sorted.sort((a, b) => b.discountPrice - a.discountPrice);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return sorted.sort((a, b) => b.id - a.id);
    case 'popularity':
      return sorted.sort((a, b) => b.reviews - a.reviews);
    default:
      return sorted;
  }
};

// GST helpers
// Default GST rates by category. You can tweak these as per your business rules.
// Per-item override: add `gstRate` (number) on a product to override the category default.
export const GST_RATES_BY_CATEGORY = {
  'books': 3,
  'grocery': 3,
  'fashion': 12,
  'toys': 12,
  'sports': 12,
  'electronics': 18,
  'home-kitchen': 18,
  'beauty': 18,
  'furniture': 18,
  'automotive': 18
};

export const getProductGstRate = (product) => {
  if (!product) return 18;
  if (typeof product.gstRate === 'number') return product.gstRate; // explicit override
  const byCategory = GST_RATES_BY_CATEGORY[product.category];
  return typeof byCategory === 'number' ? byCategory : 18;
};

export const calculateItemTax = (item) => {
  const price = item.discountPrice || item.price || 0;
  const qty = item.quantity || 1;
  const rate = getProductGstRate(item);
  return (price * qty * rate) / 100;
};

export const calculateCartTax = (items = []) => {
  return items.reduce((sum, it) => sum + calculateItemTax(it), 0);
};
