export const categories = [
  { id: 1, name: 'Electronics', icon: '📱', slug: 'electronics' },
  { id: 2, name: 'Fashion', icon: '👗', slug: 'fashion' },
  { id: 3, name: 'Home & Kitchen', icon: '🏠', slug: 'home-kitchen' },
  { id: 4, name: 'Books', icon: '📚', slug: 'books' },
  { id: 5, name: 'Beauty', icon: '💄', slug: 'beauty' },
  { id: 6, name: 'Sports', icon: '⚽', slug: 'sports' },
  { id: 7, name: 'Toys', icon: '🧸', slug: 'toys' },
  { id: 8, name: 'Grocery', icon: '🛒', slug: 'grocery' },
  { id: 9, name: 'Furniture', icon: '🛋️', slug: 'furniture' },
  { id: 10, name: 'Automotive', icon: '🚗', slug: 'automotive' }
];

export const products = [
  // Electronics
  {
    id: 1,
    name: 'Samsung Galaxy S24 Ultra',
    category: 'electronics',
    subcategory: 'Smartphones',
    brand: 'Samsung',
    price: 124999,
    discountPrice: 109999,
    discount: 12,
    rating: 4.5,
    reviews: 2847,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
      'https://images.unsplash.com/photo-1592286927505-c0d6c9a07a95?w=500'
    ],
    description: 'Latest flagship smartphone with AI features, 200MP camera, and S Pen',
    features: ['200MP Camera', 'S Pen Included', '5000mAh Battery', '12GB RAM', '256GB Storage'],
    stock: 45,
    seller: 'Amazon Retail',
    deliveryDays: 2,
    isPrime: true,
    emi: true,
    returnable: true,
    warranty: '1 Year',
    specifications: {
      'Display': '6.8" Dynamic AMOLED 2X',
      'Processor': 'Snapdragon 8 Gen 3',
      'RAM': '12GB',
      'Storage': '256GB',
      'Battery': '5000mAh'
    }
  },
  {
    id: 2,
    name: 'Apple MacBook Pro 14"',
    category: 'electronics',
    subcategory: 'Laptops',
    brand: 'Apple',
    price: 199900,
    discountPrice: 189900,
    discount: 5,
    rating: 4.8,
    reviews: 1523,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500'
    ],
    description: 'M3 Pro chip with 14-core CPU, 18-core GPU, and up to 22 hours battery life',
    features: ['M3 Pro Chip', '16GB RAM', '512GB SSD', 'Liquid Retina XDR Display', 'Touch ID'],
    stock: 23,
    seller: 'Apple Store',
    deliveryDays: 3,
    isPrime: true,
    emi: true,
    returnable: true,
    warranty: '1 Year',
    specifications: {
      'Processor': 'Apple M3 Pro',
      'RAM': '16GB',
      'Storage': '512GB SSD',
      'Display': '14.2" Liquid Retina XDR',
      'Weight': '1.6 kg'
    }
  },
  {
    id: 3,
    name: 'Sony WH-1000XM5 Headphones',
    category: 'electronics',
    subcategory: 'Audio',
    brand: 'Sony',
    price: 29990,
    discountPrice: 24990,
    discount: 17,
    rating: 4.6,
    reviews: 3421,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500',
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500'
    ],
    description: 'Industry-leading noise cancellation with premium sound quality',
    features: ['Active Noise Cancellation', '30 Hours Battery', 'Multipoint Connection', 'Touch Controls'],
    stock: 67,
    seller: 'Sony Official',
    deliveryDays: 1,
    isPrime: true,
    emi: true,
    returnable: true,
    warranty: '1 Year'
  },
  {
    id: 4,
    name: 'LG 55" 4K OLED Smart TV',
    category: 'electronics',
    subcategory: 'Television',
    brand: 'LG',
    price: 149990,
    discountPrice: 129990,
    discount: 13,
    rating: 4.7,
    reviews: 892,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500',
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500'
    ],
    description: 'Self-lit OLED pixels for perfect black and infinite contrast',
    features: ['4K OLED Display', 'Dolby Vision IQ', 'AI ThinQ', 'webOS Smart TV', 'HDMI 2.1'],
    stock: 15,
    seller: 'LG Electronics',
    deliveryDays: 4,
    isPrime: false,
    emi: true,
    returnable: true,
    warranty: '2 Years'
  },
  {
    id: 5,
    name: 'Canon EOS R6 Mark II',
    category: 'electronics',
    subcategory: 'Cameras',
    brand: 'Canon',
    price: 239990,
    discountPrice: 229990,
    discount: 4,
    rating: 4.9,
    reviews: 456,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500'
    ],
    description: 'Full-frame mirrorless camera with 24.2MP sensor and advanced autofocus',
    features: ['24.2MP Full Frame', '40fps Continuous Shooting', '6K Video', 'In-Body Stabilization'],
    stock: 8,
    seller: 'Canon India',
    deliveryDays: 5,
    isPrime: false,
    emi: true,
    returnable: true,
    warranty: '2 Years'
  },

  // Fashion
  {
    id: 6,
    name: 'Levi\'s Men\'s 511 Slim Fit Jeans',
    category: 'fashion',
    subcategory: 'Men\'s Clothing',
    brand: 'Levi\'s',
    price: 3999,
    discountPrice: 2399,
    discount: 40,
    rating: 4.3,
    reviews: 5678,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500'
    ],
    description: 'Classic slim fit jeans with stretch comfort',
    features: ['Slim Fit', 'Stretch Fabric', 'Classic 5-Pocket Design', 'Machine Washable'],
    stock: 234,
    seller: 'Levi\'s Store',
    deliveryDays: 2,
    isPrime: true,
    emi: false,
    returnable: true,
    warranty: 'N/A',
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: ['Blue', 'Black', 'Grey']
  },
  {
    id: 7,
    name: 'Nike Air Max 270 Sneakers',
    category: 'fashion',
    subcategory: 'Footwear',
    brand: 'Nike',
    price: 12995,
    discountPrice: 9995,
    discount: 23,
    rating: 4.5,
    reviews: 3421,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'
    ],
    description: 'Iconic Air Max cushioning with modern style',
    features: ['Air Max Cushioning', 'Breathable Mesh', 'Rubber Outsole', 'Padded Collar'],
    stock: 156,
    seller: 'Nike Official',
    deliveryDays: 3,
    isPrime: true,
    emi: false,
    returnable: true,
    warranty: '6 Months',
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['White', 'Black', 'Red']
  },
  {
    id: 8,
    name: 'Fossil Gen 6 Smartwatch',
    category: 'fashion',
    subcategory: 'Watches',
    brand: 'Fossil',
    price: 24995,
    discountPrice: 19995,
    discount: 20,
    rating: 4.2,
    reviews: 1234,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
    ],
    description: 'Wear OS smartwatch with health tracking and customizable dials',
    features: ['Wear OS', 'Heart Rate Monitor', 'GPS', 'Water Resistant', 'Fast Charging'],
    stock: 89,
    seller: 'Fossil Store',
    deliveryDays: 2,
    isPrime: true,
    emi: true,
    returnable: true,
    warranty: '2 Years'
  },

  // Home & Kitchen
  {
    id: 9,
    name: 'Philips Air Fryer XXL',
    category: 'home-kitchen',
    subcategory: 'Kitchen Appliances',
    brand: 'Philips',
    price: 19995,
    discountPrice: 14995,
    discount: 25,
    rating: 4.6,
    reviews: 4567,
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=500',
    images: [
      'https://images.unsplash.com/photo-1585515320310-259814833e62?w=500'
    ],
    description: 'Extra-large air fryer with Rapid Air technology for healthier cooking',
    features: ['7.3L Capacity', 'Digital Display', 'Dishwasher Safe', '7 Pre-set Programs'],
    stock: 78,
    seller: 'Philips Official',
    deliveryDays: 3,
    isPrime: true,
    emi: true,
    returnable: true,
    warranty: '2 Years'
  },
  {
    id: 10,
    name: 'Dyson V15 Detect Vacuum Cleaner',
    category: 'home-kitchen',
    subcategory: 'Home Appliances',
    brand: 'Dyson',
    price: 64900,
    discountPrice: 59900,
    discount: 8,
    rating: 4.8,
    reviews: 892,
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500',
    images: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500'
    ],
    description: 'Cordless vacuum with laser dust detection and LCD screen',
    features: ['Laser Detection', 'LCD Screen', '60 Min Runtime', 'HEPA Filtration', 'Cordless'],
    stock: 34,
    seller: 'Dyson Store',
    deliveryDays: 4,
    isPrime: false,
    emi: true,
    returnable: true,
    warranty: '2 Years'
  },

  // Books
  {
    id: 11,
    name: 'Atomic Habits by James Clear',
    category: 'books',
    subcategory: 'Self-Help',
    brand: 'Penguin Random House',
    price: 599,
    discountPrice: 299,
    discount: 50,
    rating: 4.7,
    reviews: 12456,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500'
    ],
    description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones',
    features: ['Paperback', '320 Pages', 'English', 'Bestseller'],
    stock: 567,
    seller: 'Amazon Books',
    deliveryDays: 2,
    isPrime: true,
    emi: false,
    returnable: true,
    warranty: 'N/A'
  },
  {
    id: 12,
    name: 'The Psychology of Money',
    category: 'books',
    subcategory: 'Finance',
    brand: 'Jaico Publishing',
    price: 450,
    discountPrice: 225,
    discount: 50,
    rating: 4.6,
    reviews: 8934,
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=500',
    images: [
      'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=500'
    ],
    description: 'Timeless lessons on wealth, greed, and happiness',
    features: ['Paperback', '256 Pages', 'English', 'Bestseller'],
    stock: 423,
    seller: 'Amazon Books',
    deliveryDays: 2,
    isPrime: true,
    emi: false,
    returnable: true,
    warranty: 'N/A'
  },

  // Beauty
  {
    id: 13,
    name: 'Lakme Absolute Matte Lipstick',
    category: 'beauty',
    subcategory: 'Makeup',
    brand: 'Lakme',
    price: 650,
    discountPrice: 455,
    discount: 30,
    rating: 4.3,
    reviews: 6789,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500',
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500'
    ],
    description: 'Long-lasting matte finish lipstick with rich color',
    features: ['Matte Finish', 'Long Lasting', 'Enriched with Vitamin E', 'Multiple Shades'],
    stock: 234,
    seller: 'Lakme Official',
    deliveryDays: 2,
    isPrime: true,
    emi: false,
    returnable: true,
    warranty: 'N/A',
    colors: ['Red', 'Pink', 'Nude', 'Coral']
  },
  {
    id: 14,
    name: 'Neutrogena Hydro Boost Water Gel',
    category: 'beauty',
    subcategory: 'Skincare',
    brand: 'Neutrogena',
    price: 899,
    discountPrice: 629,
    discount: 30,
    rating: 4.5,
    reviews: 4567,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500'
    ],
    description: 'Oil-free moisturizer with hyaluronic acid for hydrated skin',
    features: ['Hyaluronic Acid', 'Oil-Free', 'Non-Comedogenic', '50g'],
    stock: 345,
    seller: 'Neutrogena Store',
    deliveryDays: 2,
    isPrime: true,
    emi: false,
    returnable: true,
    warranty: 'N/A'
  },

  // Sports
  {
    id: 15,
    name: 'Yonex Badminton Racket',
    category: 'sports',
    subcategory: 'Badminton',
    brand: 'Yonex',
    price: 8999,
    discountPrice: 6999,
    discount: 22,
    rating: 4.6,
    reviews: 1234,
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500',
    images: [
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500'
    ],
    description: 'Professional badminton racket with carbon fiber frame',
    features: ['Carbon Fiber', 'Lightweight', 'High Tension', 'With Cover'],
    stock: 89,
    seller: 'Yonex Official',
    deliveryDays: 3,
    isPrime: true,
    emi: false,
    returnable: true,
    warranty: '6 Months'
  },

  // More products to reach 50+
  {
    id: 16,
    name: 'Boat Airdopes 141 TWS Earbuds',
    category: 'electronics',
    subcategory: 'Audio',
    brand: 'Boat',
    price: 2999,
    discountPrice: 1299,
    discount: 57,
    rating: 4.1,
    reviews: 45678,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500'
    ],
    description: 'True wireless earbuds with 42 hours playback',
    features: ['42H Playback', 'ENx Technology', 'IPX4', 'Low Latency'],
    stock: 567,
    seller: 'Boat Official',
    deliveryDays: 1,
    isPrime: true,
    emi: false,
    returnable: true,
    warranty: '1 Year'
  },
  {
    id: 17,
    name: 'Fire-Boltt Phoenix Smart Watch',
    category: 'electronics',
    subcategory: 'Wearables',
    brand: 'Fire-Boltt',
    price: 4999,
    discountPrice: 1799,
    discount: 64,
    rating: 4.0,
    reviews: 23456,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500',
    images: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500'
    ],
    description: 'Bluetooth calling smartwatch with 1.3" display',
    features: ['Bluetooth Calling', 'SpO2 Monitor', '7 Days Battery', '120+ Sports Modes'],
    stock: 789,
    seller: 'Fire-Boltt Store',
    deliveryDays: 2,
    isPrime: true,
    emi: false,
    returnable: true,
    warranty: '1 Year'
  },
  {
    id: 18,
    name: 'HP DeskJet 2820e Printer',
    category: 'electronics',
    subcategory: 'Printers',
    brand: 'HP',
    price: 8999,
    discountPrice: 4999,
    discount: 44,
    rating: 4.2,
    reviews: 3456,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500',
    images: [
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500'
    ],
    description: 'All-in-one wireless printer with 6 months Instant Ink',
    features: ['Print, Scan, Copy', 'Wireless', 'HP Smart App', '6 Months Ink'],
    stock: 145,
    seller: 'HP Store',
    deliveryDays: 3,
    isPrime: true,
    emi: false,
    returnable: true,
    warranty: '1 Year'
  },
  {
    id: 19,
    name: 'Logitech MX Master 3S Mouse',
    category: 'electronics',
    subcategory: 'Accessories',
    brand: 'Logitech',
    price: 10995,
    discountPrice: 8995,
    discount: 18,
    rating: 4.7,
    reviews: 2345,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500'
    ],
    description: 'Advanced wireless mouse with 8K DPI sensor',
    features: ['8K DPI', 'Quiet Clicks', 'Multi-Device', 'USB-C Charging'],
    stock: 234,
    seller: 'Logitech Official',
    deliveryDays: 2,
    isPrime: true,
    emi: false,
    returnable: true,
    warranty: '1 Year'
  },
  {
    id: 20,
    name: 'Kindle Paperwhite (11th Gen)',
    category: 'electronics',
    subcategory: 'E-Readers',
    brand: 'Amazon',
    price: 14999,
    discountPrice: 12999,
    discount: 13,
    rating: 4.6,
    reviews: 5678,
    image: 'https://images.unsplash.com/photo-1592496001020-d31bd830651f?w=500',
    images: [
      'https://images.unsplash.com/photo-1592496001020-d31bd830651f?w=500'
    ],
    description: '6.8" display with adjustable warm light and weeks of battery life',
    features: ['6.8" Display', 'Waterproof', 'Adjustable Warm Light', '16GB Storage'],
    stock: 123,
    seller: 'Amazon Devices',
    deliveryDays: 1,
    isPrime: true,
    emi: true,
    returnable: true,
    warranty: '1 Year'
  }
];

