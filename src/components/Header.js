import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faMedium, faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { Box, HStack } from '@chakra-ui/react';

const socials = [
  {
    icon: faEnvelope,
    url: 'mailto: vasilymishanin@gmail.com',
  },
  {
    icon: faGithub,
    url: 'https://github.com/vasily-mishanin',
  },
  {
    icon: faLinkedin,
    url: 'https://www.linkedin.com/in/vasily-mishanin-943b3824a/',
  },
  {
    icon: faMedium,
    url: 'https://medium.com',
  },
  {
    icon: faStackOverflow,
    url: 'https://stackoverflow.com',
  },
];

const Header = () => {
  const headerRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    const anchor = e.target.name;
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  useEffect(() => {
    let prevScrollPosition = window.scrollY;

    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      if (!headerRef.current) {
        return;
      }
      if (prevScrollPosition > currentScrollPosition) {
        headerRef.current.style.transform = 'translateY(0)';
      }
      if (prevScrollPosition < currentScrollPosition) {
        headerRef.current.style.transform = 'translateY(-200px)';
      }
      prevScrollPosition = currentScrollPosition;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box
      position='fixed'
      top={0}
      left={0}
      right={0}
      translateY={0}
      transitionProperty='transform'
      transitionDuration='.5s'
      transitionTimingFunction='ease-in-out'
      backgroundColor='#18181b'
      zIndex={'10'}
      ref={headerRef}
    >
      <Box color='white' maxWidth='1280px' margin='0 auto'>
        <HStack px={16} py={4} justifyContent='space-between' alignItems='center'>
          <nav>
            <HStack>
              {socials.map((social) => (
                <a href={social.url} key={social.url} target='_blank' rel='noopener noreferrer'>
                  <FontAwesomeIcon icon={social.icon} size='2x' />
                </a>
              ))}
            </HStack>
          </nav>
          <nav>
            <HStack spacing={8}>
              <a href='/#projects' name='projects' onClick={handleClick}>
                Projects
              </a>
              <a href='/#contact-me' name='contactme' onClick={handleClick}>
                Contact me
              </a>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};
export default Header;
