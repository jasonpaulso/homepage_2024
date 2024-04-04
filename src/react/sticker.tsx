import * as React from 'react';
import memojiAboutImage from '../images/memoji-about.png';
import memojiHomeImage from '../images/memoji-home.png';
import logoAsImage from '../images/as-logo.png';
import memojiMacbookImage from '../images/memoji-macbook.png';
import './sticker.css';
export interface StickerProps {
  defaultStickerImage: 'memoji-about' | 'memoji-home' | 'logo-as' | 'memoji-macbook';
  id?: string;
  isAnimated?: boolean;
  className?: string;
  emoji?: string;
  link?: string;
}

export default function Sticker({ defaultStickerImage, isAnimated, className, emoji, link }: StickerProps) {
  console.log('🚀 ~ Sticker ~ link:', link);
  let imageSrc;
  switch (defaultStickerImage) {
    case 'memoji-about':
      imageSrc = memojiAboutImage;
      break;
    case 'memoji-home':
      imageSrc = memojiHomeImage;
      break;
    case 'logo-as':
      imageSrc = logoAsImage;
      break;
    case 'memoji-macbook':
      imageSrc = memojiMacbookImage;
      break;
    default:
      imageSrc = memojiAboutImage; // Default case if defaultStickerImage doesn't match
  }

  const stickerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isAnimated) {
      stickerRef.current!.classList.add('animate-rotation');
    } else {
      stickerRef.current!.classList.remove('animate-rotation');
    }
  }, [isAnimated]);

  return (
    <div
      className={`sticker ${className || ''}`}
      ref={stickerRef}
      onClick={() => {
        if (link) {
          window.open(link, '_blank');
        }
      }}
    >
      {emoji ? (
        <span className="emoji">
          <p>{emoji}</p>
        </span>
      ) : (
        <img {...imageSrc} alt={defaultStickerImage} />
      )}
    </div>
  );
}
