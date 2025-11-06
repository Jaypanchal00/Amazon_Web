import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { 
  FaSearch, FaShoppingCart, FaMapMarkerAlt, FaBars, 
  FaUser, FaHeart, FaMicrophone, FaTimes 
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useTheme } from '../../contexts/ThemeContext';
import { categories, products } from '../../data/mockData';
import { debounce, fuzzySearch } from '../../utils/helpers';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const buildSuggestions = (q) => {
    const query = q.trim().toLowerCase();
    if (!query) {
      setSuggestions([]);
      setShowSuggestions(false);
      setActiveIndex(-1);
      return;
    }

    const scored = products.map(p => {
      let score = 0;
      const name = p.name.toLowerCase();
      const brand = (p.brand || '').toLowerCase();
      const category = (p.category || '').toLowerCase();
      const desc = (p.description || '').toLowerCase();

      if (name.includes(query)) score += 5;
      if (brand.includes(query)) score += 3;
      if (category.includes(query)) score += 2;
      if (desc.includes(query)) score += 1;
      if (score === 0) {
        const fs = (
          fuzzySearch(query, p.name) ||
          fuzzySearch(query, p.brand || '') ||
          fuzzySearch(query, p.category || '') ||
          fuzzySearch(query, p.description || '')
        );
        if (fs) score += 1;
      }
      return { p, score };
    })
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(x => x.p);

    setSuggestions(scored);
    setShowSuggestions(scored.length > 0);
    setActiveIndex(-1);
  };

  const debouncedSuggest = useMemo(() => debounce(buildSuggestions, 200), []);

  useEffect(() => {
    debouncedSuggest(searchQuery);
  }, [searchQuery, debouncedSuggest]);

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'en-US';
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        navigate(`/search?q=${encodeURIComponent(transcript)}`);
      };
      
      recognition.start();
    } else {
      alert('Voice search not supported in your browser');
    }
  };

  const handleLogout = () => {
    logout();
    setShowAccountMenu(false);
    navigate('/');
  };

  return (
    <>
      <NavbarContainer>
        {/* Top Navbar */}
        <TopNav>
          <Logo to="/">
            <img src="/logo.png" alt="Amazon Clone" onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<span style="color: white; font-size: 24px; font-weight: bold;">amazon.in</span>';
            }} />
          </Logo>

          <DeliveryLocation>
            <FaMapMarkerAlt />
            <div>
              <Small>Deliver to</Small>
              <Location>India</Location>
            </div>
          </DeliveryLocation>

          <SearchWrap>
            <SearchBar onSubmit={handleSearch}>
              <SearchInput
                type="text"
                placeholder="Search Amazon.in"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(suggestions.length > 0)}
                onKeyDown={(e) => {
                  if (!showSuggestions) return;
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setActiveIndex(prev => Math.min(prev + 1, suggestions.length - 1));
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setActiveIndex(prev => Math.max(prev - 1, 0));
                  } else if (e.key === 'Enter') {
                    if (activeIndex >= 0 && activeIndex < suggestions.length) {
                      e.preventDefault();
                      const sel = suggestions[activeIndex];
                      setShowSuggestions(false);
                      navigate(`/product/${sel.id}`);
                    }
                  } else if (e.key === 'Escape') {
                    setShowSuggestions(false);
                  }
                }}
              />
              <VoiceButton 
                type="button" 
                onClick={handleVoiceSearch}
                $isListening={isListening}
              >
                <FaMicrophone />
              </VoiceButton>
              <SearchButton type="submit">
                <FaSearch />
              </SearchButton>
            </SearchBar>

            {showSuggestions && (
              <SuggestDropdown
                onMouseDown={(e) => e.preventDefault()}
              >
                {suggestions.map((s, idx) => (
                  <SuggestItem
                    key={s.id}
                    $active={idx === activeIndex}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => {
                      setShowSuggestions(false);
                      navigate(`/product/${s.id}`);
                    }}
                  >
                    <SuggestThumb src={s.image} alt={s.name} />
                    <SuggestText>
                      <SuggestName>{s.name}</SuggestName>
                      <SuggestMeta>{s.brand} • {s.category}</SuggestMeta>
                    </SuggestText>
                  </SuggestItem>
                ))}
                <SuggestFooter onClick={() => { setShowSuggestions(false); navigate(`/search?q=${encodeURIComponent(searchQuery)}`); }}>
                  See all results for "{searchQuery}"
                </SuggestFooter>
              </SuggestDropdown>
            )}
          </SearchWrap>

          <NavOptions>
            <NavOption 
              onMouseEnter={() => setShowAccountMenu(true)}
              onMouseLeave={() => setShowAccountMenu(false)}
            >
              <Small>Hello, {isAuthenticated ? user.name : 'Sign in'}</Small>
              <Strong>Account & Lists</Strong>
              {showAccountMenu && (
                <AccountDropdown>
                  {!isAuthenticated ? (
                    <>
                      <DropdownButton onClick={() => navigate('/login')}>
                        Sign In
                      </DropdownButton>
                      <DropdownLink to="/signup">New customer? Start here.</DropdownLink>
                    </>
                  ) : (
                    <>
                      <DropdownLink to="/profile">Your Account</DropdownLink>
                      <DropdownLink to="/orders">Your Orders</DropdownLink>
                      <DropdownLink to="/wishlist">Your Wishlist</DropdownLink>
                      <DropdownLink to="/addresses">Your Addresses</DropdownLink>
                      {user.isPrime && (
                        <DropdownLink to="/prime">Prime Membership</DropdownLink>
                      )}
                      <DropdownDivider />
                      <DropdownButton onClick={handleLogout}>Sign Out</DropdownButton>
                    </>
                  )}
                </AccountDropdown>
              )}
            </NavOption>

            <NavOption onClick={() => navigate('/orders')}>
              <Small>Returns</Small>
              <Strong>& Orders</Strong>
            </NavOption>

            <NavOption onClick={() => navigate('/wishlist')}>
              <WishlistIcon>
                <FaHeart />
                {wishlistCount > 0 && <Badge>{wishlistCount}</Badge>}
              </WishlistIcon>
              <Strong>Wishlist</Strong>
            </NavOption>

            <NavOption onClick={() => navigate('/cart')}>
              <CartIcon>
                <FaShoppingCart />
                {getCartCount() > 0 && <Badge>{getCartCount()}</Badge>}
              </CartIcon>
              <Strong>Cart</Strong>
            </NavOption>

            <ThemeToggle onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'}
            </ThemeToggle>
          </NavOptions>

          <MobileMenuButton onClick={() => setShowMobileMenu(!showMobileMenu)}>
            {showMobileMenu ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
        </TopNav>

        {/* Bottom Navbar */}
        <BottomNav>
          <NavLink onClick={() => setShowCategories(!showCategories)}>
            <FaBars /> All
          </NavLink>
          {user?.isPrime && <PrimeLink to="/prime">Prime</PrimeLink>}
        </BottomNav>
      </NavbarContainer>

      {/* Categories Dropdown */}
      {showCategories && (
        <CategoriesDropdown>
          <CategoryTitle>Shop by Category</CategoryTitle>
          {categories.map(cat => (
            <CategoryItem 
              key={cat.id}
              onClick={() => {
                navigate(`/category/${cat.slug}`);
                setShowCategories(false);
              }}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </CategoryItem>
          ))}
        </CategoriesDropdown>
      )}

      {/* Mobile Menu */}
      {showMobileMenu && (
        <MobileMenu>
          <MobileMenuItem onClick={() => { navigate('/'); setShowMobileMenu(false); }}>
            Home
          </MobileMenuItem>
          <MobileMenuItem onClick={() => { navigate('/wishlist'); setShowMobileMenu(false); }}>
            Wishlist ({wishlistCount})
          </MobileMenuItem>
          <MobileMenuItem onClick={() => { navigate('/cart'); setShowMobileMenu(false); }}>
            Cart ({getCartCount()})
          </MobileMenuItem>
          {isAuthenticated ? (
            <>
              <MobileMenuItem onClick={() => { navigate('/profile'); setShowMobileMenu(false); }}>
                Your Account
              </MobileMenuItem>
              <MobileMenuItem onClick={() => { navigate('/orders'); setShowMobileMenu(false); }}>
                Your Orders
              </MobileMenuItem>
              <MobileMenuItem onClick={handleLogout}>
                Sign Out
              </MobileMenuItem>
            </>
          ) : (
            <MobileMenuItem onClick={() => { navigate('/login'); setShowMobileMenu(false); }}>
              Sign In
            </MobileMenuItem>
          )}
        </MobileMenu>
      )}
    </>
  );
};

