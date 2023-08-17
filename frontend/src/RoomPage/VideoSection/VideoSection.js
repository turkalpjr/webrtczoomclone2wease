import React, { useEffect, useState } from "react";

import { Grid, Button, TextField, Box } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AdjustIcon from '@mui/icons-material/Adjust';
import MicNoneIcon from '@mui/icons-material/MicNone';
import LogoutIcon from '@mui/icons-material/Logout';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import * as webRTCHandler from "../../utils/webRTCHandler";
import LocalScreenSharingPreview from "./LocalScreenSharingPreview";
const VideoSection = (props) => {

  const connectOnlyWithAudio = false;
  const constraints = {
    audio: false,
    video: true,
  };
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isLocalVideoDisabled, setIsLocalVideoDisabled] = useState(false);
  const [isRecordOff, setisRecordOff] = useState(false);
  const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
  const [screenSharingStream, setScreenSharingStream] = useState(null);

  const handleScreenShareToggle = async () => {
    debugger;
    if (!isScreenSharingActive) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      } catch (err) {
        console.log(
          "error occurred when trying to get an access to screen share stream"
        );
      }
      if (stream) {
        setScreenSharingStream(stream);

        webRTCHandler.toggleScreenShare(isScreenSharingActive, stream);
        setIsScreenSharingActive(true);
        // execute here function to switch the video track which we are sending to other users
      }
    } else {
      webRTCHandler.toggleScreenShare(isScreenSharingActive);
      setIsScreenSharingActive(false);

      // stop screen share stream
      screenSharingStream.getTracks().forEach((t) => t.stop());
      setScreenSharingStream(null);
    }
  };



  const handleRoomDisconnection = () => {
    const siteUrl = window.location.origin;
    window.location.href = siteUrl;
  };
  const handleRecordButtonPressed = () => {
    webRTCHandler.handleRecordButtonPressed(isRecordOff);
    setisRecordOff(!isRecordOff);
  };
  const handleMicButtonPressed = () => {
    webRTCHandler.toggleMic(isMicMuted);

    setIsMicMuted(!isMicMuted);
  };
  const handleCameraButtonPressed = () => {
    webRTCHandler.toggleCamera(isLocalVideoDisabled);

    setIsLocalVideoDisabled(!isLocalVideoDisabled);
  };
  return (
    <div className="video_section_container">

      <Box component="form"   >
        <Grid container display="flex" spacing={1} className="CenterItem"  >
          <Grid item={true} md={12} >
            <TextField
              inputProps={{
                style: {
                  height: "11px",
                },
              }}
              fullWidth />
          </Grid>
        </Grid>
        <Grid container display="flex" spacing={1} className="CenterItem"  >
          <Grid item={true} md={2} >
            <Button type="button" size="medium" variant='contained' onClick={handleMicButtonPressed} startIcon={<MicNoneIcon />} >  </Button>
          </Grid>

          <Grid item={true} md={2} >
            {!connectOnlyWithAudio && <Button type="button" size="medium" variant='outlined' onClick={handleCameraButtonPressed} startIcon={<AddAPhotoIcon />} > </Button>}
          </Grid>
          <Grid item={true} md={2} >
            {!connectOnlyWithAudio && <Button type="button" size="medium" variant='outlined' onClick={handleRecordButtonPressed} startIcon={<AdjustIcon />} > </Button>}
          </Grid>
          <Grid item={true} md={2} >
            <Button type="button" size="medium" variant='outlined' onClick={handleRoomDisconnection} startIcon={<LogoutIcon />} > </Button>
          </Grid>
          <Grid item={true} md={2} >
            {!connectOnlyWithAudio && <Button type="button" size="medium" variant='outlined' onClick={handleScreenShareToggle} startIcon={<ScreenShareIcon />} > </Button>}
          </Grid>

          <Grid item={true} md={12} >
            <div className="room_label">
              <p className="room_label_paragraph">ID: {props.roomId} </p>
            </div>
          </Grid>

        </Grid>


        <Grid item={true} md={12} >
          {isScreenSharingActive && (
            <LocalScreenSharingPreview stream={screenSharingStream} />
          )}
        </Grid>

      </Box>
    </div >
  );
};

export default VideoSection;

