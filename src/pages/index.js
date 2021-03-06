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
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import EditModal from "./../components/EditModal";
import axios from "axios";

const { useState, useEffect } = React;

const IndexPage = () => {
  const [bookmarks, setBookmarks] = useState({});
  useEffect(() => {
    axios
      .post("/.netlify/functions/allBookmarks")
      .then((res) => res.data)
      .then((data) => {
        console.log("data", data);
        setBookmarks(data?.data?.allItems.data);
      });
  }, []);
  console.log(bookmarks);
  return (
    <Container mt={5}>
      <Heading>Book mark App</Heading>

      <Box my={5}>
        <FormControl id="name">
          <FormLabel>Name</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl id="url">
          <FormLabel>URL</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Description</FormLabel>
          <Textarea type="text" />
        </FormControl>
      </Box>

      <Stack spacing={8} mt={4}>
        {bookmarks?.map((item) => (
          <a key={item.name} href={item.url}>
            <Box p={5} shadow="md" borderWidth="1px">
              <Flex>
                <Box>
                  <Heading fontSize="xl">{item.name}</Heading>
                  <Heading size="sm" color="GrayText" fontWeight="light">
                    {item.url}
                  </Heading>
                </Box>
                <Box ml="auto">
                  <DeleteIcon fontSize={18} cursor="pointer" />
                  <EditModal
                    name={item.name}
                    url={item.url}
                    description={item.description}
                  />
                </Box>
              </Flex>
              <Text mt={4}>{item.description}</Text>
            </Box>
          </a>
        ))}
      </Stack>
    </Container>
  );
};

export default IndexPage;
