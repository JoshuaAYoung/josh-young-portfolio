import { ReactNode, useState } from 'react';
import { motion } from 'motion/react';
import './Tooltip.scss';
import InfoIcon from '../../../assets/icons/info.svg?react';

interface TooltipProps {
  content: string;
  position?: 'left' | 'bottom-left';
  children?: ReactNode;
  tooltipPopupClassName?: string;
}

const Tooltip = ({
  content,
  position = 'bottom-left',
  children,
  tooltipPopupClassName,
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);

  const triangleWidth = position === 'bottom-left' ? 18 : 9;
  const triangleHeight = position === 'bottom-left' ? 9 : 18;
  const triangleViewBox = `0 0 ${triangleWidth} ${triangleHeight}`;
  const trianglePoints =
    position === 'bottom-left' ? '0,9 18,9 9,0' : '0,0 9,9 0,18';

  return (
    <div
      className="tooltip-container"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <div className="tooltip-trigger">
        {children || (
          <InfoIcon
            className="tooltip-icon"
            color={visible ? 'var(--secondary-color)' : 'var(--primary-color)'}
          />
        )}
      </div>
      {visible && (
        <motion.div
          className={`tooltip-popup ${position} ${tooltipPopupClassName}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, transformOrigin: 'right' }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 150, damping: 15 }}
        >
          {content}
          <svg
            className={`tooltip-triangle ${position}`}
            width={triangleWidth}
            height={triangleHeight}
            viewBox={triangleViewBox}
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points={trianglePoints} />
          </svg>
        </motion.div>
      )}
    </div>
  );
};

export default Tooltip;
