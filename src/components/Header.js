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
  const prevScrollPositionRef = useRef(null);
  const [scrollDirection, setScrollDirection] = useState('UP');

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

  const handleScroll = (e) => {
    const currentY = window.scrollY;
    if (currentY > prevScrollPositionRef.current) {
      setScrollDirection('DOWN');
    }
    if (currentY < prevScrollPositionRef.current) {
      setScrollDirection('UP');
    }

    prevScrollPositionRef.current = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    prevScrollPositionRef.current = window.scrollY;
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
      transform={scrollDirection === 'DOWN' ? 'translateY(-200px)' : 'translateY(0)'}
    >
      <Box color='white' maxWidth='1280px' margin='0 auto'>
        <HStack px={16} py={4} justifyContent='space-between' alignItems='center'>
          <nav>
            <HStack>
              {socials.map((social) => (
                <a href={social.url} key={social.url}>
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
