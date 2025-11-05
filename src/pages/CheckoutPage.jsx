import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaCheckCircle, FaCreditCard, FaMoneyBillWave, FaLock } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { useTheme } from '../contexts/ThemeContext';
import { generateOrderId } from '../utils/helpers';
import { getProductGstRate, calculateItemTax } from '../utils/helpers';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { cartItems, getCartTotal, getTaxAmount, getDeliveryCharge, getFinalTotal, clearCart } = useCart();
  const { success } = useNotification();
  const { formatPrice } = useTheme();

  const [step, setStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    phone: '',
    pincode: '',
    address: '',
    city: '',
    state: '',
    landmark: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [upiId, setUpiId] = useState('');
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');

  if (!isAuthenticated) {
    navigate('/login?redirect=/checkout');
    return null;
  }

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    
    // Mock payment processing
    setTimeout(() => {
      const orderId = generateOrderId();
      const order = {
        id: orderId,
        date: new Date(),
        items: cartItems,
        subtotal: getCartTotal(),
        tax: getTaxAmount(),
        delivery: getDeliveryCharge(),
        total: getFinalTotal(),
        address: selectedAddress || newAddress,
        paymentMethod,
        status: 'confirmed',
        giftWrap,
        giftMessage
      };

      // Save order to localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.unshift(order);
      localStorage.setItem('orders', JSON.stringify(orders));

      clearCart();
      success('Order placed successfully!');
      navigate(`/order-success/${orderId}`);
    }, 2000);
  };

  return (
    <Container>
      <CheckoutHeader>
        <Logo onClick={() => navigate('/')}>amazon.in</Logo>
        <SecureText>
          <FaLock /> Secure Checkout
        </SecureText>
      </CheckoutHeader>

      <Content>
        <MainSection>
          {/* Step 1: Address */}
          <StepCard $active={step === 1}>
            <StepHeader>
              <StepNumber $completed={step > 1}>
                {step > 1 ? <FaCheckCircle /> : '1'}
              </StepNumber>
              <StepTitle>Delivery Address</StepTitle>
            </StepHeader>

            {step === 1 && (
              <StepContent>
                {user.addresses && user.addresses.length > 0 && (
                  <AddressList>
                    {user.addresses.map(addr => (
                      <AddressCard 
                        key={addr.id}
                        $selected={selectedAddress?.id === addr.id}
                        onClick={() => setSelectedAddress(addr)}
                      >
                        <AddressName>{addr.fullName}</AddressName>
                        <AddressText>{addr.address}, {addr.city}</AddressText>
                        <AddressText>{addr.state} - {addr.pincode}</AddressText>
                        <AddressText>Phone: {addr.phone}</AddressText>
                        {addr.isDefault && <DefaultBadge>Default</DefaultBadge>}
                      </AddressCard>
                    ))}
                  </AddressList>
                )}

                <FormTitle>Add New Address</FormTitle>
                <AddressForm onSubmit={handleAddressSubmit}>
                  <FormRow>
                    <FormGroup>
                      <label>Full Name *</label>
                      <input 
                        type="text"
                        value={newAddress.fullName}
                        onChange={(e) => setNewAddress({...newAddress, fullName: e.target.value})}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <label>Phone Number *</label>
                      <input 
                        type="tel"
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                        required
                      />
                    </FormGroup>
                  </FormRow>

                  <FormGroup>
                    <label>Address *</label>
                    <textarea 
                      value={newAddress.address}
                      onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                      rows={3}
                      required
                    />
                  </FormGroup>

                  <FormRow>
                    <FormGroup>
                      <label>City *</label>
                      <input 
                        type="text"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <label>State *</label>
                      <input 
                        type="text"
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <label>Pincode *</label>
                      <input 
                        type="text"
                        value={newAddress.pincode}
                        onChange={(e) => setNewAddress({...newAddress, pincode: e.target.value})}
                        maxLength={6}
                        required
                      />
                    </FormGroup>
                  </FormRow>

                  <FormGroup>
                    <label>Landmark (Optional)</label>
                    <input 
                      type="text"
                      value={newAddress.landmark}
                      onChange={(e) => setNewAddress({...newAddress, landmark: e.target.value})}
                    />
                  </FormGroup>

                  <ContinueButton type="submit">
                    Continue to Payment
                  </ContinueButton>
                </AddressForm>
              </StepContent>
            )}
          </StepCard>

          {/* Step 2: Payment */}
          <StepCard $active={step === 2}>
            <StepHeader>
              <StepNumber $completed={step > 2}>
                {step > 2 ? <FaCheckCircle /> : '2'}
              </StepNumber>
              <StepTitle>Payment Method</StepTitle>
            </StepHeader>

            {step === 2 && (
              <StepContent>
                <PaymentMethods>
                  <PaymentOption 
                    $selected={paymentMethod === 'card'}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <FaCreditCard />
                    <span>Credit/Debit Card</span>
                  </PaymentOption>
                  <PaymentOption 
                    $selected={paymentMethod === 'upi'}
                    onClick={() => setPaymentMethod('upi')}
                  >
                    <span>📱</span>
                    <span>UPI</span>
                  </PaymentOption>
                  <PaymentOption 
                    $selected={paymentMethod === 'cod'}
                    onClick={() => setPaymentMethod('cod')}
                  >
                    <FaMoneyBillWave />
                    <span>Cash on Delivery</span>
                  </PaymentOption>
                </PaymentMethods>

                {paymentMethod === 'card' && (
                  <PaymentForm onSubmit={handlePayment}>
                    <FormGroup>
                      <label>Card Number</label>
                      <input 
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                        maxLength={19}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <label>Cardholder Name</label>
                      <input 
                        type="text"
                        placeholder="John Doe"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                        required
                      />
                    </FormGroup>
                    <FormRow>
                      <FormGroup>
                        <label>Expiry Date</label>
                        <input 
                          type="text"
                          placeholder="MM/YY"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                          maxLength={5}
                          required
                        />
                      </FormGroup>
                      <FormGroup>
                        <label>CVV</label>
                        <input 
                          type="password"
                          placeholder="123"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                          maxLength={3}
                          required
                        />
                      </FormGroup>
                    </FormRow>
                    <PlaceOrderButton type="submit">
                      Place Order
                    </PlaceOrderButton>
                  </PaymentForm>
                )}

                {paymentMethod === 'upi' && (
                  <PaymentForm onSubmit={handlePayment}>
                    <FormGroup>
                      <label>UPI ID</label>
                      <input 
                        type="text"
                        placeholder="yourname@upi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        required
                      />
                    </FormGroup>
                    <PlaceOrderButton type="submit">
                      Place Order
                    </PlaceOrderButton>
                  </PaymentForm>
                )}

                {paymentMethod === 'cod' && (
                  <PaymentForm onSubmit={handlePayment}>
                    <CODNote>
                      Pay with cash when your order is delivered.
                    </CODNote>
                    <PlaceOrderButton type="submit">
                      Place Order
                    </PlaceOrderButton>
                  </PaymentForm>
                )}

                <GiftOptions>
                  <GiftCheckbox>
                    <input 
                      type="checkbox"
                      checked={giftWrap}
                      onChange={(e) => setGiftWrap(e.target.checked)}
                    />
                    <label>Add gift wrap (₹50)</label>
                  </GiftCheckbox>
                  {giftWrap && (
                    <FormGroup>
                      <label>Gift Message (Optional)</label>
                      <textarea 
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        rows={3}
                        placeholder="Enter your gift message..."
                      />
                    </FormGroup>
                  )}
                </GiftOptions>
              </StepContent>
            )}
          </StepCard>
        </MainSection>

        <SummarySection>
          <SummaryCard>
            <SummaryTitle>Order Summary</SummaryTitle>
            
            <SummaryRow>
              <span>Items ({cartItems.length}):</span>
              <span>{formatPrice(getCartTotal())}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Delivery:</span>
              <span $green={getDeliveryCharge() === 0}>
                {getDeliveryCharge() === 0 ? 'FREE' : formatPrice(getDeliveryCharge())}
              </span>
            </SummaryRow>
            <SummaryRow>
              <span>Tax (GST):</span>
              <span>{formatPrice(getTaxAmount())}</span>
            </SummaryRow>
            {giftWrap && (
              <SummaryRow>
                <span>Gift Wrap:</span>
                <span>{formatPrice(50)}</span>
              </SummaryRow>
            )}

            <Divider />

            <TotalRow>
              <span>Order Total:</span>
              <span>{formatPrice(getFinalTotal() + (giftWrap ? 50 : 0))}</span>
            </TotalRow>
          </SummaryCard>

          <ItemsList>
            <ItemsTitle>Items in your order</ItemsTitle>
            {cartItems.map(item => (
            <OrderItem key={item.id}>
              <ItemImage src={item.image} alt={item.name} />
              <ItemInfo>
                <ItemName>{item.name}</ItemName>
                <ItemQty>Qty: {item.quantity}</ItemQty>
                <ItemPrice>{formatPrice(item.discountPrice)}</ItemPrice>
                <ItemGst>
                  GST @ {getProductGstRate(item)}%: {formatPrice(calculateItemTax(item))}
                </ItemGst>
              </ItemInfo>
            </OrderItem>
          ))}
          </ItemsList>
        </SummarySection>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background: var(--bg-secondary);
`;

const CheckoutHeader = styled.div`
  background: var(--amazon-blue);
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
`;

const SecureText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;

  svg {
    font-size: 16px;
  }
`;

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StepCard = styled.div`
  background: var(--bg-primary);
  border-radius: 8px;
  padding: 20px;
  opacity: ${props => props.$active ? 1 : 0.6};
  pointer-events: ${props => props.$active ? 'auto' : 'none'};
`;

const StepHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.$completed ? 'var(--amazon-green)' : 'var(--amazon-blue)'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;

  svg {
    font-size: 20px;
  }
`;

const StepTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  color: var(--text-primary);
`;

const StepContent = styled.div``;

const AddressList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
`;

const AddressCard = styled.div`
  padding: 15px;
  border: 2px solid ${props => props.$selected ? 'var(--amazon-orange)' : 'var(--border-light)'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  &:hover {
    border-color: var(--amazon-orange);
    box-shadow: var(--shadow-md);
  }
`;

const AddressName = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  color: var(--text-primary);
`;

const AddressText = styled.div`
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 3px;
`;

const DefaultBadge = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--amazon-orange);
  color: white;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: bold;
`;

const FormTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: var(--text-primary);
`;

const AddressForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
  }

  input, textarea {
    padding: 10px;
    border: 1px solid var(--border-light);
    border-radius: 4px;
    font-size: 14px;
    background: var(--bg-primary);
    color: var(--text-primary);

    &:focus {
      border-color: var(--amazon-orange);
      outline: none;
    }
  }

  textarea {
    resize: vertical;
  }
