import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Typography } from "@mui/material";

export default function RoomJoinPage() {
  const [roomCode, setRoomCode] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleTextFieldChange = (e) => {
    setRoomCode(e.target.value);
  };
 
  const handleButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomCode,
      }),
    };
    fetch("/api/join-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          navigate(`/room/${roomCode}`);
        } else {
          setError("Room not found.");
        }
      })
      .catch((error) => {
        console.log(error)  
      });
  };
  
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4" style={{ color: 'white' }}>
            Join a Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center" style={{ color: 'white' }}>
          <TextField
            error={error}
            label="Code"
            placeholder="Enter a Room Code"
            value={roomCode}
            helperText={error}
            variant="outlined"
            onChange={handleTextFieldChange}
          />
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleButtonPressed}
        >
          Enter Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
    );
  
  }



 


