import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
} from '@chakra-ui/react';

const RegistrationForm = ({ onSubmit, selectedStudent, clearSelection }) => {
  const [formData, setFormData] = useState({ name: '', email: '', course: '' });

  useEffect(() => {
    if (selectedStudent) {
      setFormData({
        name: selectedStudent.name || '',
        email: selectedStudent.email || '',
        course: selectedStudent.course || '',
      });
    } else {
      setFormData({ name: '', email: '', course: '' });
    }
  }, [selectedStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', email: '', course: '' });
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Full Name</FormLabel>
          <Input
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Course</FormLabel>
          <Input
            placeholder="Course Name"
            value={formData.course}
            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
          />
        </FormControl>

        <Stack direction="row" spacing={3} justify="flex-end" pt={4}>
          <Button variant="outline" onClick={clearSelection}>
            Cancel
          </Button>
          <Button colorScheme="blue" type="submit">
            {selectedStudent ? 'Update Student' : 'Add Student'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default RegistrationForm;