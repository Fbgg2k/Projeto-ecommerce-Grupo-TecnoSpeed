import React, { useState, forwardRef, useRef, useEffect } from 'react';

const Magnifier = forwardRef(({ src, alt, className, lensSize = 100 }, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ top: 0, left: 0 });
  const lensRef = useRef(null);
  
  useEffect(() => {
    if (ref && ref.current) {
      ref.current.src = src; // Atualiza a src da imagem principal
    }
  }, [src, ref]); // Dependência na mudança do src

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleMouseMove = (e) => {
    const { top, left, width, height } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const lensX = (x / width) * 100;
    const lensY = (y / height) * 100;

    setCursorPos({ top: lensY, left: lensX });
  };

  return (
    <div className="relative">
      <img
        src={src}
        alt={alt}
        className={`transition-transform duration-300 ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        ref={ref}
      />
      {isHovered && (
        <div
          ref={lensRef}
          className="absolute"
          style={{
            width: `${lensSize}px`,
            height: `${lensSize}px`,
            top: `${cursorPos.top}%`,
            left: `${cursorPos.left}%`,
            transform: 'translate(-50%, -50%)',
            background: `url(${src}) no-repeat`,
            backgroundSize: `${499 * 2}px ${692 * 2}px`,
            backgroundPosition: `-${(cursorPos.left / 100) * (499 * 2 - lensSize)}px -${(cursorPos.top / 100) * (692 * 2 - lensSize)}px`,
            borderRadius: '50%',
            border: '2px solid rgba(0, 0, 0, 0.3)',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
});

export default Magnifier;
