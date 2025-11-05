import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaBox, FaDownload, FaTruck, FaCheckCircle } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { formatDate, downloadInvoice } from '../utils/helpers';

const OrdersPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { formatPrice } = useTheme();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/orders');
      return;
    }

    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  }, [isAuthenticated, navigate]);

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <FaCheckCircle color="var(--amazon-green)" />;
      case 'shipped':
        return <FaTruck color="var(--amazon-orange)" />;
      case 'delivered':
        return <FaBox color="var(--amazon-blue)" />;
      default:
        return <FaBox />;
    }
  };

  if (orders.length === 0) {
    return (
      <EmptyOrders>
        <EmptyIcon>📦</EmptyIcon>
        <EmptyTitle>No orders yet</EmptyTitle>
        <EmptySubtitle>Start shopping to see your orders here</EmptySubtitle>
        <ShopButton onClick={() => navigate('/')}>
          Start Shopping
        </ShopButton>
      </EmptyOrders>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Your Orders</Title>
        <FilterButtons>
          <FilterButton 
            $active={filter === 'all'}
            onClick={() => setFilter('all')}
          >
            All Orders
          </FilterButton>
          <FilterButton 
            $active={filter === 'confirmed'}
            onClick={() => setFilter('confirmed')}
          >
            Confirmed
          </FilterButton>
          <FilterButton 
            $active={filter === 'shipped'}
            onClick={() => setFilter('shipped')}
          >
            Shipped
          </FilterButton>
          <FilterButton 
            $active={filter === 'delivered'}
            onClick={() => setFilter('delivered')}
          >
            Delivered
          </FilterButton>
        </FilterButtons>
      </Header>

      <OrdersList>
        {filteredOrders.map(order => (
          <OrderCard key={order.id}>
            <OrderHeader>
              <OrderInfo>
                <OrderId>Order #{order.id}</OrderId>
                <OrderDate>{formatDate(order.date)}</OrderDate>
              </OrderInfo>
              <OrderStatus>
                {getStatusIcon(order.status)}
                <span>{order.status.toUpperCase()}</span>
              </OrderStatus>
            </OrderHeader>

            <OrderItems>
              {order.items.map(item => (
                <OrderItem key={item.id}>
                  <ItemImage 
                    src={item.image} 
                    alt={item.name}
                    onClick={() => navigate(`/product/${item.id}`)}
                  />
                  <ItemDetails>
                    <ItemName onClick={() => navigate(`/product/${item.id}`)}>
                      {item.name}
                    </ItemName>
                    <ItemQty>Quantity: {item.quantity}</ItemQty>
                    <ItemPrice>{formatPrice(item.discountPrice)}</ItemPrice>
                  </ItemDetails>
                </OrderItem>
              ))}
            </OrderItems>

            <OrderFooter>
              <OrderTotal>
                <span>Order Total:</span>
                <TotalAmount>{formatPrice(order.total)}</TotalAmount>
              </OrderTotal>
              <OrderActions>
                <ActionButton onClick={() => downloadInvoice(order)}>
                  <FaDownload /> Download Invoice
                </ActionButton>
                <ActionButton onClick={() => navigate(`/order-details/${order.id}`)}>
                  View Details
                </ActionButton>
              </OrderActions>
            </OrderFooter>

            {order.status === 'delivered' && (
              <ReviewPrompt>
                <span>How was your experience?</span>
                <ReviewButton>Write a Review</ReviewButton>
              </ReviewPrompt>
            )}
          </OrderCard>
        ))}
      </OrdersList>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background: var(--bg-secondary);
  padding: 20px;
`;

const Header = styled.div`
  max-width: 1200px;
  margin: 0 auto 30px;
  background: var(--bg-primary);
  padding: 20px;
  border-radius: 8px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 8px 20px;
  background: ${props => props.$active ? 'var(--amazon-blue)' : 'transparent'};
  color: ${props => props.$active ? 'white' : 'var(--text-primary)'};
  border: 1px solid ${props => props.$active ? 'var(--amazon-blue)' : 'var(--border-light)'};
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.$active ? 'var(--amazon-light-blue)' : 'var(--bg-hover)'};
  }
`;

const OrdersList = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const OrderCard = styled.div`
  background: var(--bg-primary);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid var(--border-light);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`;

const OrderInfo = styled.div``;

const OrderId = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 5px;
`;

const OrderDate = styled.div`
  font-size: 14px;
  color: var(--text-secondary);
`;

const OrderStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 15px;
  background: var(--bg-secondary);
  border-radius: 20px;

  svg {
    font-size: 18px;
  }

  span {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
  }
`;

const OrderItems = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const OrderItem = styled.div`
  display: flex;
  gap: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--border-light);

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  background: var(--bg-secondary);
  border-radius: 4px;
  padding: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ItemName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
  cursor: pointer;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  &:hover {
    color: var(--amazon-orange);
  }
`;

const ItemQty = styled.div`
  font-size: 14px;
  color: var(--text-secondary);
`;

const ItemPrice = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: var(--amazon-red);
`;

const OrderFooter = styled.div`
  padding: 20px;
  border-top: 1px solid var(--border-light);
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
`;

const OrderTotal = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  color: var(--text-primary);
`;

const TotalAmount = styled.span`
  font-size: 22px;
  font-weight: bold;
  color: var(--amazon-red);
`;

const OrderActions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  background: transparent;
  color: var(--text-link);
  border: 1px solid var(--border-light);
  border-radius: 4px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: var(--bg-hover);
    border-color: var(--amazon-orange);
    color: var(--amazon-orange);
  }

  svg {
    font-size: 14px;
  }
`;

const ReviewPrompt = styled.div`
  padding: 15px 20px;
  background: #FFF3CD;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 14px;
    color: #856404;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
`;

const ReviewButton = styled.button`
  padding: 8px 20px;
  background: var(--amazon-blue);
  color: white;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;

  &:hover {
    background: var(--amazon-light-blue);
  }
`;

const EmptyOrders = styled.div`
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

export default OrdersPage;
