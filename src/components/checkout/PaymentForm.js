import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Text} from '@mantine/core';
import { MenuItem } from '@mui/material';

export default function PaymentForm({ rooms, hotels }) {
  const [paymentOption, setPaymentOption] = useState('');

  console.log(rooms, hotels);

  const handlePaymentOptionChange = (event) => {
    setPaymentOption(event.target.value);
  };

  return (
    <React.Fragment>
      <Typography mt={4} variant="h5" gutterBottom>
        Booking Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Text>Hotel: {hotels.name}</Text>
        </Grid>
        <Grid item xs={12} md={6}>
          <Text>Price: {hotels.cheapestPrice}</Text>
        </Grid>
        <Grid item xs={12} md={6}>
          <Text>Location: {hotels.location}</Text>
        </Grid>
        <Grid item xs={12} md={6}>
          <Text>Area: {hotels.area}</Text>
        </Grid>
      </Grid>
      <Typography mt={4} variant="h5" gutterBottom>
        Room Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Text>Room: {rooms.title}</Text>
        </Grid>
        <Grid item xs={12} md={6}>
          <Text>Price: {rooms.price}</Text>
        </Grid>
        <Grid item xs={12} md={6}>
          <Text>Max People: {rooms.maxPeople}</Text>
        </Grid>
        <Grid item xs={12} md={6}>
          <Text>Details: {rooms.desc}</Text>
        </Grid>
      </Grid>

      <Typography mt={4} variant="h5" gutterBottom>
        Payment Method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            select
            id="paymentOption"
            label="Payment Method"
            value={paymentOption}
            onChange={handlePaymentOptionChange}
            fullWidth
            variant="standard"
          >
            <MenuItem value="cash">Cash On Arrival</MenuItem>
            <MenuItem value="online">Online Payment</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      {paymentOption === 'online' && (
        <>
          <Typography mt={4} variant="h5" gutterBottom>
            Payment Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cardName"
                label="Name on card"
                fullWidth
                autoComplete="cc-name"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cardNumber"
                label="Card number"
                fullWidth
                autoComplete="cc-number"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="expDate"
                label="Expiry date"
                fullWidth
                autoComplete="cc-exp"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cvv"
                label="CVV"
                helperText="Last three digits on signature strip"
                fullWidth
                autoComplete="cc-csc"
                variant="standard"
              />
            </Grid>
          </Grid>
        </>
      )}
    </React.Fragment>
  );
}
