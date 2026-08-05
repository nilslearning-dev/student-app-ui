import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

const StudentList = ({ students, onEdit, onDelete }) => {
  if (!students || students.length === 0) {
    return (
      <Box p={6} borderWidth="1px" borderRadius="lg" bg="gray.50">
        <Text>No student records found. Click Add Student to create one.</Text>
      </Box>
    );
  }

  return (
    <TableContainer borderWidth="1px" borderRadius="lg" overflowX="auto">
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Course</Th>
            <Th textAlign="center">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {students.map((student) => (
            <Tr key={student.id}>
              <Td>{student.id}</Td>
              <Td>{student.name}</Td>
              <Td>{student.email}</Td>
              <Td>{student.course}</Td>
              <Td>
                <Stack direction="row" spacing={2} justify="center">
                  <IconButton
                    aria-label="Edit student"
                    icon={<EditIcon />}
                    size="sm"
                    colorScheme="blue"
                    onClick={() => onEdit(student)}
                  />
                  <IconButton
                    aria-label="Delete student"
                    icon={<DeleteIcon />}
                    size="sm"
                    colorScheme="red"
                    onClick={() => onDelete(student)}
                  />
                </Stack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default StudentList;