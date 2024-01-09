import React, { useState } from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";

const MusicPlayer = (props) => {
  const songProgress = (props.time / props.duration) * 100;

  const {
    image_url,
    title,
    artist,
    is_playing,
    time,
    duration,
  } = props;

  const pauseSong = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/pause", requestOptions)
      .then((response) => {
        console.log(response)
      })
  };
  
  const playSong = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/play", requestOptions)
      .then((response) => {
        console.log(response)
      })
  };
  
  return (
    <Card>
      <Grid container alignItems="center">
        {image_url && (
          <Grid item align="center" xs={4}>
            <img src={image_url} height="100%" width="100%" alt="Album Cover" />
          </Grid>
        )}
        <Grid item align="center" xs={image_url ? 8 : 12}>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography
                component={Link}
                to="https://open.spotify.com/"
                target="_blank" 
                variant="h6"
                style={{
                paddingLeft: "30px",
                paddingRight: "30px",
                textDecoration: "underline",
                cursor: "pointer",
                color: "grey",
                }}
            >
                {title}
            </Typography>
</div>

          <Typography color="textSecondary" variant="subtitle1">
            {artist}
          </Typography>
          <div>
            <IconButton onClick={is_playing ? pauseSong : playSong}>
              {is_playing ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            <IconButton>
              <SkipNextIcon />
            </IconButton>
          </div>
        </Grid>
      </Grid>
      <LinearProgress variant="determinate" value={songProgress} />
    </Card>
  );
};

export default MusicPlayer;
