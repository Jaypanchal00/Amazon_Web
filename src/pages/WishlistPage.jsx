import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { useNotification } from '../contexts/NotificationContext';
import { useTheme } from '../contexts/ThemeContext';

const WishlistPage = () => {
  const navigate = useNavigate();
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { success } = useNotification();
  const { formatPrice } = useTheme();

  const handleAddToCart = (item) => {
    addToCart(item);
    success('Added to cart!');
  };

  const handleRemove = (id) => {
    removeFromWishlist(id);
    success('Removed from wishlist');
  };

  if (wishlistItems.length === 0) {
    return (
      <EmptyWishlist>
        <EmptyIcon>❤️</EmptyIcon>
        <EmptyTitle>Your wishlist is empty</EmptyTitle>
        <EmptySubtitle>Save items you love for later</EmptySubtitle>
        <ShopButton onClick={() => navigate('/')}>
          Start Shopping
        </ShopButton>
      </EmptyWishlist>
    );
  }

  return (
    <Container>
      <Header>
        <Title>My Wishlist ({wishlistItems.length} items)</Title>
        <ClearButton onClick={clearWishlist}>Clear All</ClearButton>
      </Header>

      <ProductGrid>
        {wishlistItems.map(item => (
          <ProductCard key={item.id}>
            <ImageContainer onClick={() => navigate(`/product/${item.id}`)}>
              <ProductImage src={item.image} alt={item.name} />
              {item.discount > 0 && (
                <DiscountBadge>{item.discount}% OFF</DiscountBadge>
              )}
            </ImageContainer>

            <ProductInfo>
              <ProductName onClick={() => navigate(`/product/${item.id}`)}>
                {item.name}
              </ProductName>
              <Brand>{item.brand}</Brand>
              
              <Rating>
                ⭐ {item.rating} ({item.reviews.toLocaleString()} reviews)
              </Rating>

              <PriceContainer>
                <CurrentPrice>{formatPrice(item.discountPrice)}</CurrentPrice>
                {item.price !== item.discountPrice && (
                  <OriginalPrice>{formatPrice(item.price)}</OriginalPrice>
                )}
              </PriceContainer>

              {item.stock > 0 ? (
                <InStock>In Stock</InStock>
              ) : (
                <OutOfStock>Out of Stock</OutOfStock>
              )}

              <Actions>
                <AddToCartButton 
                  onClick={() => handleAddToCart(item)}
                  disabled={item.stock === 0}
                >
                  <FaShoppingCart /> Add to Cart
                </AddToCartButton>
                <RemoveButton onClick={() => handleRemove(item.id)}>
                  <FaTrash /> Remove
                </RemoveButton>
              </Actions>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background: var(--bg-secondary);
  padding: 20px;
`;

const Header = styled.div`
  max-width: 1500px;
  margin: 0 auto 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg-primary);
  padding: 20px;
  border-radius: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: var(--text-primary);

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const ClearButton = styled.button`
  padding: 10px 20px;
  background: transparent;
  color: var(--amazon-red);
  border: 1px solid var(--amazon-red);
  border-radius: 4px;
  font-weight: bold;

  &:hover {
    background: var(--amazon-red);
    color: white;
  }
`;

const ProductGrid = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const ProductCard = styled.div`
  background: var(--bg-primary);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-5px);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  background: var(--bg-secondary);
  cursor: pointer;
`;

const ProductImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 20px;
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

const ProductInfo = styled.div`
  padding: 15px;
`;

const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 5px;
  cursor: pointer;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  &:hover {
    color: var(--amazon-orange);
  }
`;

const Brand = styled.div`
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 8px;
`;

const Rating = styled.div`
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 10px;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
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

const InStock = styled.div`
  font-size: 14px;
  color: var(--amazon-green);
  font-weight: 600;
  margin-bottom: 15px;
`;

const OutOfStock = styled.div`
  font-size: 14px;
  color: var(--amazon-red);
  font-weight: 600;
  margin-bottom: 15px;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AddToCartButton = styled.button`
  padding: 10px;
  background: var(--amazon-yellow);
  color: var(--amazon-blue);
  border-radius: 4px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover:not(:disabled) {
    background: #f0c14b;
  }

  &:disabled {
    background: var(--border-light);
    color: var(--text-secondary);
  }

  svg {
    font-size: 16px;
  }
`;

const RemoveButton = styled.button`
  padding: 10px;
  background: transparent;
  color: var(--amazon-red);
  border: 1px solid var(--amazon-red);
  border-radius: 4px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: var(--amazon-red);
    color: white;
  }

  svg {
    font-size: 14px;
  }
`;

const EmptyWishlist = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;

const EmptyIcon = styled.div`
  font-size: 80px;
  margin-bottom: 20px;
`;

const EmptyTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 10px;
`;

const EmptySubtitle = styled.p`
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: 30px;
`;

const ShopButton = styled.button`
  padding: 15px 40px;
  background: var(--amazon-yellow);
  color: var(--amazon-blue);
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;

  &:hover {
    background: #f0c14b;
    transform: scale(1.05);
  }
`;

export default WishlistPage;
