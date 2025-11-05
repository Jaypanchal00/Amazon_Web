import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { validateEmail, validatePhone } from '../utils/helpers';

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { success, error } = useNotification();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!validateEmail(formData.email)) {
      error('Please enter a valid email address');
      return;
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      error('Please enter a valid 10-digit phone number');
      return;
    }

    if (formData.password.length < 6) {
      error('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const result = signup(formData.name, formData.email, formData.password, formData.phone);
      if (result.success) {
        success(result.message || 'Account created successfully! Please login to continue.');
        // Redirect to login page after successful signup
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    } catch (err) {
      error('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <SignupCard>
        <Logo onClick={() => navigate('/')}>amazon.in</Logo>
        
        <Title>Create account</Title>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Your name</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="First and last name"
              required
              autoFocus
            />
          </FormGroup>

          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Mobile number (Optional)</Label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              maxLength={10}
            />
          </FormGroup>

          <FormGroup>
            <Label>Password</Label>
            <PasswordWrapper>
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                required
              />
              <TogglePassword onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </TogglePassword>
            </PasswordWrapper>
            <PasswordHint>Passwords must be at least 6 characters.</PasswordHint>
          </FormGroup>

          <FormGroup>
            <Label>Re-enter password</Label>
            <PasswordWrapper>
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <TogglePassword onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </TogglePassword>
            </PasswordWrapper>
          </FormGroup>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create your Amazon account'}
          </SubmitButton>
        </Form>

        <Terms>
          By creating an account, you agree to Amazon's{' '}
          <TermsLink to="/conditions">Conditions of Use</TermsLink> and{' '}
          <TermsLink to="/privacy">Privacy Notice</TermsLink>.
        </Terms>

        <Divider />

        <SignInLink>
          Already have an account? <Link to="/login">Sign in</Link>
        </SignInLink>
      </SignupCard>

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

const SignupCard = styled.div`
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

const PasswordHint = styled.p`
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 3px;
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

const Divider = styled.div`
  height: 1px;
  background: var(--border-light);
  margin: 25px 0;
`;

const SignInLink = styled.div`
  font-size: 13px;
  color: var(--text-primary);
  text-align: center;

  a {
    color: var(--text-link);
    text-decoration: none;

    &:hover {
      color: var(--amazon-orange);
      text-decoration: underline;
    }
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

export default SignupPage;
