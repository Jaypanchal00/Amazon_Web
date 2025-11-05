import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    /* Light Theme Colors */
    --amazon-orange: #FF9900;
    --amazon-blue: #232F3E;
    --amazon-light-blue: #37475A;
    --amazon-yellow: #FEBD69;
    --amazon-green: #007600;
    --amazon-red: #B12704;
    
    /* Background Colors */
    --bg-primary: #FFFFFF;
    --bg-secondary: #F3F3F3;
    --bg-tertiary: #EAEDED;
    --bg-hover: #F7F7F7;
    
    /* Text Colors */
    --text-primary: #0F1111;
    --text-secondary: #565959;
    --text-tertiary: #007185;
    --text-link: #007185;
    
    /* Border Colors */
    --border-light: #D5D9D9;
    --border-medium: #888C8C;
    --border-dark: #0F1111;
    
    /* Shadow */
    --shadow-sm: 0 2px 5px rgba(15, 17, 17, 0.15);
    --shadow-md: 0 4px 8px rgba(15, 17, 17, 0.15);
    --shadow-lg: 0 8px 16px rgba(15, 17, 17, 0.15);
  }

  /* Reduced motion accessibility */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  [data-theme='dark'] {
    /* Dark Theme Colors */
    --bg-primary: #131921;
    --bg-secondary: #232F3E;
    --bg-tertiary: #37475A;
    --bg-hover: #2A3A4F;
    
    --text-primary: #FFFFFF;
    --text-secondary: #CCCCCC;
    --text-tertiary: #00A8E1;
    --text-link: #00A8E1;
    
    --border-light: #3A4553;
    --border-medium: #555F6D;
    --border-dark: #FFFFFF;
    
    --shadow-sm: 0 2px 5px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.3);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Amazon Ember', Arial, sans-serif;
    background-color: var(--bg-secondary);
    color: var(--text-primary);
    line-height: 1.6;
    overflow-x: hidden;
  }

  html {
    scroll-behavior: smooth;
  }

  a {
    text-decoration: none;
    color: var(--text-link);
    
    &:hover {
      color: var(--amazon-orange);
      text-decoration: underline;
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  input, textarea, select {
    font-family: inherit;
    outline: none;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ul, ol {
    list-style: none;
  }

  /* Scrollbar Styles */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: var(--bg-tertiary);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--border-medium);
    border-radius: 5px;
    
    &:hover {
      background: var(--border-dark);
    }
  }

  /* Selection */
  ::selection {
    background: var(--amazon-yellow);
    color: var(--amazon-blue);
  }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideInUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideInDown {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* Utility Classes */
  .container {
    max-width: 1500px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .text-center {
    text-align: center;
  }

  .text-right {
    text-align: right;
  }

  .flex {
    display: flex;
  }

  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flex-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .grid {
    display: grid;
  }

  .mt-1 { margin-top: 0.5rem; }
  .mt-2 { margin-top: 1rem; }
  .mt-3 { margin-top: 1.5rem; }
  .mt-4 { margin-top: 2rem; }

  .mb-1 { margin-bottom: 0.5rem; }
  .mb-2 { margin-bottom: 1rem; }
  .mb-3 { margin-bottom: 1.5rem; }
  .mb-4 { margin-bottom: 2rem; }

  .p-1 { padding: 0.5rem; }
  .p-2 { padding: 1rem; }
  .p-3 { padding: 1.5rem; }
  .p-4 { padding: 2rem; }

  /* Skeleton Loading */
  .skeleton {
    background: linear-gradient(
      90deg,
      var(--bg-tertiary) 25%,
      var(--bg-hover) 50%,
      var(--bg-tertiary) 75%
    );
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .container {
      padding: 0 15px;
    }
  }

  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
    
    .container {
      padding: 0 10px;
    }
  }
`;

export default GlobalStyles;
