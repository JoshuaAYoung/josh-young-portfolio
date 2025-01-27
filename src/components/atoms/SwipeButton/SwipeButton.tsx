import React from 'react';
import './SwipeButton.scss';

interface SwipeButtonProps {
  variant?: 'outline-dark' | 'outline-secondary' | 'solid-secondary';
  children: React.ReactNode;
  onClick?: () => void;
  containerClassName?: string;
  size?: 'large' | 'medium' | 'small';
}

const SwipeButton: React.FC<SwipeButtonProps> = ({
  variant = 'outline-secondary',
  children,
  onClick,
  containerClassName,
  size = 'medium',
}) => {
  const compiledClassName = `swipe-button ${variant ? `${variant}` : ''} ${
    containerClassName || ''
  } ${size}`;
  return (
    <button onClick={onClick} type="button" className={compiledClassName}>
      {children}
    </button>
  );
};

export default SwipeButton;
