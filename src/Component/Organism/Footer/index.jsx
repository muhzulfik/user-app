import { Box, Container, Stack, Text, useColorModeValue } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} zIndex="1">
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "row" }}
        spacing={4}
        justify={{ base: "space-between" }}
      >
        <Text color="blue-primary" textStyle="subtitle-small">
          © User
        </Text>
      </Container>
    </Box>
  );
}