import React from 'react';
import './SwipeButton.scss';

interface SwipeButtonProps {
  variant?: 'outline-dark' | 'outline-secondary' | 'solid-secondary';
  children: React.ReactNode;
  onClick?: () => void;
  containerClassName?: string;
}

const SwipeButton: React.FC<SwipeButtonProps> = ({
  variant = 'outline-secondary',
  children,
  onClick,
  containerClassName,
}) => {
  const compiledClassName = `swipe-button ${variant ? `${variant}` : ''} ${
    containerClassName || ''
  }`;
  return (
    <button onClick={onClick} type="button" className={compiledClassName}>
      {children}
    </button>
  );
};

export default SwipeButton;
