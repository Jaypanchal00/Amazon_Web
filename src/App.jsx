import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Toast from './components/Notification/Toast';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { AnimatePresence, motion } from 'framer-motion';

const HomePage = lazy(() => import('./pages/HomePage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const OrderSuccessPage = lazy(() => import('./pages/OrderSuccessPage'));


const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    fontSize: '24px',
    color: 'var(--text-primary)'
  }}>
    Loading...
  </div>
);

function RoutesWithLayout() {
  const location = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <Suspense fallback={<LoadingFallback />}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              } />
              <Route path="/checkout" element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              } />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/wishlist" element={
                <ProtectedRoute>
                  <WishlistPage />
                </ProtectedRoute>
              } />
              <Route path="/orders" element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              <Route path="/order-success/:orderId" element={
                <ProtectedRoute>
                  <OrderSuccessPage />
                </ProtectedRoute>
              } />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </Suspense>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <NotificationProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <GlobalStyles />
                <Toast />
                
                <Routes>
                  {/* Routes without Navbar/Footer */}
                  <Route path="/login" element={
                    <Suspense fallback={<LoadingFallback />}>
                      <LoginPage />
                    </Suspense>
                  } />
                  <Route path="/signup" element={
                    <Suspense fallback={<LoadingFallback />}>
                      <SignupPage />
                    </Suspense>
                  } />

                  {/* Routes with Navbar/Footer */}
                  <Route path="/*" element={<RoutesWithLayout />} />
                </Routes>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </NotificationProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
