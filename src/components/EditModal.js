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
import { Formik, Form, Field } from "formik";

const EditModal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <EditIcon fontSize={18} cursor="pointer" onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <Formik
          initialValues={{
            name: props.name,
            url: props.url,
            description: props.description,
          }}
          onSubmit={(values) => {
            console.log("WOrlding here!!", values);
            return props
              .onEdit(props.id, ...Object.values(values))
              .then(() => onClose());
          }}
        >
          {({ handleSubmit }) => (
            <Form>
              <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Box my={5}>
                    <FormControl id="name">
                      <FormLabel>Name</FormLabel>
                      <Field type="text" as={Input} name="name" />
                    </FormControl>
                    <FormControl id="url">
                      <FormLabel>URL</FormLabel>
                      <Field type="text" as={Input} name="url" />
                    </FormControl>
                    <FormControl id="email">
                      <FormLabel>Description</FormLabel>
                      <Field type="text" as={Textarea} name="description" />
                    </FormControl>
                  </Box>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Edit
                  </Button>
                  <Button variant="ghost" onClick={onClose}>
                    Cancel
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default EditModal;
