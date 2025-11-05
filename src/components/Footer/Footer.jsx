import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <FooterContainer>
      <BackToTop onClick={scrollToTop}>
        Back to top
      </BackToTop>

      <FooterContent>
        <FooterSection>
          <FooterTitle>Get to Know Us</FooterTitle>
          <FooterLink to="/about">About Us</FooterLink>
          <FooterLink to="/careers">Careers</FooterLink>
          <FooterLink to="/press">Press Releases</FooterLink>
          <FooterLink to="/amazon-science">Amazon Science</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Connect with Us</FooterTitle>
          <FooterLink to="/facebook">Facebook</FooterLink>
          <FooterLink to="/twitter">Twitter</FooterLink>
          <FooterLink to="/instagram">Instagram</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Make Money with Us</FooterTitle>
          <FooterLink to="/sell">Sell on Amazon</FooterLink>
          <FooterLink to="/seller-central">Seller Central</FooterLink>
          <FooterLink to="/advertise">Advertise Your Products</FooterLink>
          <FooterLink to="/amazon-pay">Amazon Pay</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Let Us Help You</FooterTitle>
          <FooterLink to="/covid">COVID-19 and Amazon</FooterLink>
          <FooterLink to="/account">Your Account</FooterLink>
          <FooterLink to="/returns">Returns Centre</FooterLink>
          <FooterLink to="/help">Help</FooterLink>
        </FooterSection>
      </FooterContent>

      <FooterDivider />

      <FooterBottom>
        <Logo>
          <Link to="/">amazon.in</Link>
        </Logo>
        
        <FooterLinks>
          <FooterBottomLink to="/conditions">Conditions of Use & Sale</FooterBottomLink>
          <FooterBottomLink to="/privacy">Privacy Notice</FooterBottomLink>
          <FooterBottomLink to="/interest-ads">Interest-Based Ads</FooterBottomLink>
        </FooterLinks>

        <SocialLinks>
          <SocialIcon href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </SocialIcon>
          <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </SocialIcon>
          <SocialIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </SocialIcon>
          <SocialIcon href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </SocialIcon>
        </SocialLinks>
      </FooterBottom>

      <Copyright>
        © 1996-2025, Amazon.com, Inc. or its affiliates
      </Copyright>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: var(--amazon-blue);
  color: white;
  margin-top: 50px;
`;

const BackToTop = styled.div`
  background-color: var(--amazon-light-blue);
  text-align: center;
  padding: 15px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;

  &:hover {
    background-color: #485769;
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  padding: 40px 20px;
  max-width: 1500px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 30px 15px;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FooterTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const FooterLink = styled(Link)`
  color: #DDD;
  font-size: 14px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: white;
  }
`;

const FooterDivider = styled.div`
  height: 1px;
  background: var(--amazon-light-blue);
  margin: 0 20px;
`;

const FooterBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 30px 20px;
  max-width: 1500px;
  margin: 0 auto;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;

  a {
    color: white;
    text-decoration: none;

    &:hover {
      color: var(--amazon-orange);
    }
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
`;

const FooterBottomLink = styled(Link)`
  color: #DDD;
  font-size: 12px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: white;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const SocialIcon = styled.a`
  color: white;
  font-size: 24px;
  transition: color 0.2s;

  &:hover {
    color: var(--amazon-orange);
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 12px;
  color: #DDD;
  background-color: #131A22;
`;

export default Footer;
