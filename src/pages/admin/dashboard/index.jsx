import SidebarDashboard from "@/components/SidebarDashboard";
import { Flex, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";

const Dashboard = () => {
  return (
    <SidebarDashboard>
      <Flex direction={"column"} gap={5}  w={"100%"}>
      <Heading>Dashboard</Heading>
      <TableContainer >
        <Table>
          <Thead>
            <Tr>
              <Th>Dashboard</Th>
              <Th>Dashboard</Th>
              <Th>Dashboard</Th>
              <Th>Dashboard</Th>
              <Th>Dashboard</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>aaa</Td>
              <Td>aaa</Td>
              <Td>aaa</Td>
              <Td>aaa</Td>
              <Td>aaa</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      </Flex>
    </SidebarDashboard>
  );
};

export default Dashboard;
