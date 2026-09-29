import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device is touch-only
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    let animationFrameId: number;
    let targetX = -100;
    let targetY = -100;
    let currentTrailingX = -100;
    let currentTrailingY = -100;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer');
        setIsHovered(!!interactive);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth trailing ring lerp
    const updateTrailing = () => {
      currentTrailingX += (targetX - currentTrailingX) * 0.22;
      currentTrailingY += (targetY - currentTrailingY) * 0.22;
      setTrailingPos({ x: currentTrailingX, y: currentTrailingY });
      animationFrameId = requestAnimationFrame(updateTrailing);
    };

    animationFrameId = requestAnimationFrame(updateTrailing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="custom-cursor fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Outer Follower Ring */}
      <div
        className="fixed top-0 left-0 rounded-full border pointer-events-none transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) translate(-50%, -50%) scale(${
            isClicked ? 0.75 : isHovered ? 1.6 : 1
          })`,
          width: '32px',
          height: '32px',
          borderColor: isHovered ? 'rgba(167, 196, 181, 0.8)' : 'rgba(167, 196, 181, 0.4)',
          backgroundColor: isHovered ? 'rgba(167, 196, 181, 0.12)' : 'transparent',
          transition: 'transform 0.15s ease-out, background-color 0.2s ease, border-color 0.2s ease'
        }}
      />

      {/* Center Precise Dot */}
      <div
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${
            isClicked ? 1.4 : isHovered ? 0.5 : 1
          })`,
          width: '7px',
          height: '7px',
          backgroundColor: '#a7c4b5', // Soft pastel sage
          boxShadow: '0 0 8px rgba(167, 196, 181, 0.5)',
          transition: 'transform 0.1s ease-out'
        }}
      />
    </div>
  );
};
