import SidebarDashboard from "@/components/SidebarDashboard";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";

const Dashboard = () => {
  return (
    <SidebarDashboard>
      <TableContainer  w={"100%"}>
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
    </SidebarDashboard>
  );
};

export default Dashboard;
