import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaChevronLeft, FaChevronRight, FaClock } from 'react-icons/fa';
import ProductCard from '../components/ProductCard/ProductCard';
import { products, categories, banners, deals } from '../data/mockData';
import { getRandomProducts } from '../utils/helpers';
import { motion } from 'framer-motion';

const HomePage = () => {
  const navigate = useNavigate();
  const [currentBanner, setCurrentBanner] = useState(0);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [dealTimeLeft, setDealTimeLeft] = useState({});
  const [isHoveringSlider, setIsHoveringSlider] = useState(false);

  useEffect(() => {
    // Load recently viewed from localStorage
    const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    setRecentlyViewed(viewed.slice(0, 10));

    // Generate recommendations
    setRecommendations(getRandomProducts(products, 12));

    // Auto-rotate banners
    const interval = isHoveringSlider ? null : setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length);
    }, 5000);

    return () => interval && clearInterval(interval);
  }, [isHoveringSlider]);

  // Scroll reveal for items
  useEffect(() => {
    const root = document.querySelector('#root') || undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    document.querySelectorAll('.anim-item').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Ensure unique products across sections on the home page
  const usedIds = new Set();
  const uniqueFrom = (arr, count) => {
    const res = [];
    for (const p of arr) {
      if (!usedIds.has(p.id)) {
        usedIds.add(p.id);
        res.push(p);
        if (res.length === count) break;
      }
    }
    return res;
  };

  const uniqueDeals = deals.map(deal => ({
    ...deal,
    products: uniqueFrom(deal.products, deal.products.length)
  }));

  const trendingUnique = uniqueFrom([...products].sort((a, b) => b.reviews - a.reviews), 8);
  const topRatedUnique = uniqueFrom([...products].sort((a, b) => b.rating - a.rating), 8);
  const bestSellersUnique = uniqueFrom(products, 8);
  // Build recommendations from items not already used; fallback to all products
  const recPool = products.filter(p => !usedIds.has(p.id));
  const recCandidates = recPool.length ? getRandomProducts(recPool, 24) : getRandomProducts(products, 24);
  const recommendationsUnique = uniqueFrom(recCandidates, Math.min(12, recCandidates.length));

  useEffect(() => {
    // Update deal countdown
    const interval = setInterval(() => {
      deals.forEach(deal => {
        const timeLeft = deal.endsIn - new Date();
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        setDealTimeLeft(prev => ({
          ...prev,
          [deal.id]: `${hours}h ${minutes}m ${seconds}s`
        }));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <Container>
      {/* Hero Banner Slider */}
      <HeroSection>
        <BannerSlider
          as={motion.div}
          onMouseEnter={() => setIsHoveringSlider(true)}
          onMouseLeave={() => setIsHoveringSlider(false)}
        >
          <BannerTrack
            as={motion.div}
            $currentIndex={currentBanner}
            animate={{ x: -currentBanner * 100 + '%' }}
            transition={{ duration: 0.55, ease: 'easeInOut' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, info) => {
              if (info.offset.x > 60) {
                prevBanner();
              } else if (info.offset.x < -60) {
                nextBanner();
              }
            }}
          >
            {banners.map((banner, index) => (
              <Banner 
                key={banner.id}
                $bgColor={banner.color}
                onClick={() => navigate(banner.link)}
              >
                <BannerOverlay />
                <BannerImage
                  as={motion.img}
                  src={banner.image}
                  alt={banner.title}
                  loading="lazy"
                  initial={false}
                  animate={index === currentBanner ? { scale: 1.05 } : { scale: 1 }}
                  transition={{ duration: 5, ease: 'linear' }}
                />
                <BannerContent
                  as={motion.div}
                  initial={{ opacity: 0, y: 12 }}
                  animate={index === currentBanner ? { opacity: 1, y: 0 } : { opacity: 0.4, y: 8 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                >
                  <BannerTitle as={motion.h1} initial={false} animate={{ filter: index === currentBanner ? 'blur(0px)' : 'blur(0.5px)' }}>
                    {banner.title}
                  </BannerTitle>
                  <BannerSubtitle>{banner.subtitle}</BannerSubtitle>
                  <BannerCTA as={motion.div} initial={{ opacity: 0, y: 6 }} animate={index === currentBanner ? { opacity: 1, y: 0 } : { opacity: 0 }} transition={{ delay: 0.1, duration: 0.35 }}>
                    <BannerButton as={motion.button} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                      Shop Now
                    </BannerButton>
                  </BannerCTA>
                </BannerContent>
              </Banner>
            ))}
          </BannerTrack>

          <NavButton as={motion.button} $direction="left" onClick={prevBanner} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <FaChevronLeft />
          </NavButton>
          <NavButton as={motion.button} $direction="right" onClick={nextBanner} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <FaChevronRight />
          </NavButton>

          <EdgeFadeLeft />
          <EdgeFadeRight />

          <Progress key={currentBanner}>
            <ProgressFill />
          </Progress>

          <BannerDots>
            {banners.map((_, index) => (
              <Dot
                as={motion.button}
                key={index}
                $active={index === currentBanner}
                onClick={() => setCurrentBanner(index)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </BannerDots>
        </BannerSlider>
      </HeroSection>

      {/* Categories Grid */}
      <Section>
        <SectionTitle>Shop by Category</SectionTitle>
        <CategoriesGrid>
          {categories.slice(0, 8).map(category => (
            <AnimItem className="anim-item">
            <CategoryCard 
              key={category.id}
              onClick={() => navigate(`/category/${category.slug}`)}
            >
              <CategoryIcon>{category.icon}</CategoryIcon>
              <CategoryName>{category.name}</CategoryName>
            </CategoryCard>
            </AnimItem>
          ))}
        </CategoriesGrid>
      </Section>

      {/* Deals of the Day */}
      {uniqueDeals.map(deal => (
        <Section key={deal.id}>
          <SectionHeader>
            <SectionTitle>{deal.title}</SectionTitle>
            <DealTimer>
              <FaClock /> Ends in: {dealTimeLeft[deal.id] || 'Loading...'}
            </DealTimer>
          </SectionHeader>
          <ProductGrid>
            {deal.products.map(product => (
              <AnimItem className="anim-item" key={product.id}>
                <ProductCard product={product} />
              </AnimItem>
            ))}
          </ProductGrid>
        </Section>
      ))}

      {/* Trending Products */}
      <Section>
        <SectionTitle>Trending Now</SectionTitle>
        <ProductGrid>
          {trendingUnique.map(product => (
            <AnimItem className="anim-item" key={product.id}>
              <ProductCard product={product} />
            </AnimItem>
          ))}
        </ProductGrid>
      </Section>

      {/* Top Rated Products */}
      <Section>
        <SectionTitle>Top Rated Products</SectionTitle>
        <ProductGrid>
          {topRatedUnique.map(product => (
            <AnimItem className="anim-item" key={product.id}>
              <ProductCard product={product} />
            </AnimItem>
          ))}
        </ProductGrid>
      </Section>

      {/* Best Sellers */}
      <Section>
        <SectionTitle>Best Sellers</SectionTitle>
        <ProductGrid>
          {bestSellersUnique.map(product => (
            <AnimItem className="anim-item" key={product.id}>
              <ProductCard product={product} />
            </AnimItem>
          ))}
        </ProductGrid>
      </Section>

      

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <Section>
          <SectionTitle>Recently Viewed</SectionTitle>
          <ProductGrid>
            {recentlyViewed.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductGrid>
        </Section>
      )}

      {/* Category Sections */}
      {categories.slice(0, 2).map(category => {
        const categoryProducts = products.filter(p => p.category === category.slug).slice(0, 6);
        if (categoryProducts.length === 0) return null;

        return (
          <Section key={category.id}>
            <SectionHeader>
              <SectionTitle>{category.name}</SectionTitle>
              <ViewAllLink onClick={() => navigate(`/category/${category.slug}`)}>
                View All
              </ViewAllLink>
            </SectionHeader>
            <ProductGrid>
              {categoryProducts.map(product => (
                <AnimItem className="anim-item" key={product.id}>
                  <ProductCard product={product} />
                </AnimItem>
              ))}
            </ProductGrid>
          </Section>
        );
      })}

      {/* Newsletter */}
      <NewsletterSection>
        <NewsletterContent>
          <NewsletterTitle>Subscribe to our Newsletter</NewsletterTitle>
          <NewsletterSubtitle>Get the latest deals and offers delivered to your inbox</NewsletterSubtitle>
          <NewsletterForm onSubmit={(e) => e.preventDefault()}>
            <NewsletterInput type="email" placeholder="Enter your email" required />
            <NewsletterButton type="submit">Subscribe</NewsletterButton>
          </NewsletterForm>
        </NewsletterContent>
      </NewsletterSection>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
`;

const HeroSection = styled.section`
  margin-bottom: 30px;
`;

const BannerSlider = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const BannerTrack = styled.div`
  display: flex;
  height: 100%;
  transition: transform 0.5s ease;
  transform: translateX(-${props => props.$currentIndex * 100}%);
`;

const Banner = styled.div`
  min-width: 100%;
  height: 100%;
  position: relative;
  background: ${props => props.$bgColor};
  cursor: pointer;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
`;

const BannerContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50px;
  transform: translateY(-50%);
  color: white;
  max-width: 500px;

  @media (max-width: 768px) {
    left: 20px;
    max-width: 80%;
  }
`;

const BannerTitle = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const BannerSubtitle = styled.p`
  font-size: 24px;
  margin-bottom: 20px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const BannerButton = styled.button`
  padding: 15px 30px;
  background: var(--amazon-yellow);
  color: var(--amazon-blue);
  font-size: 18px;
  font-weight: bold;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background: #f0c14b;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

const BannerNavButton = styled.button`
  position: absolute;
  top: 50%;
  ${props => props.$direction}: 20px;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.8);
  color: var(--amazon-blue);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: all 0.2s;
  z-index: 10;

  &:hover {
    background: white;
    transform: translateY(-50%) scale(1.1);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
`;

const BannerDots = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
`;

const Dot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.$active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  transition: all 0.2s;

  &:hover {
    background: white;
  }
`;

const Section = styled.section`
  padding: 30px 20px;
  max-width: 1500px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const DealTimer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--amazon-red);
  font-weight: bold;
  font-size: 18px;

  svg {
    font-size: 20px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    
    svg {
      font-size: 16px;
    }
  }
`;

const ViewAllLink = styled.button`
  background: transparent;
  color: var(--text-link);
  font-size: 16px;
  text-decoration: underline;

  &:hover {
    color: var(--amazon-orange);
  }
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 10px;
  }
`;

const CategoryCard = styled.div`
  background: var(--bg-primary);
  padding: 30px 20px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm);

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }

  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

const CategoryIcon = styled.div`
  font-size: 48px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const CategoryName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
  }
`;

const NewsletterSection = styled.section`
  background: var(--amazon-light-blue);
  padding: 60px 20px;
  margin-top: 50px;
`;

const NewsletterContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const NewsletterTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  color: white;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const NewsletterSubtitle = styled.p`
  font-size: 18px;
  color: #DDD;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 15px;
  border-radius: 4px;
  border: none;
  font-size: 16px;

  @media (max-width: 768px) {
    padding: 12px;
    font-size: 14px;
  }
`;

const NewsletterButton = styled.button`
  padding: 15px 40px;
  background: var(--amazon-orange);
  color: white;
  font-weight: bold;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background: #f3a847;
  }

  @media (max-width: 768px) {
    padding: 12px 30px;
  }
`;

export default HomePage;

// Animated item wrapper
const AnimItem = styled.div`
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s ease;

  &.in-view {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Slider enhancements
const BannerOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.45) 100%);
  pointer-events: none;
`;

const progressAnim = keyframes`
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
`;

const Progress = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(255,255,255,0.25);
  overflow: hidden;
  z-index: 10;
`;

const ProgressFill = styled.div`
  width: 100%;
  height: 100%;
  background: var(--amazon-yellow);
  transform-origin: left;
  animation: ${progressAnim} 5s linear forwards;
`;

const BannerCTA = styled.div`
  display: inline-flex;
`;

// Reuse existing nav button styles
const NavButton = BannerNavButton;

// Edge gradient fades
const EdgeFadeLeft = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 180px;
  background: linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0) 100%);
  pointer-events: none;
  z-index: 5;
  @media (max-width: 768px) { width: 90px; }
`;

const EdgeFadeRight = styled(EdgeFadeLeft)`
  left: auto;
  right: 0;
  background: linear-gradient(270deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0) 100%);
`;