// Generate more products programmatically
for (let i = 21; i <= 100; i++) {
  const categoryIndex = i % categories.length;
  const category = categories[categoryIndex];
  
  products.push({
    id: i,
    name: `${category.name} Product ${i}`,
    category: category.slug,
    subcategory: 'General',
    brand: `Brand ${i % 10 + 1}`,
    price: Math.floor(Math.random() * 50000) + 500,
    discountPrice: Math.floor(Math.random() * 40000) + 400,
    discount: Math.floor(Math.random() * 70) + 5,
    rating: Number((Math.random() * 2 + 3).toFixed(1)),
    reviews: Math.floor(Math.random() * 10000) + 100,
    // Use seeded Picsum images to guarantee uniqueness and reliability
    // Seed includes category to vary visuals by category as well
    image: `https://picsum.photos/seed/${encodeURIComponent(category.slug)}-${i}/500/500`,
    images: [
      `https://picsum.photos/seed/${encodeURIComponent(category.slug)}-${i}/500/500`,
      `https://picsum.photos/seed/${encodeURIComponent(category.slug)}-${i}-2/500/500`
    ],
    description: `High-quality ${category.name} product with amazing features`,
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
    stock: Math.floor(Math.random() * 500) + 10,
    seller: `Seller ${i % 20 + 1}`,
    deliveryDays: Math.floor(Math.random() * 5) + 1,
    isPrime: Math.random() > 0.3,
    emi: Math.random() > 0.5,
    returnable: true,
    warranty: Math.random() > 0.5 ? '1 Year' : '6 Months'
  });
}

