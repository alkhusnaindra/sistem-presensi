import Loading from "@/components/Loading";
import SidebarDashboard from "@/components/SidebarDashboard";
import withAdminAuth, { AuthContext } from "@/utils/adminAuthorization";
import axiosInstance from "@/utils/axiosInstance";
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Heading,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const Tambah = () => {
  const [email, setEmail] = useState("");
  const toast = useToast();
  const router = useRouter();
  const [superAdmin, setSuperAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const userData = useContext(AuthContext);
  const isSuperAdmin = userData?.isSuperAdmin;

  useEffect(() => {
    if (userData) {
      setSuperAdmin(userData.superAdmin === true);
      setLoading(false); // Menyelesaikan loading ketika userData ter-load
    }
  }, [userData]);

  useEffect(() => {
    if (router.isReady && userData) {
      setSuperAdmin(userData.super_admin === true);
    }
  }, [router.isReady, router.asPath, userData]);

  useEffect(() => {
    if (!loading && !isSuperAdmin) {
      router.push("/admin/management");
      toast({
        title: "Anda tidak memiliki izin untuk mengakses halaman ini",
        status: "error",
        position: "bottom-right",
        isClosable: true,
      });
    }
  }, [loading, isSuperAdmin]);

  const handleAdd = async () => {
    try {
      const response = await axiosInstance.post("/admin/management", {
        email,
      });
      toast({
        title: response.data.message,
        status: "info",
        position: "bottom-right",
        isClosable: true,
      });
      router.push("/admin/management");
    } catch (error) {
      console.error(error);
      toast({
        title: error.response.data.message,
        status: "error",
        position: "bottom-right",
        isClosable: true,
      });
    }
  };

  if (loading) return <Loading />;

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
            <Input
              type="email"
              placeholder="Masukkan email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </FormControl>

          <Button
            color={"white"}
            bg={"teal.400"}
            _hover={{
              bg: "teal.300",
            }}
            onClick={handleAdd}
          >
            Simpan
          </Button>
        </Flex>
      </Flex>
    </SidebarDashboard>
  );
};

export default withAdminAuth(Tambah);
