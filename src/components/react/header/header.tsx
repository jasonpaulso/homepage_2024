import Sticker, { type StickerProps } from '../sticker/sticker.tsx';

import { useEffect, useRef, useState } from 'react';
import './header.css';
interface HeaderProps {
  defaultStickerImage: StickerProps['defaultStickerImage'];
  headlines: string[][];
}
const Header = ({ defaultStickerImage, headlines }: HeaderProps) => {
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const cursorRef = useRef<HTMLElement | null>(null);

  const [stickerIsAnimating, setStickerIsAnimating] = useState(false);
  const [stickerImage, setStickerImage] = useState<StickerProps['defaultStickerImage']>();

  const [currentEmoji, setCurrentEmoji] = useState<string | undefined>(undefined);
  const [currentEmojiAnimation, setCurrentEmojiAnimation] = useState<string | undefined>();
  const typeWriter = async (text: string): Promise<void> => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        const headlineElement = headlineRef.current;
        const cursorElement = cursorRef.current;
        if (!headlineElement || !cursorElement) return;

        const currentText = headlineElement.textContent || '';
        if (currentText.length === text.length) {
          clearInterval(interval);

          resolve();
        } else {
          headlineElement.textContent = text.slice(0, currentText.length + 1);
          headlineElement.appendChild(cursorElement);
        }
      }, 100);
    });
  };

  const selectAndDeleteHeadline = async () => {
    const headlineElement = headlineRef.current;
    const cursorElement = cursorRef.current;
    if (!headlineElement || !cursorElement) return;
    const range = document.createRange();
    range.selectNodeContents(headlineElement);
    const selection = window.getSelection();
    selection!.removeAllRanges();
    headlineElement.removeChild(cursorElement);
    selection!.addRange(range);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    while (headlineElement.firstChild) {
      headlineElement.removeChild(headlineElement.firstChild);
    }

    selection!.removeAllRanges();
  };

  const animateHeadlines = async () => {
    try {
      for (const [index, headline] of headlines.entries()) {
        if (headlines.length === 1) {
        }
        setCurrentEmoji(headline[0]);
        setCurrentEmojiAnimation(headline[2]);
        setStickerIsAnimating(true);

        await typeWriter(headline[1]);
        setStickerIsAnimating(false);

        if (index < headlines.length - 1) {
          if (index === 0) {
            // Add a delay before selecting and deleting the first headline
            await new Promise((resolve) => setTimeout(resolve, 3000));
          }

          await selectAndDeleteHeadline();
        }
      }
      setCurrentEmoji(undefined);

      setStickerImage(defaultStickerImage);
    } catch (error) {
      console.error('Error animating headlines:', error);
    }
  };

  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    if (startAnimation) {
      animateHeadlines();
    }
  }, [startAnimation]);

  useEffect(() => {
    setStickerImage('memoji-home');
    setTimeout(() => {
      setStartAnimation(true);
    }, 700);
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
