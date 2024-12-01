import { Link } from 'react-scroll';

interface ScrollLinkProps {
  to: string;
  children: React.ReactNode;
  duration?: number;
  className?: string;
  activeClass?: string;
  onClick?(): void;
  onSetActive?(to: string): void;
  onKeyDown?(event: React.KeyboardEvent<HTMLElement>): void;
}

function ScrollLink({
  to,
  children,
  duration = 500,
  className,
  activeClass,
  onClick,
  onSetActive,
  onKeyDown,
}: ScrollLinkProps) {
  return (
    <Link
      to={to}
      smooth
      spy
      duration={duration}
      className={className}
      activeClass={activeClass}
      onClick={onClick}
      onSetActive={onSetActive}
      onKeyDown={onKeyDown}
    >
      {children}
    </Link>
  );
}

export default ScrollLink;
