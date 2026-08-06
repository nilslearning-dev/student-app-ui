import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Spinner,
  Flex,
  useToast,
} from '@chakra-ui/react';
import {
  getStudentsFetch,
  addStudentFetch,
  updateStudentFetch,
  deleteStudentFetch,
} from '../features/students/studentSlice';
import { logout } from '../features/auth/authSlice';
import RegistrationForm from '../features/students/components/registrationForm';
import StudentList from '../features/students/components/studentList';

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { students, loading, error, message } = useSelector((state) => state.students);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const { isOpen: isFormOpen, onOpen: openForm, onClose: closeForm } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: openDelete, onClose: closeDelete } = useDisclosure();
  const cancelRef = useRef();

  useEffect(() => {
    dispatch(getStudentsFetch());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    }
  }, [message, toast]);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  const handleAddClick = () => {
    console.log('Add Student button clicked');
    setSelectedStudent(null);
    openForm();
  };

  const handleFormSubmit = (formData) => {
    if (selectedStudent) {
      dispatch(updateStudentFetch({ id: selectedStudent.id, studentData: formData }));
    } else {
      dispatch(addStudentFetch(formData));
    }
    closeForm();
    setSelectedStudent(null);
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    openForm();
  };

  const handleDelete = (student) => {
    setStudentToDelete(student);
    openDelete();
  };

  const confirmDelete = () => {
    if (studentToDelete) {
      dispatch(deleteStudentFetch(studentToDelete.id));
    }
    setStudentToDelete(null);
    closeDelete();
  };

  const closeFormAndReset = () => {
    setSelectedStudent(null);
    closeForm();
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    toast({
      title: 'Logged out',
      description: 'You have been returned to the login page.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={6}>
      <Stack direction={{ base: 'column', md: 'row' }} justify="space-between" align="center" mb={6} gap={4}>
        <Heading size="lg">Student Registration Management</Heading>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={3} align="center">
          <Button colorScheme="blue" onClick={handleAddClick} alignSelf={{ base: 'stretch', md: 'auto' }}>
            Add Student
          </Button>
          <Button variant="outline" colorScheme="red" onClick={handleLogout}>
            Logout
          </Button>
        </Stack>
      </Stack>

      {error && (
        <Text color="red.500" mb={4}>
          Error: {error}
        </Text>
      )}

      {loading ? (
        <Flex align="center" justify="center" minH="220px">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <StudentList students={students} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <Modal isOpen={isFormOpen} onClose={closeFormAndReset} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedStudent ? 'Edit Student' : 'Add New Student'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <RegistrationForm
              onSubmit={handleFormSubmit}
              selectedStudent={selectedStudent}
              clearSelection={closeFormAndReset}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={closeDelete}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Student
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete{' '}
              <Text as="span" fontWeight="semibold">
                {studentToDelete?.name}
              </Text>
              ? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={closeDelete} mr={3}>
                No
              </Button>
              <Button colorScheme="red" onClick={confirmDelete}>
                Yes, delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default RegistrationPage;