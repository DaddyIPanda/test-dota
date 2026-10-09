import { Heading, Button, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <Box minH="100vh" bgGradient="to-bl" gradientFrom="#09203F" gradientTo="#537895">
      <Heading mx="auto" display="flex" justifyContent="center">
        404 Not Found
      </Heading>
      <br>
      </br>
      <Button mx="auto" display="flex" justifyContent="center">
        <Link to="/">Go back home</Link>
      </Button>
    </Box>
  );
}