export const banners = [
  {
    id: 1,
    title: 'Great Indian Festival',
    subtitle: 'Up to 80% off on Electronics',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200',
    link: '/deals',
    color: '#FF9900'
  },
  {
    id: 2,
    title: 'Fashion Sale',
    subtitle: 'Trending styles at best prices',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
    link: '/fashion',
    color: '#232F3E'
  },
  {
    id: 3,
    title: 'Home Makeover',
    subtitle: 'Transform your space',
    image: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=1200',
    link: '/home-kitchen',
    color: '#37475A'
  },
  {
    id: 4,
    title: 'Prime Day Deals',
    subtitle: 'Exclusive offers for Prime members',
    image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=1200',
    link: '/prime-deals',
    color: '#00A8E1'
  }
];

export const deals = [
  {
    id: 1,
    title: 'Deal of the Day',
    products: products.slice(0, 6),
    endsIn: new Date(Date.now() + 24 * 60 * 60 * 1000)
  },
  {
    id: 2,
    title: 'Lightning Deals',
    products: products.slice(6, 12),
    endsIn: new Date(Date.now() + 6 * 60 * 60 * 1000)
  }
];

export const reviews = [
  {
    id: 1,
    productId: 1,
    userId: 1,
    userName: 'Rahul Sharma',
    rating: 5,
    title: 'Excellent phone!',
    comment: 'Best smartphone I have ever used. Camera quality is outstanding.',
    date: '2024-09-15',
    helpful: 234,
    verified: true,
    images: []
  },
  {
    id: 2,
    productId: 1,
    userId: 2,
    userName: 'Priya Singh',
    rating: 4,
    title: 'Good but expensive',
    comment: 'Great features but a bit pricey. Overall satisfied with the purchase.',
    date: '2024-09-20',
    helpful: 89,
    verified: true,
    images: []
  }
];

