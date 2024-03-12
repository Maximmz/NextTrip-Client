import React, { useState } from "react";
import {
  Anchor,
  ScrollArea,
  Table,
  Text,
  useMantineTheme,
  Modal,
  Button,
} from "@mantine/core";
import Checkout from "../components/checkout/Checkout";

function RoomsTable({ rooms, users, hotels }) {
  const theme = useMantineTheme();
  const buttonStyles = {
    borderRadius: "6px",
    padding: "10px 20px",
    fontWeight: "bold",
    fontSize: "16px",
    background: "linear-gradient(to right, #FF6B6B, #FF8E53)",
    color: "#FFF",
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s ease",
    outline: "none",
    marginLeft: "10px",
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null); // State to store the selected room

  const handleBook = (id, title,price,maxPeople,desc) => {
    if (!users) {
      alert("Please log in first.");
      return;
    }

    setSelectedRoom({ id, title,price,maxPeople,desc }); // Store the selected room data in the state
    openModal();
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    resetFields();
  };

  const resetFields = () => {
    setSelectedRoom(null);
  };

  const rows = rooms.map((row) => {
    return (
      <tr key={row._id}>
        <td>
          <Anchor
            component="button"
            size="sm"
            style={{ color: theme.colors.dark[0], fontWeight: 500 }}
          >
            {row.title}
          </Anchor>
        </td>
        <td>
          <Text size="sm" style={{ color: theme.colors.dark[0] }}>
            {row.price}
          </Text>
        </td>
        <td>
          <Anchor
            component="button"
            size="sm"
            style={{ color: theme.colors.dark[0], fontWeight: 500 }}
          >
            {row.maxPeople}
          </Anchor>
        </td>
        <td>
          <Button
            onClick={() => handleBook(row._id, row.title,row.price,row.maxPeople,row.desc)}
            variant="primary"
            style={buttonStyles}
          >
            Book
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea style={{ maxHeight: 300 }}>
      <Table
        style={{
          border: `1px solid ${theme.colors.dark[4]}`,
          borderRadius: theme.radius.md,
          overflow: "hidden",
          backgroundColor: theme.colors.dark[7],
        }}
        minWidth={800}
        verticalSpacing="xs"
      >
        <thead style={{ backgroundColor: theme.colors.dark[6] }}>
          <tr>
            <th style={{ padding: "12px 16px" }}>
              <Text style={{ color: theme.colors.dark[0] }}>Rooms title</Text>
            </th>
            <th style={{ padding: "12px 16px" }}>
              <Text style={{ color: theme.colors.dark[0] }}>Price</Text>
            </th>
            <th style={{ padding: "12px 16px" }}>
              <Text style={{ color: theme.colors.dark[0] }}>Max People</Text>
            </th>
            <th style={{ padding: "12px 16px" }}>
              <Text style={{ color: theme.colors.dark[0] }}>Actions</Text>
            </th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>

      <Modal opened={isModalOpen} onClose={closeModal} title="Confirm Booking">
        {selectedRoom && ( // Only render the Checkout component if a room is selected
          <Checkout
            users={users}
            hotels={hotels}
            rooms={selectedRoom} // Pass the selected room as an array to the Checkout component
          />
        )}
      </Modal>
    </ScrollArea>
  );
}

export default RoomsTable;
