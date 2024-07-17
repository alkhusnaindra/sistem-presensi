import Loading from "@/components/Loading";
import SidebarDashboard from "@/components/SidebarDashboard";
import { secondaryColor, white } from "@/utils/color";
import formatDate from "@/utils/formatDate";
import { AddIcon, ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

const data = {
  data: [
    {
      idPetugas: 1,
      nama: "John Doe",
      email: "johndoe@example.com",
      createdAt: "2023-07-16T00:00:00.000Z",
    },
    {
      idPetugas: 2,
      nama: "Jane Smith",
      email: "janesmith@example.com",
      createdAt: "2023-07-17T00:00:00.000Z",
    },
  ],
  pagination: {
    total_page: 2,
    current_page: 1,
  },
};

const Presensi = () => {
  const totalButton = useBreakpointValue({ base: 1, lg: 3 }, { fallback: 1 });
  const router = useRouter();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const toast = useToast();
  const [page, setPage] = useState(parseInt(router.query.page) || 1);

  const deleteData = (id) => {
    toast({
      title: `Data with id ${id} has been deleted`,
      status: "info",
      position: "bottom-right",
      isClosable: true,
    });
    setIsConfirmationOpen(false);
    setDeleteId(null);
  };

  const ConfirmationModal = (id) => {
    return (
      <Modal
        isOpen={isConfirmationOpen}
        onClose={() => {
          setIsConfirmationOpen(false);
          setDeleteId(null);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Konfirmasi Hapus</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Apakah anda yakin ingin menghapus data ini?</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="gray"
              mr={3}
              onClick={() => {
                setIsConfirmationOpen(false);
                setDeleteId(null);
              }}
            >
              Close
            </Button>
            <Button colorScheme={"red"} onClick={() => deleteData(deleteId)}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  const handlePageChange = (newPage) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage },
    });
  };

  return (
    <>
      <SidebarDashboard>
        <Flex direction={"column"} gap={5} w={"100%"}>
          <HStack justifyContent={"space-between"} alignContent={"center"}>
            <Heading>Daftar Presensi</Heading>
            <Button
              onClick={() => router.push("/admin/petugas/tambah")}
              colorScheme={"teal"}
              variant={"outline"}
              leftIcon={<AddIcon />}
            >
              Tambah Data
            </Button>
          </HStack>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Nama</Th>
                  <Th>Dibuat Pada</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.data.map((item, index) => (
                  <Tr key={item.idPetugas}>
                    <Td>{index + 1}</Td>
                    <Td>
                      <Text as={"b"}>{item.nama}</Text>
                      <Text>{item.email}</Text>
                    </Td>
                    <Td>{formatDate(item.createdAt)}</Td>
                    <Td>
                      <Button
                        colorScheme={"red"}
                        onClick={() => {
                          setIsConfirmationOpen(true);
                          setDeleteId(item.idPetugas);
                        }}
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          {data.pagination.total_page > 0 ? (
            <HStack mt={4} mx={"auto"}>
              <Button
                variant="outline"
                colorScheme="teal"
                onClick={() =>
                  handlePageChange(data.pagination.current_page - 1)
                }
                isDisabled={data.pagination.current_page === 1}
              >
                <ArrowLeftIcon />
              </Button>
              {data.pagination.current_page > 3 && (
                <>
                  <Button
                    variant="outline"
                    colorScheme="teal"
                    onClick={() => handlePageChange(1)}
                  >
                    1
                  </Button>
                  {data.pagination.current_page > 4 && <Text>...</Text>}
                </>
              )}
              {Array.from(
                { length: totalButton },
                (_, index) => data.pagination.current_page - 0 + index
              )
                .filter(
                  (pageNumber) =>
                    pageNumber > 0 && pageNumber <= data.pagination.total_page
                )
                .map((pageNumber) => (
                  <Button
                    key={pageNumber}
                    variant={
                      data.pagination.current_page === pageNumber
                        ? "solid"
                        : "outline"
                    }
                    colorScheme="teal"
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                ))}
              {data.pagination.current_page <
                data.pagination.total_page - 2 && (
                <>
                  {data.pagination.current_page <
                    data.pagination.total_page - 3 && <Text>...</Text>}
                  <Button
                    variant="outline"
                    colorScheme="teal"
                    onClick={() => handlePageChange(data.pagination.total_page)}
                  >
                    {data.pagination.total_page}
                  </Button>
                </>
              )}
              <Button
                variant="outline"
                colorScheme="teal"
                onClick={() =>
                  handlePageChange(data.pagination.current_page + 1)
                }
                isDisabled={
                  data.pagination.current_page === data.pagination.total_page
                }
              >
                <ArrowRightIcon />
              </Button>
            </HStack>
          ) : null}
        </Flex>
      </SidebarDashboard>
      <ConfirmationModal />
    </>
  );
};

export default Presensi;
