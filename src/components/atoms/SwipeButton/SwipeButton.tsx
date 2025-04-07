import { useEffect, useMemo } from 'react';
import './SwipeButton.scss';
import StatusContentContainer from './StatusContentContainer';

interface SwipeButtonProps {
  variant?: 'outline-dark' | 'outline-secondary' | 'solid-secondary';
  children: React.ReactNode;
  onClick?: () => void;
  containerClassName?: string;
  size?: 'large' | 'medium' | 'small';
  extraWide?: boolean;
  isSubmit?: boolean;
  loading?: boolean;
  showStatus?: boolean;
  success?: boolean;
  setSuccess?: (success: boolean) => void;
  failure?: boolean;
  setFailure?: (failure: boolean) => void;
}

const SwipeButton: React.FC<SwipeButtonProps> = ({
  variant = 'outline-secondary',
  children,
  onClick,
  containerClassName,
  size = 'medium',
  extraWide = false,
  isSubmit = false,
  loading,
  showStatus,
  success,
  setSuccess,
  failure,
  setFailure,
}) => {
  // COMPUTED VAR(S)
  const compiledClassName = useMemo(() => {
    return `swipe-button ${variant ? `${variant}` : ''} ${
      containerClassName || ''
    } ${size} ${extraWide ? 'extra-wide' : ''} ${loading ? 'loading' : ''} ${
      success ? 'success' : ''
    } ${failure ? 'failure' : ''}`;
  }, [success, failure, loading, variant, containerClassName, size, extraWide]);

  const iconDelay = 2500;

  // EFFECT(S)
  useEffect(() => {
    if (success && setSuccess) {
      const timer = setTimeout(() => setSuccess(false), iconDelay);
      return () => clearTimeout(timer);
    }
    if (failure && setFailure) {
      const timer = setTimeout(() => setFailure(false), iconDelay);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [success, failure]);

  return (
    <button
      onClick={onClick}
      type={isSubmit ? 'submit' : 'button'}
      className={compiledClassName}
      disabled={loading || success || failure}
    >
      {showStatus ? (
        <StatusContentContainer
          loading={loading}
          success={success}
          failure={failure}
        >
          {children}
        </StatusContentContainer>
      ) : (
        children
      )}
    </button>
  );
};

export default SwipeButton;
