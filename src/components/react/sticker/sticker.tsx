import { useCallback, useEffect, useRef } from 'react';
import memojiAboutImage from '../../../images/memoji-about.png';
import memojiHomeImage from '../../../images/memoji-home.png';
import logoAsImage from '../../../images/as-logo.png';
import memojiMacbookImage from '../../../images/memoji-macbook.png';

import './sticker.css';

export interface StickerProps {
  defaultStickerImage: 'memoji-about' | 'memoji-home' | 'logo-as' | 'memoji-macbook';
  id?: string;
  isAnimated?: boolean;
  className?: string;
  emoji?: string;
  link?: string;
  animation?: string;
}

export default function Sticker({ defaultStickerImage, isAnimated, className, emoji, link, animation }: StickerProps) {
  const stickerImages = {
    'memoji-about': memojiAboutImage,
    'memoji-home': memojiHomeImage,
    'logo-as': logoAsImage,
    'memoji-macbook': memojiMacbookImage,
  };

  const stickerImage = stickerImages[defaultStickerImage];

  const stickerRef = useRef<HTMLDivElement>(null);

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
    <div className={`sticker ${className || ''}`} ref={stickerRef} onClick={handleClick}>
      {emoji ? (
        <span className="emoji">
          <p>{emoji}</p>
        </span>
      ) : (
        stickerImage && <img src={stickerImage.src} alt={defaultStickerImage} />
      )}
    </div>
  );
}
