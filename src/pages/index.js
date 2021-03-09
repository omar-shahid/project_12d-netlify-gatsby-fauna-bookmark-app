import * as React from "react";
import {
  Box,
  Heading,
  Container,
  Stack,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import EditModal from "./../components/EditModal";
import axios from "axios";
import { Form, Formik, Field } from "formik";

const { useState, useEffect } = React;

const IndexPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  useEffect(() => {
    axios
      .post("/.netlify/functions/allBookmarks")
      .then((res) => res.data)
      .then((data) => {
        console.log("data", data);
        setBookmarks(data?.data?.allItems.data.slice().reverse());
      });
  }, []);

  function onEdit(id, name, url, description) {
    console.log("EDIABLE>>>", { id, name, url, description });
    return axios
      .post("/.netlify/functions/editBookmark", { id, name, url, description })
      .then((res) => res.data)
      .then(() => {
        const newList = [...bookmarks];
        const editableBookmark = newList.find((el) => el._id);
        if (!editableBookmark) return;
        const editableBookmarkIndex = newList.indexOf(editableBookmark);
        newList[editableBookmarkIndex] = { _id: id, name, url, description };
        setBookmarks(newList);
      });
  }

  function deleteItem(id) {
    return axios
      .post("/.netlify/functions/deleteItem", { id })
      .then((res) => res.data)
      .then(() => {
        console.log(id);
        setBookmarks((p) => p.filter((el) => el._id !== id));
      });
  }
  return (
    <Container mt={5}>
      <Heading>Book mark App</Heading>

      <Formik
        initialValues={{
          name: "",
          url: "",
          description: "",
        }}
        onSubmit={(values, { resetForm }) => {
          return axios
            .post("/.netlify/functions/createBookmark", values)
            .then((res) => res.data)
            .then((id) => {
              const newBookmark = { _id: id, ...values };
              setBookmarks((p) => [newBookmark].concat(p));
              resetForm();
            });
        }}
      >
        <Form>
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
              <Field as={Textarea} name="description" />
            </FormControl>
            <Button colorScheme="blue" mr={3} type="submit">
              Create bookmark
            </Button>
          </Box>
        </Form>
      </Formik>

      <Stack spacing={8} mt={4}>
        {bookmarks?.map((item) => (
          <Box p={5} key={item._id} shadow="md" borderWidth="1px">
            <Flex>
              <a key={item.name} href={item.url}>
                <Box>
                  <Heading fontSize="xl">{item.name}</Heading>
                  <Heading size="sm" color="GrayText" fontWeight="light">
                    {item.url}
                  </Heading>
                </Box>
              </a>
              <Box ml="auto">
                <DeleteIcon
                  fontSize={18}
                  cursor="pointer"
                  onClick={() => deleteItem(item._id)}
                />
                <EditModal
                  id={item._id}
                  name={item.name}
                  url={item.url}
                  description={item.description}
                  onEdit={onEdit}
                />
              </Box>
            </Flex>
            <Text mt={4}>{item.description}</Text>
          </Box>
        ))}
      </Stack>
    </Container>
  );
};

export default IndexPage;
