import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaStar, FaHeart, FaRegHeart, FaShoppingCart, FaTruck, FaUndo, FaShieldAlt } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useNotification } from '../contexts/NotificationContext';
import { useTheme } from '../contexts/ThemeContext';
import { products } from '../data/mockData';
import { getDeliveryDate } from '../utils/helpers';
import ProductCard from '../components/ProductCard/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { success, warning } = useNotification();
  const { formatPrice } = useTheme();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [pincode, setPincode] = useState('');
  const [deliveryAvailable, setDeliveryAvailable] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Add to recently viewed
      const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
      const filtered = recentlyViewed.filter(p => p.id !== foundProduct.id);
      filtered.unshift(foundProduct);
      localStorage.setItem('recentlyViewed', JSON.stringify(filtered.slice(0, 20)));

      // Get related products
      const related = products.filter(p => 
        p.category === foundProduct.category && p.id !== foundProduct.id
      ).slice(0, 8);
      setRelatedProducts(related);

      // Set default selections
      if (foundProduct.sizes) setSelectedSize(foundProduct.sizes[0]);
      if (foundProduct.colors) setSelectedColor(foundProduct.colors[0]);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      warning('Please login to add items to cart');
      navigate('/login?redirect=/product/' + id);
      return;
    }
    if (product.stock === 0) return;
    addToCart(product, quantity);
    success('Added to cart!');
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      warning('Please login to continue');
      navigate('/login?redirect=/product/' + id);
      return;
    }
    if (product.stock === 0) return;
    addToCart(product, quantity);
    navigate('/cart');
  };

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      warning('Please login to add items to wishlist');
      navigate('/login?redirect=/product/' + id);
      return;
    }
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      success('Removed from wishlist');
    } else {
      addToWishlist(product);
      success('Added to wishlist!');
    }
  };

  // Share removed

  const checkDelivery = () => {
    if (pincode.length === 6) {
      setDeliveryAvailable(true);
      success('Delivery available to this pincode!');
    } else {
      setDeliveryAvailable(false);
    }
  };

  if (!product) return <Loading>Loading...</Loading>;

  return (
    <Container>
      <ProductSection>
        <ImageSection>
          <MainImage>
            <img src={product.images?.[selectedImage] || product.image} alt={product.name} />
            {product.discount > 0 && (
              <DiscountBadge>{product.discount}% OFF</DiscountBadge>
            )}
          </MainImage>
          
          <ThumbnailGrid>
            {(product.images || [product.image]).map((img, index) => (
              <Thumbnail 
                key={index}
                $active={index === selectedImage}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`${product.name} ${index + 1}`} />
              </Thumbnail>
            ))}
          </ThumbnailGrid>

          <ActionButtons>
            <ActionButton onClick={handleWishlistToggle}>
              {isInWishlist(product.id) ? <FaHeart color="red" /> : <FaRegHeart />}
              <span>{isInWishlist(product.id) ? 'Wishlisted' : 'Add to Wishlist'}</span>
            </ActionButton>
          </ActionButtons>
        </ImageSection>

        <DetailsSection>
          <Brand>{product.brand}</Brand>
          <ProductName>{product.name}</ProductName>
          
          <RatingSection>
            <Rating>
              {[...Array(5)].map((_, i) => (
                <FaStar 
                  key={i} 
                  color={i < Math.floor(product.rating) ? '#FFA41C' : '#DDD'} 
                />
              ))}
              <RatingText>{product.rating}</RatingText>
            </Rating>
            <Reviews>{product.reviews.toLocaleString()} ratings</Reviews>
          </RatingSection>

          <Divider />

          <PriceSection>
            <PriceLabel>Price:</PriceLabel>
            <CurrentPrice>{formatPrice(product.discountPrice)}</CurrentPrice>
            {product.price !== product.discountPrice && (
              <>
                <OriginalPrice>{formatPrice(product.price)}</OriginalPrice>
                <SaveAmount>You Save: {formatPrice(product.price - product.discountPrice)} ({product.discount}%)</SaveAmount>
              </>
            )}
          </PriceSection>

          {/* EMI removed */}

          <Divider />

          {product.sizes && (
            <OptionSection>
              <OptionLabel>Size:</OptionLabel>
              <OptionButtons>
                {product.sizes.map(size => (
                  <OptionButton
                    key={size}
                    $active={selectedSize === size}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </OptionButton>
                ))}
              </OptionButtons>
            </OptionSection>
          )}

          {product.colors && (
            <OptionSection>
              <OptionLabel>Color:</OptionLabel>
              <OptionButtons>
                {product.colors.map(color => (
                  <OptionButton
                    key={color}
                    $active={selectedColor === color}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </OptionButton>
                ))}
              </OptionButtons>
            </OptionSection>
          )}

          <QuantitySection>
            <QuantityLabel>Quantity:</QuantityLabel>
            <QuantitySelector>
              <QuantityButton onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</QuantityButton>
              <QuantityDisplay>{quantity}</QuantityDisplay>
              <QuantityButton onClick={() => setQuantity(Math.min(10, quantity + 1))}>+</QuantityButton>
            </QuantitySelector>
            <StockInfo $inStock={product.stock > 0}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </StockInfo>
          </QuantitySection>

          <Divider />

          <BuySection>
            <BuyButton onClick={handleBuyNow} disabled={product.stock === 0}>
              Buy Now
            </BuyButton>
            <AddToCartButton onClick={handleAddToCart} disabled={product.stock === 0}>
              <FaShoppingCart /> Add to Cart
            </AddToCartButton>
          </BuySection>

          <DeliverySection>
            <DeliveryInput>
              <input 
                type="text" 
                placeholder="Enter pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                maxLength={6}
              />
              <button onClick={checkDelivery}>Check</button>
            </DeliveryInput>
            {deliveryAvailable !== null && (
              <DeliveryInfo $available={deliveryAvailable}>
                {deliveryAvailable 
                  ? `Delivery by ${getDeliveryDate(product.deliveryDays)}`
                  : 'Delivery not available to this pincode'
                }
              </DeliveryInfo>
            )}
          </DeliverySection>

          <Features>
            <Feature>
              <FaTruck />
              <span>Free Delivery on orders above ₹500</span>
            </Feature>
            <Feature>
              <FaUndo />
              <span>{product.returnable ? '7 days return policy' : 'Non-returnable'}</span>
            </Feature>
            <Feature>
              <FaShieldAlt />
              <span>{product.warranty || 'No warranty'}</span>
            </Feature>
          </Features>
        </DetailsSection>
      </ProductSection>

      <DescriptionSection>
        <SectionTitle>Product Description</SectionTitle>
        <Description>{product.description}</Description>
        
        {product.features && (
          <>
            <SectionTitle>Key Features</SectionTitle>
            <FeaturesList>
              {product.features.map((feature, index) => (
                <FeatureItem key={index}>✓ {feature}</FeatureItem>
              ))}
            </FeaturesList>
          </>
        )}

        {product.specifications && (
          <>
            <SectionTitle>Specifications</SectionTitle>
            <SpecTable>
              {Object.entries(product.specifications).map(([key, value]) => (
                <SpecRow key={key}>
                  <SpecKey>{key}</SpecKey>
                  <SpecValue>{value}</SpecValue>
                </SpecRow>
              ))}
            </SpecTable>
          </>
        )}
      </DescriptionSection>

      {relatedProducts.length > 0 && (
        <RelatedSection>
          <SectionTitle>Related Products</SectionTitle>
          <ProductGrid>
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </ProductGrid>
        </RelatedSection>
      )}

      {/* Share modal removed */}
    </Container>
  );
};

