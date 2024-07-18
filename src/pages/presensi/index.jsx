import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import Footer from "@/components/footer";
import withPetugasAuth from "@/utils/petugasAuthorization";

const ScanPresensi = () => {
  const [scanResult, setScanResult] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 300,
        height: 300,
      },
      fps: 5,
    });

    const success = (result) => {
      setScanResult(result);
      setTimeout(() => {
        scanner.clear();
        setScanResult(null);
        scanner.render(success, error);
      }, 2000);
    };

    const error = (err) => {
      console.warn(err);
    };

    scanner.render(success, error);

    // Clean up the scanner on component unmount
    return () => {
      scanner.clear();
    };
  }, []);

  const handleLogout = () => {
    try {
      localStorage.setItem("token", "");
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box width={"100%"} h="100vh">
      <Flex direction="column" justify="space-between" h="full">
        <Flex justify="space-between" align="center" px={10} py={5}>
          <Flex direction={"column"} gap={2}>
            <Heading fontSize={"20px"}>Presensi Siswa Berbasis QR Code</Heading>
            <Text>SD ‘Aisyiyah Unggulan Purworejo</Text>
          </Flex>
          <Button
            onClick={() => {
              handleLogout();
            }}
            variant="solid"
            size="sm"
            color={"white"}
            bg={"red.400"}
            _hover={{
              bg: "red.300",
            }}
          >
            LOGOUT
          </Button>
        </Flex>
        <Center flex="1" mt={"-150px"}>
          {/* card */}
          <Flex
            w="full"
            maxW="500px"
            bg="white"
            borderWidth="1px"
            borderColor="gray.200"
            rounded="lg"
            shadow="md"
            position="relative"
            direction="column"
          >
            <Flex
              justify="space-between"
              p={5}
              // position="absolute"
              w={["full"]}
              mx="auto"
            >
              <Flex direction="column">
                <Text fontWeight="bold">Presensi Masuk</Text>
                <Text fontSize="sm">Tunjukan QR Code ke Kamera</Text>
              </Flex>
              <Button
                onClick={() => router.push("/presensi")}
                color={"white"}
                bg={"teal.400"}
                _hover={{
                  bg: "teal.300",
                }}
                variant="solid"
                size="md"
              >
                PRESENSI LAGI
              </Button>
            </Flex>

            {/* qr scanner */}
            <Box w="full" h="300px" bg="gray.50" mx="auto">
              {scanResult ? (
                <Text>
                  Success: <Text as="span">{scanResult}</Text>
                </Text>
              ) : (
                <div id="reader"></div>
              )}
            </Box>
          </Flex>
        </Center>

        <Footer />
      </Flex>
    </Box>
  );
};

export default withPetugasAuth(ScanPresensi);
