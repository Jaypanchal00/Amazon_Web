import React from 'react';
import styled from 'styled-components';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';
import { useNotification } from '../../contexts/NotificationContext';

const Toast = () => {
  const { notifications, removeNotification } = useNotification();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <FaCheckCircle />;
      case 'error':
        return <FaExclamationCircle />;
      case 'warning':
        return <FaExclamationCircle />;
      default:
        return <FaInfoCircle />;
    }
  };

  return (
    <ToastContainer>
      {notifications.map(notif => (
        <ToastItem key={notif.id} $type={notif.type}>
          <ToastIcon $type={notif.type}>
            {getIcon(notif.type)}
          </ToastIcon>
          <ToastMessage>{notif.message}</ToastMessage>
          <CloseButton onClick={() => removeNotification(notif.id)}>
            <FaTimes />
          </CloseButton>
        </ToastItem>
      ))}
    </ToastContainer>
  );
};

const ToastContainer = styled.div`
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    right: 10px;
    left: 10px;
  }
`;

const ToastItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 20px;
  background: white;
  border-radius: 8px;
  box-shadow: var(--shadow-lg);
  min-width: 300px;
  max-width: 400px;
  border-left: 4px solid ${props => {
    switch (props.$type) {
      case 'success': return 'var(--amazon-green)';
      case 'error': return 'var(--amazon-red)';
      case 'warning': return 'var(--amazon-orange)';
      default: return 'var(--amazon-blue)';
    }
  }};
  animation: slideInRight 0.3s ease;

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    min-width: auto;
    max-width: none;
  }
`;

const ToastIcon = styled.div`
  font-size: 24px;
  color: ${props => {
    switch (props.$type) {
      case 'success': return 'var(--amazon-green)';
      case 'error': return 'var(--amazon-red)';
      case 'warning': return 'var(--amazon-orange)';
      default: return 'var(--amazon-blue)';
    }
  }};
`;

const ToastMessage = styled.div`
  flex: 1;
  color: var(--text-primary);
  font-size: 14px;
`;

const CloseButton = styled.button`
  background: transparent;
  color: var(--text-secondary);
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: var(--text-primary);
  }

  svg {
    font-size: 16px;
  }
`;

export default Toast;
