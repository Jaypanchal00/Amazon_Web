import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaTrash, FaHeart } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useNotification } from '../contexts/NotificationContext';
import { useTheme } from '../contexts/ThemeContext';
import { getProductGstRate, calculateItemTax } from '../utils/helpers';

const CartPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { 
    cartItems, 
    savedForLater,
    updateQuantity, 
    removeFromCart, 
    moveToSavedForLater,
    moveToCart,
    removeSavedForLater,
    getCartTotal,
    getTaxAmount,
    getDeliveryCharge,
    getFinalTotal,
    couponCode,
    couponAmount,
    applyCoupon,
    removeCoupon
  } = useCart();
  const { addToWishlist } = useWishlist();
  const { success, warning } = useNotification();
  const { formatPrice } = useTheme();

  const [couponInput, setCouponInput] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/cart');
    }
  }, [isAuthenticated, navigate]);

  const finalTotal = getFinalTotal();

  if (cartItems.length === 0 && savedForLater.length === 0) {
    return (
      <EmptyCart>
        <EmptyIcon>🛒</EmptyIcon>
        <EmptyTitle>Your cart is empty</EmptyTitle>
        <EmptySubtitle>Add items to get started</EmptySubtitle>
        <ShopButton onClick={() => navigate('/')}>
          Continue Shopping
        </ShopButton>
      </EmptyCart>
    );
  }

  return (
    <Container>
      <Content>
        <CartSection>
          {cartItems.length > 0 && (
            <>
              <SectionHeader>
                <SectionTitle>Shopping Cart</SectionTitle>
                <ItemCount>{cartItems.length} items</ItemCount>
              </SectionHeader>

              {cartItems.map(item => (
                <CartItem key={item.id}>
                  <ItemImage onClick={() => navigate(`/product/${item.id}`)}>
                    <img src={item.image} alt={item.name} />
                  </ItemImage>

                  <ItemDetails>
                    <ItemName onClick={() => navigate(`/product/${item.id}`)}>
                      {item.name}
                    </ItemName>
                    <ItemBrand>{item.brand}</ItemBrand>
                    {item.category && (
                      <ItemCategory>Category: {item.category.charAt(0).toUpperCase() + item.category.slice(1).replace('-', ' & ')}</ItemCategory>
                    )}
                    
                    {item.stock > 0 ? (
                      <InStock>In Stock</InStock>
                    ) : (
                      <OutOfStock>Out of Stock</OutOfStock>
                    )}

                    {item.isPrime && <PrimeBadge>Prime</PrimeBadge>}

                    <ItemActions>
                      <QuantitySelector>
                        <QuantityLabel>Qty:</QuantityLabel>
                        <select 
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                          ))}
                        </select>
                      </QuantitySelector>

                      <ActionButton onClick={() => {
                        removeFromCart(item.id);
                        success('Removed from cart');
                      }}>
                        <FaTrash /> Delete
                      </ActionButton>

                      <ActionButton onClick={() => {
                        moveToSavedForLater(item.id);
                        success('Moved to saved for later');
                      }}>
                        Save for later
                      </ActionButton>

                      <ActionButton onClick={() => {
                        addToWishlist(item);
                        success('Added to wishlist');
                      }}>
                        <FaHeart /> Add to Wishlist
                      </ActionButton>
                    </ItemActions>
                  </ItemDetails>

                  <ItemPrice>
                    <CurrentPrice>{formatPrice(item.discountPrice)}</CurrentPrice>
                    {item.price !== item.discountPrice && (
                      <OriginalPrice>{formatPrice(item.price)}</OriginalPrice>
                    )}
                    <ItemTotal>
                      Subtotal: {formatPrice(item.discountPrice * item.quantity)}
                    </ItemTotal>
                    <ItemGst>
                      GST @ {getProductGstRate(item)}%: {formatPrice(calculateItemTax(item))}
                    </ItemGst>
                  </ItemPrice>
                </CartItem>
              ))}
            </>
          )}

          {savedForLater.length > 0 && (
            <>
              <SectionHeader style={{ marginTop: '40px' }}>
                <SectionTitle>Saved for Later</SectionTitle>
                <ItemCount>{savedForLater.length} items</ItemCount>
              </SectionHeader>

              {savedForLater.map(item => (
                <CartItem key={item.id}>
                  <ItemImage onClick={() => navigate(`/product/${item.id}`)}>
                    <img src={item.image} alt={item.name} />
                  </ItemImage>

                  <ItemDetails>
                    <ItemName onClick={() => navigate(`/product/${item.id}`)}>
                      {item.name}
                    </ItemName>
                    <ItemBrand>{item.brand}</ItemBrand>
                    {item.category && (
                      <ItemCategory>Category: {item.category.charAt(0).toUpperCase() + item.category.slice(1).replace('-', ' & ')}</ItemCategory>
                    )}
                    <CurrentPrice>{formatPrice(item.discountPrice)}</CurrentPrice>

                    <ItemActions>
                      <ActionButton onClick={() => {
                        moveToCart(item.id);
                        success('Moved to cart');
                      }}>
                        Move to Cart
                      </ActionButton>

                      <ActionButton onClick={() => {
                        removeSavedForLater(item.id);
                        success('Removed from saved for later');
                      }}>
                        <FaTrash /> Delete
                      </ActionButton>
                    </ItemActions>
                  </ItemDetails>
                </CartItem>
              ))}
            </>
          )}
        </CartSection>

        {cartItems.length > 0 && (
          <SummarySection>
            <SummaryCard>
              <SummaryTitle>Order Summary</SummaryTitle>

              <SummaryRow>
                <span>Subtotal ({cartItems.length} items):</span>
                <span>{formatPrice(getCartTotal())}</span>
              </SummaryRow>

              <SummaryRow>
                <span>Delivery Charges:</span>
                <span $green={getDeliveryCharge() === 0}>
                  {getDeliveryCharge() === 0 ? 'FREE' : formatPrice(getDeliveryCharge())}
                </span>
              </SummaryRow>

              <SummaryRow>
                <span>Tax (GST):</span>
                <span>{formatPrice(getTaxAmount())}</span>
              </SummaryRow>

              <CouponContainer>
                {couponCode ? (
                  <AppliedCoupon>
                    <span>Applied: {couponCode}</span>
                    <RemoveCouponButton onClick={() => {
                      removeCoupon();
                      success('Coupon removed');
                    }}>Remove</RemoveCouponButton>
                  </AppliedCoupon>
                ) : (
                  <CouponForm onSubmit={(e) => {
                    e.preventDefault();
                    const { ok, message } = applyCoupon(couponInput);
                    if (ok) {
                      success(message);
                      setCouponInput('');
                    } else {
                      warning(message);
                    }
                  }}>
                    <CouponInput
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                    />
                    <CouponButton type="submit">Apply</CouponButton>
                  </CouponForm>
                )}
              </CouponContainer>

              {couponAmount > 0 && (
                <SummaryRow $discount>
                  <span>Coupon Discount{couponCode ? ` (${couponCode})` : ''}:</span>
                  <span>-{formatPrice(couponAmount)}</span>
                </SummaryRow>
              )}

              <Divider />

              <TotalRow>
                <span>Order Total:</span>
                <span>{formatPrice(finalTotal)}</span>
              </TotalRow>

              <CheckoutButton onClick={() => navigate('/checkout')}>
                Proceed to Checkout
              </CheckoutButton>

              <SecurityNote>
                🔒 Secure checkout - Your data is protected
              </SecurityNote>
            </SummaryCard>

            <BenefitsCard>
              <BenefitItem>✓ Free delivery on orders above ₹500</BenefitItem>
              <BenefitItem>✓ 7 days return policy</BenefitItem>
              <BenefitItem>✓ Secure payments</BenefitItem>
              <BenefitItem>✓ 100% genuine products</BenefitItem>
            </BenefitsCard>
          </SummarySection>
        )}

      </Content>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background: var(--bg-secondary);
  padding: 20px;
