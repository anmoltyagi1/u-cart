import React, { useEffect } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Toast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const InputItem = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    console.log(name);
    console.log(description);
    console.log(price);
    console.log(quantity);
  }, [name, description, price, quantity]);

  const postItem = async (e) => {
    e.preventDefault();

    try {
      // proxy

      console.log(JSON.stringify({ name, description, price, quantity }));

      const response = await fetch("/items", {
        method: "POST",
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
      toast("Item added successfully");
      console.log(response);
    } catch (error) {
      console.error(error.message);
      toast.error("lorem");
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Add Item
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Input all the information about the item you want to add.
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl>
              <Box>
                <FormControl id="name" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    // change the value of the name state when the user types in the input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Name"
                  />
                </FormControl>
              </Box>
            </FormControl>
            <FormControl>
              <Box>
                <FormControl id="description">
                  <FormLabel>Description</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder="Description"
                  />
                </FormControl>
              </Box>
            </FormControl>
            <FormControl id="price" isRequired>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                placeholder="Price"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Quantity</FormLabel>
              <Input
                type="float"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
                placeholder="Quantity"
              />
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={postItem}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}></Stack>
          </Stack>
        </Box>
      </Stack>
      <ToastContainer />
    </Flex>
    // <div>

    //    <h1>Input Item</h1>
    //   <form>
    //     <input type="text" placeholder="Enter item name">
    //       <button>Submit</button>
    //     </input>
    //   </form>
    //  </div>
  );
};

export default InputItem;
