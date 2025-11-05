import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const { success, error } = useNotification();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = login(email, password);
      if (result.success) {
        success('Login successful!');
        const redirect = searchParams.get('redirect') || '/';
        navigate(redirect);
      }
    } catch (err) {
      error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <LoginCard>
        <Logo onClick={() => navigate('/')}>amazon.in</Logo>
        
        <Title>Sign in</Title>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Email or mobile phone number</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </FormGroup>

          <FormGroup>
            <Label>Password</Label>
            <PasswordWrapper>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <TogglePassword onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </TogglePassword>
            </PasswordWrapper>
          </FormGroup>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Continue'}
          </SubmitButton>
        </Form>

        <Terms>
          By continuing, you agree to Amazon's{' '}
          <TermsLink to="/conditions">Conditions of Use</TermsLink> and{' '}
          <TermsLink to="/privacy">Privacy Notice</TermsLink>.
        </Terms>

        <ForgotPassword to="/forgot-password">Forgot your password?</ForgotPassword>

        <Divider>
          <span>New to Amazon?</span>
        </Divider>

        <CreateAccountButton onClick={() => navigate('/signup')}>
          Create your Amazon account
        </CreateAccountButton>

        <DemoNote>
          <strong>Demo Login:</strong> Use any email and password to login
        </DemoNote>
      </LoginCard>

      <Footer>
        <FooterLinks>
          <FooterLink to="/conditions">Conditions of Use</FooterLink>
          <FooterLink to="/privacy">Privacy Notice</FooterLink>
          <FooterLink to="/help">Help</FooterLink>
        </FooterLinks>
        <Copyright>© 1996-2025, Amazon.com, Inc. or its affiliates</Copyright>
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background: var(--bg-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 350px;
  background: var(--bg-primary);
  border-radius: 8px;
  padding: 30px;
  margin: 20px 0;
  box-shadow: var(--shadow-md);
`;

const Logo = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: var(--amazon-blue);
  text-align: center;
  margin-bottom: 20px;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 20px;
  color: var(--text-primary);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: bold;
  color: var(--text-primary);
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid var(--border-medium);
  border-radius: 3px;
  font-size: 14px;
  background: var(--bg-primary);
  color: var(--text-primary);

  &:focus {
    outline: none;
    border-color: var(--amazon-orange);
    box-shadow: 0 0 3px var(--amazon-orange);
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
`;

const TogglePassword = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  color: var(--text-secondary);
  padding: 5px;

  &:hover {
    color: var(--text-primary);
  }

  svg {
    font-size: 18px;
  }
`;

const SubmitButton = styled.button`
  padding: 12px;
  background: var(--amazon-yellow);
  color: var(--amazon-blue);
  border: 1px solid #a88734;
  border-radius: 3px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 10px;

  &:hover:not(:disabled) {
    background: #f0c14b;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Terms = styled.p`
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 15px;
  line-height: 1.5;
`;

const TermsLink = styled(Link)`
  color: var(--text-link);
  text-decoration: none;

  &:hover {
    color: var(--amazon-orange);
    text-decoration: underline;
  }
`;

const ForgotPassword = styled(Link)`
  display: block;
  font-size: 13px;
  color: var(--text-link);
  text-decoration: none;
  margin-top: 15px;

  &:hover {
    color: var(--amazon-orange);
    text-decoration: underline;
  }
`;

const Divider = styled.div`
  position: relative;
  text-align: center;
  margin: 25px 0;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--border-light);
  }

  span {
    position: relative;
    background: var(--bg-primary);
    padding: 0 10px;
    font-size: 12px;
    color: var(--text-secondary);
  }
`;

const CreateAccountButton = styled.button`
  padding: 12px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-medium);
  border-radius: 3px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: var(--bg-tertiary);
  }
`;

const DemoNote = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: #FFF3CD;
  border: 1px solid #FFE69C;
  border-radius: 4px;
  color: #856404;
  font-size: 13px;
  text-align: center;

  strong {
    display: block;
    margin-bottom: 5px;
  }
`;

const Footer = styled.footer`
  margin-top: 40px;
  text-align: center;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 10px;
  flex-wrap: wrap;
`;

const FooterLink = styled(Link)`
  font-size: 12px;
  color: var(--text-link);
  text-decoration: none;

  &:hover {
    color: var(--amazon-orange);
    text-decoration: underline;
  }
`;

const Copyright = styled.div`
  font-size: 11px;
  color: var(--text-secondary);
`;

export default LoginPage;
