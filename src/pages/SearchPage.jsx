import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaFilter, FaTimes } from 'react-icons/fa';
import ProductCard from '../components/ProductCard/ProductCard';
import { products, categories } from '../data/mockData';
import { filterProducts, sortProducts, fuzzySearch } from '../utils/helpers';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 200000],
    rating: 0,
    brand: [],
    isPrime: false
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);

  const brands = [...new Set(products.map(p => p.brand))];

  useEffect(() => {
    let results = products.filter(product => 
      fuzzySearch(query, product.name) ||
      fuzzySearch(query, product.brand) ||
      fuzzySearch(query, product.category) ||
      fuzzySearch(query, product.description)
    );

    results = filterProducts(results, filters);
    results = sortProducts(results, sortBy);
    setFilteredProducts(results);
  }, [query, filters, sortBy]);

  const handleBrandToggle = (brand) => {
    setFilters(prev => ({
      ...prev,
      brand: prev.brand.includes(brand)
        ? prev.brand.filter(b => b !== brand)
        : [...prev.brand, brand]
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: [0, 200000],
      rating: 0,
      brand: [],
      isPrime: false
    });
  };

  return (
    <Container>
      <Header>
        <ResultsInfo>
          {filteredProducts.length} results for "{query}"
        </ResultsInfo>
        <Controls>
          <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="relevance">Sort by: Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
            <option value="newest">Newest Arrivals</option>
            <option value="popularity">Popularity</option>
          </SortSelect>
          <FilterButton onClick={() => setShowFilters(!showFilters)}>
            <FaFilter /> Filters
          </FilterButton>
        </Controls>
      </Header>

      <Content>
        <Sidebar $show={showFilters}>
          <SidebarHeader>
            <h3>Filters</h3>
            <CloseButton onClick={() => setShowFilters(false)}>
              <FaTimes />
            </CloseButton>
          </SidebarHeader>

          <FilterSection>
            <FilterTitle>Category</FilterTitle>
            {categories.map(cat => (
              <FilterOption key={cat.id}>
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === cat.slug}
                  onChange={() => setFilters({...filters, category: cat.slug})}
                />
                <label>{cat.name}</label>
              </FilterOption>
            ))}
            {filters.category && (
              <ClearButton onClick={() => setFilters({...filters, category: ''})}>
                Clear
              </ClearButton>
            )}
          </FilterSection>

          <FilterSection>
            <FilterTitle>Price Range</FilterTitle>
            <PriceInputs>
              <input
                type="number"
                placeholder="Min"
                value={filters.priceRange[0]}
                onChange={(e) => setFilters({
                  ...filters,
                  priceRange: [parseInt(e.target.value) || 0, filters.priceRange[1]]
                })}
              />
              <span>to</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.priceRange[1]}
                onChange={(e) => setFilters({
                  ...filters,
                  priceRange: [filters.priceRange[0], parseInt(e.target.value) || 200000]
                })}
              />
            </PriceInputs>
          </FilterSection>

          <FilterSection>
            <FilterTitle>Customer Rating</FilterTitle>
            {[4, 3, 2, 1].map(rating => (
              <FilterOption key={rating}>
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === rating}
                  onChange={() => setFilters({...filters, rating})}
                />
                <label>⭐ {rating} & Up</label>
              </FilterOption>
            ))}
            {filters.rating > 0 && (
              <ClearButton onClick={() => setFilters({...filters, rating: 0})}>
                Clear
              </ClearButton>
            )}
          </FilterSection>

          <FilterSection>
            <FilterTitle>Brand</FilterTitle>
            <BrandList>
              {brands.slice(0, 10).map(brand => (
                <FilterOption key={brand}>
                  <input
                    type="checkbox"
                    checked={filters.brand.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                  />
                  <label>{brand}</label>
                </FilterOption>
              ))}
            </BrandList>
          </FilterSection>

          <FilterSection>
            <FilterOption>
              <input
                type="checkbox"
                checked={filters.isPrime}
                onChange={(e) => setFilters({...filters, isPrime: e.target.checked})}
              />
              <label>Prime Eligible</label>
            </FilterOption>
          </FilterSection>

          <ClearAllButton onClick={clearFilters}>
            Clear All Filters
          </ClearAllButton>
        </Sidebar>

        <ProductsSection>
          {filteredProducts.length > 0 ? (
            <ProductGrid>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductGrid>
          ) : (
            <NoResults>
              <NoResultsIcon>🔍</NoResultsIcon>
              <NoResultsTitle>No results found</NoResultsTitle>
              <NoResultsText>Try different keywords or remove filters</NoResultsText>
            </NoResults>
          )}
        </ProductsSection>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background: var(--bg-secondary);
`;

const Header = styled.div`
  background: var(--bg-primary);
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-light);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
`;

const ResultsInfo = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SortSelect = styled.select`
  padding: 8px 15px;
  border: 1px solid var(--border-light);
  border-radius: 4px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 14px;
  cursor: pointer;

  @media (max-width: 768px) {
    flex: 1;
  }
`;

const FilterButton = styled.button`
  padding: 8px 15px;
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text-primary);

  &:hover {
    background: var(--bg-hover);
  }

  svg {
    font-size: 14px;
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

const Content = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 20px;
  padding: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 10px;
  }
`;

const Sidebar = styled.aside`
  background: var(--bg-primary);
  border-radius: 8px;
  padding: 20px;
  height: fit-content;
  position: sticky;
  top: 80px;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    border-radius: 0;
    overflow-y: auto;
    transform: translateX(${props => props.$show ? '0' : '-100%'});
    transition: transform 0.3s ease;
  }
`;

const SidebarHeader = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--border-light);

    h3 {
      font-size: 20px;
      color: var(--text-primary);
    }
  }
`;

const CloseButton = styled.button`
  background: transparent;
  color: var(--text-primary);
  padding: 5px;
  font-size: 20px;

  &:hover {
    color: var(--amazon-orange);
  }
`;

const FilterSection = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid var(--border-light);

  &:last-child {
    border-bottom: none;
  }
`;

const FilterTitle = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: var(--text-primary);
`;

const FilterOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 0;

  input[type="checkbox"],
  input[type="radio"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  label {
    font-size: 14px;
    color: var(--text-primary);
    cursor: pointer;
  }
`;

const PriceInputs = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  input {
    flex: 1;
    padding: 8px;
    border: 1px solid var(--border-light);
    border-radius: 4px;
    font-size: 14px;
    background: var(--bg-primary);
    color: var(--text-primary);
  }

  span {
    font-size: 14px;
    color: var(--text-secondary);
  }
`;

const BrandList = styled.div`
  max-height: 200px;
  overflow-y: auto;
`;

const ClearButton = styled.button`
  background: transparent;
  color: var(--text-link);
  font-size: 12px;
  margin-top: 5px;
  text-decoration: underline;

  &:hover {
    color: var(--amazon-orange);
  }
`;

const ClearAllButton = styled.button`
  width: 100%;
  padding: 10px;
  background: var(--amazon-blue);
  color: white;
  border-radius: 4px;
  font-weight: bold;
  margin-top: 20px;

  &:hover {
    background: var(--amazon-light-blue);
  }
`;

const ProductsSection = styled.div``;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 80px 20px;
`;

const NoResultsIcon = styled.div`
  font-size: 80px;
  margin-bottom: 20px;
`;

const NoResultsTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 10px;
`;

const NoResultsText = styled.p`
  font-size: 16px;
  color: var(--text-secondary);
`;

export default SearchPage;
