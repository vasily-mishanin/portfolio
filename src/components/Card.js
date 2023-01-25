import { Heading, HStack, Image, Text, VStack, Link } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const Card = ({ title, description, imageSrc }) => {
  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.
  return (
    <VStack bg='white' borderRadius='8px' justifyContent='flex-start' alignItems='flex-start'>
      <Image src={imageSrc} borderRadius='8px'></Image>
      <VStack alignItems='flex-start' padding='16px'>
        <Heading color='black' fontSize='1rem'>
          {title}
        </Heading>
        <Text color='gray'>{description}</Text>
        <Link color='black' fontSize='0.75rem' href='https://github.com/vasily-mishanin'>
          See more <FontAwesomeIcon icon={faArrowRight} size='1x' />
        </Link>
      </VStack>
    </VStack>
  );
};

export default Card;
