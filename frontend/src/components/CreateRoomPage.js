import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateRoomPage({
  update = false,
  votesToSkip: initialVotesToSkip,
  guestCanPause: initialGuestCanPause,
  roomCode,
}) {
  const defaultVotes = 2;
  const [votesToSkip, setVotesToSkip] = useState(
    initialVotesToSkip || defaultVotes
  );
  const [guestCanPause, setGuestCanPause] = useState(
    initialGuestCanPause || false
  );
  const navigate = useNavigate();

  const handleVotesChange = (e) => {
    setVotesToSkip(e.target.value);
  };

  const handleGuestCanPauseChange = (e) => {
    setGuestCanPause(e.target.value === "true");
  };

  const handleRoomButtonPressed = () => {
    const requestOptions = {
      method: update ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
        code: roomCode,
      }),
    };

    const apiUrl = update ? "/api/update-room" : "/api/create-room";

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.code) {
          navigate(`/room/${data.code}`);
          if (update) {
            toast.success('Room updated successfully'); // Show a success toast
          }
        } else {
          console.error("Failed to create/update a room.");
        }
      });
  };

  return (
    <Grid container spacing={1} style={{ color: 'white' }}>
      <ToastContainer position="top-center" autoClose={3000} style={{ marginTop: '-150px' }}/>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
        {update ? "Update Room" : "Create A Room"}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center" >
        <FormControl component="fieldset" >
          <FormHelperText style={{ color: 'white' }}>
            <div align="center">Guest Control of Playback State</div>
          </FormHelperText>
          <RadioGroup
            row
            defaultValue={initialGuestCanPause}
            onChange={handleGuestCanPauseChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="secondary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="primary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required={true}
            type="number"
            onChange={handleVotesChange}
            inputProps={{
              min: 1,
              style: { textAlign: "center" },
            }}
            defaultValue={initialVotesToSkip}
          />
          <FormHelperText style={{ color: 'white' }}>
            <div align="center">Votes Required To Skip Song</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          color="secondary"
          variant="contained"
          onClick={handleRoomButtonPressed}
        >
        {update ? "Update Room" : "Create A Room"}
        </Button>
      </Grid>
      {!update && (
        <Grid item xs={12} align="center">
          <Button color="primary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      )}
    </Grid>   
  );
}
