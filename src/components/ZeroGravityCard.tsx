import React, { useRef, useState } from 'react';

interface ZeroGravityCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: '1' | '2' | '3' | 'none';
  intensity?: number;
  enableTilt?: boolean;
  className?: string;
}

export const ZeroGravityCard: React.FC<ZeroGravityCardProps> = ({
  children,
  variant = '1',
  intensity = 1,
  enableTilt = true,
  className = '',
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6 * intensity;
    const rotateY = ((x - centerX) / centerX) * 6 * intensity;
    const translateY = ((y - centerY) / centerY) * -4 * intensity;
    const translateX = ((x - centerX) / centerX) * -4 * intensity;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(${translateX.toFixed(1)}px, ${translateY.toFixed(1)}px, 12px)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)',
      transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
    });
  };

  const getAnimationClass = () => {
    if (isHovered || variant === 'none') return '';
    if (variant === '1') return 'animate-zero-g-1';
    if (variant === '2') return 'animate-zero-g-2';
    if (variant === '3') return 'animate-zero-g-3';
    return '';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className={`relative will-change-transform ${getAnimationClass()} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