const Container = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding: 20px;
`;

const Loading = styled.div`
  text-align: center;
  padding: 100px 20px;
  font-size: 24px;
`;

const ProductSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ImageSection = styled.div``;

const MainImage = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  background: var(--bg-primary);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 20px;
  }
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background: var(--amazon-red);
  color: white;
  padding: 8px 15px;
  border-radius: 4px;
  font-weight: bold;
`;

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
`;

const Thumbnail = styled.div`
  padding-top: 100%;
  position: relative;
  background: var(--bg-primary);
  border-radius: 4px;
  border: 2px solid ${props => props.$active ? 'var(--amazon-orange)' : 'var(--border-light)'};
  cursor: pointer;
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 5px;
  }

  &:hover {
    border-color: var(--amazon-orange);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 12px;
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    border-color: var(--amazon-orange);
    background: var(--bg-hover);
  }

  svg {
    font-size: 18px;
  }
`;

const DetailsSection = styled.div`
  background: var(--bg-primary);
  padding: 30px;
  border-radius: 8px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Brand = styled.div`
  color: var(--text-link);
  font-size: 14px;
  margin-bottom: 5px;
  cursor: pointer;

  &:hover {
    color: var(--amazon-orange);
  }
`;

const ProductName = styled.h1`
  font-size: 28px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  svg {
    font-size: 16px;
  }
`;

