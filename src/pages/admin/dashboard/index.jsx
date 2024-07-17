import SidebarDashboard from "@/components/SidebarDashboard";
import {
  Heading,
  Card,
  CardBody,
  Stack,
  Text,
  Flex,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaUsers, FaUserGroup } from "react-icons/fa6";
import { FaDoorClosed } from "react-icons/fa";
import LoadingComponent from "@/components/LoadingComponent";
import axiosInstance from "@/utils/axiosInstance";
import formatDate from "@/utils/formatDate";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const now = new Date();
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/admin/dashboard");
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SidebarDashboard>
      <Flex flexDirection="column" gap={10}>
        <Heading>Dashboard</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} mt={2}>
          <Card
            overflow="hidden"
            variant="outline"
            _hover={{ borderColor: "teal.100" }}
          >
            {loading ? (
              <LoadingComponent mx="auto" my="20" />
            ) : (
              <>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  mt="10px"
                  p={5}
                >
                  <FaUsers size="2em" />
                </Box>
                <Stack>
                  <CardBody>
                    <Heading size="md">Jumlah Siswa</Heading>
                    <Text py={2}>{data?.totalSiswa} Siswa</Text>
                  </CardBody>
                </Stack>
              </>
            )}
          </Card>

          <Card
            overflow="hidden"
            variant="outline"
            _hover={{ borderColor: "teal.100" }}
          >
            {loading ? (
              <LoadingComponent m="auto" />
            ) : (
              <>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  mt="10px"
                  p={5}
                >
                  <FaDoorClosed size="2em" />
                </Box>
                <Stack>
                  <CardBody>
                    <Heading size="md">Jumlah Kelas</Heading>
                    <Text py={2}>{data?.totalKelas} Kelas</Text>
                  </CardBody>
                </Stack>
              </>
            )}
          </Card>
          <Card
            overflow="hidden"
            variant="outline"
            _hover={{ borderColor: "teal.100" }}
          >
            {loading ? (
              <LoadingComponent m="auto" />
            ) : (
              <>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  mt="10px"
                  p={5}
                >
                  <FaUserGroup size="2em" />
                </Box>
                <Stack>
                  <CardBody>
                    <Heading size="md">Jumlah Petugas</Heading>
                    <Text py={2}>{data?.totalPetugas} Petugas</Text>
                  </CardBody>
                </Stack>
              </>
            )}
          </Card>
        </SimpleGrid>

        {/* review absensi */}
        <Card
          overflow="hidden"
          width={{ base: "100%" }}
          variant="outline"
          _hover={{ borderColor: "teal.100" }}
        >
          <Stack>
            <CardBody>
              <Flex
                flexDirection={{ base: "column", md: "row" }}
                gap={10}
                alignItems="center"
                justifyContent={"space-between"}
              >
                {loading ? (
                  <LoadingComponent mx="320" my="10" />
                ) : (
                  <>
                    <Box>
                      <Heading size="md">Presensi Siswa Hari Ini</Heading>
                      <Text mt={5}>Tanggal {formatDate(now)}</Text>
                    </Box>
                    <Flex
                      flexDirection="row"
                      alignItems="center"
                      width="400px"
                      justifyContent="space-around"
                      bg="teal.500"
                      p={5}
                      rounded="lg"
                    >
                      <Flex flexDirection="column" alignItems="center" gap={5}>
                        <Text fontWeight={500} color="white">
                          Hadir
                        </Text>
                        <Text color="white" fontSize="20px">
                          {data?.kehadiranHariIni?.H}
                        </Text>
                      </Flex>
                      <Flex flexDirection="column" alignItems="center" gap={5}>
                        <Text fontWeight={500} color="white">
                          Sakit
                        </Text>
                        <Text color="white" fontSize="20px">
                          {data?.kehadiranHariIni?.S}
                        </Text>
                      </Flex>
                      <Flex flexDirection="column" alignItems="center" gap={5}>
                        <Text fontWeight={500} color="white">
                          Izin
                        </Text>
                        <Text color="white" fontSize="20px">
                          {data?.kehadiranHariIni?.I}
                        </Text>
                      </Flex>
                      <Flex flexDirection="column" alignItems="center" gap={5}>
                        <Text fontWeight={500} color="white">
                          Belum
                        </Text>
                        <Text color="white" fontSize="20px">
                          {data?.kehadiranHariIni?.TK}
                        </Text>
                      </Flex>
                    </Flex>
                  </>
                )}
              </Flex>
            </CardBody>
          </Stack>
        </Card>
      </Flex>
    </SidebarDashboard>
  );
};

export default Dashboard;
