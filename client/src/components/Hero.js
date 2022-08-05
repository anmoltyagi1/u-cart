import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  IconProps,
} from "@chakra-ui/react";
import cuate from "../cuate.svg";

export default function Hero() {
  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Manage your inventory with{" "}
          <Text as={"span"} color={"#277DFF"}>
            UCart
          </Text>
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"}>
          Able to track your inventory and manage it in a simple and easy way.
          Whether you are a restaurant owner, reseller, or a grocery store
          manager, UCart is the perfect solution for you.
        </Text>
        <Stack spacing={6} direction={"row"}>
          <Button
            rounded={"full"}
            px={6}
            colorScheme={"orange"}
            bg={"#277DFF"}
            _hover={{ bg: "blue.500" }}
            href="/view"
            as={"a"}
          >
            View Items
          </Button>
          <Button rounded={"full"} px={6} href="/create" as={"a"}>
            Create Item
          </Button>
        </Stack>
        <Flex
          w={"full"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {/* <Illustration
            height={{ sm: "24rem", lg: "28rem" }}
            mt={{ base: 12, sm: 16 }}
          /> */}
          <img src={cuate} alt="cuate" />
        </Flex>
      </Stack>
    </Container>
  );
}