const RatingText = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-left: 5px;
`;

const Reviews = styled.span`
  color: var(--text-link);
  cursor: pointer;

  &:hover {
    color: var(--amazon-orange);
  }
`;

const Divider = styled.div`
  height: 1px;
  background: var(--border-light);
  margin: 20px 0;
`;

const PriceSection = styled.div`
  margin-bottom: 15px;
`;

const PriceLabel = styled.span`
  font-size: 14px;
  color: var(--text-secondary);
  margin-right: 10px;
`;

const CurrentPrice = styled.span`
  font-size: 32px;
  font-weight: bold;
  color: var(--amazon-red);
  margin-right: 15px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const OriginalPrice = styled.span`
  font-size: 18px;
  color: var(--text-secondary);
  text-decoration: line-through;
  margin-right: 10px;
`;

const SaveAmount = styled.div`
  color: var(--amazon-green);
  font-size: 14px;
  font-weight: 600;
  margin-top: 5px;
`;

const OptionSection = styled.div`
  margin-bottom: 20px;
`;
const OptionLabel = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const OptionButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const OptionButton = styled.button`
  padding: 10px 20px;
  background: ${props => props.$active ? 'var(--amazon-blue)' : 'var(--bg-secondary)'};
  color: ${props => props.$active ? 'white' : 'var(--text-primary)'};
  border: 1px solid ${props => props.$active ? 'var(--amazon-blue)' : 'var(--border-light)'};
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    border-color: var(--amazon-blue);
  }
`;

const QuantitySection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const QuantityLabel = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--border-light);
  border-radius: 4px;
  overflow: hidden;
`;

const QuantityButton = styled.button`
  width: 40px;
  height: 40px;
  background: var(--bg-secondary);
  border: none;
  font-size: 18px;
  font-weight: bold;

  &:hover {
    background: var(--bg-tertiary);
  }
`;

const QuantityDisplay = styled.div`
  width: 50px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
`;

const StockInfo = styled.span`
  font-size: 14px;
  color: ${props => props.$inStock ? 'var(--amazon-green)' : 'var(--amazon-red)'};
  font-weight: 600;
`;

const BuySection = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const BuyButton = styled.button`
  flex: 1;
  padding: 15px;
  background: var(--amazon-orange);
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #f3a847;
    transform: scale(1.02);
  }

  &:disabled {
    background: var(--border-light);
    color: var(--text-secondary);
  }
`;

const AddToCartButton = styled.button`
  flex: 1;
  padding: 15px;
  background: var(--amazon-yellow);
  color: var(--amazon-blue);
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #f0c14b;
    transform: scale(1.02);
  }

  &:disabled {
    background: var(--border-light);
    color: var(--text-secondary);
  }

  svg {
    font-size: 20px;
  }
`;

const DeliverySection = styled.div`
  margin-bottom: 20px;
`;

const DeliveryInput = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;

  input {
    flex: 1;
    padding: 10px;
    border: 1px solid var(--border-light);
    border-radius: 4px;
    font-size: 14px;
  }

  button {
    padding: 10px 20px;
    background: var(--amazon-blue);
    color: white;
    border-radius: 4px;
    font-weight: bold;

    &:hover {
      background: var(--amazon-light-blue);
    }
  }
`;

const DeliveryInfo = styled.div`
  font-size: 14px;
  color: ${props => props.$available ? 'var(--amazon-green)' : 'var(--amazon-red)'};
  font-weight: 600;
`;

const Features = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: var(--text-secondary);

  svg {
    font-size: 18px;
    color: var(--amazon-green);
  }
`;

const DescriptionSection = styled.div`
  background: var(--bg-primary);
  padding: 30px;
  border-radius: 8px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
  color: var(--text-primary);

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 30px;
`;

const FeaturesList = styled.ul`
  margin-bottom: 30px;
`;

const FeatureItem = styled.li`
  font-size: 16px;
  line-height: 1.8;
  color: var(--text-secondary);
  padding-left: 10px;
`;

const SpecTable = styled.div`
  border: 1px solid var(--border-light);
  border-radius: 4px;
  overflow: hidden;
`;

const SpecRow = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  border-bottom: 1px solid var(--border-light);

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SpecKey = styled.div`
  padding: 15px;
  background: var(--bg-secondary);
  font-weight: 600;
  border-right: 1px solid var(--border-light);

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid var(--border-light);
  }
`;

const SpecValue = styled.div`
  padding: 15px;
  color: var(--text-secondary);
`;

const RelatedSection = styled.div`
  margin-bottom: 40px;
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


export default ProductDetailPage;
