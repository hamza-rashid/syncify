import React, { useEffect, useState } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";
import "./index.css";


function HomePage() {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = React.useState(null);

  useEffect(() => {
    // Make a GET request to /api/user-in-room on page load
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        if (data.code !== null) {
          console.log(data)
          setRoomCode(data.code);
          navigate(`/room/${data.code}`);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [navigate]);
  

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} align="center">
      <Typography variant="h2" component="h2" className="title" style={{ fontWeight: '700' }}>
          Syncify
        </Typography>
        <Typography variant="subtitle2" className="subheading" style={{ fontWeight: '700', fontSize: '1.5rem' }}>
        "Vote, Skip, Play: Songs, Together at Your Fingertips!"
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button color="primary" to="/join" component={RouterLink}>
            Join a Room
          </Button>
          <Button color="secondary" to="/create" component={RouterLink}>
            Create a Room
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}

export default function HomePageContainer() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/join" element={<RoomJoinPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route path="/room/:roomCode" element={<Room />} />
      </Routes>
    </Router>
  );
}
