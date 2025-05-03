import React from "react";
import { Button, Input, InputGroup, VStack } from "@chakra-ui/react";
import { InputRightElement } from "@chakra-ui/input";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useState } from "react";
import axios from "axios";
import { toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => setShow(!show);

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toaster.create({
        title: "Please select an image",
        type: "error",
        duration: 3000,
      });
      return;
    }

    if (pics.type == "image/jpeg" || pics.type == "image/png") {
      const formdata = new FormData();
      formdata.append("file", pics);
      formdata.append("upload_preset", "Chatty");
      fetch("https://api.cloudinary.com/v1_1/dgopmlow7/image/upload", {
        method: "POST",
        body: formdata,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());

          setLoading(false);
        });
    } else {
      toaster.create({
        title: "Please select an image",
        type: "error",
        duration: 3000,
      });
      setLoading(false);
      return;
    }
  };

  const submitHandler = async () => {
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      toaster.create({
        title: "Please enter all fields",
        type: "error",
        duration: 3000,
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toaster.create({
        title: "Passwords do not match",
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
        "/api/users",
        { name, email, password, pic },
        config
      );

      console.log(data);
      toaster.create({
        title: "Registration Successful",
        status: "success",
        duration: 3000,
      });

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

    // fetch("/api/user/", {
    // method:"POST"
    //   body: {
    //     name: name,
    //     email: email,
    //     password: password,
    //     pic: pic,
    //   },
    // });
  };

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
        w={"100%"}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        bgColor={"blue.500"}
        _hover={{ bg: "blue.400" }}
        isLoading={loading}
        loadingText="Loading..."
      >
        {loading ? "Loading" : "Sign Up"}
      </Button>
    </VStack>
  );
};

export default Signup;
