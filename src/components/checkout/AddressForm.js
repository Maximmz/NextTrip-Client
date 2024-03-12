import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { TextInput } from "@mantine/core";

export default function AddressForm({users}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Personal Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        <TextInput
          value={users.username}
          readOnly
          placeholder="Your Account"
          label="User"
        />
        </Grid>
        <Grid item xs={12}>
        <TextInput
          value={users.email}
          readOnly
          placeholder="Your Email"
          label="Email"
        />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