`;

const ContinueButton = styled.button`
  padding: 15px;
  background: var(--amazon-yellow);
  color: var(--amazon-blue);
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  transition: all 0.2s;
  margin-top: 10px;

  &:hover {
    background: #f0c14b;
    transform: scale(1.02);
  }
`;

const PaymentMethods = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
`;

const PaymentOption = styled.div`
  padding: 20px;
  border: 2px solid ${props => props.$selected ? 'var(--amazon-orange)' : 'var(--border-light)'};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => props.$selected ? 'rgba(255, 153, 0, 0.1)' : 'transparent'};

  &:hover {
    border-color: var(--amazon-orange);
    box-shadow: var(--shadow-md);
  }

  svg {
    font-size: 32px;
    color: var(--amazon-blue);
  }

  span:first-child {
    font-size: 32px;
  }

  span:last-child {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
  }
`;

const PaymentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const PlaceOrderButton = styled.button`
  padding: 15px;
  background: var(--amazon-orange);
  color: white;
  font-size: 18px;
  font-weight: bold;
  border-radius: 8px;
  transition: all 0.2s;
  margin-top: 20px;

  &:hover {
    background: #f3a847;
    transform: scale(1.02);
  }
`;

const CODNote = styled.div`
  padding: 15px;
  background: #FFF3CD;
  border: 1px solid #FFE69C;
  border-radius: 4px;
  color: #856404;
  font-size: 14px;
`;

const GiftOptions = styled.div`
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid var(--border-light);
`;

const GiftCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }

  label {
    font-size: 14px;
    color: var(--text-primary);
    cursor: pointer;
  }
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
  color: var(--text-primary);

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

const ItemsList = styled.div`
  background: var(--bg-primary);
  border-radius: 8px;
  padding: 20px;
  max-height: 400px;
  overflow-y: auto;
`;

const ItemsTitle = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  color: var(--text-primary);
`;

const OrderItem = styled.div`
  display: flex;
  gap: 15px;
  padding: 10px 0;
  border-bottom: 1px solid var(--border-light);

  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  background: var(--bg-secondary);
  border-radius: 4px;
  padding: 5px;
`;

const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const ItemName = styled.div`
  font-size: 14px;
  color: var(--text-primary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ItemQty = styled.div`
  font-size: 12px;
  color: var(--text-secondary);
`;

const ItemPrice = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: var(--amazon-red);
`;

const ItemGst = styled.div`
  font-size: 12px;
  color: var(--text-secondary);
`;

export default CheckoutPage;
