import SidebarDashboard from "@/components/SidebarDashboard";
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Heading,
  Button,
} from "@chakra-ui/react";

function Edit() {
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
          <Heading mb={6}>Edit Data Siswa</Heading>
          <FormControl mb={4}>
            <FormLabel>NIS</FormLabel>
            <Input type="number" placeholder="Masukkan NIS" />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Nama</FormLabel>
            <Input type="text" placeholder="Masukkan Nama" />
          </FormControl>
          <FormControl mb={6}>
            <FormLabel>Kelas</FormLabel>
            <Input type="text" placeholder="Masukkan Kelas" />
          </FormControl>
          <FormControl mb={6}>
            <FormLabel>No. Telp Orang Tua / Wali</FormLabel>
            <Input type="number" placeholder="8xxxxxxxxx" />
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

export default Edit;