// Styled Components
const NavbarContainer = styled.nav`
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: var(--amazon-blue);
  color: white;
`;

const TopNav = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 10px;
    padding: 10px;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  
  img {
    height: 35px;
    width: auto;
  }

  @media (max-width: 768px) {
    img {
      height: 28px;
    }
  }
`;

const DeliveryLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 2px;
  transition: border 0.2s;
  border: 1px solid transparent;

  &:hover {
    border-color: white;
  }

  svg {
    font-size: 20px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Small = styled.span`
  font-size: 12px;
  color: #ccc;
  display: block;
`;

const Location = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

const Strong = styled.span`
  font-size: 14px;
  font-weight: bold;
  display: block;
`;

const SearchBar = styled.form`
  flex: 1;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 4px;
  overflow: hidden;

  @media (max-width: 768px) {
    order: 3;
    width: 100%;
  }
`;

const SearchWrap = styled.div`
  position: relative;
  flex: 1;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  font-size: 14px;
  color: var(--text-primary);

  &::placeholder {
    color: var(--text-secondary);
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const VoiceButton = styled.button`
  background: transparent;
  color: ${props => props.$isListening ? 'red' : 'var(--text-secondary)'};
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  &:hover {
    color: var(--amazon-orange);
  }

  svg {
    font-size: 18px;
  }
`;

const SearchButton = styled.button`
  background: var(--amazon-orange);
  color: var(--amazon-blue);
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f3a847;
  }

  svg {
    font-size: 18px;
  }
`;

const SuggestDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  color: var(--text-primary);
  border-radius: 4px;
  box-shadow: var(--shadow-lg);
  margin-top: 6px;
  max-height: 60vh;
  overflow-y: auto;
  z-index: 1002;

  @media (max-width: 768px) {
    left: -10px;
    right: -10px;
    max-width: 100vw;
  }
`;

const SuggestItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  cursor: pointer;
  background: ${props => props.$active ? 'var(--bg-hover)' : 'transparent'};

  &:hover {
    background: var(--bg-hover);
  }
`;

const SuggestThumb = styled.img`
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 4px;
  background: #f5f5f5;
`;

const SuggestText = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const SuggestName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SuggestMeta = styled.span`
  font-size: 12px;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SuggestFooter = styled.div`
  padding: 10px 12px;
  border-top: 1px solid var(--border-light);
  color: var(--amazon-blue);
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: var(--bg-hover);
  }
