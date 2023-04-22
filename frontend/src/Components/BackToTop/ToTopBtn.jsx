import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { MdKeyboardArrowUp } from 'react-icons/md';

const Button = styled.button`
  width: 4rem;
  height: 4rem;
  background: #6a11cb;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  position: fixed;
  bottom: 2%;
  left: 95%;
  color: #fff;
  outline: none;
  border: none;
  transition: all 0.3s;
  z-index: 99999;

  :hover {
    font-size: 2.5rem;
    cursor: pointer;
  }

  @media (max-width: 1000px) {
    left: 94%;
  }
  @media (max-width: 800px) {
    left: 93%;
  }
  @media (max-width: 700px) {
    left: 92%;
    width: 4.5rem;
    height: 4.5rem;
  }
  @media (max-width: 600px) {
    display: none;
  }
`;

const ToTopBtn = () => {
  const [scrollToTop, setScrollToTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 200) {
        setScrollToTop(true);
      } else {
        setScrollToTop(false);
      }
    };

    const scrollToTopBehavior = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    const unlisten = () => {
      window.removeEventListener('scroll', handleScroll);
    };

    window.addEventListener('scroll', handleScroll);

    scrollToTopBehavior();

    return unlisten;
  }, [location]);

  return (
    <>
      {scrollToTop && (
        <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <MdKeyboardArrowUp />
        </Button>
      )}
    </>
  );
};

export default ToTopBtn;
