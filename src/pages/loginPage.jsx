import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { loginFailure, loginRequest, loginSuccess } from '../features/auth/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const authError = useSelector((state) => state.auth.error);

  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginRequest());

    const { username, password } = credentials;
    if (username === 'nilesh' && password === 'nilesh') {
      dispatch(loginSuccess({ username }));
      toast({
        title: 'Login successful',
        description: 'Welcome back! Redirecting to student registration.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      navigate('/students');
      return;
    }

    dispatch(loginFailure('Invalid username or password'));
    toast({
      title: 'Login failed',
      description: 'Please check your username and password.',
      status: 'error',
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <Box maxW="md" mx="auto" mt={16} p={8} borderWidth="1px" borderRadius="xl" boxShadow="lg" bg="white">
      <Heading mb={6} textAlign="center">
        Login
      </Heading>
      <Box as="form" onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              name="username"
              value={credentials.username}
              placeholder="Username"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              value={credentials.password}
              placeholder="Password"
              onChange={handleChange}
            />
          </FormControl>
          {authError && (
            <Text color="red.500" fontSize="sm">
              {authError}
            </Text>
          )}
          <Button colorScheme="blue" type="submit">
            Login
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default LoginPage;
