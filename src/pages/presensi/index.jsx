import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import Footer from "@/components/footer";
import withPetugasAuth from "@/utils/petugasAuthorization";
import axiosInstance from "@/utils/axiosInstance";

const ScanPresensi = () => {
  const [scanResult, setScanResult] = useState(null);
  const [scannerActive, setScannerActive] = useState(false);
  const [presensi, setPresensi] = useState("");
  const router = useRouter();
  const toast = useToast();
  const [isFirst, setIsFirst] = useState(true);
  const [loading, setLoading] = useState(false);
  const now = new Date();
  const nowIndonesian = new Date(now.getTime() + 7 * 60 * 60 * 1000);
  const nowISO = nowIndonesian.toISOString().split("T")[1];

  useEffect(() => {
    const [hour, minute] = nowISO.split(":").map(Number);
    if (hour >= 6 && hour < 9) {
      setPresensi("Presensi Masuk");
    } else if (hour >= 12 && hour < 15) {
      setPresensi("Presensi Pulang");
    } else {
      setPresensi("Presensi Tidak Tersedia");
    }
  }, []);

  useEffect(() => {
    let scanner;
    if (scannerActive) {
      scanner = new Html5QrcodeScanner("reader", {
        qrbox: {
          width: 300,
          height: 300,
        },
        fps: 30,
      });

      const success = (result) => {
        setLoading(true);
        setScanResult(result);
        handlePresensi();
        setTimeout(() => {
          scanner.clear();
          setScanResult(null);
          setScannerActive(false);
        }, 2000);
      };

      const handlePresensi = async () => {
        try {
          const response = await axiosInstance.post("/petugas/presensi", {
            scanResult,
          });
          toast({
            title: response.data.message,
            status: "info",
            position: "bottom-right",
            isClosable: true,
          });
          setLoading(false);
        } catch (error) {
          console.error(error);
          toast({
            title: error.response.data.message,
            status: "error",
            position: "bottom-right",
            isClosable: true,
          });
          setLoading(false);
        }
      };

      const error = (err) => {
        console.warn(err);
      };

      scanner.render(success, error);
    }

    // Clean up the scanner on component unmount
    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [scannerActive]);

  const handleLogout = () => {
    try {
      localStorage.setItem("token", "");
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handlePresensiLagi = () => {
    // if (presensi == "Presensi Tidak Tersedia") {
    //   return toast({
    //     title: "Presensi tidak tersedia pada jam ini",
    //     status: "info",
    //     position: "bottom-right",
    //     isClosable: true,
    //   });
    // }
    setScanResult(null);
    setScannerActive(true);
    setIsFirst(false);
  };

  return (
    <Box width={"100%"} h="100vh">
      <Flex direction="column" justify="space-between" h="full">
        <Flex justify="space-between" align="center" px={10} py={5}>
          <Flex direction={"column"} gap={2}>
            <Heading fontSize={"20px"}>Presensi Siswa Berbasis QR Code</Heading>
            <Text>SD &apos;Aisyiyah Unggulan Purworejo</Text>
          </Flex>
          <Button
            onClick={handleLogout}
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
            <Flex justify="space-between" p={5} w={["full"]} mx="auto">
              <Flex direction="column">
                <Text fontWeight="bold">{presensi}</Text>
                <Text fontSize="sm">Tunjukan QR Code ke Kamera</Text>
              </Flex>
              <Button
                onClick={handlePresensiLagi}
                color={"white"}
                bg={"teal.400"}
                _hover={{
                  bg: "teal.300",
                }}
                variant="solid"
                size="md"
              >
                {isFirst ? "Presensi" : "Presensi Lagi"}
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
