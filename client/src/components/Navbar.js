import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Text,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import "../Grid.css";

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Text fontSize={"4xl"} fontWeight={500} color={"#277DFF"}>
              <Link href="/">UCart</Link>
            </Text>
          </Box>

          {/*  make a link to view page */}
          {/* <Link href="/view">
              <Button
                variantColor="teal"
                variant="outline"
                size="sm"
                mr={2}
                onClick={() => {
                  console.log("clicked");
                }}
                textDecoration="none"
                // do nothing on hover
                _hover={{ textDecoration: "none" }}
              >
                View
              </Button>
              <Button
                variantColor="teal"
                variant="outline"
                size="sm"
                mr={2}
                onClick={() => {
                  console.log("clicked");
                }}
                textDecoration="none"
                _hover={{ textDecoration: "none" }}
              >
                Create
              </Button>
            </Link> */}

          <Button
            variantColor="teal"
            variant="outline"
            size="sm"
            mr={2}
            href="/view"
            as={"a"}
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            View
          </Button>

          <Button
            variantColor="teal"
            variant="outline"
            size="sm"
            mr={2}
            href="/create"
            as={"a"}
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            Create
          </Button>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                ></MenuButton>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
