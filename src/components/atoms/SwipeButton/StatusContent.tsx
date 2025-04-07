import { AnimatePresence, motion } from 'motion/react';

interface StatusContentProps {
  content?: React.ReactNode;
  visible?: boolean;
}

const StatusContent: React.FC<StatusContentProps> = ({ content, visible }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{
            // y: -12,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            // y: 12,
            opacity: 0,
          }}
          className="button-content-container"
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StatusContent;