`;

const Content = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const CartSection = styled.div`
  background: var(--bg-primary);
  border-radius: 8px;
  padding: 20px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--border-light);
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: var(--text-primary);
`;

const ItemCount = styled.span`
  font-size: 16px;
  color: var(--text-secondary);
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr auto;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid var(--border-light);

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 100px 1fr;
    gap: 15px;
  }
`;

const ItemImage = styled.div`
  width: 150px;
  height: 150px;
  background: var(--bg-secondary);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 10px;
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ItemName = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: var(--text-primary);
  cursor: pointer;

  &:hover {
    color: var(--amazon-orange);
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ItemBrand = styled.span`
  font-size: 14px;
  color: var(--text-secondary);
`;

const ItemCategory = styled.span`
  font-size: 13px;
  color: var(--text-secondary);
  font-style: italic;
`;

const InStock = styled.span`
  font-size: 14px;
  color: var(--amazon-green);
  font-weight: 600;
`;

const OutOfStock = styled.span`
  font-size: 14px;
  color: var(--amazon-red);
  font-weight: 600;
`;

const PrimeBadge = styled.span`
  display: inline-block;
  background: #00A8E1;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  width: fit-content;
`;

const ItemActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 10px;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  select {
    padding: 5px 10px;
    border: 1px solid var(--border-light);
    border-radius: 4px;
    background: var(--bg-primary);
    color: var(--text-primary);
    cursor: pointer;
  }
`;

const QuantityLabel = styled.span`
  font-size: 14px;
  color: var(--text-secondary);
`;

const ActionButton = styled.button`
  background: transparent;
  color: var(--text-link);
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 0;

  &:hover {
    color: var(--amazon-orange);
    text-decoration: underline;
  }

  svg {
    font-size: 12px;
  }
`;

const ItemPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;

  @media (max-width: 768px) {
    grid-column: 1 / -1;
    align-items: flex-start;
  }
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

const ItemTotal = styled.span`
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 5px;
`;

const ItemGst = styled.span`
  font-size: 12px;
  color: var(--text-secondary);
`;

const SummarySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 1024px) {
    position: sticky;
    bottom: 0;
    background: var(--bg-secondary);
    padding: 20px 0;
  }
`;

const SummaryCard = styled.div`
  background: var(--bg-primary);
  border-radius: 8px;
  padding: 20px;
  position: sticky;
  top: 80px;
`;

const CouponContainer = styled.div`
  padding: 10px 0;
`;

const CouponForm = styled.form`
  display: flex;
  gap: 10px;
`;

const CouponInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid var(--border-light);
  border-radius: 6px;
  background: var(--bg-primary);
  color: var(--text-primary);
`;

const CouponButton = styled.button`
  padding: 10px 16px;
  background: var(--amazon-orange);
  color: #fff;
  border-radius: 6px;
  font-weight: 600;
`;

const AppliedCoupon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: 6px;
  padding: 10px 12px;
`;

const RemoveCouponButton = styled.button`
  background: transparent;
  color: var(--amazon-red);
  font-weight: 600;
`;

const SummaryTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: var(--text-primary);
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 14px;
  color: ${props => props.$discount ? 'var(--amazon-green)' : 'var(--text-primary)'};

  span:last-child {
    font-weight: 600;
    color: ${props => props.$green ? 'var(--amazon-green)' : 'inherit'};
  }
`;

const Divider = styled.div`
  height: 1px;
  background: var(--border-light);
  margin: 15px 0;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  font-size: 20px;
  font-weight: bold;
  color: var(--text-primary);
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 15px;
  background: var(--amazon-yellow);
  color: var(--amazon-blue);
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  margin-top: 15px;
  transition: all 0.2s;

  &:hover {
    background: #f0c14b;
    transform: scale(1.02);
  }
`;

const SecurityNote = styled.div`
  text-align: center;
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 15px;
`;

const BenefitsCard = styled.div`
  background: var(--bg-primary);
  border-radius: 8px;
  padding: 20px;
`;

const BenefitItem = styled.div`
  padding: 10px 0;
  font-size: 14px;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-light);

  &:last-child {
    border-bottom: none;
  }
`;

const EmptyCart = styled.div`
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
  transition: all 0.2s;

  &:hover {
    background: #f0c14b;
    transform: scale(1.05);
  }
`;

export default CartPage;
