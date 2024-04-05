import React, { useEffect, useRef, useState } from 'react';
import './nav.css';
interface NavProps {
  links: {
    title: string;
    href: string;
  }[];
  activeLinkIndex: any;
}

const Nav: React.FC<NavProps> = ({ links, activeLinkIndex }) => {
  const navRef = useRef<HTMLElement | null>(null);
  const sliderRef = useRef<HTMLElement | null>(null);
  const [activeLink, setActiveLink] = useState<HTMLAnchorElement | undefined>();

  const [sliderElement, setSliderElement] = useState<HTMLElement | undefined>();

  const setActiveLinkState = () => {
    const navElement = navRef.current;
    if (navElement) {
      const navLinks = navElement.querySelectorAll('a');
      if (navLinks) {
        navLinks.forEach((link, index) => {
          if (index === activeLinkIndex) {
            setActiveLink(link);
          }
        });
      }
    }
  };
  const setSliderState = () => {
    const sliderElement = sliderRef.current;

    if (sliderElement) {
      setSliderElement(sliderElement);
    }
  };
  const setSliderPosition = (position: number) => {
    if (activeLink && sliderElement) {
      const linkWidth = activeLink.offsetWidth;
      const linkTop = activeLink.offsetTop;
      const linkBottom = linkTop + activeLink.offsetHeight;
      const linkStyle = getComputedStyle(activeLink);
      const { borderRadius } = linkStyle;
      const sliderStyles = { display: 'block', width: `${linkWidth}px`, top: `${linkTop}px`, bottom: `${linkBottom}px`, height: `${linkBottom - linkTop}px`, 'border-radius': borderRadius, transform: `translateX(${position}px)` };
      Object.assign(sliderElement.style, sliderStyles);
    }
  };

  const handleMouseEnter = (event: { currentTarget: HTMLElement }) => {
    const element = event.currentTarget;
    setSliderPosition(element.offsetLeft);
  };
  const setInitialSliderPosition = () => {
    if (activeLink) {
      setSliderPosition(activeLink.offsetLeft);
    }
  };

  useEffect(() => {
    setActiveLinkState();
    setSliderState();
    setInitialSliderPosition();
    window.addEventListener('resize', setInitialSliderPosition);
  }, [activeLinkIndex, activeLink, sliderElement]);

  return (
    <nav className={'nav-container'} ref={navRef} onMouseLeave={setInitialSliderPosition}>
      <>
        {links.map((link, index) => (
          <a href={link.href} key={link.title} data-active={index === activeLinkIndex} onMouseEnter={handleMouseEnter} onMouseLeave={setInitialSliderPosition}>
            {link.title}
          </a>
        ))}
        <span className="slider" ref={sliderRef}></span>
      </>
    </nav>
  );
};

export default Nav;
