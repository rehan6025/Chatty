import React from "react";
import { Box, Container, Text, Tabs } from "@chakra-ui/react";
import Login from "../components/authentication/Login";
import Signup from "../components/authentication/Signup";
import { Toaster } from "@/components/ui/toaster";

const HomePage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        display={"flex"}
        justifyContent="center"
        p={3}
        bg={"white"}
        w={"100%"}
        m="40px 0 15px 0"
      >
        <Text color={"black"} fontSize={"4xl"} fontFamily="Work Sans">
          Chatty
        </Text>
      </Box>

      <Box
        bg={"white"}
        w="100%"
        p={4}
        borderRadius={"lg"}
        borderWidth={"1px"}
        color={"black"}
      >
        <Tabs.Root defaultValue="members" variant="plain">
          <Tabs.List rounded="l3" bg="blue.50" mb={"1em"} display="flex">
            <Tabs.Trigger
              value="members"
              _selected={{ color: "blue.600", fontWeight: "medium" }}
              color="blue.400"
              flex="1"
              justifyContent={"center"}
              py={2}
            >
              Login
            </Tabs.Trigger>
            <Tabs.Trigger
              value="projects"
              _selected={{ color: "blue.600", fontWeight: "medium" }}
              color="blue.400"
              flex="1"
              justifyContent={"center"}
              py={2}
            >
              SignUp
            </Tabs.Trigger>
            <Tabs.Indicator bg="blue.100" rounded="l2" />
          </Tabs.List>

          <Tabs.Content value="members">
            <Login />
            <Toaster />
          </Tabs.Content>
          <Tabs.Content value="projects">
            <Signup />
            <Toaster />
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Container>
  );
};

export default HomePage;
