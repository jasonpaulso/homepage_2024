import { useEffect, useRef, useState } from 'react';
import Sticker, { type StickerProps } from '../sticker/sticker.tsx';
import './header.css';

interface HeaderProps {
  defaultStickerImage: StickerProps['defaultStickerImage'];
  headlines: string[][];
}

const Header = ({ defaultStickerImage, headlines }: HeaderProps) => {
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const cursorRef = useRef<HTMLElement | null>(null);
  const [stickerIsAnimating, setStickerIsAnimating] = useState(false);
  const [stickerImage, setStickerImage] = useState(defaultStickerImage);
  const [currentEmoji, setCurrentEmoji] = useState<string | undefined>(undefined);
  const [currentEmojiAnimation, setCurrentEmojiAnimation] = useState<string | undefined>();

  const typeWriter = (text: string, onComplete: () => void) => {
    let currentText = '';
    const interval = setInterval(() => {
      const headlineElement = headlineRef.current;
      const cursorElement = cursorRef.current;
      if (!headlineElement || !cursorElement) return;

      if (currentText.length === text.length) {
        clearInterval(interval);
        onComplete();
      } else {
        currentText = text.slice(0, currentText.length + 1);
        headlineElement.textContent = currentText;
        headlineElement.appendChild(cursorElement);
      }
    }, 100);
  };

  const selectAndDeleteHeadline = () => {
    return new Promise<void>((resolve) => {
      const headlineElement = headlineRef.current;
      const cursorElement = cursorRef.current;
      if (!headlineElement || !cursorElement) return;

      const range = document.createRange();
      range.selectNodeContents(headlineElement);
      const selection = window.getSelection();
      selection!.removeAllRanges();
      headlineElement.removeChild(cursorElement);
      selection!.addRange(range);

      setTimeout(() => {
        while (headlineElement.firstChild) {
          headlineElement.removeChild(headlineElement.firstChild);
        }
        selection!.removeAllRanges();
        resolve();
      }, 1000);
    });
  };

  const animateHeadlines = async () => {
    for (const [index, headline] of headlines.entries()) {
      setCurrentEmoji(headline[0]);
      setCurrentEmojiAnimation(headline[2]);
      setStickerIsAnimating(true);

      await new Promise<void>((resolve) => {
        typeWriter(headline[1], resolve);
      });

      setStickerIsAnimating(false);

      if (index < headlines.length - 1) {
        if (index === 0) {
          await new Promise((resolve) => setTimeout(resolve, 3000));
        }
        await selectAndDeleteHeadline();
      }
    }

    setCurrentEmoji(undefined);
    setStickerImage(defaultStickerImage);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      animateHeadlines();
    }, 700);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <header className="header">
      <Sticker defaultStickerImage={stickerImage} id="sticker" isAnimated={stickerIsAnimating} emoji={currentEmoji} animation={currentEmojiAnimation} />
      <h1 ref={headlineRef} className="header-title">
        <span id="cursor" ref={cursorRef} />
      </h1>
    </header>
  );
};

export default Header;
