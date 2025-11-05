import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaCheckCircle, FaDownload, FaHome } from 'react-icons/fa';
import confetti from 'canvas-confetti';

const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <Container>
      <SuccessCard>
        <IconWrapper>
          <FaCheckCircle size={80} color="var(--amazon-green)" />
        </IconWrapper>

        <Title>Order Placed Successfully!</Title>
        <Subtitle>Thank you for your purchase</Subtitle>

        <OrderInfo>
          <OrderId>Order ID: #{orderId}</OrderId>
          <OrderMessage>
            We've sent a confirmation email with your order details.
          </OrderMessage>
        </OrderInfo>

        <Timeline>
          <TimelineItem $completed>
            <TimelineDot $completed />
            <TimelineContent>
              <TimelineTitle>Order Confirmed</TimelineTitle>
              <TimelineDate>Just now</TimelineDate>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineDot />
            <TimelineContent>
              <TimelineTitle>Processing</TimelineTitle>
              <TimelineDate>Within 24 hours</TimelineDate>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineDot />
            <TimelineContent>
              <TimelineTitle>Shipped</TimelineTitle>
              <TimelineDate>1-2 days</TimelineDate>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineDot />
            <TimelineContent>
              <TimelineTitle>Delivered</TimelineTitle>
              <TimelineDate>3-5 days</TimelineDate>
            </TimelineContent>
          </TimelineItem>
        </Timeline>

        <Actions>
          <PrimaryButton onClick={() => navigate('/orders')}>
            View Order Details
          </PrimaryButton>
          <SecondaryButton onClick={() => navigate('/')}>
            <FaHome /> Continue Shopping
          </SecondaryButton>
        </Actions>

        <DownloadInvoice>
          <FaDownload /> Download Invoice
        </DownloadInvoice>
      </SuccessCard>

      <InfoCards>
        <InfoCard>
          <InfoIcon>📦</InfoIcon>
          <InfoTitle>Track Your Order</InfoTitle>
          <InfoText>Get real-time updates on your order status</InfoText>
        </InfoCard>
        <InfoCard>
          <InfoIcon>🔄</InfoIcon>
          <InfoTitle>Easy Returns</InfoTitle>
          <InfoText>7 days return policy on all products</InfoText>
        </InfoCard>
        <InfoCard>
          <InfoIcon>💬</InfoIcon>
          <InfoTitle>24/7 Support</InfoTitle>
          <InfoText>We're here to help anytime you need</InfoText>
        </InfoCard>
      </InfoCards>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background: var(--bg-secondary);
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SuccessCard = styled.div`
  max-width: 600px;
  width: 100%;
  background: var(--bg-primary);
  border-radius: 12px;
  padding: 50px 40px;
  text-align: center;
  box-shadow: var(--shadow-lg);
  margin-bottom: 40px;
  animation: slideInUp 0.5s ease;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const IconWrapper = styled.div`
  margin-bottom: 30px;
  animation: scaleIn 0.5s ease;

  @keyframes scaleIn {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: var(--text-secondary);
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const OrderInfo = styled.div`
  padding: 20px;
  background: var(--bg-secondary);
  border-radius: 8px;
  margin-bottom: 40px;
`;

const OrderId = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: var(--amazon-blue);
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const OrderMessage = styled.p`
  font-size: 14px;
  color: var(--text-secondary);
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
  text-align: left;
`;

const TimelineItem = styled.div`
  display: flex;
  gap: 15px;
  position: relative;
  opacity: ${props => props.$completed ? 1 : 0.5};

  &:not(:last-child)::before {
    content: '';
    position: absolute;
    left: 11px;
    top: 30px;
    width: 2px;
    height: calc(100% + 20px);
    background: ${props => props.$completed ? 'var(--amazon-green)' : 'var(--border-light)'};
  }
`;

const TimelineDot = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${props => props.$completed ? 'var(--amazon-green)' : 'var(--bg-secondary)'};
  border: 2px solid ${props => props.$completed ? 'var(--amazon-green)' : 'var(--border-medium)'};
  flex-shrink: 0;
  position: relative;
  z-index: 1;

  ${props => props.$completed && `
    &::after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 12px;
      font-weight: bold;
    }
  `}
`;

const TimelineContent = styled.div`
  flex: 1;
`;

const TimelineTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 3px;
`;

const TimelineDate = styled.div`
  font-size: 13px;
  color: var(--text-secondary);
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
`;

const PrimaryButton = styled.button`
  padding: 15px 30px;
  background: var(--amazon-yellow);
  color: var(--amazon-blue);
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.2s;

  &:hover {
    background: #f0c14b;
    transform: scale(1.02);
  }
`;

const SecondaryButton = styled.button`
  padding: 15px 30px;
  background: transparent;
  color: var(--text-link);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.2s;

  &:hover {
    background: var(--bg-hover);
    border-color: var(--amazon-orange);
    color: var(--amazon-orange);
  }

  svg {
    font-size: 18px;
  }
`;

const DownloadInvoice = styled.button`
  background: transparent;
  color: var(--text-link);
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 0 auto;

  &:hover {
    color: var(--amazon-orange);
    text-decoration: underline;
  }

  svg {
    font-size: 14px;
  }
`;

const InfoCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 900px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  background: var(--bg-primary);
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
`;

const InfoIcon = styled.div`
  font-size: 48px;
  margin-bottom: 15px;
`;

const InfoTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 10px;
`;

const InfoText = styled.p`
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
`;

export default OrderSuccessPage;
