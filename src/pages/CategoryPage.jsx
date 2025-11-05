import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard/ProductCard';
import { products, categories } from '../data/mockData';
import { sortProducts } from '../utils/helpers';

const CategoryPage = () => {
  const { slug } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');
  const category = categories.find(c => c.slug === slug);

  useEffect(() => {
    let filtered = products.filter(p => p.category === slug);
    filtered = sortProducts(filtered, sortBy);
    setCategoryProducts(filtered);
  }, [slug, sortBy]);

  if (!category) {
    return <NotFound>Category not found</NotFound>;
  }

  return (
    <Container
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Header
        as={motion.div}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <CategoryInfo as={motion.div} layout>
          <CategoryIcon>{category.icon}</CategoryIcon>
          <div>
            <CategoryName>{category.name}</CategoryName>
            <ProductCount>{categoryProducts.length} products</ProductCount>
          </div>
        </CategoryInfo>
        <SortSelect
          as={motion.select}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          whileFocus={{ boxShadow: '0 0 0 3px rgba(0, 153, 255, 0.25)' }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <option value="relevance">Sort by: Relevance</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Customer Rating</option>
          <option value="newest">Newest Arrivals</option>
          <option value="popularity">Popularity</option>
        </SortSelect>
      </Header>

      <ProductGrid as={motion.div} layout>
        <AnimatePresence>
          {categoryProducts.map(product => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              whileHover={{ y: -4 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </ProductGrid>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background: var(--bg-secondary);
  padding: 20px;
`;

const Header = styled.div`
  max-width: 1500px;
  margin: 0 auto 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg-primary);
  padding: 20px;
  border-radius: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }
`;

const CategoryInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const CategoryIcon = styled.div`
  font-size: 48px;
`;

const CategoryName = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: var(--text-primary);

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const ProductCount = styled.div`
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 5px;
`;

const SortSelect = styled.select`
  padding: 10px 15px;
  border: 1px solid var(--border-light);
  border-radius: 4px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 14px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ProductGrid = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
  }
`;

const NotFound = styled.div`
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: var(--text-primary);
`;

export default CategoryPage;