`;

const NavOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavOption = styled.div`
  position: relative;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 2px;
  border: 1px solid transparent;
  transition: border 0.2s;

  &:hover {
    border-color: white;
  }
`;

const AccountDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  color: var(--text-primary);
  min-width: 250px;
  border-radius: 4px;
  box-shadow: var(--shadow-lg);
  padding: 15px;
  margin-top: 5px;
  animation: slideInDown 0.2s ease;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 10px;
  background: var(--amazon-yellow);
  color: var(--amazon-blue);
  border-radius: 4px;
  font-weight: bold;
  margin-bottom: 10px;

  &:hover {
    background: #f0c14b;
  }
`;

const DropdownLink = styled(Link)`
  display: block;
  padding: 8px 0;
  color: var(--text-primary);
  font-size: 14px;

  &:hover {
    color: var(--amazon-orange);
    text-decoration: none;
  }
`;

const DropdownDivider = styled.div`
  height: 1px;
  background: var(--border-light);
  margin: 10px 0;
`;

const CartIcon = styled.div`
  position: relative;
  font-size: 28px;
`;

const WishlistIcon = styled.div`
  position: relative;
  font-size: 24px;
`;

const Badge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--amazon-orange);
  color: var(--amazon-blue);
  font-size: 12px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 50%;
  min-width: 20px;
  text-align: center;
`;

const ThemeToggle = styled.button`
  background: transparent;
  font-size: 20px;
  padding: 5px 10px;
  border: 1px solid transparent;
  border-radius: 2px;

  &:hover {
    border-color: white;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  color: white;
  font-size: 24px;
  padding: 5px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const BottomNav = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 8px 20px;
  background: var(--amazon-light-blue);
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 4px;
  }

  @media (max-width: 768px) {
    gap: 15px;
    padding: 8px 10px;
  }
`;

const NavLink = styled(Link)`
  color: white;
  font-size: 14px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: 2px;
  border: 1px solid transparent;

  &:hover {
    border-color: white;
    text-decoration: none;
  }
`;

const PrimeLink = styled(NavLink)`
  color: var(--amazon-yellow);
  font-weight: bold;
`;

const CategoriesDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 300px;
  background: white;
  color: var(--text-primary);
  box-shadow: var(--shadow-lg);
  max-height: 80vh;
  overflow-y: auto;
  z-index: 999;
  animation: slideInDown 0.2s ease;
`;

const CategoryTitle = styled.div`
  padding: 15px;
  font-weight: bold;
  font-size: 18px;
  border-bottom: 1px solid var(--border-light);
`;

const CategoryItem = styled.div`
  padding: 12px 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: var(--bg-hover);
  }

  span:first-child {
    font-size: 20px;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 80%;
  max-width: 350px;
  height: 100vh;
  background: white;
  color: var(--text-primary);
  box-shadow: var(--shadow-lg);
  z-index: 1001;
  overflow-y: auto;
  animation: slideInLeft 0.3s ease;

  @keyframes slideInLeft {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

const MobileMenuItem = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid var(--border-light);
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: var(--bg-hover);
  }
`;

export default Navbar;
