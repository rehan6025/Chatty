import React from "react";
import { Button, Input, InputGroup, VStack } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useState } from "react";
import axios from "axios";
import { toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toaster.create({
        title: "Please enter all fields",
        type: "error",
        duration: 3000,
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "api/users/login",
        { email, password },
        config
      );

      toaster.create({
        title: "Login Successful",
        status: "success",
        duration: 3000,
      });
      console.log(data);

      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);

      navigate("/chats");
    } catch (error) {
      toaster.create({
        title: "Error occured",
        status: "error",
        duration: 3000,
      });
      setLoading(false);
    }
  };

  return (
    <VStack color={"black"} width={"100%"}>
      <FormControl id="email" isRequired w="100%">
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
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

      <Button
        variant="solid"
        bgColor={"red.400"}
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
