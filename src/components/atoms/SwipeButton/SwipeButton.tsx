// import { useState } from 'react';
import './SwipeButton.scss';

interface SwipeButtonProps {
  variant?: 'outline-dark' | 'outline-secondary' | 'solid-secondary';
  children: React.ReactNode;
  onClick?: () => void;
  containerClassName?: string;
  size?: 'large' | 'medium' | 'small';
  extraWide?: boolean;
  isSubmit?: boolean;
}

const SwipeButton: React.FC<SwipeButtonProps> = ({
  variant = 'outline-secondary',
  children,
  onClick,
  containerClassName,
  size = 'medium',
  extraWide = false,
  isSubmit = false,
}) => {
  // const [buttonState, setButtonState] = useState("neutral");

  const compiledClassName = `swipe-button ${variant ? `${variant}` : ''} ${
    containerClassName || ''
  } ${size} ${extraWide ? 'extra-wide' : ''}`;
  return (
    <button
      onClick={onClick}
      type={isSubmit ? 'submit' : 'button'}
      className={compiledClassName}
    >
      {children}
    </button>
  );
};

export default SwipeButton;
