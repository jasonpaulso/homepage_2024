import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Sticker from '../sticker/sticker.tsx';
import './header.css';

export type HeadlineType = [ImageMetadata, string, string?];

export interface HeadlineData {
  text: string;
  image: ImageMetadata;
  animation: string;
}

interface HeaderProps {
  defaultImageMetadata: ImageMetadata;
  headlines: HeadlineData[];
}

const Header = ({ defaultImageMetadata, headlines }: HeaderProps) => {
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const cursorRef = useRef<HTMLElement | null>(null);
  const hiddenHeadlineRef = useRef<HTMLDivElement | null>(null);
  const [stickerIsAnimating, setStickerIsAnimating] = useState(false);
  const [currentImageMetadata, setCurrentImageMetadata] = useState<ImageMetadata>(defaultImageMetadata as ImageMetadata);
  const [currentImageAnimation, setCurrentImageAnimation] = useState<string | undefined>();
  const memoizedHeadlines = useMemo(() => headlines, [headlines]);

  const handleResize = useCallback(() => {
    const setHeadlineHeight = () => {
      const headlineElement = headlineRef.current;
      if (!headlineElement) return;

      const calculateHeadlineHeight = (text: string) => {
        const hiddenHeadline = hiddenHeadlineRef.current;
        if (!hiddenHeadline) return 0;

        hiddenHeadline.textContent = text;
        const renderedHeight = hiddenHeadline.clientHeight;
        hiddenHeadline.textContent = '';

        return renderedHeight;
      };

      const longestHeadlineHeight = memoizedHeadlines.reduce((maxHeight, headline) => {
        const height = calculateHeadlineHeight(headline.text);
        return height > maxHeight ? height : maxHeight;
      }, 0);

      headlineElement.style.minHeight = `${longestHeadlineHeight}px`;
    };

    setHeadlineHeight();
  }, [memoizedHeadlines]);

  const typeWriter = (text: string, onComplete: () => void) => {
    let currentText = '';
    const interval = setInterval(() => {
      const headlineElement = headlineRef.current;
      const cursorElement = cursorRef.current;

      if (!headlineElement || !cursorElement) return;

      const headerLineHeight = getComputedStyle(headlineElement).getPropertyValue('line-height');
      cursorElement.style.height = headerLineHeight;

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

  const animateHeadlines = useCallback(async () => {
    for (const [index, headline] of memoizedHeadlines.entries()) {
      const { text, animation, image } = headline;
      setCurrentImageMetadata(image as ImageMetadata);
      setCurrentImageAnimation(animation);
      setStickerIsAnimating(true);

      await new Promise<void>((resolve) => {
        typeWriter(text, resolve);
      });

      setStickerIsAnimating(false);

      if (index < headlines.length - 1) {
        if (index === 0) {
          await new Promise((resolve) => setTimeout(resolve, 3000));
        }
        await selectAndDeleteHeadline();
      }
      setCurrentImageMetadata(currentImageMetadata);
    }
  }, [memoizedHeadlines, currentImageMetadata]);

  // const handleResize = useCallback(() => {
  //   setHeadlineHeight(memoizedHeadlines);
  // }, [memoizedHeadlines]);

  useEffect(() => {
    // setHeadlineHeight(memoizedHeadlines);
    // window.addEventListener('resize', handleResize);
  }, [memoizedHeadlines]);

  useEffect(() => {
    handleResize();
    const timeout = setTimeout(() => {
      animateHeadlines();
    }, 700);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeout);
    };
  }, [handleResize, memoizedHeadlines]);

  return (
    <header className="header">
      <Sticker imageMetadata={currentImageMetadata} id="sticker" isAnimated={stickerIsAnimating} animation={currentImageAnimation} />
      <span>
        <h1 ref={headlineRef} className="header-title">
          <span id="cursor" ref={cursorRef} />
        </h1>
        <div ref={hiddenHeadlineRef} className="hidden-headline header-title" />
      </span>
    </header>
  );
};

export default Header;
