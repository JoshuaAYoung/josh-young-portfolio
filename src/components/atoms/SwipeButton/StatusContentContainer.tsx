import { AnimatePresence, motion } from 'motion/react';
import LoadingIcon from '../../../assets/icons/loading.svg?react';
import SuccessIcon from '../../../assets/icons/success.svg?react';
import FailureIcon from '../../../assets/icons/fail.svg?react';

interface StatusContentContainerProps {
  children?: React.ReactNode;
  loading?: boolean;
  success?: boolean;
  failure?: boolean;
}

const StatusContentContainer: React.FC<StatusContentContainerProps> = ({
  children,
  loading,
  success,
  failure,
}) => {
  const fadeVariant = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.1 },
  };

  const spinVariant = {
    initial: { opacity: 0 },
    animate: { opacity: 1, rotate: 360 },
    exit: { opacity: 0 },
    transition: {
      opacity: { duration: 0.1 },
      rotate: { repeat: Infinity, duration: 1.5, ease: 'linear' },
    },
  };

  return (
    <div className="status-content-container">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            {...spinVariant}
            className="status-icon-container"
          >
            <LoadingIcon className="swipe-button-icon" />
          </motion.div>
        ) : success ? (
          <motion.div
            key="success"
            {...fadeVariant}
            className="status-icon-container"
          >
            <SuccessIcon className="swipe-button-icon" />
          </motion.div>
        ) : failure ? (
          <motion.div
            key="failure"
            {...fadeVariant}
            className="status-icon-container"
          >
            <FailureIcon className="swipe-button-icon" />
          </motion.div>
        ) : (
          <motion.div key="default" {...fadeVariant} className="text">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StatusContentContainer;
