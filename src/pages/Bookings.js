import React, { useState, useEffect } from "react";
import {
  createStyles,
  Table,
  Container,
  ActionIcon,
  Modal,
  Button,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { deepOrange } from "@mui/material/colors";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  body: {
    margin: 0,
    minHeight:"500px"
  },
  hots: {
    color: "wheat",
    fontSize: 52,
    marginBottom: 40,
    textAlign: "center",
  },
  table: {
    margin: "40px",
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "20px",
  },
  bookingsTable: {
    color: "black",
  },
  mantineTableActionButton: {
    color: deepOrange[500],
  },
}));

function Bookings() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState("");

  const { classes } = useStyles();

// ...
useEffect(() => {
    const fetchBookingsData = async () => {
      try {
        const response = await fetch(`http://localhost:8800/api/bookings/`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          credentials: "include",
        });
        const bookingData = await response.json();
        const userBookings = bookingData.filter(booking => booking.user === user._id);
        setBookings(userBookings);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching bookings data:", error);
        setError(error);
        setLoading(false);
      }
    };
  
    fetchBookingsData();
  }, [user]);
  // ...
  

  const handleDeleteBooking = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowModal(true);
  };

  const confirmDeleteBooking = async () => {
    try {
      await fetch(`http://localhost:8800/api/bookings/${selectedBookingId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        credentials: "include",
      });

      const updatedBookings = bookings.filter(
        (booking) => booking._id !== selectedBookingId
      );
      setBookings(updatedBookings);

      setShowModal(false);
    } catch (error) {
      console.log("Error deleting booking:", error);
      setError(error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

let serialNo = 1;
console.log(bookings)

  return (
    <div className={classes.body}>
      <h1 className={classes.hots}>Bookings By {user.username}</h1>
      {bookings.length > 0 ? (
        <div className={classes.table}>
          <Table className={classes.bookingsTable}>
            <thead>
              <tr>
              <th>S.No</th>
                <th>Booking Id</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Guests</th>
                <th>Total Price</th>
                <th>Payment Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                    <td>{serialNo++}</td>
                    <td>
                    <Link to={`/hotel/${booking.hotel}`}>
                      {booking._id}
                    </Link>
                  </td>
                  <td>{booking.checkIn}</td>
                  <td>{booking.checkOut}</td>
                  <td>{booking.guests}</td>
                  <td>{booking.totalPrice}</td>
                  <td>{booking.paymentStatus}</td>
                  <td>
                    <Container
                      inline
                      justify="center"
                      className="mantineTableActions"
                    >
                      <ActionIcon variant="transparent">
                        <IconTrash
                          size="1.8rem"
                          onClick={() => handleDeleteBooking(booking._id)}
                          className={classes.mantineTableActionButton}
                        />
                      </ActionIcon>
                    </Container>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <div>No bookings found</div>
      )}

      <Modal
        opened={showModal}
        onClose={closeModal}
        title="Confirm Deletion"
        hideCloseButton
        size="sm"
        disableOverlayClick
      >
        <p>Are you sure you want to delete this booking?</p>
        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}
        >
          <Button
            onClick={confirmDeleteBooking}
            variant="danger"
            style={{ marginRight: 10 }}
          >
            Confirm
          </Button>
          <Button onClick={closeModal}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
}

export default Bookings;
