import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { DateInput } from "@mantine/dates";
import { TextInput, Select, Button, Box } from "@mantine/core";

export default function Review({ users, rooms, hotels }) {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

  const handleSubmit = () => {
    const bookingData = {
      user: users._id,
      hotel: hotels._id,
      room: rooms.id,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: guests,
      totalPrice: totalPrice,
      paymentStatus: "completed",
    };


    fetch("http://localhost:8800/api/bookings/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${users.token}`,
      },
      body: JSON.stringify(bookingData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Booking Successful!");
          alert("Booking Successful!");
        } else {
          console.log("Booking Failed!");
          alert("Booking Failed! Please try again.");
        }
      })
      .catch((error) => {
        console.error(error);
        console.log("Booking Failed!");
        alert("Booking Failed! Please try again.");
      })
      .finally(() => {});
  };
  return (
    <React.Fragment>
      <Typography mt={4} variant="h5" gutterBottom>
        Dates & Guests
      </Typography>

      <Grid item xs={12} md={10}>
        <DateInput
          value={checkInDate}
          onChange={setCheckInDate}
          placeholder="Select date"
          label="Check In Date"
        />
        <DateInput
          value={checkOutDate}
          onChange={setCheckOutDate}
          placeholder="Select date"
          label="Check Out Date"
        />
        <Select
          value={guests}
          onChange={setGuests}
          data={["2", "4", "6"]}
          placeholder="Select an option"
          label="Guests"
        />
        <TextInput
          value={totalPrice}
          onChange={(event) => setTotalPrice(event.currentTarget.value)}
          placeholder="Enter Total Price"
          label="Total Price"
        />
      </Grid>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        <ListItem key={hotels.name} sx={{ py: 1, px: 0 }}>
          <ListItemText primary={hotels.name} secondary={rooms.title} />
          <Typography variant="body2">{hotels.location}</Typography>
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${totalPrice}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{users.username}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            <React.Fragment key={"payment"}>
              <Grid item xs={6} sm={6} mb={6}>
                <Typography gutterBottom>Visa</Typography>
              </Grid>
              <Grid item xs={6} sm={6} >
                <Typography gutterBottom>Master</Typography>
              </Grid>
            </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
      <React.Fragment>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt:6 }}>
          <Button
            onClick={handleSubmit}
            sx={{ mt: 3, ml: 1 }}
          >
            {" "}
            Confirm Booking!
          </Button>
        </Box>
      </React.Fragment>
    </React.Fragment>
  );
}
