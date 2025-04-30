import React from "react";
import { Button, Input, InputGroup, VStack } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const submitHandler = () => {};

  return (
    <VStack color={"black"} width={"100%"}>
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

      <Button
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        bgColor={"blue.500"}
        _hover={{ bg: "blue.400" }}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
