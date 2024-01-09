import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";
import { Grid, Button, Typography, Box } from "@mui/material";
import MusicPlayer from "./MusicPlayer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Room() {
    const { roomCode } = useParams();
    const navigate = useNavigate();
    const [roomDetails, setRoomDetails] = useState(null);
    const [showCreateRoomPage, setShowCreateRoomPage] = useState(false);
    const [song, setSong] = useState({});

    // Define the getRoomDetails function
    const getRoomDetails = async () => {
        try {
        const response = await fetch(`/api/get-room?code=${roomCode}`);
        if (response.ok) {
            const data = await response.json();
            setRoomDetails({
                votesToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host,
            });

        } else {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
              };
              fetch("/api/leave-room", requestOptions)
                .then((response) => {
                  if (response.ok) {
                    navigate(`/`);
                  } else {
                    setError("Room not found.");
                  }
                })
                .catch((error) => {
                  console.log(error)  
                });
        }
        } catch (error) {
        console.error("Error:", error);
        }
    };

    // Define the getCurrentSong function
    const getCurrentSong = () => {
      fetch("/spotify/current-song")
        .then((response) => {
          if (!response.ok) {
            console.error("Response not OK:", response);
            return response.json();
          } else {
            return response.json();
          }
        })
        .then((data) => {
          console.log("Received data:", data);
          setSong(data); // Update the song state with the fetched data
        })    
        .catch((error) => {
          console.error("Fetch error:", error);
        });;
    };

    useEffect(() => {
        // Call the getRoomDetails function
        getRoomDetails();

        toast.info('Spotify Premium is needed to play/pause & skip'); // Show a success toast

        getCurrentSong();
        // Set up interval to call getCurrentSong every 1 second
        const intervalId = setInterval(() => {
          getCurrentSong();
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
        
    }, [roomCode]);

    useEffect(() => {
      // This effect will run whenever roomDetails changes
      if (roomDetails !== null) {
        if ( roomDetails.isHost === true) {
          fetch("/spotify/is-authenticated")
          .then((response) => response.json())
          .then((data) => {
            console.log(data.status);
            if (!data.status) {
              fetch("/spotify/get-auth-url")
                .then((response) => response.json())
                .then((data) => {
                  window.location.replace(data.url);
                });
            } 
          });
        }
      }
    }, [roomDetails]);


    // Render loading indicator if roomDetails is null
    if (roomDetails === null) {
        return <div>Loading...</div>;
    }
    


    const handleLeaveButtonPressed = () => {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        };
        fetch("/api/leave-room", requestOptions)
          .then((response) => {
            if (response.ok) {
              navigate(`/`);
            } else {
              setError("Room not found.");
            }
          })
          .catch((error) => {
            console.log(error)  
          });
      };

    const createRoomPageProps = {
    update: true,
    votesToSkip: roomDetails.votesToSkip,
    guestCanPause: roomDetails.guestCanPause,
    roomCode: roomCode,
    };

    const musicPlayerProps = {
      image_url: song.image_url,
      title: song.title,
      artist: song.artist,
      is_playing: song.is_playing,
      time: song.time,
      duration: song.duration,
    }

      return (
        <Grid container spacing={1}>
        <ToastContainer position="top-center" autoClose={3000} style={{ marginTop: '-150px' }}/>
        {showCreateRoomPage ? (
            <Grid container item xs={12} justify="center" alignItems="center">
            <CreateRoomPage {...createRoomPageProps} />
            <   Grid item xs={12} align="center">
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setShowCreateRoomPage(false);
                        getRoomDetails();
                    }}
                    style={{ marginTop: "10px" }} 
                    >
                    Close
                    </Button>
                </Grid>
            </Grid>
        ) : (
            <>
              <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4" style={{ color: 'white' }}>
                  Code: {roomCode}
                </Typography>
              </Grid>

              <Grid item xs={12} align="center">
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  style={{ maxWidth: "400px", margin: "auto"}} // Adjust the max width and margin as needed
                >
                  <MusicPlayer {...musicPlayerProps} />
                </Box>
              </Grid>

              {roomDetails.isHost && (
                <Grid item xs={12} align="center">
                    <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setShowCreateRoomPage(true)}
                    >
                    Settings
                    </Button>
                </Grid>
                )}
                <Grid item xs={12} align="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLeaveButtonPressed}
                >
                  Leave Room
                </Button>
                </Grid>
            </>
          )}
        </Grid>
      );
      
}

export default Room;

