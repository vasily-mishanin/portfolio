import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
  Spinner,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import FullScreenSection from './FullScreenSection';
import useSubmit from '../hooks/useSubmit';
import { useAlertContext } from '../context/alertContext';

const LandingSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  const formik = useFormik({
    initialValues: { firstName: '', email: '', type: '', comment: '' },
    onSubmit: (values) => {
      console.log('Submit:', values);
      submit('https://www.CIA.com/', values);
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().min(2, 'Name is Too Short!').required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      type: Yup.string(),
      comment: Yup.string().min(10, 'Comment is Too Short!'),
    }),
  });

  useEffect(() => {
    if (response) {
      onOpen(response.type, response.message);

      if (response.type === 'success') {
        formik.resetForm();
      }
    }
  }, [response]);

  return (
    <FullScreenSection isDarkBackground backgroundColor='#512DA8' py={16} spacing={8}>
      <VStack w='1024px' p={32} alignItems='flex-start'>
        <Heading as='h1' id='contactme-section'>
          Contact me
        </Heading>
        <Box p={6} rounded='md' w='100%'>
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormControl isInvalid={!!formik.errors.firstName}>
                <FormLabel htmlFor='firstName'>
                  Name <sup>*</sup>
                </FormLabel>
                <Input id='firstName' name='firstName' {...formik.getFieldProps('firstName')} />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!formik.errors.email}>
                <FormLabel htmlFor='email'>
                  Email Address <sup>*</sup>
                </FormLabel>
                <Input id='email' name='email' type='email' {...formik.getFieldProps('email')} />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='type'>Type of enquiry</FormLabel>
                <Select id='type' name='type' {...formik.getFieldProps('type')}>
                  <option value='hireMe'>Freelance project proposal</option>
                  <option value='openSource'>Open source consultancy session</option>
                  <option value='other'>Other</option>
                </Select>
              </FormControl>
              <FormControl isInvalid={!!formik.errors.comment}>
                <FormLabel htmlFor='comment'>Your message</FormLabel>
                <Textarea id='comment' name='comment' height={250} {...formik.getFieldProps('comment')} />
                <FormErrorMessage> {formik.errors.comment}</FormErrorMessage>
              </FormControl>
              <Button type='submit' colorScheme='purple' width='full'>
                {isLoading ? <Spinner /> : 'Submit'}
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
