import React from "react";
import { Input, VStack } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/form-control";

const Signup = () => {
  return (
    <VStack>
      <FormControl>
        <FormLabel></FormLabel>
        <Input placeholder="Enter your name" onChange={() => {}} />
      </FormControl>
    </VStack>
  );
};

export default Signup;
