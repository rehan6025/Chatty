import React from "react";
import { Button, Input, InputGroup, VStack } from "@chakra-ui/react";
import { InputRightElement } from "@chakra-ui/input";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useState } from "react";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const postDetails = (pics) => {};
  const submitHandler = () => {};

  return (
    <VStack color={"black"} width={"100%"}>
      <FormControl id="first-name" isRequired w="100%">
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="email" isRequired w="100%">
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired w="100%">
        <FormLabel>Password</FormLabel>
        <InputGroup
          endElement={
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          }
        >
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
      </FormControl>

      <FormControl id="confirm-password" isRequired w="100%">
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup
          endElement={
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          }
        >
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your Password again"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </InputGroup>
      </FormControl>

      <FormControl id="pic" width={"100%"}>
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        bgColor={"blue.500"}
        _hover={{ bg: "blue.400" }}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
