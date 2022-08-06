import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import { useDisclosure } from "@chakra-ui/core";
import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Heading,
  useColorModeValue,
  Input,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "../Grid.css";
// import edit from "../public/edit.png";

const ViewItems = () => {
  const [items, setItems] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalId, setModalId] = useState("");
  const [modalName, setModalName] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [modalPrice, setModalPrice] = useState("");
  const [modalQuantity, setModalQuantity] = useState("");

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const deleteItem = async (id) => {
    console.log("deleting");
    try {
      const deleteValue = await fetch(`/items/${id}`, {
        method: "DELETE",
      });
      const newItems = items.filter((item) => item.id !== id);
      setItems(newItems);
      console.log("deleted");
    } catch (err) {
      console.log(err.message);
    }
  };
  async function fetchItems() {
    const response = await fetch("/items");
    const data = await response.json();
    console.log(data);
    // sort the data by id
    const sortedData = data.sort((a, b) => a.id - b.id);
    setItems(sortedData);
  }

  const putItem = async (e) => {
    e.preventDefault();

    const name = modalName;
    const description = modalDescription;
    const price = modalPrice;
    const quantity = modalQuantity;

    try {
      console.log(
        JSON.stringify({
          modalName,
          modalDescription,
          modalPrice,
          modalQuantity,
        })
      );

      const response = await fetch(`items/${modalId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          price,
          quantity,
        }),
      });
      // display a chakra message notification saying that the item was added
      // toast success("Item added successfully");
      console.log(response);
      // close the modal
      fetchItems();
      onClose();
      toast("Item updated successfully");
    } catch (error) {
      console.error(error.message);
      toast.error("lorem");
    }
  };

  //
  useEffect(() => {
    fetchItems();
  }, []);

  console.log(items);

  return (
    <div>
      <Text
        p={8}
        fontSize="4xl"
        fontWeight="bold"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        Items
      </Text>

      {/* search  */}
      <Box bg={useColorModeValue("gray.50", "gray.800")} px={4}>
        <Stack
          spacing={4}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          justifyItems={"center"}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Heading as="h3" size="md" padding={4} margin={4}>
              Search:
            </Heading>
            <form display={"flex"}>
              <FormControl>
                <Input
                  id="search"
                  placeholder="Example: Apple"
                  width={"100%"}
                  onChange={(e) => {
                    const search = e.target.value;
                    const filteredItems = items.filter((item) =>
                      item.name.toLowerCase().includes(search.toLowerCase())
                    );
                    if (search === "") {
                      fetchItems();
                    }

                    setItems(filteredItems);
                  }}
                />
              </FormControl>
            </form>
          </div>
        </Stack>
      </Box>
      <ToastContainer />

      <Center
        py={6}
        // display="flex"
        display="grid"
        className="container"
        // gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
      >
        {items.map((item) => (
          <Box className="item">
            <Stack
              textAlign={"center"}
              p={6}
              // color={useColorModeValue("gray.800", "white")}
              className="content"
              align={"center"}
            >
              <Text
                fontSize={"sm"}
                fontWeight={500}
                // bg={useColorModeValue("green.50", "green.900")}
                p={2}
                px={3}
                color={"green.500"}
                rounded={"full"}
              >
                Item
              </Text>
              <Stack direction={"row"} align={"center"} justify={"center"}>
                <Text fontSize={"3xl"}></Text>
                <Text fontSize={"4xl"} fontWeight={800}>
                  {item.name.toUpperCase()}
                </Text>
              </Stack>
              <Text fontSize={"2xl"} fontWeight={500}>
                {item.description}
              </Text>
            </Stack>

            <Box px={6} py={10}>
              <List spacing={3} className="list">
                <ListItem className="value">Price: ${item.price}</ListItem>
                <ListItem className="value">Quantity: {item.quantity}</ListItem>
              </List>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Button
                  mt={10}
                  w={"0"}
                  bg={"red.400"}
                  color={"white"}
                  rounded={"100"}
                  boxShadow={"0 5px 20px 0px rgb(255 0 0 / 43%)"}
                  _hover={{
                    bg: "red.500",
                  }}
                  _focus={{
                    bg: "red.500",
                  }}
                  onClick={() => deleteItem(item.id)}
                >
                  X
                </Button>
                <Button
                  mt={10}
                  // w={"full"}
                  bg={"green.400"}
                  color={"white"}
                  rounded={"100"}
                  boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
                  _hover={{
                    bg: "green.500",
                  }}
                  _focus={{
                    bg: "green.500",
                  }}
                  onClick={() => {
                    setModalId(item.id);
                    setModalName(item.name);
                    setModalDescription(item.description);
                    setModalPrice(item.price);
                    setModalQuantity(item.quantity);

                    onOpen();
                  }}
                >
                  <img
                    width={10}
                    src="https://cdn-icons-png.flaticon.com/512/45/45706.png"
                  />
                </Button>
              </div>
            </Box>
          </Box>
        ))}
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <Stack align={"center"}>
              <Heading
                fontSize={"3xl"}
                textAlign={"center"}
                paddingTop={"10px"}
              >
                Edit Item
              </Heading>
              <Box bg={"white"} boxShadow={"lg"} fill width={"100%"}>
                <FormControl>
                  <Box p={"20px"}>
                    <FormControl id="name" isRequired>
                      <FormLabel>Name</FormLabel>
                      <Input
                        type="text"
                        // change the value of the name state when the user types in the input
                        onChange={(e) => setModalName(e.target.value)}
                        value={modalName}
                        placeholder="Name"
                      />
                    </FormControl>
                  </Box>
                </FormControl>
                <FormControl>
                  <Box p={"20px"}>
                    <FormControl id="description">
                      <FormLabel>Description</FormLabel>
                      <Input
                        type="text"
                        onChange={(e) => setModalDescription(e.target.value)}
                        value={modalDescription}
                        placeholder="Description"
                      />
                    </FormControl>
                  </Box>
                </FormControl>
                <Box p="20px">
                  <FormControl id="price" isRequired>
                    <FormLabel>Price</FormLabel>
                    <Input
                      type="number"
                      onChange={(e) => setModalPrice(e.target.value)}
                      // get the id.price
                      value={modalPrice}
                      placeholder="Price"
                    />
                  </FormControl>
                </Box>
                <Box p="20px">
                  <FormControl id="quantity" isRequired>
                    <FormLabel>Quantity</FormLabel>
                    <Input
                      type="number"
                      onChange={(e) => setModalQuantity(e.target.value)}
                      value={modalQuantity}
                      placeholder="Quantity"
                    />
                  </FormControl>
                </Box>
                <Stack
                  spacing={10}
                  pt={2}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"green.400"}
                    color={"white"}
                    _hover={{
                      bg: "green.500",
                    }}
                    p="20px"
                    width={"90%"}
                    onClick={putItem}
                  >
                    Save Changes
                  </Button>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"red.400"}
                    color={"white"}
                    _hover={{
                      bg: "red.500",
                    }}
                    p="20px"
                    width={"90%"}
                    // onClick={postItem}
                  >
                    Cancel
                  </Button>
                </Stack>
                <Stack pt={6}></Stack>
              </Box>
            </Stack>
          </ModalContent>
        </Modal>
      </Center>
    </div>
  );
};

export default ViewItems;
