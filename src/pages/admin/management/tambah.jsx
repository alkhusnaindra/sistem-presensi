import SidebarDashboard from "@/components/SidebarDashboard";
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Heading,
  Button,
} from "@chakra-ui/react";

function Tambah() {
  return (
    <SidebarDashboard>
      <Flex
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
        margin="auto"
      >
        <Flex
          flexDirection="column"
          p={10}
          borderRadius="md"
          boxShadow="md"
          bg="white"
          w="800px"
          maxW="90%"
        >
          <Heading mb={6}>Tambah Data Admin</Heading>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Masukkan email" />
          </FormControl>

          <Button
            color={"white"}
            bg={"teal.400"}
            _hover={{
              bg: "teal.300",
            }}
          >
            Simpan
          </Button>
        </Flex>
      </Flex>
    </SidebarDashboard>
  );
}

export default Tambah;
