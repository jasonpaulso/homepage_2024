import { useCallback, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

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
      if (isAnimated) {
        stickerRef.current.classList.add(animation);
      } else {
        stickerRef.current.classList.remove(animation);
      }
    }
  }, [isAnimated, animation]);

  return (
    <div className={`sticker ${className || ''}`} onClick={handleClick}>
      {/* <img src={imageMetadata?.src} alt={''} ref={stickerRef} /> */}
      <CSSTransition in={Boolean(imageMetadata)} timeout={300} classNames="emoji-transition" unmountOnExit>
        <span className="emoji">
          <img src={imageMetadata?.src} alt={''} ref={stickerRef} />
        </span>
      </CSSTransition>
    </div>
  );
}
