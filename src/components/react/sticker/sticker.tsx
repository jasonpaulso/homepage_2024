import { useCallback, useEffect, useRef } from 'react';

import './sticker.css';

export interface StickerProps {
  id?: string;
  isAnimated?: boolean;
  className?: string;
  imageMetadata?: ImageMetadata;
  link?: string;
  animation?: string;
}

export default function Sticker({ imageMetadata, isAnimated, className, link, animation }: StickerProps) {
  const stickerRef = useRef<HTMLImageElement>(null);

  const handleClick = useCallback(() => {
    if (link) {
      window.open(link, '_blank');
    }
  }, [link]);

  useEffect(() => {
    if (animation && stickerRef.current) {
      stickerRef.current.classList.remove(animation);
      if (isAnimated) {
        stickerRef.current.classList.add(animation);
      } else {
        stickerRef.current.classList.remove(animation);
      }
    }
  }, [isAnimated, animation, imageMetadata]);

  return (
    <div className={`sticker ${className || ''}`} onClick={handleClick}>
      <img src={imageMetadata?.src} alt={''} ref={stickerRef} />
    </div>
  );
}
