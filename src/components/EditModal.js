import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

const EditModal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <EditIcon fontSize={18} cursor="pointer" onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box my={5}>
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input type="text" value={props.name} />
              </FormControl>
              <FormControl id="url">
                <FormLabel>URL</FormLabel>
                <Input type="text" value={props.url} />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Description</FormLabel>
                <Textarea type="text" value={props.description} />
              </FormControl>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Edit
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;
