# 🛒 Amazon Clone - Full-Featured E-Commerce Platform

A comprehensive Amazon clone built with React.js featuring 100+ features including shopping cart, wishlist, checkout, user authentication, product search, filters, and much more!

![Amazon Clone](https://img.shields.io/badge/React-19.2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🏠 Core Features
- **Homepage** with dynamic sliders, product sections, and category banners
- **Product Listing** with search, filters, and sorting
- **Product Detail Page** with image carousel, reviews, and specifications
- **Shopping Cart** with quantity management and saved for later
- **Wishlist** functionality
- **Checkout Process** with address and payment options
- **User Authentication** (Login/Signup with JWT)
- **User Profile** with order history and address management
- **Product Ratings & Reviews** system
- **Search Bar** with auto-suggestions
- **Category Navigation** with dropdown menus
- **Responsive Design** (mobile, tablet, desktop)

### 🚀 Advanced Features
- **Voice Search** using Web Speech API
- **Product Recommendations** ("You might like")
- **Recently Viewed Items** section
- **Multi-Currency Support** (₹ INR / $ USD / € EUR)
- **Multi-Language Switcher** (English/Hindi)
- **Coupon/Discount Code** system
- **Stock Management** with low stock alerts
- **Product Comparison** feature
- **Order Tracking** with status timeline
- **Toast Notifications** for user actions
- **Dark/Light Theme** toggle
- **Infinite Scroll** in product pages
- **Product Quick View** popup
- **Delivery Date Estimation**
- **Address Book** (multiple addresses)
- **Gift Wrap Option** with message
- **EMI Options** calculator
- **Product Filtering** by brand, price, rating
- **Pagination & Lazy Loading**
- **Share Product** via social media
- **QR Code** for product sharing
- **Sticky Header** + Back to top button
- **Smart Search** with fuzzy matching
- **Trending Products** section
- **Limited Stock Progress Bar**
- **Personalized Recommendations** using localStorage
- **Related Categories** sections
- **Multi-tab Cart Sync** using localStorage events
- **Real-time Cart Badge** updates
- **Product Rating Histogram**
- **Review Sorting** (most recent/top)
- **Hover Preview** for product details
- **Newsletter Subscription**
- **Prime Membership** system
- **Download Invoice** button
- **Skeleton Loading UI**
- **404 & Error Pages**
- **SEO-friendly** structure

## 🛠️ Tech Stack

- **Frontend Framework:** React.js 19.2.0
- **Routing:** React Router DOM 6.22.0
- **State Management:** Context API
- **Styling:** Styled-components 6.1.8
- **HTTP Client:** Axios 1.6.7
- **Animations:** Framer Motion 11.0.5
- **Icons:** React Icons 5.0.1
- **Charts:** Chart.js 4.4.1 + React-Chartjs-2 5.2.0
- **QR Code:** qrcode.react 3.1.0
- **JWT:** jwt-decode 4.0.0
- **Date Handling:** date-fns 3.3.1

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/amazon-clone.git
cd amazon-clone
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Demo Login
You can use any email and password to login (mock authentication).

Example:
- Email: `user@example.com`
- Password: `password123`

### Available Coupons
- `SAVE10` - 10% off on orders above ₹500
- `FLAT200` - Flat ₹200 off on orders above ₹1000
- `PRIME50` - Flat ₹50 off for Prime members

## 📁 Project Structure

```
amazon-clone/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── ProductCard/
│   │   └── Notification/
│   ├── contexts/
│   │   ├── AuthContext.js
│   │   ├── CartContext.js
│   │   ├── WishlistContext.js
│   │   ├── ThemeContext.js
│   │   └── NotificationContext.js
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── ProductDetailPage.js
│   │   ├── CartPage.js
│   │   ├── CheckoutPage.js
│   │   ├── LoginPage.js
│   │   ├── SignupPage.js
│   │   ├── SearchPage.js
│   │   ├── CategoryPage.js
│   │   ├── WishlistPage.js
│   │   ├── OrdersPage.js
│   │   ├── ProfilePage.js
│   │   ├── OrderSuccessPage.js
│   │   └── NotFoundPage.js
│   ├── data/
│   │   └── mockData.js
│   ├── utils/
│   │   └── helpers.js
│   ├── styles/
│   │   └── GlobalStyles.js
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## 🎨 Features Breakdown

### Context API State Management
- **AuthContext** - User authentication and profile management
- **CartContext** - Shopping cart with localStorage persistence
- **WishlistContext** - Wishlist functionality
- **ThemeContext** - Dark/light mode, currency, and language
- **NotificationContext** - Toast notifications system

### Key Components
- **Navbar** - Sticky navigation with search, cart, wishlist badges
- **Footer** - Multi-column footer with links
- **ProductCard** - Reusable product display with hover effects
- **Toast** - Notification system for user feedback

### Pages
- **HomePage** - Hero banners, categories, deals, recommendations
- **ProductDetailPage** - Full product info, reviews, related products
- **CartPage** - Cart management with coupons
- **CheckoutPage** - Multi-step checkout process
- **SearchPage** - Advanced search with filters
- **ProfilePage** - User dashboard with tabs
- **OrdersPage** - Order history with filters

## 🌟 Key Highlights

### Performance Optimizations
- Lazy loading of pages using React.lazy()
- Image lazy loading
- Debounced search
- Memoized calculations
- Efficient re-renders with Context API

### User Experience
- Smooth animations with Framer Motion
- Loading skeletons
- Toast notifications
- Responsive design
- Intuitive navigation
- Voice search capability

### Data Persistence
- localStorage for cart (synced across tabs)
- localStorage for wishlist
- localStorage for user session
- localStorage for recently viewed
- localStorage for orders

## 🔧 Configuration

### Theme Customization
Edit `src/styles/GlobalStyles.js` to customize colors and styles.

### Mock Data
Edit `src/data/mockData.js` to add/modify products, categories, and deals.

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

## 🚀 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🧪 Testing

```bash
npm test
```

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Created with ❤️ by [Your Name]

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show your support

Give a ⭐️ if you like this project!

## 📸 Screenshots

### Homepage
![Homepage](screenshots/homepage.png)

### Product Detail
![Product Detail](screenshots/product-detail.png)

### Shopping Cart
![Cart](screenshots/cart.png)

### Checkout
![Checkout](screenshots/checkout.png)

## 🔮 Future Enhancements

- [ ] Admin Dashboard for product management
- [ ] Real-time chat support
- [ ] Product video gallery
- [ ] Social login (Google, Facebook)
- [ ] Email notifications
- [ ] Payment gateway integration
- [ ] Advanced analytics
- [ ] Product recommendations using AI
- [ ] Seller dashboard
- [ ] Multi-vendor support

## 📞 Support

For support, email support@example.com or join our Slack channel.

---

**Note:** This is a demo project for educational purposes. All product images and data are for demonstration only.
