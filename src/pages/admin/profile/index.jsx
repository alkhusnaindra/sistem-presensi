import SidebarDashboard from "@/components/SidebarDashboard";
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Heading,
  Button,
} from "@chakra-ui/react";

function Profile() {
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
          <Heading mb={6} textAlign={"center"}>
            Edit Password
          </Heading>

          <FormControl mb={6}>
            <FormLabel>Old Password</FormLabel>
            <Input
              type="password"
              placeholder="Masukkan password lama"
              _placeholder={{ opacity: 0.5, color: "gray.500", fontsize: 12 }}
            />
          </FormControl>
          <FormControl mb={6}>
            <FormLabel>Password Baru</FormLabel>
            <Input
              type="password"
              placeholder="Masukkan password baru"
              _placeholder={{ opacity: 0.5, color: "gray.500", fontsize: 12 }}
            />
          </FormControl>
          <FormControl mb={6}>
            <FormLabel>Konfirmasi Password</FormLabel>
            <Input
              type="password"
              placeholder="Konfirmasi password baru"
              _placeholder={{ opacity: 0.5, color: "gray.500", fontsize: 12 }}
            />
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

export default Profile;
