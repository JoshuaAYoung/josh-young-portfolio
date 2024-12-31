import React from 'react';
import './SwipeButton.scss';

interface SwipeButtonProps {
  variant?: 'outline-dark' | 'outline-secondary' | 'solid-secondary';
  children: React.ReactNode;
  onClick?: () => void;
  containerClassName?: string;
  large?: boolean;
}

const SwipeButton: React.FC<SwipeButtonProps> = ({
  variant = 'outline-secondary',
  children,
  onClick,
  containerClassName,
  large,
}) => {
  const compiledClassName = `swipe-button ${variant ? `${variant}` : ''} ${
    containerClassName || ''
  } ${large ? 'large' : ''}`;
  return (
    <button onClick={onClick} type="button" className={compiledClassName}>
      {children}
    </button>
  );
};

export default SwipeButton;
