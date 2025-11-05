import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaHeart, FaRegHeart, FaStar, FaShoppingCart } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useNotification } from '../../contexts/NotificationContext';
import { useTheme } from '../../contexts/ThemeContext';
import { getStockStatus } from '../../utils/helpers';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { success, warning } = useNotification();
  const { formatPrice: formatPriceWithCurrency } = useTheme();

  const inWishlist = isInWishlist(product.id);
  const stockStatus = getStockStatus(product.stock);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      warning('Please login to add items to cart');
      navigate('/login?redirect=' + window.location.pathname);
      return;
    }
    addToCart(product);
    success('Added to cart!');
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      warning('Please login to add items to wishlist');
      navigate('/login?redirect=' + window.location.pathname);
      return;
    }
    if (inWishlist) {
      removeFromWishlist(product.id);
      success('Removed from wishlist');
    } else {
      addToWishlist(product);
      success('Added to wishlist!');
    }
  };

  // Share functionality removed

  return (
    <Card
      as={motion.div}
      onClick={() => navigate(`/product/${product.id}`)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
    >
      <ImageContainer>
        <ProductImage src={product.image} alt={product.name} loading="lazy" />
        
        {product.discount > 0 && (
          <DiscountBadge>{product.discount}% OFF</DiscountBadge>
        )}
        
        {product.isPrime && (
          <PrimeBadge>Prime</PrimeBadge>
        )}

        <ActionButtons>
          <ActionButton onClick={handleWishlistToggle} $active={inWishlist}>
            {inWishlist ? <FaHeart /> : <FaRegHeart />}
          </ActionButton>
        </ActionButtons>
      </ImageContainer>

      <CardContent>
        <Brand>{product.brand}</Brand>
        <ProductName>{product.name}</ProductName>
        
        <Rating>
          <Stars>
            {[...Array(5)].map((_, i) => (
              <FaStar 
                key={i} 
                color={i < Math.floor(product.rating) ? '#FFA41C' : '#DDD'} 
              />
            ))}
            <RatingText>{product.rating}</RatingText>
          </Stars>
          <Reviews>({product.reviews.toLocaleString()})</Reviews>
        </Rating>

        <PriceContainer>
          <CurrentPrice>{formatPriceWithCurrency(product.discountPrice)}</CurrentPrice>
          {product.price !== product.discountPrice && (
            <OriginalPrice>{formatPriceWithCurrency(product.price)}</OriginalPrice>
          )}
        </PriceContainer>

        <StockStatus $color={stockStatus.color}>
          {stockStatus.text}
        </StockStatus>

        {product.stock > 0 && product.stock < 10 && (
          <StockProgress>
            <StockBar $width={(product.stock / 10) * 100} />
          </StockProgress>
        )}

        <DeliveryInfo>
          Get it by {new Date(Date.now() + product.deliveryDays * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
        </DeliveryInfo>

        <AddToCartButton onClick={handleAddToCart} disabled={product.stock === 0}>
          <FaShoppingCart /> Add to Cart
        </AddToCartButton>
      </CardContent>
    </Card>
  );
};

const Card = styled.div`
  background: var(--bg-primary);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  background: #F7F7F7;
  overflow: hidden;
`;

const ProductImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 10px;
  transition: transform 0.35s ease;

  ${Card}:hover & {
    transform: scale(1.06) translateY(-2px);
  }
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: var(--amazon-red);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
`;

const PrimeBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #00A8E1;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
`;

const ActionButtons = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const ActionButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  color: ${props => props.$active ? 'var(--amazon-red)' : 'var(--text-secondary)'};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  transition: transform 0.15s ease, background 0.2s ease, color 0.2s ease;

  &:hover {
    background: var(--amazon-orange);
    color: white;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    font-size: 18px;
  }
`;

const CardContent = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const Brand = styled.div`
  font-size: 12px;
  color: var(--text-secondary);
  text-transform: uppercase;
`;

const ProductName = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
  min-height: 40px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Stars = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;

  svg {
    font-size: 14px;
  }
`;

const RatingText = styled.span`
  font-size: 14px;
  color: var(--text-primary);
  margin-left: 5px;
`;

const Reviews = styled.span`
  font-size: 12px;
  color: var(--text-secondary);
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const CurrentPrice = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: var(--amazon-red);
`;

const OriginalPrice = styled.span`
  font-size: 14px;
  color: var(--text-secondary);
  text-decoration: line-through;
`;

const StockStatus = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.$color};
`;

const StockProgress = styled.div`
  width: 100%;
  height: 4px;
  background: var(--border-light);
  border-radius: 2px;
  overflow: hidden;
`;

const StockBar = styled.div`
  width: ${props => props.$width}%;
  height: 100%;
  background: var(--amazon-red);
  transition: width 0.3s ease;
`;

const DeliveryInfo = styled.div`
  font-size: 12px;
  color: var(--amazon-green);
  font-weight: 500;
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 10px;
  background: var(--amazon-yellow);
  color: var(--amazon-blue);
  border-radius: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: transform 0.15s ease, background 0.2s ease;
  margin-top: auto;

  &:hover:not(:disabled) {
    background: #f0c14b;
    transform: translateY(-1px) scale(1.02);
  }

  &:disabled {
    background: var(--border-light);
    color: var(--text-secondary);
  }

  svg {
    font-size: 16px;
  }
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export default ProductCard;
